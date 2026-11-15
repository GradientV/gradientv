// /api/collect: where a client's own website sends finished assessments and newsletter signups.
// a site key gets in and nothing else does, and everything is checked before it's saved
import { createHash } from 'node:crypto';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { Account, type AccountDocument } from '../src/models/Account.js';
import { AssessmentResult } from '../src/models/AssessmentResult.js';
import { Subscriber } from '../src/models/Subscriber.js';
import { app, makeClient, signIn, siteKeyFor } from './helpers.js';

const GOOD_RESULT = { type: 'quick-check', label: 'Quick check', score: 72, riskLevel: 'medium' };
const NO_KEY = { error: 'A valid site key is needed for this.' };

let bakery: AccountDocument;
let key: string;

beforeEach(async () => {
    bakery = await makeClient('Example Bakery', 'bakery@example.com');
    key = await siteKeyFor(bakery);
});

/** what a client's site sends: a POST with its key in the Authorization header (null leaves the header out) */
function send(path: 'assessment' | 'subscriber', body: object, authorization: string | null = `Bearer ${key}`) {
    const req = request(app).post(`/api/collect/${path}`);
    if (authorization !== null) req.set('Authorization', authorization);
    return req.send(body);
}

describe('site keys', () => {
    it.each([
        ['no key', () => null],
        ['a wrong key', () => 'Bearer gvsite_not-the-real-key'],
        ['an empty key', () => 'Bearer '],
        ['the right key without "Bearer"', (rightKey: string) => rightKey],
        ['the right key under another scheme', (rightKey: string) => `Basic ${rightKey}`]
    ])('give a site sending %s a 401, and nothing is saved', async (_case, header) => {
        await send('assessment', GOOD_RESULT, header(key)).expect(401, NO_KEY);
        await send('subscriber', { email: 'reader@example.com' }, header(key)).expect(401, NO_KEY);

        expect(await AssessmentResult.countDocuments()).toBe(0);
        expect(await Subscriber.countDocuments()).toBe(0);
    });

    it('give a signed-in browser a 401 too: a session cookie is not a site key', async () => {
        const browser = await signIn(bakery);
        await browser.post('/api/collect/assessment').send(GOOD_RESULT).expect(401, NO_KEY);
    });

    it('are kept only as a SHA-256 hash', async () => {
        const saved = await Account.findById(bakery._id).lean();
        expect(saved?.siteKeyHash).toBe(createHash('sha256').update(key).digest('hex'));
        expect(JSON.stringify(saved)).not.toContain(key);
    });
});

describe('POST /api/collect/assessment', () => {
    it('saves a result under the account the key belongs to, whatever the body says', async () => {
        const florist = await makeClient('Example Florist', 'florist@example.com');
        // there's no field for naming a client. one sent anyway changes nothing
        await send('assessment', { ...GOOD_RESULT, account: String(florist._id) }).expect(201, { ok: true });

        const saved = await AssessmentResult.find().lean();
        expect(saved).toHaveLength(1);
        expect(String(saved[0].account)).toBe(String(bakery._id));
        expect(saved[0]).toMatchObject({ assessmentType: 'quick-check', label: 'Quick check', score: 72, riskLevel: 'medium' });
    });

    it.each([
        ['no type', { ...GOOD_RESULT, type: undefined }],
        ['a type with spaces and capitals', { ...GOOD_RESULT, type: 'Quick Check' }],
        ['a type over 60 characters', { ...GOOD_RESULT, type: 'a'.repeat(61) }],
        ['an operator object as the type', { ...GOOD_RESULT, type: { $gt: '' } }],
        ['no score', { ...GOOD_RESULT, score: undefined }],
        ['a score over 100', { ...GOOD_RESULT, score: 101 }],
        ['a score under 0', { ...GOOD_RESULT, score: -1 }],
        ['a score with a fraction', { ...GOOD_RESULT, score: 72.5 }],
        ['a score sent as text', { ...GOOD_RESULT, score: '72' }],
        ['a risk level that is not low, medium or high', { ...GOOD_RESULT, riskLevel: 'severe' }],
        ['a label over 80 characters', { ...GOOD_RESULT, label: 'x'.repeat(81) }],
        ['a label that is not text', { ...GOOD_RESULT, label: 7 }]
    ])('gives a 400 for a result with %s, and saves nothing', async (_case, body) => {
        const res = await send('assessment', body).expect(400);
        expect(res.body).toEqual({ error: expect.any(String) });
        expect(await AssessmentResult.countDocuments()).toBe(0);
    });

    it('stops at 500 a day, so a bot hammering the form cannot fill the database', async () => {
        await AssessmentResult.insertMany(Array.from({ length: 500 }, () => ({ account: bakery._id, assessmentType: 'quick-check', score: 50, riskLevel: 'medium' })));

        await send('assessment', GOOD_RESULT).expect(429);
        expect(await AssessmentResult.countDocuments()).toBe(500);
    });
});

describe('POST /api/collect/subscriber', () => {
    it('adds an address once, however many times it signs up', async () => {
        await send('subscriber', { email: 'reader@example.com', sourcePage: 'quick-check' }).expect(201, { ok: true });
        await send('subscriber', { email: '  Reader@Example.COM ', sourcePage: 'newsletter' }).expect(201, { ok: true });
        await send('subscriber', { email: 'READER@EXAMPLE.COM' }).expect(201, { ok: true });

        const saved = await Subscriber.find().lean();
        expect(saved).toHaveLength(1);
        // the first signup's page is the one that's kept
        expect(saved[0]).toMatchObject({ email: 'reader@example.com', sourcePage: 'quick-check' });
    });

    it("keeps each client's list to itself, even with the same person on both", async () => {
        const florist = await makeClient('Example Florist', 'florist@example.com');
        const floristKey = await siteKeyFor(florist);

        await send('subscriber', { email: 'reader@example.com' }).expect(201);
        await send('subscriber', { email: 'reader@example.com' }, `Bearer ${floristKey}`).expect(201);

        expect(await Subscriber.countDocuments({ account: bakery._id })).toBe(1);
        expect(await Subscriber.countDocuments({ account: florist._id })).toBe(1);
    });

    it.each([
        ['an empty email', ''],
        ['no @', 'reader.example.com'],
        ['no dot after the @', 'reader@example'],
        ['a space in it', 'a reader@example.com'],
        ['over 254 characters', `${'r'.repeat(250)}@example.com`],
        ['an operator object', { $ne: null }],
        ['no email at all', undefined]
    ])('gives a 400 for a signup with %s, and saves nothing', async (_case, email) => {
        await send('subscriber', { email }).expect(400, { error: 'email has to be an email address.' });
        expect(await Subscriber.countDocuments()).toBe(0);
    });

    it('drops a source page that looks wrong, and still counts the signup', async () => {
        await send('subscriber', { email: 'reader@example.com', sourcePage: '<script>alert(1)</script>' }).expect(201);
        expect(await Subscriber.findOne().lean()).toMatchObject({ email: 'reader@example.com', sourcePage: null });
    });
});
