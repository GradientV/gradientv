// privacy, terms and accessibility all use this one view.
// doc says which document, the language comes from the URL, and the text
// itself is in src/content/legal. its paragraphs are styled by .legal in gradientv.css
import PageHero from '../components/PageHero.jsx';
import Seo from '../components/Seo.jsx';
import UnderBand from '../components/UnderBand.jsx';
import { useLocale } from '../context/LocaleContext.jsx';
import { LEGAL } from '../content/legal/index.js';
import { pageUrl } from '../data/pages.js';
import { legalSchema } from '../data/schema.js';

/** @param {'privacy'|'terms'|'accessibility'} doc */
export default function LegalView({ doc }) {
    const { locale, t } = useLocale();
    const { default: Text, meta } = LEGAL[doc][locale];

    return (
        <>
            <Seo pageId={doc} title={meta.title} description={meta.description} schema={legalSchema(t, pageUrl(doc, locale), meta)} />

            <PageHero title={meta.heading} subtitle={meta.updated} />

            <UnderBand className="pb-24 md:pb-32">
                <div className="legal mx-auto max-w-[46rem]">
                    <Text />
                </div>
            </UnderBand>
        </>
    );
}
