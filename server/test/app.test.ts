// what every answer has in common: the health check, the { error } shape, and no caching
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { ChangeRequest } from '../src/models/ChangeRequest.js';
import { app, makeClient, signIn } from './helpers.js';

describe('the API as a whole', () => {
    it('says it is up, and so is the database', async () => {
        const res = await request(app).get('/api/health').expect(200);
        expect(res.body).toEqual({ ok: true, database: true });
    });

    it('answers an address it does not have with a 404 in the usual shape', async () => {
        const res = await request(app).get('/api/nothing-here').expect(404);
        expect(res.body).toEqual({ error: 'There is no GET /api/nothing-here' });
    });

    it('answers a body that is not JSON with a 400 that says so', async () => {
        const res = await request(app).post('/api/auth/login').set('Content-Type', 'application/json').send('{"email": ').expect(400);
        expect(res.body).toEqual({ error: 'That request body is not valid JSON.' });
    });

    it('tells browsers and Vercel never to keep a copy of an answer', async () => {
        const res = await request(app).get('/api/health');
        expect(res.headers['cache-control']).toBe('no-store');
    });

    it('keeps the details of a server error in the log and out of the answer', async () => {
        const browser = await signIn(await makeClient());
        const log = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        vi.spyOn(ChangeRequest, 'find').mockImplementation(() => {
            throw new Error('lost the connection to mongodb://db.example.com');
        });

        const res = await browser.get('/api/requests').expect(500);
        expect(res.body).toEqual({ error: 'Something went wrong on the server.' });
        expect(log).toHaveBeenCalledWith(expect.objectContaining({ message: 'lost the connection to mongodb://db.example.com' }));
    });
});
