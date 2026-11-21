// every page the site has, in one list.
// App.tsx builds the routes from it, Seo.tsx builds the canonical + language
// links from it, and scripts/prerender.ts writes one HTML file per page from it.
//
// adding a page: one line here, one view in src/views, and one entry in VIEWS (App.tsx).
// sitemap.xml and llms.txt are built from this list (src/data/sitemap.ts, src/data/llms.ts),
// so a new page shows up in them by itself.
//
// updated = the day the page's words last changed in a way that matters. it becomes
// the page's <lastmod> in the sitemap, which search engines use to decide when to
// look again. bump it when you change what a page says, not for a restyle

import { SITE_URL } from './site';

export type LocaleCode = 'en' | 'es' | 'zh';

/** the three languages. the language is whatever the URL starts with */
export const LOCALES: ReadonlyArray<{ code: LocaleCode; base: string }> = [
    { code: 'en', base: '' },
    { code: 'es', base: '/es' },
    { code: 'zh', base: '/zh' }
];

const ALL = LOCALES.map((locale) => locale.code);

const PAGE_LIST = [
    { id: 'home', path: '', locales: ALL, updated: '2026-11-21' },
    // pick packages and send a plan request (POST /api/plan)
    { id: 'plan', path: '/plan', locales: ALL, updated: '2026-11-21' },
    { id: 'story', path: '/story', locales: ALL, updated: '2026-11-21' },
    // hidden for now: with no languages it gets no route, no HTML file and no sitemap entry.
    // to bring it back: set locales to ALL, restore the people (src/data/team.ts and team.members in src/content),
    // their photos, and the links in Header.tsx, Footer.tsx and StoryView.tsx
    { id: 'team', path: '/team', locales: [], noindex: true },
    { id: 'contact', path: '/contact', locales: ALL, updated: '2026-11-20' },
    // nothing to find on a sign-in form, so it stays out of search results.
    // auth: the page needs to know who is signed in, so App.tsx puts it inside the AuthProvider
    { id: 'login', path: '/login', locales: ALL, noindex: true, auth: true },
    // where an invite link lands, and the portal itself. English only for now
    { id: 'setPassword', path: '/set-password', locales: ['en'], noindex: true, auth: true },
    { id: 'portal', path: '/portal', locales: ['en'], noindex: true, auth: true },
    { id: 'privacy', path: '/privacy', locales: ALL, updated: '2026-11-21' },
    { id: 'terms', path: '/terms', locales: ALL, updated: '2026-10-04' },
    { id: 'accessibility', path: '/accessibility', locales: ALL, updated: '2026-10-04' },
    // hidden for now, the same way as team. its video files are out of client/public too
    { id: 'videos', path: '/videos', locales: [], noindex: true }
] as const;

/** every page's id: 'home' | 'story' | ... a typo in a link is an error, not a dead page */
export type PageId = (typeof PAGE_LIST)[number]['id'];

export type Page = {
    id: PageId;
    path: string;
    locales: readonly LocaleCode[];
    updated?: string;
    noindex?: boolean;
    auth?: boolean;
};

export const PAGES: readonly Page[] = PAGE_LIST;

/** pagePath('story', 'es') is '/es/story', and the English home is '/' */
export function pagePath(pageId: PageId, localeCode: LocaleCode = 'en'): string {
    const page = PAGES.find((candidate) => candidate.id === pageId);
    const locale = LOCALES.find((candidate) => candidate.code === localeCode);
    if (!page || !locale) throw new Error(`There is no page ${pageId} in ${localeCode}.`);
    return `${locale.base}${page.path}` || '/';
}

/** the full address, for the tags that need one: pageUrl('story', 'es') is 'https://gradientv.com/es/story' */
export function pageUrl(pageId: PageId, localeCode: LocaleCode = 'en'): string {
    return `${SITE_URL}${pagePath(pageId, localeCode)}`;
}

/** '/zh/story' is 'zh'. anything that isn't /es or /zh is English */
export function localeFromPath(pathname: string): LocaleCode {
    const match = LOCALES.find(
        (locale) => locale.base && (pathname === locale.base || pathname.startsWith(`${locale.base}/`))
    );
    return match?.code ?? 'en';
}

/** which page a URL is, or null. used by the footer to keep you on the same page when you switch language */
export function pageFromPath(pathname: string): Page | null {
    const localeCode = localeFromPath(pathname);
    const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
    return PAGES.find((page) => page.locales.includes(localeCode) && pagePath(page.id, localeCode) === clean) ?? null;
}
