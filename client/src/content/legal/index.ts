// the legal documents: three documents, each in three languages.
// every file exports the text as a component (default) and a meta object
// { title, description, label, heading, updated }, so LEGAL.privacy.es has both
import * as privacyEn from './privacy.en';
import * as privacyEs from './privacy.es';
import * as privacyZh from './privacy.zh';
import * as termsEn from './terms.en';
import * as termsEs from './terms.es';
import * as termsZh from './terms.zh';
import * as accessibilityEn from './accessibility.en';
import * as accessibilityEs from './accessibility.es';
import * as accessibilityZh from './accessibility.zh';

export const LEGAL = {
    privacy: { en: privacyEn, es: privacyEs, zh: privacyZh },
    terms: { en: termsEn, es: termsEs, zh: termsZh },
    accessibility: { en: accessibilityEn, es: accessibilityEs, zh: accessibilityZh }
};

/** which document: 'privacy' | 'terms' | 'accessibility' */
export type LegalDoc = keyof typeof LEGAL;
