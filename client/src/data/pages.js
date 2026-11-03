// every page the site has, in one list.
// App.jsx builds the routes from it, Seo.jsx builds the canonical + language
// links from it, and scripts/prerender.js writes one HTML file per page from it.
//
// adding a page: one line here, one view in src/views, and one entry in VIEWS (App.jsx).
// sitemap.xml and llms.txt are built from this list (src/data/sitemap.js, src/data/llms.js),
// so a new page shows up in them by itself.
//
// updated = the day the page's words last changed in a way that matters. it becomes
// the page's <lastmod> in the sitemap, which search engines use to decide when to
// look again. bump it when you change what a page says, not for a restyle

import { SITE_URL } from './site.js';

/** the three languages. the language is whatever the URL starts with */
export const LOCALES = [
    { code: 'en', base: '' },
    { code: 'es', base: '/es' },
    { code: 'zh', base: '/zh' }
];

const ALL = LOCALES.map((locale) => locale.code);

export const PAGES = [
    { id: 'home', path: '', locales: ALL, updated: '2026-11-03' },
    { id: 'story', path: '/story', locales: ALL, updated: '2026-10-04' },
    { id: 'team', path: '/team', locales: ALL, updated: '2026-11-03' },
    { id: 'contact', path: '/contact', locales: ALL, updated: '2026-11-03' },
    // nothing to find on a sign-in form, so it stays out of search results.
    // auth: the page needs to know who is signed in, so App.jsx puts it inside the AuthProvider
    { id: 'login', path: '/login', locales: ALL, noindex: true, auth: true },
    // where an invite link lands, and the portal itself. English only for now
    { id: 'setPassword', path: '/set-password', locales: ['en'], noindex: true, auth: true },
    { id: 'portal', path: '/portal', locales: ['en'], noindex: true, auth: true },
    { id: 'privacy', path: '/privacy', locales: ALL, updated: '2026-10-04' },
    { id: 'terms', path: '/terms', locales: ALL, updated: '2026-10-04' },
    { id: 'accessibility', path: '/accessibility', locales: ALL, updated: '2026-10-04' },
    // not in the nav. the page still works if you know the link
    { id: 'videos', path: '/videos', locales: ['en'], noindex: true }
];

/** pagePath('story', 'es') is '/es/story', and the English home is '/' */
export function pagePath(pageId, localeCode = 'en') {
    const page = PAGES.find((candidate) => candidate.id === pageId);
    const locale = LOCALES.find((candidate) => candidate.code === localeCode);
    return `${locale.base}${page.path}` || '/';
}

/** the full address, for the tags that need one: pageUrl('story', 'es') is 'https://gradientv.com/es/story' */
export function pageUrl(pageId, localeCode = 'en') {
    return `${SITE_URL}${pagePath(pageId, localeCode)}`;
}

/** '/zh/story' is 'zh'. anything that isn't /es or /zh is English */
export function localeFromPath(pathname) {
    const match = LOCALES.find(
        (locale) => locale.base && (pathname === locale.base || pathname.startsWith(`${locale.base}/`))
    );
    return match?.code ?? 'en';
}

/** which page a URL is, or null. used by the footer to keep you on the same page when you switch language */
export function pageFromPath(pathname) {
    const localeCode = localeFromPath(pathname);
    const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
    return PAGES.find((page) => page.locales.includes(localeCode) && pagePath(page.id, localeCode) === clean) ?? null;
}
