// the home page: the logo up front, what we build, the client tiles, and the contact band
import { Link } from 'react-router';
import ClientGrid from '../components/ClientGrid.jsx';
import ContactBand from '../components/ContactBand.jsx';
import Seo from '../components/Seo.jsx';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import Eyebrow from '../components/ui/Eyebrow.jsx';
import { useLocale } from '../context/LocaleContext.jsx';
import { homeSchema } from '../data/schema.js';

export default function HomeView() {
    const { t, to } = useLocale();

    return (
        <>
            <Seo pageId="home" title={t.home.seo.title} description={t.home.seo.description} schema={homeSchema(t)} />

            {/* ---------- hero ----------
                brand first, like a firm's front door: the logo big in the middle of a dark band,
                the tagline under it, and the two ways in. it fills most of the first screen and
                leaves a strip of the next section showing, so it's clear the page keeps going */}
            <section className="on-night slope-bottom relative overflow-hidden bg-night text-chalk">
                <div className="tx tx-hero" aria-hidden="true" />

                <div className="wrap relative flex min-h-[clamp(30rem,calc(100svh-9rem),48rem)] flex-col items-center justify-center pt-16 pb-24 text-center md:pb-28">
                    {/* the logo is part of the heading, so a screen reader hears
                        "GradientV, software built around how you work" */}
                    <h1>
                        <img
                            src="/images/brand/stacked_white_t.png"
                            alt="GradientV"
                            width="1196"
                            height="1128"
                            className="mx-auto w-32 sm:w-40 lg:w-48"
                        />
                        <span className="mt-10 block font-display text-[clamp(1.3rem,2.3vw,1.75rem)] leading-snug font-medium tracking-[-0.01em] text-balance md:mt-12">
                            {t.home.tagline}
                        </span>
                    </h1>

                    <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
                        <ButtonLink to={to('contact')} variant="light">{t.home.primaryCta}</ButtonLink>
                        <Link
                            to={`${to('home')}#clients`}
                            className="text-sm font-medium text-chalk underline decoration-chalk/40 underline-offset-[6px] transition-colors hover:decoration-chalk"
                        >
                            {t.home.secondaryCta}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ---------- what we build ----------
                the plain version, right after the logo. the pitch sits to the right and the list
                is a small index on the left. on a phone it's the pitch first, then the list.
                it tucks up under the hero's diagonal so its texture fills the corner the slant
                cuts away, and the extra top padding keeps the text clear of the edge */}
            <section className="relative -mt-(--slant) overflow-hidden">
                <div className="tx tx-waves" aria-hidden="true" />
                <div className="wrap relative grid gap-12 pt-[calc(4rem+var(--slant))] pb-20 md:grid-cols-12 md:gap-10 md:pt-[calc(6rem+var(--slant))] md:pb-28">
                    <p className="max-w-[38ch] text-[1.2rem] leading-[1.55] text-ink md:col-span-7 md:col-start-6 md:row-start-1 md:text-[1.375rem]">
                        {t.home.lead}
                    </p>

                    <div className="md:col-span-4 md:col-start-1 md:row-start-1 lg:col-span-3">
                        <Eyebrow>{t.home.buildLabel}</Eyebrow>
                        <ul className="mt-4 border-t border-ink/20">
                            {t.home.builds.map((build) => (
                                <li key={build} className="border-b border-ink/20 py-2.5 text-[0.95rem]">
                                    {build}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ---------- clients ---------- */}
            <section id="clients" className="wrap pt-4 pb-24 md:pb-32">
                <Eyebrow>{t.home.clientsLabel}</Eyebrow>
                <div className="mt-6">
                    <ClientGrid />
                </div>
            </section>

            <ContactBand />
        </>
    );
}
