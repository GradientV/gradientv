// the admin's list of clients: what the "view as" menu is made from
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { inviteAccount } from '../src/services/accounts.js';
import { app, idOf, makeAdmin, makeClient, signIn, siteKeyFor } from './helpers.js';

describe('GET /api/admin/clients', () => {
    it('is a 401 when signed out', async () => {
        await request(app).get('/api/admin/clients').expect(401, { error: 'Sign in to see this.' });
    });

    it('is a 403 for a client', async () => {
        const browser = await signIn(await makeClient());
        await browser.get('/api/admin/clients').expect(403, { error: 'Only GradientV can do that.' });
    });

    it('lists every client by name for the admin, with no admins and nothing secret in it', async () => {
        const admin = await makeAdmin('admin@example.com');
        await makeAdmin('partner@example.com');
        const dental = await makeClient('Maple Dental', 'maple@example.com');
        const bakery = await makeClient('Example Bakery', 'bakery@example.com');
        await siteKeyFor(bakery);
        // invited, but hasn't picked a password yet
        const { account: books } = await inviteAccount({ businessName: 'Harbor Books', email: 'harbor@example.com' });

        const res = await (await signIn(admin)).get('/api/admin/clients').expect(200);
        // toEqual fails on any field that isn't listed here, so a password or key hash would show up
        expect(res.body).toEqual([
            { id: idOf(bakery), businessName: 'Example Bakery', email: 'bakery@example.com', role: 'client', siteSendsData: true, hasSignedUp: true },
            { id: idOf(books), businessName: 'Harbor Books', email: 'harbor@example.com', role: 'client', siteSendsData: false, hasSignedUp: false },
            { id: idOf(dental), businessName: 'Maple Dental', email: 'maple@example.com', role: 'client', siteSendsData: false, hasSignedUp: true }
        ]);
    });
});
