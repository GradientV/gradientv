// the request box: a client sends change requests and sees only their own,
// and only the admin moves a request along
import { Types } from 'mongoose';
import request, { type Agent } from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { RequestJSON } from '../../shared/portal.js';
import type { AccountDocument } from '../src/models/Account.js';
import { ChangeRequest, MESSAGE_MAX } from '../src/models/ChangeRequest.js';
import { app, daysAgo, idOf, makeAdmin, makeClient, signIn } from './helpers.js';

let bakery: AccountDocument;
let florist: AccountDocument;
let bakeryBrowser: Agent;
let floristBrowser: Agent;
let adminBrowser: Agent;

beforeEach(async () => {
    bakery = await makeClient('Example Bakery', 'bakery@example.com');
    florist = await makeClient('Example Florist', 'florist@example.com');
    const admin = await makeAdmin();
    [bakeryBrowser, floristBrowser, adminBrowser] = await Promise.all([signIn(bakery), signIn(florist), signIn(admin)]);
});

describe('/api/requests', () => {
    it('is closed to anyone signed out', async () => {
        await request(app).get('/api/requests').expect(401);
        await request(app).post('/api/requests').send({ message: 'Change the opening hours' }).expect(401);
        expect(await ChangeRequest.countDocuments()).toBe(0);
    });

    it("shows a client their own requests and nobody else's", async () => {
        await bakeryBrowser.post('/api/requests').send({ message: 'Put the holiday hours on the home page' }).expect(201);
        await floristBrowser.post('/api/requests').send({ message: 'Add the spring bouquets' }).expect(201);

        const res = await bakeryBrowser.get('/api/requests').expect(200);
        expect(res.body).toEqual([{
            id: expect.any(String),
            message: 'Put the holiday hours on the home page',
            status: 'new',
            createdAt: expect.any(String)
        }]);
    });

    it('shows a client theirs newest first', async () => {
        const [newer, older] = await ChangeRequest.create([
            { account: bakery._id, message: 'The newer one', createdAt: daysAgo(1) },
            { account: bakery._id, message: 'The older one', createdAt: daysAgo(3) }
        ]);

        const res = await bakeryBrowser.get('/api/requests').expect(200);
        expect(res.body).toEqual([
            { id: idOf(newer), message: 'The newer one', status: 'new', createdAt: newer.createdAt.toISOString() },
            { id: idOf(older), message: 'The older one', status: 'new', createdAt: older.createdAt.toISOString() }
        ]);
    });

    it("shows the admin everyone's, newest first, with whose each one is", async () => {
        await ChangeRequest.create([
            { account: bakery._id, message: 'New photos for the menu', createdAt: daysAgo(2) },
            { account: florist._id, message: 'Add the spring bouquets', createdAt: daysAgo(1) }
        ]);

        const res = await adminBrowser.get('/api/requests').expect(200);
        expect(res.body).toMatchObject([
            { message: 'Add the spring bouquets', businessName: 'Example Florist', email: 'florist@example.com' },
            { message: 'New photos for the menu', businessName: 'Example Bakery', email: 'bakery@example.com' }
        ]);
    });

    it.each([
        ['empty', ''],
        ['only spaces', '  \n  '],
        ['not text', { $ne: null }],
        ['missing', undefined]
    ])('refuses a message that is %s', async (_case, message) => {
        await bakeryBrowser.post('/api/requests').send({ message }).expect(400, { error: 'Write what you would like changed first.' });
        expect(await ChangeRequest.countDocuments()).toBe(0);
    });

    it(`refuses a message over ${MESSAGE_MAX} characters, and takes one of exactly ${MESSAGE_MAX}`, async () => {
        const res = await bakeryBrowser.post('/api/requests').send({ message: 'x'.repeat(MESSAGE_MAX + 1) }).expect(400);
        expect(res.body).toEqual({ error: `That is a bit long. Keep it under ${MESSAGE_MAX} characters, or send it in two parts.` });

        await bakeryBrowser.post('/api/requests').send({ message: 'x'.repeat(MESSAGE_MAX) }).expect(201);
        expect(await ChangeRequest.countDocuments()).toBe(1);
    });

    it('stops a client at 20 requests a day, and only that client', async () => {
        await ChangeRequest.insertMany(Array.from({ length: 20 }, (_unused, i) => ({ account: bakery._id, message: `Request ${i + 1}` })));

        const res = await bakeryBrowser.post('/api/requests').send({ message: 'One more' }).expect(429);
        expect(res.body).toEqual({ error: 'That is a lot of requests for one day. Reach us directly for anything urgent.' });
        await floristBrowser.post('/api/requests').send({ message: 'Ours still goes through' }).expect(201);
    });
});

describe('PATCH /api/requests/:id', () => {
    let requestId: string;

    beforeEach(async () => {
        const res = await bakeryBrowser.post('/api/requests').send({ message: 'Fix the typo on the menu' }).expect(201);
        requestId = (res.body as RequestJSON).id;
    });

    it('is only for the admin: even the client who sent it gets a 403', async () => {
        await bakeryBrowser.patch(`/api/requests/${requestId}`).send({ status: 'done' }).expect(403, { error: 'Only GradientV can do that.' });
        await request(app).patch(`/api/requests/${requestId}`).send({ status: 'done' }).expect(401);

        expect((await ChangeRequest.findById(requestId).lean())?.status).toBe('new');
    });

    it('moves a request along for the admin, and the client sees it moved', async () => {
        const res = await adminBrowser.patch(`/api/requests/${requestId}`).send({ status: 'in progress' }).expect(200);
        expect(res.body).toEqual({
            id: requestId,
            message: 'Fix the typo on the menu',
            status: 'in progress',
            createdAt: expect.any(String),
            businessName: 'Example Bakery',
            email: 'bakery@example.com'
        });

        const mine = await bakeryBrowser.get('/api/requests').expect(200);
        expect(mine.body).toMatchObject([{ id: requestId, status: 'in progress' }]);
    });

    it.each([
        ['a status that is not one of the three', 'archived'],
        ['an empty status', ''],
        ['an operator object', { $ne: null }]
    ])('refuses %s', async (_case, status) => {
        await adminBrowser.patch(`/api/requests/${requestId}`).send({ status }).expect(400, { error: 'The status has to be one of: new, in progress, done.' });
        expect((await ChangeRequest.findById(requestId).lean())?.status).toBe('new');
    });

    it('answers 404 for a request that is not there', async () => {
        await adminBrowser.patch(`/api/requests/${new Types.ObjectId().toString()}`).send({ status: 'done' }).expect(404);
        await adminBrowser.patch('/api/requests/not-an-id').send({ status: 'done' }).expect(404);
    });
});

describe('telling Slack about a new request', () => {
    const WEBHOOK = 'https://hooks.example.com/services/test';

    it('posts it to Slack with the words made harmless, so a client cannot @mention anyone or add links', async () => {
        vi.stubEnv('SLACK_WEBHOOK_URL', WEBHOOK);
        const slack = vi.fn<typeof fetch>(() => Promise.resolve(new Response(null, { status: 200 })));
        vi.stubGlobal('fetch', slack);

        await bakeryBrowser.post('/api/requests').send({ message: '<!channel> see <https://example.com|this> & that' }).expect(201);

        expect(slack).toHaveBeenCalledOnce();
        const [url, init] = slack.mock.calls[0];
        expect(url).toBe(WEBHOOK);
        expect(JSON.parse(String(init?.body))).toEqual({
            text: 'New request from *Example Bakery*:\n&lt;!channel&gt; see &lt;https://example.com|this&gt; &amp; that'
        });
    });

    it('still saves the request when Slack is down', async () => {
        vi.stubEnv('SLACK_WEBHOOK_URL', WEBHOOK);
        vi.stubGlobal('fetch', vi.fn<typeof fetch>(() => Promise.reject(new Error('Slack is down'))));
        const log = vi.spyOn(console, 'error').mockImplementation(() => undefined);

        await bakeryBrowser.post('/api/requests').send({ message: 'Change the phone number' }).expect(201);
        expect(await ChangeRequest.countDocuments({ account: bakery._id })).toBe(1);
        expect(log).toHaveBeenCalledWith('Could not reach Slack: Slack is down');
    });
});
