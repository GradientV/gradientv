// Build your plan: pick packages, say a little about the business and how to reach
// you, and send it. it goes to POST /api/plan, shows up in my portal, and pings Slack.
// no prices and nothing to pay: every plan gets quoted after a conversation.
//
// a home page card links here as /plan?package=growth, and arrives with that package picked
import { useEffect, useRef, useState, useSyncExternalStore, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import type { PackageId } from '../../../shared/portal';
import { ApiError, sendPlan, TOO_MANY } from '../api/api';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import UnderBand from '../components/UnderBand';
import ButtonLink, { BUTTON_STYLES } from '../components/ui/ButtonLink';
import { CheckIcon, CloseIcon, PackageIcon } from '../components/ui/Icons';
import { useLocale } from '../context/LocaleContext';
import { PACKAGE_IDS, packagesFromQuery } from '../data/packages';
import { pageUrl } from '../data/pages';
import { planSchema } from '../data/schema';

// the server stops at the same numbers (server/src/models/PlanRequest.ts)
const LIMITS = { name: 100, email: 200, phone: 40, businessName: 120, businessType: 80, message: 2000 };

const INPUT_CLASS = 'mt-1.5 w-full border border-line bg-paper px-3.5 py-2.5 text-ink outline-none placeholder:text-ink-mute focus:border-accent focus:ring-2 focus:ring-accent/25';

type Fields = { businessName: string; businessType: string; message: string; name: string; email: string; phone: string; homepage: string };
const EMPTY: Fields = { businessName: '', businessType: '', message: '', name: '', email: '', phone: '', homepage: '' };

// false while the prerendered HTML is being picked up, true right after. the ?package= link
// is only read once it's true, so the first draw matches the HTML that came from the server
const neverChanges = () => () => undefined;
function useIsInBrowser(): boolean {
    return useSyncExternalStore(neverChanges, () => true, () => false);
}

/** one numbered part of the form */
function Step({ number, title, hint, children }: { number: number; title: string; hint?: string; children: ReactNode }) {
    return (
        <fieldset>
            <legend className="flex items-center gap-3.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-ink text-sm font-semibold text-paper tabular-nums">{number}</span>
                <span className="display-md">{title}</span>
            </legend>
            {hint && <p className="mt-2 text-ink-soft">{hint}</p>}
            <div className="mt-6">{children}</div>
        </fieldset>
    );
}

/** a label and the box under it. optional fields say so, so the required ones don't need a star */
function Field({ id, label, optional, children }: { id: string; label: string; optional?: string; children: ReactNode }) {
    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium">
                {label}
                {/* a real space, so a screen reader doesn't read "name(optional)" as one word */}
                {optional && <>{' '}<span className="ml-1 font-normal text-ink-soft">({optional})</span></>}
            </label>
            {children}
        </div>
    );
}

export default function PlanView() {
    const { locale, t, to } = useLocale();
    const words = t.plan;
    const [searchParams] = useSearchParams();
    const isInBrowser = useIsInBrowser();

    // null until they tick or untick something. until then, whatever the link asked for
    const [choice, setChoice] = useState<PackageId[] | null>(null);
    const picked = choice ?? (isInBrowser ? packagesFromQuery(searchParams.get('package')) : []);

    const [fields, setFields] = useState<Fields>(EMPTY);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState<{ name: string; packages: PackageId[] } | null>(null);
    const firstPackage = useRef<HTMLInputElement>(null);
    const doneHeading = useRef<HTMLHeadingElement>(null);

    // once it's sent, move focus to the thank-you, so a screen reader reads it and the page shows it
    useEffect(() => {
        if (sent) doneHeading.current?.focus();
    }, [sent]);

    /** ticks or unticks one package, keeping the site's order */
    function toggle(id: PackageId) {
        const isOn = picked.includes(id);
        setChoice(PACKAGE_IDS.filter((other) => (other === id ? !isOn : picked.includes(other))));
        setError('');
    }

    function update(field: keyof Fields) {
        return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFields((current) => ({ ...current, [field]: event.target.value }));
            setError('');
        };
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (picked.length === 0) {
            setError(words.pickOne);
            firstPackage.current?.focus();
            return;
        }

        setIsSending(true);
        setError('');
        try {
            await sendPlan({ ...fields, packages: picked, locale });
            setSent({ name: fields.name.trim(), packages: picked });
        } catch (problem) {
            // what the server says is in English, so the reader gets one of these two in their own language
            setError(problem instanceof ApiError && problem.status === TOO_MANY ? words.tooMany : words.error);
        } finally {
            setIsSending(false);
        }
    }

    return (
        <>
            <Seo pageId="plan" title={words.seo.title} description={words.seo.description} schema={planSchema(t, pageUrl('plan', locale))} />

            <PageHero label={words.label} title={words.heading} subtitle={words.intro} />

            <UnderBand className="pb-24 md:pb-32">
                {sent ? (
                    /* ---------- sent: thank you, what they picked, and what happens next ---------- */
                    <div className="animate-rise mx-auto max-w-2xl border border-line bg-paper-bright p-7 sm:p-10">
                        <span className="animate-pop flex h-12 w-12 items-center justify-center bg-accent text-chalk">
                            <CheckIcon className="h-6 w-6" />
                        </span>
                        <h2 ref={doneHeading} tabIndex={-1} className="display-md mt-6 outline-none">{words.done.heading(sent.name)}</h2>

                        <h3 className="eyebrow mt-8 text-xs font-medium uppercase tracking-[0.2em] text-ink-soft">{words.done.picked}</h3>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {sent.packages.map((id) => (
                                <li key={id} className="flex items-center gap-2 border border-line bg-paper px-3 py-1.5 text-sm">
                                    <PackageIcon id={id} className="h-4 w-4 text-accent" />
                                    {t.packages.items[id].name}
                                </li>
                            ))}
                            <li className="flex items-center gap-2 border border-line bg-paper px-3 py-1.5 text-sm text-ink-soft">
                                <CheckIcon className="h-4 w-4" />
                                {words.portalLine}
                            </li>
                        </ul>

                        <h3 className="eyebrow mt-8 text-xs font-medium uppercase tracking-[0.2em] text-ink-soft">{words.done.next}</h3>
                        <ol className="mt-4 space-y-4">
                            {words.done.steps.map((step, index) => (
                                <li key={step} className="flex gap-4">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-ink/30 text-sm font-medium tabular-nums">{index + 1}</span>
                                    <span className="pt-0.5">{step}</span>
                                </li>
                            ))}
                        </ol>

                        <ButtonLink to={to('home')} className="mt-9">{words.done.home}</ButtonLink>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid gap-12 lg:grid-cols-12 lg:gap-12">
                        <div className="space-y-14 lg:col-span-8">
                            {/* ---------- 1. the packages ---------- */}
                            <Step number={1} title={words.stepPackages} hint={words.stepPackagesHint}>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {PACKAGE_IDS.map((id, index) => {
                                        const item = t.packages.items[id];
                                        const isOn = picked.includes(id);
                                        return (
                                            <label
                                                key={id}
                                                // the card is the checkbox's label, so the whole card is the click target.
                                                // the real checkbox is hidden, and the card shows its focus ring instead
                                                className={`flex cursor-pointer flex-col border p-5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-accent ${
                                                    isOn ? 'border-ink bg-paper-bright' : 'border-line bg-paper-bright/60 hover:border-ink/40'
                                                }`}
                                            >
                                                <input
                                                    ref={index === 0 ? firstPackage : undefined}
                                                    type="checkbox"
                                                    name="packages"
                                                    value={id}
                                                    checked={isOn}
                                                    onChange={() => toggle(id)}
                                                    aria-labelledby={`package-${id}-name`}
                                                    aria-describedby={`package-${id}-outcome`}
                                                    className="sr-only"
                                                />
                                                <span className="flex items-start justify-between gap-4">
                                                    <span className={`flex h-10 w-10 items-center justify-center transition-colors ${isOn ? 'bg-accent text-chalk' : 'bg-ink text-paper'}`}>
                                                        <PackageIcon id={id} className="h-5 w-5" />
                                                    </span>
                                                    {/* the tick, drawn in place of the hidden checkbox */}
                                                    <span
                                                        aria-hidden="true"
                                                        className={`flex h-6 w-6 items-center justify-center border transition-colors ${isOn ? 'border-accent bg-accent text-chalk' : 'border-ink/30 bg-paper'}`}
                                                    >
                                                        {isOn && <CheckIcon className="animate-pop h-4 w-4" />}
                                                    </span>
                                                </span>
                                                <span id={`package-${id}-name`} className="mt-5 font-display text-lg leading-tight font-semibold">{item.name}</span>
                                                <span id={`package-${id}-outcome`} className="mt-1 text-sm text-ink-soft">{item.outcome}</span>
                                                <span aria-hidden="true" className="mt-4 border-t border-line pt-3 text-sm leading-relaxed text-ink-soft">
                                                    {item.includes.join(' · ')}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </Step>

                            {/* ---------- 2. the business ---------- */}
                            <Step number={2} title={words.stepBusiness}>
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <Field id="plan-business-name" label={words.businessName} optional={words.optional}>
                                        <input
                                            id="plan-business-name"
                                            name="businessName"
                                            autoComplete="organization"
                                            maxLength={LIMITS.businessName}
                                            value={fields.businessName}
                                            onChange={update('businessName')}
                                            className={INPUT_CLASS}
                                        />
                                    </Field>
                                    <Field id="plan-business-type" label={words.businessType} optional={words.optional}>
                                        <input
                                            id="plan-business-type"
                                            name="businessType"
                                            maxLength={LIMITS.businessType}
                                            placeholder={words.businessTypePlaceholder}
                                            value={fields.businessType}
                                            onChange={update('businessType')}
                                            className={INPUT_CLASS}
                                        />
                                    </Field>
                                    <div className="sm:col-span-2">
                                        <Field id="plan-message" label={words.message} optional={words.optional}>
                                            <textarea
                                                id="plan-message"
                                                name="message"
                                                rows={4}
                                                maxLength={LIMITS.message}
                                                placeholder={words.messagePlaceholder}
                                                value={fields.message}
                                                onChange={update('message')}
                                                className={INPUT_CLASS}
                                            />
                                        </Field>
                                    </div>
                                </div>
                            </Step>

                            {/* ---------- 3. how to reach them ---------- */}
                            <Step number={3} title={words.stepContact}>
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <Field id="plan-name" label={words.name}>
                                        <input
                                            id="plan-name"
                                            name="name"
                                            autoComplete="name"
                                            required
                                            maxLength={LIMITS.name}
                                            value={fields.name}
                                            onChange={update('name')}
                                            className={INPUT_CLASS}
                                        />
                                    </Field>
                                    <Field id="plan-email" label={words.email}>
                                        <input
                                            id="plan-email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            autoCapitalize="none"
                                            spellCheck={false}
                                            required
                                            maxLength={LIMITS.email}
                                            value={fields.email}
                                            onChange={update('email')}
                                            className={INPUT_CLASS}
                                        />
                                    </Field>
                                    <Field id="plan-phone" label={words.phone} optional={words.optional}>
                                        <input
                                            id="plan-phone"
                                            name="phone"
                                            type="tel"
                                            autoComplete="tel"
                                            maxLength={LIMITS.phone}
                                            value={fields.phone}
                                            onChange={update('phone')}
                                            className={INPUT_CLASS}
                                        />
                                    </Field>
                                </div>
                            </Step>

                            {/* the field only a bot fills in: far off screen, skipped by Tab, hidden from screen readers */}
                            <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
                                <label htmlFor="plan-homepage">{words.honeypot}</label>
                                <input id="plan-homepage" name="homepage" tabIndex={-1} autoComplete="off" value={fields.homepage} onChange={update('homepage')} />
                            </div>
                        </div>

                        {/* ---------- the plan so far, and the button. stays in view on a wide screen ---------- */}
                        <aside className="lg:col-span-4">
                            <div className="border border-line bg-paper-bright p-6 sm:p-7 lg:sticky lg:top-28">
                                <h2 className="display-md">{words.summaryHeading}</h2>
                                <ul className="mt-5 divide-y divide-line border-y border-line">
                                    {picked.length === 0 && <li className="py-3.5 text-sm text-ink-soft">{words.summaryEmpty}</li>}
                                    {picked.map((id) => {
                                        const name = t.packages.items[id].name;
                                        return (
                                            <li key={id} className="animate-rise flex items-center justify-between gap-3 py-3">
                                                <span className="flex min-w-0 items-center gap-3">
                                                    <PackageIcon id={id} className="h-5 w-5 shrink-0 text-accent" />
                                                    <span className="font-medium">{name}</span>
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => toggle(id)}
                                                    aria-label={words.remove(name)}
                                                    className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
                                                >
                                                    <CloseIcon className="h-4 w-4" />
                                                </button>
                                            </li>
                                        );
                                    })}
                                    <li className="flex items-center justify-between gap-3 py-3.5 text-sm">
                                        <span className="text-ink-soft">{words.portalLine}</span>
                                        <span className="flex items-center gap-1.5 font-medium">
                                            <CheckIcon className="h-4 w-4 text-accent" />
                                            {words.portalIncluded}
                                        </span>
                                    </li>
                                </ul>

                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className={`${BUTTON_STYLES.base} ${BUTTON_STYLES.solid} mt-6 w-full cursor-pointer gap-2.5 py-3.5 disabled:cursor-default disabled:opacity-70`}
                                >
                                    {isSending && (
                                        <span aria-hidden="true" className="h-4 w-4 rounded-full border-2 border-current border-r-transparent motion-safe:animate-spin" />
                                    )}
                                    {isSending ? words.sending : words.submit}
                                </button>
                                <p className="mt-3 text-center text-sm text-ink-soft">{words.reply}</p>

                                {error && (
                                    <p role="alert" className="animate-rise mt-4 border border-line bg-paper px-4 py-3 text-sm">{error}</p>
                                )}
                            </div>
                        </aside>
                    </form>
                )}
            </UnderBand>
        </>
    );
}
