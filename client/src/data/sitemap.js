// builds sitemap.xml at build time from the page list in pages.js, so it can't go out of date.
// every page search engines should find, in every language it exists in, with its other
// languages listed beside it (the same thing the hreflang links in each page's <head> say).
// scripts/prerender.js writes the result to dist/sitemap.xml
import { CONTENT } from '../content/index.js';
import { PAGES, pageUrl } from './pages.js';

export function buildSitemap() {
    const entries = PAGES.filter((page) => !page.noindex).flatMap((page) =>
        page.locales.map((code) => {
            const alternates = page.locales.length > 1
                ? [
                    ...page.locales.map((other) => `    <xhtml:link rel="alternate" hreflang="${CONTENT[other].hreflang}" href="${pageUrl(page.id, other)}"/>`),
                    `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(page.id, 'en')}"/>`
                ]
                : [];

            return [
                '  <url>',
                `    <loc>${pageUrl(page.id, code)}</loc>`,
                `    <lastmod>${page.updated}</lastmod>`,
                ...alternates,
                '  </url>'
            ].join('\n');
        })
    );

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...entries,
        '</urlset>',
        ''
    ].join('\n');
}
