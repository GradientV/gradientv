// the session cookie: how it's set, what the database keeps of it, and signing out
import { createHash } from 'node:crypto';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Session } from '../src/models/Session.js';
import { app, makeClient, PASSWORD, sessionCookieOf, signIn } from './helpers.js';

const THIRTY_DAYS_IN_SECONDS = 30 * 24 * 60 * 60;

/** signs in the way a browser would, and returns the session cookie that came back */
async function signInForCookie() {
    const res = await request(app).post('/api/auth/login').send({ email: 'owner@example.com', password: PASSWORD }).expect(200);
    const cookie = sessionCookieOf(res);
    if (cookie === undefined) throw new Error('Signing in did not set the session cookie.');
    return cookie;
}

beforeEach(async () => {
    await makeClient('Example Bakery', 'owner@example.com');
});

describe('the session cookie', () => {
    it('is httpOnly and SameSite=Lax, for the whole site, for 30 days', async () => {
        const { attributes } = await signInForCookie();
        expect(attributes).toMatchObject({
            httponly: true,
            samesite: 'Lax',
            path: '/',
            'max-age': String(THIRTY_DAYS_IN_SECONDS)
        });
        // plain http on this computer, so not Secure here
        expect(attributes.secure).toBeUndefined();
    });

    it('is Secure as well in production, so it only ever travels over https', async () => {
        vi.stubEnv('NODE_ENV', 'production');
        const { attributes } = await signInForCookie();
        expect(attributes).toMatchObject({ httponly: true, samesite: 'Lax', secure: true });
    });

    it('holds a random token that the database keeps only a SHA-256 hash of', async () => {
        const { value } = await signInForCookie();
        const sessions = await Session.find().lean();

        expect(value).toMatch(/^[\w-]{43}$/);
        expect(sessions).toHaveLength(1);
        expect(sessions[0].tokenHash).toBe(createHash('sha256').update(value).digest('hex'));
        expect(JSON.stringify(sessions)).not.toContain(value);
    });

    it('stops working once the session runs out', async () => {
        const { value } = await signInForCookie();
        await request(app).get('/api/auth/me').set('Cookie', `gv_session=${value}`).expect(200);

        // MongoDB only sweeps expired sessions about once a minute, so the API has to check the date itself
        await Session.updateMany({}, { expiresAt: new Date(Date.now() - 1000) });
        await request(app).get('/api/auth/me').set('Cookie', `gv_session=${value}`).expect(401);
    });

    it('means nothing if it was never handed out', async () => {
        await request(app).get('/api/auth/me').set('Cookie', 'gv_session=made-up-token').expect(401);
    });
});

describe('POST /api/auth/logout', () => {
    it('ends the session on the server, so a saved copy of the cookie stops working too', async () => {
        const { value } = await signInForCookie();
        const cookie = `gv_session=${value}`;
        await request(app).get('/api/auth/me').set('Cookie', cookie).expect(200);

        const res = await request(app).post('/api/auth/logout').set('Cookie', cookie).expect(204);
        // the browser is told to forget the cookie...
        expect(sessionCookieOf(res)).toEqual({
            value: '',
            attributes: { path: '/', expires: 'Thu, 01 Jan 1970 00:00:00 GMT', httponly: true, samesite: 'Lax' }
        });
        // ...and one kept anyway gets nowhere, because the session it pointed to is gone
        await request(app).get('/api/auth/me').set('Cookie', cookie).expect(401);
        expect(await Session.countDocuments()).toBe(0);
    });

    it('only signs out the browser it came from', async () => {
        const client = { email: 'owner@example.com' };
        const laptop = await signIn(client);
        const phone = await signIn(client);

        await laptop.post('/api/auth/logout').expect(204);
        await laptop.get('/api/auth/me').expect(401);
        await phone.get('/api/auth/me').expect(200);
    });

    it('is fine with a browser that was not signed in', async () => {
        await request(app).post('/api/auth/logout').expect(204);
    });
});
