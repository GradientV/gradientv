// the Contact page: the dark band with the page's name, then the pitch
// and the three ways to reach us on paper
import ContactRows from '../components/ContactRows.jsx';
import PageHero from '../components/PageHero.jsx';
import Seo from '../components/Seo.jsx';
import UnderBand from '../components/UnderBand.jsx';
import { useLocale } from '../context/LocaleContext.jsx';
import { pageUrl } from '../data/pages.js';
import { contactSchema } from '../data/schema.js';

export default function ContactView() {
    const { locale, t } = useLocale();

    return (
        <>
            <Seo
                pageId="contact"
                title={t.contact.seo.title}
                description={t.contact.seo.description}
                schema={contactSchema(t, pageUrl('contact', locale))}
            />

            <PageHero title={t.contact.label} subtitle={t.contact.heading} />

            <UnderBand className="grid gap-12 pb-24 md:grid-cols-12 md:gap-10 md:pb-32">
                <p className="max-w-[34ch] text-[1.2rem] leading-[1.55] md:col-span-5 md:text-[1.375rem]">{t.contact.text}</p>
                <ContactRows className="md:col-span-6 md:col-start-7" />
            </UnderBand>
        </>
    );
}
