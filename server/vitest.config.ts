// the API's tests: real requests (supertest) to the real Express app (createApp), with a
// real MongoDB behind it. never the database `npm run dev` uses: test/database.ts names the
// tests' own, which gets emptied before every test and dropped once they're all done
import { defineConfig } from 'vitest/config';

export default defineConfig({
    // Vite would otherwise open server/.env looking for its own VITE_ settings. the tests never read it
    envDir: false,
    test: {
        name: 'server',
        include: ['test/**/*.test.ts'],
        // once around the whole run: start the test database empty, drop it at the end
        globalSetup: ['test/globalSetup.ts'],
        // at the top of every file: point at the test database, connect, empty it between tests
        setupFiles: ['test/setup.ts'],
        // every file uses that one database, so they take turns instead of running at the same time
        fileParallelism: false,
        // whatever a test swaps out (an env var, fetch, console.error) is put back before the next one
        unstubEnvs: true,
        unstubGlobals: true,
        restoreMocks: true
    }
});
