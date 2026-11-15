// runs once around the whole test run, outside the test files:
// drops the test database before the first file (in case an earlier run was cut short)
// and again after the last one, so nothing from the tests stays behind
import mongoose from 'mongoose';
import { messageOf } from '../src/middleware/errorHandlers.js';
import { assertTestDatabase, TEST_DATABASE_URI } from './database.js';

async function dropTestDatabase(): Promise<void> {
    const connection = mongoose.createConnection(TEST_DATABASE_URI, { serverSelectionTimeoutMS: 5000 });
    try {
        await connection.asPromise();
        // checked again right before the drop. this must only ever be the test database
        assertTestDatabase(connection);
        await connection.dropDatabase();
    } finally {
        await connection.close();
    }
}

export async function setup(): Promise<void> {
    try {
        await dropTestDatabase();
    } catch (error) {
        throw new Error(`The server tests need MongoDB running on this computer (${TEST_DATABASE_URI}): ${messageOf(error)}`);
    }
}

export async function teardown(): Promise<void> {
    await dropTestDatabase();
}
