// the Contact page: the dark band with the page's name, then the pitch, the
// three ways to reach us, and a way straight into Build your plan
import ContactRows from '../components/ContactRows';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import UnderBand from '../components/UnderBand';
import ButtonLink from '../components/ui/ButtonLink';
import { useLocale } from '../context/LocaleContext';
import { pageUrl } from '../data/pages';
import { contactSchema } from '../data/schema';

export default function ContactView() {
    const { locale, t, to } = useLocale();

    return (
        <>
            <Seo
                pageId="contact"
                title={t.contact.seo.title}
                description={t.contact.seo.description}
                schema={contactSchema(t, pageUrl('contact', locale))}
            />

            <PageHero label={t.contact.label} title={t.contact.heading} />

            <UnderBand className="grid gap-12 pb-24 md:grid-cols-12 md:gap-10 md:pb-32">
                <div className="md:col-span-5">
                    <p className="max-w-[34ch] text-[1.2rem] leading-[1.55] md:text-[1.375rem]">{t.contact.text}</p>

                    {/* for someone who already knows what they want: skip the call and pick packages */}
                    <div className="mt-10 border-t border-ink/20 pt-8">
                        <h2 className="display-md">{t.contact.planHeading}</h2>
                        <p className="mt-3 max-w-[38ch] text-ink-soft">{t.contact.planText}</p>
                        <ButtonLink to={to('plan')} variant="solid" className="mt-6">{t.nav.plan}</ButtonLink>
                    </div>
                </div>
                <ContactRows className="md:col-span-6 md:col-start-7" />
            </UnderBand>
        </>
    );
}
