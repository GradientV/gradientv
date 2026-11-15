// the two portal cards that show a client what their own site collected:
// a summary of the assessments taken on it, and the newsletter signups
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import type { AccountDocument } from '../src/models/Account.js';
import { AssessmentResult } from '../src/models/AssessmentResult.js';
import { Subscriber } from '../src/models/Subscriber.js';
import { app, daysAgo, idOf, makeClient, signIn } from './helpers.js';

let bakery: AccountDocument;
let florist: AccountDocument;

beforeEach(async () => {
    bakery = await makeClient('Example Bakery', 'bakery@example.com');
    florist = await makeClient('Example Florist', 'florist@example.com');
});

describe('GET /api/site-data/assessments', () => {
    it('is a 401 when signed out', async () => {
        await request(app).get('/api/site-data/assessments').expect(401);
    });

    it('is empty for a client whose site has sent nothing yet', async () => {
        const browser = await signIn(bakery);
        await browser.get('/api/site-data/assessments').expect(200, { total: 0, last30: 0, byType: [], recent: [] });
    });

    it("sums up the client's results by assessment, and leaves other clients' out", async () => {
        const [renamed, labelled, unlabelled, review, brief] = await AssessmentResult.create([
            { account: bakery._id, assessmentType: 'quick-check', label: 'Quick check (old name)', score: 80, riskLevel: 'low', createdAt: daysAgo(40) },
            { account: bakery._id, assessmentType: 'quick-check', label: 'Quick check', score: 60, riskLevel: 'medium', createdAt: daysAgo(10) },
            // sent by an older version of the site, before results had names
            { account: bakery._id, assessmentType: 'quick-check', score: 41, riskLevel: 'high', createdAt: daysAgo(1) },
            { account: bakery._id, assessmentType: 'full-review', score: 30, riskLevel: 'high', createdAt: daysAgo(5) },
            { account: bakery._id, assessmentType: 'brief-check', label: 'Brief check', score: 90, riskLevel: 'low', createdAt: daysAgo(3) },
            { account: florist._id, assessmentType: 'garden-check', label: 'Garden check', score: 99, riskLevel: 'low', createdAt: daysAgo(2) }
        ]);

        const res = await (await signIn(bakery)).get('/api/site-data/assessments').expect(200);
        expect(res.body).toEqual({
            total: 5,
            // the one from 40 days ago is in the total, not in the last 30 days
            last30: 4,
            // most taken first, and alphabetical when two are tied
            byType: [
                // the name is the newest one it was sent with. the newest result has none, so it's the one before
                { type: 'quick-check', label: 'Quick check', count: 3, averageScore: 60, low: 1, medium: 1, high: 1 },
                { type: 'brief-check', label: 'Brief check', count: 1, averageScore: 90, low: 1, medium: 0, high: 0 },
                { type: 'full-review', label: null, count: 1, averageScore: 30, low: 0, medium: 0, high: 1 }
            ],
            // newest first, and nothing on them about who took them
            recent: [unlabelled, brief, review, labelled, renamed].map((result) => ({
                id: idOf(result),
                type: result.assessmentType,
                score: result.score,
                riskLevel: result.riskLevel,
                createdAt: result.createdAt.toISOString()
            }))
        });
    });

    it('counts every result but sends only the 50 newest', async () => {
        await AssessmentResult.insertMany(Array.from({ length: 51 }, (_unused, i) => ({
            account: bakery._id, assessmentType: 'quick-check', score: i, riskLevel: 'low'
        })));

        const res = await (await signIn(bakery)).get('/api/site-data/assessments').expect(200);
        expect(res.body).toMatchObject({ total: 51, last30: 51 });
        expect(res.body.recent).toHaveLength(50);
    });
});

describe('GET /api/site-data/subscribers', () => {
    it('is a 401 when signed out', async () => {
        await request(app).get('/api/site-data/subscribers').expect(401);
    });

    it("lists the client's signups newest first, and nobody else's", async () => {
        const [first, latest, middle] = await Subscriber.create([
            { account: bakery._id, email: 'first@example.com', sourcePage: 'quick-check', createdAt: daysAgo(9) },
            { account: bakery._id, email: 'latest@example.com', sourcePage: null, createdAt: daysAgo(1) },
            { account: bakery._id, email: 'middle@example.com', sourcePage: 'newsletter', createdAt: daysAgo(4) },
            { account: florist._id, email: 'gardener@example.com', sourcePage: 'garden-check', createdAt: daysAgo(2) }
        ]);

        const res = await (await signIn(bakery)).get('/api/site-data/subscribers').expect(200);
        expect(res.body).toEqual({
            total: 3,
            subscribers: [latest, middle, first].map((subscriber) => ({
                id: idOf(subscriber),
                email: subscriber.email,
                sourcePage: subscriber.sourcePage,
                createdAt: subscriber.createdAt.toISOString()
            }))
        });
    });

    it('counts every signup but sends only the 1,000 newest', async () => {
        await Subscriber.insertMany(Array.from({ length: 1001 }, (_unused, i) => ({ account: bakery._id, email: `reader${i}@example.com` })));

        const res = await (await signIn(bakery)).get('/api/site-data/subscribers').expect(200);
        expect(res.body.total).toBe(1001);
        expect(res.body.subscribers).toHaveLength(1000);
    });
});
