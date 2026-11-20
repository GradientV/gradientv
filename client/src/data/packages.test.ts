// the links from the home page's package cards to Build your plan
import { describe, expect, it } from 'vitest';
import { packagesFromQuery } from './packages';

describe('packagesFromQuery', () => {
    it('reads one package or several', () => {
        expect(packagesFromQuery('growth')).toEqual(['growth']);
        expect(packagesFromQuery('custom,website')).toEqual(['website', 'custom']);
    });

    it('ignores what is not a package, repeats and spaces', () => {
        expect(packagesFromQuery('seo, automation,automation,')).toEqual(['automation']);
    });

    it('is empty when there is nothing to read', () => {
        expect(packagesFromQuery(null)).toEqual([]);
        expect(packagesFromQuery('')).toEqual([]);
    });
});
