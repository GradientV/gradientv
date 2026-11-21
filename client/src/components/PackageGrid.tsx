// the packages as cards on the home page. each card's link opens Build your plan
// with that package already picked (/plan?package=growth).
// four cards share a row. AI Upgrade gets a full-width card under them, so a fifth card
// isn't left alone on its own row and its longer list has room
import { Link } from 'react-router';
import type { PackageId } from '../../../shared/portal';
import { useLocale } from '../context/LocaleContext';
import { PACKAGE_IDS } from '../data/packages';
import { ArrowRightIcon, CheckIcon, PackageIcon } from './ui/Icons';

const CARD_CLASS = 'border border-line bg-paper-bright/80 p-6 transition-colors hover:border-ink/40';

function PackageMark({ id }: { id: PackageId }) {
    return (
        <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-ink text-paper">
            <PackageIcon id={id} className="h-5 w-5" />
        </span>
    );
}

function Includes({ id, className }: { id: PackageId; className: string }) {
    const { t } = useLocale();
    return (
        <ul aria-label={t.packages.includesLabel} className={`border-t border-line pt-5 text-[0.95rem] ${className}`}>
            {t.packages.items[id].includes.map((item) => (
                <li key={item} className="flex gap-2.5">
                    <CheckIcon className="mt-[0.2rem] h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function AddToPlan({ id }: { id: PackageId }) {
    const { t, to } = useLocale();
    return (
        <Link
            to={`${to('plan')}?package=${id}`}
            // every card's link has the same words, so each one says which package it adds
            aria-label={`${t.home.addToPlan}: ${t.packages.items[id].name}`}
            className="group inline-flex items-center gap-2 text-sm font-medium underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
        >
            {t.home.addToPlan}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
    );
}

export default function PackageGrid() {
    const { t } = useLocale();

    return (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {PACKAGE_IDS.map((id) => {
                const words = t.packages.items[id];

                if (id === 'ai') {
                    return (
                        <li key={id} className={`${CARD_CLASS} grid sm:col-span-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-6 xl:col-span-4`}>
                            <div className="flex flex-col gap-6 sm:col-start-1 sm:row-start-1 sm:flex-row sm:items-center sm:gap-4">
                                <PackageMark id={id} />
                                <div>
                                    <h3 className="font-display text-xl leading-tight font-semibold tracking-[-0.01em]">{words.name}</h3>
                                    <p className="mt-1.5 text-ink-soft">{words.outcome}</p>
                                </div>
                            </div>
                            <Includes id={id} className="mt-6 grid gap-x-8 gap-y-2.5 sm:col-span-2 sm:row-start-2 sm:grid-cols-2 xl:grid-cols-3" />
                            <div className="pt-7 sm:col-start-2 sm:row-start-1 sm:self-center sm:pt-0">
                                <AddToPlan id={id} />
                            </div>
                        </li>
                    );
                }

                return (
                    <li key={id} className={`${CARD_CLASS} flex flex-col`}>
                        <PackageMark id={id} />
                        <h3 className="mt-6 font-display text-xl leading-tight font-semibold tracking-[-0.01em]">{words.name}</h3>
                        <p className="mt-1.5 text-ink-soft">{words.outcome}</p>
                        <Includes id={id} className="mt-6 space-y-2.5" />
                        <div className="mt-auto pt-7">
                            <AddToPlan id={id} />
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
