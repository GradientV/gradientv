// sitemap.xml is built from the page list at build time, so these check the list and the builder together
import { describe, expect, it } from 'vitest';
import { PAGES, pageUrl } from './pages';
import { buildSitemap } from './sitemap';

const sitemap = buildSitemap();
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

describe('buildSitemap', () => {
    it('lists every public page once in every language it has', () => {
        const expected = PAGES.filter((page) => !page.noindex).flatMap((page) => page.locales.map((code) => pageUrl(page.id, code)));
        expect(locs).toEqual(expected);
    });

    it('leaves out the pages search engines should not show, like the sign-in page and the portal', () => {
        expect(locs).not.toContain(pageUrl('login'));
        expect(locs).not.toContain(pageUrl('portal'));
    });

    it('gives every page a real last-changed date', () => {
        const dates = [...sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map((match) => match[1]);
        expect(dates).toHaveLength(locs.length);
        for (const date of dates) expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
});
