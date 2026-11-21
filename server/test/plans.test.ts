// "Build your plan": anyone can send one from the public site, every field gets checked,
// a day's worth is capped, and only the admin can read or move what came in
import { Types } from 'mongoose';
import request, { type Agent } from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { PackageId, PlanJSON } from '../../shared/portal.js';
import { PLANS_PER_DAY, PLANS_PER_EMAIL_PER_DAY } from '../src/controllers/planController.js';
import { PLAN_LIMITS, PlanRequest } from '../src/models/PlanRequest.js';
import { app, daysAgo, makeAdmin, makeClient, signIn } from './helpers.js';

/** a plan the way the form sends it */
const PLAN = {
    packages: ['growth', 'website'] as PackageId[],
    name: 'Maria Santos',
    email: 'Maria@Example.com',
    phone: '(718) 555-0100',
    businessName: 'Example Cafe',
    businessType: 'Cafe',
    message: 'We answer the same booking questions all day.',
    locale: 'es'
};

function send(body: unknown) {
    return request(app).post('/api/plan').send(body as object);
}

describe('POST /api/plan', () => {
    it('saves a plan from someone who is not signed in, cleaned up, and answers only { ok: true }', async () => {
        const res = await send(PLAN).expect(201);
        expect(res.body).toEqual({ ok: true });

        const saved = await PlanRequest.findOne().lean();
        expect(saved).toMatchObject({
            // the site's order, whatever order they were picked in
            packages: ['website', 'growth'],
            name: 'Maria Santos',
            email: 'maria@example.com',
            phone: '(718) 555-0100',
            businessName: 'Example Cafe',
            businessType: 'Cafe',
            message: 'We answer the same booking questions all day.',
            locale: 'es',
            status: 'new'
        });
    });

    it('needs only the packages, a name and an email, and leaves the empty fields out', async () => {
        await send({ packages: ['custom'], name: 'Sam', email: 'sam@example.com', phone: '', businessName: '   ', message: null }).expect(201);

        const saved = await PlanRequest.findOne().lean();
        expect(saved).toMatchObject({ packages: ['custom'], name: 'Sam', email: 'sam@example.com', locale: 'en' });
        expect(saved).not.toHaveProperty('phone');
        expect(saved).not.toHaveProperty('businessName');
        expect(saved).not.toHaveProperty('message');
    });

    it('takes the AI Upgrade package, after the others', async () => {
        await send({ ...PLAN, packages: ['ai', 'custom'] }).expect(201);
        expect((await PlanRequest.findOne().lean())?.packages).toEqual(['custom', 'ai']);
    });

    it('takes each package once', async () => {
        await send({ ...PLAN, packages: ['automation', 'automation', 'website'] }).expect(201);
        expect((await PlanRequest.findOne().lean())?.packages).toEqual(['website', 'automation']);
    });

    it('treats a language it does not know as English', async () => {
        await send({ ...PLAN, locale: 'fr' }).expect(201);
        expect((await PlanRequest.findOne().lean())?.locale).toBe('en');
    });

    it.each([
        ['no packages', { packages: [] }, 'Pick at least one package.'],
        ['packages that are not a list', { packages: 'website' }, 'Pick at least one package.'],
        ['a package that does not exist', { packages: ['website', 'seo'] }, 'packages can only be: website, growth, automation, custom, ai.'],
        ['an operator object for a package', { packages: [{ $ne: null }] }, 'packages can only be: website, growth, automation, custom, ai.'],
        ['no name', { name: '  ' }, 'name is missing.'],
        ['no email', { email: undefined }, 'email is missing.'],
        ['an email that is not one', { email: 'maria at example' }, 'email has to be an email address.'],
        ['an operator object for an email', { email: { $ne: null } }, 'email has to be text.'],
        ['a phone that is not text', { phone: 7185550100 }, 'phone has to be text.'],
        ['a name that is too long', { name: 'x'.repeat(PLAN_LIMITS.name + 1) }, `name has to be ${PLAN_LIMITS.name} characters at most.`],
        ['a message that is too long', { message: 'x'.repeat(PLAN_LIMITS.message + 1) }, `message has to be ${PLAN_LIMITS.message} characters at most.`]
    ])('refuses %s', async (_case, change, error) => {
        await send({ ...PLAN, ...change }).expect(400, { error });
        expect(await PlanRequest.countDocuments()).toBe(0);
    });

    it('answers a bot that filled in the hidden field like a person, and saves nothing', async () => {
        await send({ ...PLAN, homepage: 'https://spam.example.com' }).expect(201, { ok: true });
        expect(await PlanRequest.countDocuments()).toBe(0);
    });

    it(`stops after ${PLANS_PER_EMAIL_PER_DAY} plans a day from the same address, and only that address`, async () => {
        await PlanRequest.insertMany(Array.from({ length: PLANS_PER_EMAIL_PER_DAY }, () => ({ ...PLAN, email: 'maria@example.com' })));

        // a different spelling of the same address still counts as the same address
        await send({ ...PLAN, email: ' MARIA@example.com ' }).expect(429);
        await send({ ...PLAN, email: 'someone.else@example.com' }).expect(201);
    });

    it(`stops everyone after ${PLANS_PER_DAY} plans in a day, and counts only the last 24 hours`, async () => {
        await PlanRequest.insertMany(Array.from({ length: PLANS_PER_DAY }, (_unused, i) => ({ ...PLAN, email: `person${i}@example.com`, createdAt: daysAgo(2) })));
        await send(PLAN).expect(201);

        await PlanRequest.insertMany(Array.from({ length: PLANS_PER_DAY }, (_unused, i) => ({ ...PLAN, email: `today${i}@example.com` })));
        const res = await send({ ...PLAN, email: 'one.more@example.com' }).expect(429);
        expect(res.body).toEqual({ error: 'We have had a lot of requests today. Call or email us and we will get right back to you.' });
    });
});

describe('/api/admin/plans', () => {
    let adminBrowser: Agent;
    let clientBrowser: Agent;

    beforeEach(async () => {
        [adminBrowser, clientBrowser] = await Promise.all([signIn(await makeAdmin()), signIn(await makeClient())]);
    });

    it('is closed to anyone signed out, and to a client', async () => {
        await send(PLAN).expect(201);
        await request(app).get('/api/admin/plans').expect(401);
        await clientBrowser.get('/api/admin/plans').expect(403, { error: 'Only GradientV can do that.' });
    });

    it('shows the admin every plan, newest first, with every field', async () => {
        await PlanRequest.create([
            { ...PLAN, email: 'older@example.com', createdAt: daysAgo(2) },
            { packages: ['automation'] as PackageId[], name: 'Sam', email: 'sam@example.com', createdAt: daysAgo(1) }
        ]);

        const res = await adminBrowser.get('/api/admin/plans').expect(200);
        expect(res.body).toEqual([
            {
                id: expect.any(String),
                packages: ['automation'],
                name: 'Sam',
                email: 'sam@example.com',
                phone: null,
                businessName: null,
                businessType: null,
                message: null,
                locale: 'en',
                status: 'new',
                createdAt: expect.any(String)
            },
            expect.objectContaining({ name: 'Maria Santos', email: 'older@example.com', packages: ['growth', 'website'] })
        ]);
    });

    describe('PATCH /api/admin/plans/:id', () => {
        let planId: string;

        beforeEach(async () => {
            await send(PLAN).expect(201);
            const res = await adminBrowser.get('/api/admin/plans').expect(200);
            planId = (res.body as PlanJSON[])[0].id;
        });

        it('moves a plan along for the admin', async () => {
            const res = await adminBrowser.patch(`/api/admin/plans/${planId}`).send({ status: 'in progress' }).expect(200);
            expect(res.body).toMatchObject({ id: planId, status: 'in progress', name: 'Maria Santos' });
            expect((await PlanRequest.findById(planId).lean())?.status).toBe('in progress');
        });

        it('is closed to a client', async () => {
            await clientBrowser.patch(`/api/admin/plans/${planId}`).send({ status: 'done' }).expect(403);
            expect((await PlanRequest.findById(planId).lean())?.status).toBe('new');
        });

        it.each([
            ['a status that is not one of the three', 'archived'],
            ['an operator object', { $ne: null }]
        ])('refuses %s', async (_case, status) => {
            await adminBrowser.patch(`/api/admin/plans/${planId}`).send({ status }).expect(400, { error: 'The status has to be one of: new, in progress, done.' });
        });

        it('answers 404 for a plan that is not there', async () => {
            await adminBrowser.patch(`/api/admin/plans/${new Types.ObjectId().toString()}`).send({ status: 'done' }).expect(404);
        });
    });
});

describe('telling Slack about a new plan', () => {
    const WEBHOOK = 'https://hooks.example.com/services/test';

    it('posts the plan to Slack with the words made harmless', async () => {
        vi.stubEnv('SLACK_WEBHOOK_URL', WEBHOOK);
        const slack = vi.fn<typeof fetch>(() => Promise.resolve(new Response(null, { status: 200 })));
        vi.stubGlobal('fetch', slack);

        await send({ ...PLAN, message: '<!channel> call me & soon' }).expect(201);

        expect(slack).toHaveBeenCalledOnce();
        const [url, init] = slack.mock.calls[0];
        expect(url).toBe(WEBHOOK);
        expect(JSON.parse(String(init?.body))).toEqual({
            text: [
                'New plan request from *Maria Santos (Example Cafe)*',
                'Packages: Website &amp; Brand, Growth',
                'Email: maria@example.com, phone: (718) 555-0100',
                'Business: Cafe',
                '&lt;!channel&gt; call me &amp; soon'
            ].join('\n')
        });
    });

    it('still saves the plan when Slack is down', async () => {
        vi.stubEnv('SLACK_WEBHOOK_URL', WEBHOOK);
        vi.stubGlobal('fetch', vi.fn<typeof fetch>(() => Promise.reject(new Error('Slack is down'))));
        const log = vi.spyOn(console, 'error').mockImplementation(() => undefined);

        await send(PLAN).expect(201);
        expect(await PlanRequest.countDocuments()).toBe(1);
        expect(log).toHaveBeenCalledWith('Could not reach Slack: Slack is down');
    });
});
