// invite links: the one-time link a new client, or one who forgot their password,
// uses to pick a password. it works once, and then never again
import bcrypt from 'bcryptjs';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { Account } from '../src/models/Account.js';
import { inviteAccount } from '../src/services/accounts.js';
import { app, makeClient, PASSWORD, sessionCookieOf, signIn } from './helpers.js';

const NEW_PASSWORD = 'a brand new password';
const LINK_GONE = { error: 'This link does not work anymore. Ask us for a new one.' };

function getInvite(token: unknown) {
    return request(app).post('/api/auth/invite').send({ token });
}

function setPassword(token: unknown, password: unknown) {
    return request(app).post('/api/auth/set-password').send({ token, password });
}

describe('an invite link', () => {
    let token: string;

    beforeEach(async () => {
        ({ token } = await inviteAccount({ businessName: 'Example Florist', email: 'florist@example.com' }));
    });

    it('tells the set-password page whose login it is, and nothing more', async () => {
        const res = await getInvite(token).expect(200);
        expect(res.body).toEqual({ businessName: 'Example Florist', email: 'florist@example.com' });
    });

    it('sets the password, signs the browser in, and then stops working', async () => {
        const browser = request.agent(app);
        const res = await browser.post('/api/auth/set-password').send({ token, password: NEW_PASSWORD }).expect(200);
        expect(res.body).toMatchObject({ businessName: 'Example Florist', email: 'florist@example.com', role: 'client' });
        expect(sessionCookieOf(res)?.attributes.httponly).toBe(true);
        await browser.get('/api/auth/me').expect(200);

        // used up: both routes now answer the same link with a 404
        await getInvite(token).expect(404, LINK_GONE);
        await setPassword(token, 'somebody else picks this').expect(404, LINK_GONE);

        // and the password it set is the one that signs in
        await request(app).post('/api/auth/login').send({ email: 'florist@example.com', password: NEW_PASSWORD }).expect(200);
    });

    it('keeps only a bcrypt hash of the new password, and no copy of the link', async () => {
        await setPassword(token, NEW_PASSWORD).expect(200);
        const account = await Account.findOne({ email: 'florist@example.com' }).lean();

        expect(account?.passwordHash).toMatch(/^\$2[aby]\$12\$/);
        expect(await bcrypt.compare(NEW_PASSWORD, account?.passwordHash ?? '')).toBe(true);
        expect(account?.inviteHash).toBeNull();
        expect(account?.inviteExpiresAt).toBeNull();
        expect(JSON.stringify(account)).not.toContain(NEW_PASSWORD);
        expect(JSON.stringify(account)).not.toContain(token);
    });

    it.each([
        ['under 10 characters', 'too short', 'Use at least 10 characters for the password.'],
        // 37 characters, but 74 bytes. bcrypt only reads 72, so the rest would quietly be ignored
        ['over 72 bytes', 'é'.repeat(37), 'That password is too long. Keep it under 72 characters.'],
        ['not text', { $ne: null }, 'Use at least 10 characters for the password.'],
        ['missing', undefined, 'Use at least 10 characters for the password.']
    ])('turns down a password that is %s with a 400, and the link still works after', async (_case, password, error) => {
        await setPassword(token, password).expect(400, { error });
        await getInvite(token).expect(200);
    });

    it.each([
        ['a wrong token', 'not-the-real-token'],
        ['an empty token', ''],
        ['an operator object (NoSQL injection)', { $ne: null }],
        ['no token at all', undefined]
    ])('answers %s with a 404', async (_case, wrongToken) => {
        await getInvite(wrongToken).expect(404, LINK_GONE);
        await setPassword(wrongToken, NEW_PASSWORD).expect(404, LINK_GONE);
    });

    it('stops working after its 7 days are up', async () => {
        await Account.updateOne({ email: 'florist@example.com' }, { inviteExpiresAt: new Date(Date.now() - 1000) });

        await getInvite(token).expect(404, LINK_GONE);
        await setPassword(token, NEW_PASSWORD).expect(404, LINK_GONE);
    });
});

describe('a fresh link for a forgotten password', () => {
    it('leaves the old password working until the link is used, then signs out every browser that had it', async () => {
        const client = await makeClient('Example Bakery', 'owner@example.com');
        const oldBrowser = await signIn(client);
        const { token } = await inviteAccount({ email: 'owner@example.com' });

        await oldBrowser.get('/api/auth/me').expect(200);
        await setPassword(token, NEW_PASSWORD).expect(200);

        await oldBrowser.get('/api/auth/me').expect(401);
        await request(app).post('/api/auth/login').send({ email: 'owner@example.com', password: PASSWORD }).expect(401);
        await request(app).post('/api/auth/login').send({ email: 'owner@example.com', password: NEW_PASSWORD }).expect(200);
    });
});
