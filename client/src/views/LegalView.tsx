// privacy, terms and accessibility all use this one view.
// doc says which document, the language comes from the URL, and the text
// itself is in src/content/legal. its paragraphs are styled by .legal in gradientv.css
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import UnderBand from '../components/UnderBand';
import { useLocale } from '../context/LocaleContext';
import { LEGAL, type LegalDoc } from '../content/legal/index';
import { pageUrl } from '../data/pages';
import { legalSchema } from '../data/schema';

export default function LegalView({ doc }: { doc: LegalDoc }) {
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
