// `npm test` runs both halves' tests, each with its own settings:
// server/vitest.config.ts (the API, against a test database) and client/vitest.config.ts (the website)
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        projects: ['server', 'client']
    }
});
