// runs at the top of every test file, before the file itself. it makes sure that:
//   the API only ever sees the test database, whatever this terminal has set
//   nothing goes out to Slack or Vercel
//   the database it connected to really is the test one, before anything is written
//   every test starts from an empty database, so none depends on what another left behind
import mongoose from 'mongoose';
import { afterAll, beforeAll, beforeEach, vi } from 'vitest';
import { connectDatabase } from '../src/db.js';
import { assertTestDatabase, TEST_DATABASE_URI } from './database.js';

// src/db.ts reads this when it first connects, which is after this line
process.env.MONGODB_URI = TEST_DATABASE_URI;
// the session cookie is only marked Secure in production, and supertest talks plain http.
// sessions.test.ts switches to production on purpose, for the one test that checks Secure
process.env.NODE_ENV = 'test';
// with these empty, a new request doesn't message Slack and the stats don't ask Vercel
delete process.env.SLACK_WEBHOOK_URL;
delete process.env.VERCEL_TOKEN;

async function emptyTestDatabase(): Promise<void> {
    assertTestDatabase(mongoose.connection);
    await Promise.all(Object.values(mongoose.connection.collections).map((collection) => collection.deleteMany({})));
}

beforeAll(async () => {
    const { connection } = await connectDatabase();
    assertTestDatabase(connection);
    // every index (the unique ones too) is built before the first test, not halfway through one
    await Promise.all(Object.values(connection.models).map((model) => model.init()));
});

beforeEach(async () => {
    // and in case something tries anyway, fetch fails here instead of going out to the internet.
    // a test that needs fetch (the Slack ones) puts its own in, and this comes back after it
    vi.stubGlobal('fetch', () => Promise.reject(new Error('The tests never reach the internet.')));
    await emptyTestDatabase();
});

afterAll(async () => {
    await mongoose.disconnect();
});
