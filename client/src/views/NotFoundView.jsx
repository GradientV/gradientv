// what shows for an address the site doesn't have.
// Vercel serves the prerendered copy of this (404.html) with a real 404 status
import PageHero from '../components/PageHero.jsx';
import Seo from '../components/Seo.jsx';
import UnderBand from '../components/UnderBand.jsx';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import { useLocale } from '../context/LocaleContext.jsx';

export default function NotFoundView() {
    const { t, to } = useLocale();
    const words = t.notFound;

    return (
        <>
            <Seo title={words.seo.title} description={words.seo.description} />

            <PageHero title={words.label} subtitle={words.heading} />

            <UnderBand className="pb-24 md:pb-32">
                <div className="mx-auto max-w-[52ch] text-center">
                    <p className="text-lg leading-relaxed text-ink-soft">{words.body}</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <ButtonLink to={to('home')} variant="solid">{words.home}</ButtonLink>
                        <ButtonLink to={to('contact')}>{words.contact}</ButtonLink>
                        <ButtonLink to={`${to('home')}#clients`}>{words.work}</ButtonLink>
                    </div>
                </div>
            </UnderBand>
        </>
    );
}
