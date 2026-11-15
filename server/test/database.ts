// the one place the tests' database is named
// it's a database of its own on the MongoDB on this computer, so the tests can wipe it as
// often as they like. nothing else is ever touched: not gradientv (the one `npm run dev`
// uses), and not the live one on Atlas. nothing in test/ reads server/.env or .env.production
export const TEST_DATABASE = 'gradientv-test';
export const TEST_DATABASE_URI = `mongodb://127.0.0.1:27017/${TEST_DATABASE}`;

const THIS_COMPUTER = ['127.0.0.1', 'localhost'];

/** throws unless the connection is to the test database on this computer. checked before anything is written or wiped */
export function assertTestDatabase(connection: { host: string; name: string }): void {
    if (connection.name !== TEST_DATABASE || !THIS_COMPUTER.includes(connection.host)) {
        throw new Error(`The tests only run against ${TEST_DATABASE_URI}, never ${connection.host}/${connection.name}.`);
    }
}
