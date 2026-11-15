// what the test files share: the app, the people in the tests, and signing them in
import bcrypt from 'bcryptjs';
import type { Types } from 'mongoose';
import request, { type Agent, type Response } from 'supertest';
import type { Role } from '../../shared/portal.js';
import { createApp } from '../src/app.js';
import { Account, type AccountDocument } from '../src/models/Account.js';
import { giveSiteKey } from '../src/services/accounts.js';

/** the real app, the same one api/index.ts hands to Vercel, just without the request log */
export const app = createApp({ logRequests: false });

/** the password of every login the tests make */
export const PASSWORD = 'correct horse battery staple';

// the app hashes at cost 12 (src/services/passwords.ts), about a quarter second each time.
// bcrypt reads the cost from the hash it compares against, so signing in against a cost-4
// hash goes down exactly the same path, just fast enough to do in every test
const PASSWORD_HASH = bcrypt.hashSync(PASSWORD, 4);

const DAY = 24 * 60 * 60 * 1000;
const SESSION_COOKIE = 'gv_session';

/** that many days back, for rows that need to look older than today */
export function daysAgo(days: number): Date {
    return new Date(Date.now() - days * DAY);
}

/** a login that has already picked its password (PASSWORD) */
export function makeAccount(fields: { businessName: string; email: string; role?: Role }): Promise<AccountDocument> {
    return Account.create({ ...fields, passwordHash: PASSWORD_HASH });
}

export function makeClient(businessName = 'Example Bakery', email = 'owner@example.com'): Promise<AccountDocument> {
    return makeAccount({ businessName, email });
}

export function makeAdmin(email = 'admin@example.com'): Promise<AccountDocument> {
    return makeAccount({ businessName: 'GradientV', email, role: 'admin' });
}

/** gives the account a site key the way `npm run site-key` does, and returns the key */
export async function siteKeyFor(account: { email: string }): Promise<string> {
    const { key } = await giveSiteKey(account.email);
    if (key === null) throw new Error(`${account.email} already has a site key.`);
    return key;
}

/** a browser signed in through the real sign-in route. supertest's agent keeps the cookie the way a browser would */
export async function signIn(account: { email: string }): Promise<Agent> {
    const browser = request.agent(app);
    await browser.post('/api/auth/login').send({ email: account.email, password: PASSWORD }).expect(200);
    return browser;
}

/** a document's id, written the way the API writes it */
export function idOf(document: { _id: Types.ObjectId }): string {
    return String(document._id);
}

type SetCookie = { value: string; attributes: Record<string, string | true> };

/**
 * the session cookie a response set, read out of its Set-Cookie header, or undefined when it set none.
 * 'gv_session=abc; Path=/; HttpOnly' comes out as { value: 'abc', attributes: { path: '/', httponly: true } }
 */
export function sessionCookieOf(response: Response): SetCookie | undefined {
    const header: unknown = response.headers['set-cookie'];
    const lines: unknown[] = Array.isArray(header) ? header : [header];
    const line = lines.find((item): item is string => typeof item === 'string' && item.startsWith(`${SESSION_COOKIE}=`));
    if (line === undefined) return undefined;

    const [pair, ...parts] = line.split('; ');
    const attributes: Record<string, string | true> = {};
    for (const part of parts) {
        const [name, ...value] = part.split('=');
        attributes[name.toLowerCase()] = value.length > 0 ? value.join('=') : true;
    }
    return { value: decodeURIComponent(pair.slice(SESSION_COOKIE.length + 1)), attributes };
}
