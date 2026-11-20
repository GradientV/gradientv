// the home page: the logo and the slogan up front, the four packages, the client
// portal, the client tiles, the common questions, and the contact band
import { Link } from 'react-router';
import ClientGrid from '../components/ClientGrid';
import ContactBand from '../components/ContactBand';
import NightBand from '../components/NightBand';
import PackageGrid from '../components/PackageGrid';
import PortalPreview from '../components/PortalPreview';
import SectionHeader from '../components/SectionHeader';
import Seo from '../components/Seo';
import UnderBand from '../components/UnderBand';
import ButtonLink from '../components/ui/ButtonLink';
import Eyebrow from '../components/ui/Eyebrow';
import { ArrowRightIcon, CheckIcon, PlusIcon } from '../components/ui/Icons';
import { useLocale } from '../context/LocaleContext';
import { homeSchema } from '../data/schema';

export default function HomeView() {
    const { t, to } = useLocale();
    const { portal } = t.home;

    return (
        <>
            <Seo pageId="home" title={t.home.seo.title} description={t.home.seo.description} schema={homeSchema(t)} />

            {/* ---------- hero ----------
                brand first, like a firm's front door: the logo big in the middle of a dark band,
                the slogan under it at a modest size so the logo stays the star, one quiet line
                on what we do, and the two ways in. it fills most of the first screen and leaves
                a strip of the next section showing, so it's clear the page keeps going */}
            <section className="on-night slope-bottom relative overflow-hidden bg-night text-chalk">
                <div className="tx tx-hero" aria-hidden="true" />

                <div className="wrap relative flex min-h-[clamp(30rem,calc(100svh-9rem),48rem)] flex-col items-center justify-center pt-16 pb-24 text-center md:pb-28">
                    {/* the logo is part of the heading, so a screen reader hears
                        "GradientV, the human side of AI" */}
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
                    <p className="mt-3 max-w-[42ch] text-[0.95rem] leading-relaxed text-balance text-chalk/65">
                        {t.home.heroLead}
                    </p>

                    <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
                        <ButtonLink to={to('plan')} variant="light">{t.home.primaryCta}</ButtonLink>
                        <Link
                            to={`${to('home')}#clients`}
                            className="text-sm font-medium text-chalk underline decoration-chalk/40 underline-offset-[6px] transition-colors hover:decoration-chalk"
                        >
                            {t.home.secondaryCta}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ---------- the four packages ----------
                the section header (title, the plan link, a rule), then the cards.
                each card's link opens Build your plan with that package picked */}
            <UnderBand id="services" className="pb-24 md:pb-32">
                <SectionHeader
                    title={t.home.packagesHeading}
                    action={(
                        <Link
                            to={to('plan')}
                            className="group inline-flex items-center gap-2 text-sm font-medium underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
                        >
                            {t.nav.plan}
                            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                />
                <div className="mt-10">
                    <PackageGrid />
                </div>
            </UnderBand>

            {/* ---------- the client portal ----------
                the thing every package plugs into, shown instead of described. laid out like the
                packages above it: the heading and the pitch on one row, then the portal itself */}
            <NightBand id="portal">
                <div className="grid gap-5 md:grid-cols-12 md:gap-10">
                    <div className="md:col-span-7">
                        <Eyebrow onNight>{portal.label}</Eyebrow>
                        <h2 className="display-lg mt-5">{portal.heading}</h2>
                    </div>
                    <p className="max-w-[40ch] text-lg leading-relaxed text-chalk/75 md:col-span-5 md:self-end">{portal.text}</p>
                </div>

                <div className="mt-12 grid items-center gap-12 md:mt-14 lg:grid-cols-12 lg:gap-14">
                    {/* the words stay on the flat dark left, the portal goes over the ribs on the right */}
                    <div className="lg:col-span-5">
                        <ul className="space-y-4">
                            {portal.points.map((point) => (
                                <li key={point} className="flex gap-3">
                                    <CheckIcon className="mt-[0.2rem] h-5 w-5 shrink-0 text-chalk/80" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
                            <ButtonLink to={to('plan')} variant="light">{t.nav.plan}</ButtonLink>
                            <Link
                                to={to('login')}
                                className="text-sm font-medium text-chalk underline decoration-chalk/40 underline-offset-[6px] transition-colors hover:decoration-chalk"
                            >
                                {portal.login}
                            </Link>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <PortalPreview />
                    </div>
                </div>
            </NightBand>

            {/* ---------- clients ---------- */}
            <section id="clients" className="wrap pt-24 pb-14 md:pt-32 md:pb-16">
                <SectionHeader title={t.home.clientsLabel} />
                <div className="mt-10">
                    <ClientGrid />
                </div>
            </section>

            {/* ---------- FAQ ----------
                closed, it's a small box the size of a button: "FAQ" and a plus.
                pressed, the same box grows to the full width and holds every question and answer.
                it's <details>, so all of it is still in the page's HTML for search engines and
                AI tools to read, and it works before (or without) the JavaScript.
                the same questions are in the structured data */}
            <section id="questions" className="wrap pb-24 md:pb-32">
                <details className="faq group w-fit border border-ink/25 bg-paper-bright/60 transition-colors hover:border-ink/50 open:w-full open:border-line open:bg-paper-bright open:hover:border-line">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-4 py-2.5 transition-[padding] group-open:px-5 group-open:py-4 sm:group-open:px-6 [&::-webkit-details-marker]:hidden">
                        <h2 className="text-sm font-medium">{t.home.faqLabel}</h2>
                        {/* a plus that turns into an x while it's open */}
                        <PlusIcon className="h-4 w-4 shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-45 group-hover:text-ink" />
                    </summary>
                    <div className="border-t border-line px-5 sm:px-6">
                        {t.home.faq.map((item) => (
                            <div key={item.question} className="grid gap-1.5 border-b border-line py-4 last:border-b-0 md:grid-cols-12 md:gap-8">
                                <h3 className="text-[0.95rem] leading-snug font-medium md:col-span-5">{item.question}</h3>
                                <p className="max-w-[64ch] text-sm leading-relaxed text-ink-soft md:col-span-7">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </details>
            </section>

            <ContactBand />
        </>
    );
}
