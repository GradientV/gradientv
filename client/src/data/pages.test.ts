// the page list's helpers: every link, canonical tag and language switch on the site is built from these
import { describe, expect, it } from 'vitest';
import { localeFromPath, pageFromPath, pagePath, pageUrl } from './pages';

describe('pagePath', () => {
    it('puts the language in front of the page, and English has none', () => {
        expect(pagePath('story')).toBe('/story');
        expect(pagePath('story', 'es')).toBe('/es/story');
        expect(pagePath('team', 'zh')).toBe('/zh/team');
    });

    it('makes the English home page / and the others /es and /zh', () => {
        expect(pagePath('home')).toBe('/');
        expect(pagePath('home', 'es')).toBe('/es');
        expect(pagePath('home', 'zh')).toBe('/zh');
    });
});

describe('pageUrl', () => {
    it('is the full address on gradientv.com', () => {
        expect(pageUrl('home')).toBe('https://gradientv.com/');
        expect(pageUrl('contact', 'es')).toBe('https://gradientv.com/es/contact');
    });
});

describe('localeFromPath', () => {
    it.each([
        ['/', 'en'],
        ['/story', 'en'],
        ['/es', 'es'],
        ['/es/', 'es'],
        ['/es/story', 'es'],
        ['/zh/team', 'zh'],
        // only starts with the same letters, so still English
        ['/estonia', 'en'],
        ['/zhong', 'en']
    ])('reads %s as %s', (path, locale) => {
        expect(localeFromPath(path)).toBe(locale);
    });
});

describe('pageFromPath', () => {
    it('finds the page in any language, with or without a slash at the end', () => {
        expect(pageFromPath('/')?.id).toBe('home');
        expect(pageFromPath('/es/')?.id).toBe('home');
        expect(pageFromPath('/es/story/')?.id).toBe('story');
        expect(pageFromPath('/zh/contact')?.id).toBe('contact');
    });

    it('is null for a page that does not exist in that language, or at all', () => {
        // the portal is English only
        expect(pageFromPath('/portal')?.id).toBe('portal');
        expect(pageFromPath('/es/portal')).toBeNull();
        expect(pageFromPath('/no-such-page')).toBeNull();
    });
});
