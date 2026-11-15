// "view as": the admin looking at a client's portal the way the client sees it (?as=<client id>).
// it's the one place "which client" comes from the browser instead of the session, so its
// rules are strict: admin only, GET only, clients only, one id only
import { Types } from 'mongoose';
import type { Agent } from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import type { AccountDocument } from '../src/models/Account.js';
import { AssessmentResult } from '../src/models/AssessmentResult.js';
import { ChangeRequest } from '../src/models/ChangeRequest.js';
import { Subscriber } from '../src/models/Subscriber.js';
import { daysAgo, idOf, makeAdmin, makeClient, signIn } from './helpers.js';

let bakery: AccountDocument;
let florist: AccountDocument;
let otherAdmin: AccountDocument;
let bakeryBrowser: Agent;
let adminBrowser: Agent;

beforeEach(async () => {
    bakery = await makeClient('Example Bakery', 'bakery@example.com');
    florist = await makeClient('Example Florist', 'florist@example.com');
    const admin = await makeAdmin('admin@example.com');
    otherAdmin = await makeAdmin('partner@example.com');

    // a bit of everything for both clients, so an answer with the wrong client's things in it would show
    await ChangeRequest.create([
        { account: bakery._id, message: 'New photos for the menu', createdAt: daysAgo(3) },
        { account: bakery._id, message: 'Fix the opening hours', status: 'in progress', createdAt: daysAgo(1) },
        { account: florist._id, message: 'Add the spring bouquets', createdAt: daysAgo(2) }
    ]);
    await AssessmentResult.create([
        { account: bakery._id, assessmentType: 'quick-check', label: 'Quick check', score: 72, riskLevel: 'medium', createdAt: daysAgo(2) },
        { account: bakery._id, assessmentType: 'quick-check', label: 'Quick check', score: 35, riskLevel: 'high', createdAt: daysAgo(1) },
        { account: florist._id, assessmentType: 'garden-check', label: 'Garden check', score: 90, riskLevel: 'low' }
    ]);
    await Subscriber.create([
        { account: bakery._id, email: 'reader@example.com', sourcePage: 'quick-check', createdAt: daysAgo(2) },
        { account: bakery._id, email: 'regular@example.com', sourcePage: null, createdAt: daysAgo(1) },
        { account: florist._id, email: 'gardener@example.com', sourcePage: 'garden-check' }
    ]);

    [bakeryBrowser, adminBrowser] = await Promise.all([signIn(bakery), signIn(admin)]);
});

describe('?as= (view as a client)', () => {
    it.each(['/api/requests', '/api/site-data/assessments', '/api/site-data/subscribers'])(
        'answers GET %s exactly as the client would see it',
        async (path) => {
            const asTheClient = await bakeryBrowser.get(path).expect(200);
            const asTheAdmin = await adminBrowser.get(`${path}?as=${idOf(bakery)}`).expect(200);
            const adminsOwn = await adminBrowser.get(path).expect(200);

            expect(asTheAdmin.body).toEqual(asTheClient.body);
            // and it really is the client's answer, not the admin's own
            expect(asTheAdmin.body).not.toEqual(adminsOwn.body);
            expect(JSON.stringify(asTheAdmin.body)).not.toMatch(/florist|garden|bouquets/i);
        }
    );

    it('is only for the admin: a client using it gets a 403, not a peek', async () => {
        const res = await bakeryBrowser.get(`/api/requests?as=${idOf(florist)}`).expect(403);
        expect(res.body).toEqual({ error: 'Only GradientV can do that.' });
    });

    it('is read only: sending a request as a client gets a 403, and nothing is saved', async () => {
        await adminBrowser.post(`/api/requests?as=${idOf(bakery)}`)
            .send({ message: 'Sent while viewing as the bakery' })
            .expect(403, { error: 'Viewing as a client is read only.' });
        expect(await ChangeRequest.countDocuments({ message: 'Sent while viewing as the bakery' })).toBe(0);
    });

    it('is read only: changing a status while viewing gets a 403, and nothing changes', async () => {
        const target = await ChangeRequest.findOne({ account: bakery._id, status: 'in progress' }).orFail();

        await adminBrowser.patch(`/api/requests/${idOf(target)}?as=${idOf(bakery)}`)
            .send({ status: 'done' })
            .expect(403, { error: 'Viewing as a client is read only.' });
        expect((await ChangeRequest.findById(target._id).lean())?.status).toBe('in progress');

        // the same change without ?as= is the admin's to make
        await adminBrowser.patch(`/api/requests/${idOf(target)}`).send({ status: 'done' }).expect(200);
    });

    it("only views clients: another admin's id gets a 404", async () => {
        await adminBrowser.get(`/api/requests?as=${idOf(otherAdmin)}`).expect(404, { error: 'There is no client with that id.' });
    });

    it('answers 404 for an id that is nobody', async () => {
        await adminBrowser.get(`/api/requests?as=${new Types.ObjectId().toString()}`).expect(404);
        await adminBrowser.get('/api/requests?as=not-an-id').expect(404);
    });

    it('takes one id only: ?as=a&as=b gets a 400', async () => {
        await adminBrowser.get(`/api/requests?as=${idOf(bakery)}&as=${idOf(florist)}`).expect(400, { error: 'as has to be one client id.' });
    });
});
