// signing in: what a right and a wrong try get back, the pause after five wrong
// passwords, and that only plain text ever reaches the database query
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { Account, type AccountDocument } from '../src/models/Account.js';
import { Session } from '../src/models/Session.js';
import { inviteAccount } from '../src/services/accounts.js';
import { app, idOf, makeClient, PASSWORD, sessionCookieOf, signIn } from './helpers.js';

const NO_MATCH = { error: 'That email and password do not match.' };
const PAUSED = { error: 'Too many wrong passwords. Try again in 15 minutes.' };

function login(body: object) {
    return request(app).post('/api/auth/login').send(body);
}

describe('POST /api/auth/login', () => {
    let client: AccountDocument;

    beforeEach(async () => {
        client = await makeClient('Example Bakery', 'owner@example.com');
    });

    it('signs in with the right email and password, and sends back nothing secret', async () => {
        const res = await login({ email: 'owner@example.com', password: PASSWORD }).expect(200);
        expect(res.body).toEqual({
            id: idOf(client),
            businessName: 'Example Bakery',
            email: 'owner@example.com',
            role: 'client',
            siteSendsData: false
        });
        expect(sessionCookieOf(res)?.value).toBeTruthy();
    });

    it('does not mind capitals or spaces around the email', async () => {
        await login({ email: '  Owner@Example.COM ', password: PASSWORD }).expect(200);
    });

    it('gives a wrong email the same answer as a wrong password', async () => {
        const wrongEmail = await login({ email: 'someone-else@example.com', password: PASSWORD }).expect(401);
        const wrongPassword = await login({ email: 'owner@example.com', password: 'not the password' }).expect(401);

        expect(wrongEmail.body).toEqual(NO_MATCH);
        expect(wrongPassword.body).toEqual(NO_MATCH);
        expect(sessionCookieOf(wrongPassword)).toBeUndefined();
        expect(await Session.countDocuments()).toBe(0);
    });

    it('lets nobody into a login that has not picked a password yet', async () => {
        await inviteAccount({ businessName: 'Example Florist', email: 'florist@example.com' });

        for (const password of ['', 'any password at all']) {
            const res = await login({ email: 'florist@example.com', password }).expect(401);
            expect(res.body).toEqual(NO_MATCH);
        }
    });

    it.each([
        ['an operator object as the email', { email: { $ne: null }, password: PASSWORD }],
        ['an operator object as the password', { email: 'owner@example.com', password: { $ne: null } }],
        ['a list as the email', { email: ['owner@example.com'], password: PASSWORD }],
        ['no email at all', { password: PASSWORD }]
    ])('turns away %s with a 400 before it reaches the database (NoSQL injection)', async (_case, body) => {
        const res = await login(body).expect(400);
        expect(res.body).toEqual({ error: 'Send an email and a password.' });
    });

    describe('after wrong passwords', () => {
        async function wrongPasswords(count: number): Promise<void> {
            for (let i = 0; i < count; i += 1) {
                await login({ email: 'owner@example.com', password: `wrong guess ${i}` }).expect(401, NO_MATCH);
            }
        }

        it('pauses the account after 5 in a row, even for the right password', async () => {
            await wrongPasswords(5);

            const res = await login({ email: 'owner@example.com', password: PASSWORD }).expect(429);
            expect(res.body).toEqual(PAUSED);
            expect(sessionCookieOf(res)).toBeUndefined();
        });

        it('only counts wrong passwords in a row: signing in starts the count over', async () => {
            await wrongPasswords(4);
            await login({ email: 'owner@example.com', password: PASSWORD }).expect(200);
            await wrongPasswords(4);
            await login({ email: 'owner@example.com', password: PASSWORD }).expect(200);
        });

        it('lets them back in once the 15 minutes are up', async () => {
            await wrongPasswords(5);
            await login({ email: 'owner@example.com', password: PASSWORD }).expect(429);

            // wind the clock forward by moving the pause into the past
            await Account.updateOne({ _id: client._id }, { lockedUntil: new Date(Date.now() - 1000) });
            await login({ email: 'owner@example.com', password: PASSWORD }).expect(200);
        });
    });
});

describe('GET /api/auth/me', () => {
    it('says who is signed in', async () => {
        const client = await makeClient('Example Bakery', 'owner@example.com');
        const browser = await signIn(client);

        const res = await browser.get('/api/auth/me').expect(200);
        expect(res.body).toMatchObject({ id: idOf(client), email: 'owner@example.com', role: 'client' });
    });

    it('is a 401 when signed out', async () => {
        const res = await request(app).get('/api/auth/me').expect(401);
        expect(res.body).toEqual({ error: 'Sign in to see this.' });
    });
});
