// the three languages, looked up by code: CONTENT.es.nav.story
import type { LocaleCode } from '../data/pages';
import en from './en';
import es from './es';
import zh from './zh';

/** every word on the site in one language. English sets the shape, and es.ts and zh.ts must match it key for key */
export type Content = Omit<typeof en, 'code'> & { code: LocaleCode };

export const CONTENT: Record<LocaleCode, Content> = { en, es, zh };
