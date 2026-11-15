// the website's tests. they only test plain functions, so they run in Node without
// the React and Tailwind plugins from vite.config.ts (Vitest reads this file instead of that one)
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        name: 'client',
        include: ['src/**/*.test.ts']
    }
});
