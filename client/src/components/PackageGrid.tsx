// the four packages as cards on the home page. each card's link opens Build your plan
// with that package already picked (/plan?package=growth)
import { Link } from 'react-router';
import { useLocale } from '../context/LocaleContext';
import { PACKAGE_IDS } from '../data/packages';
import { ArrowRightIcon, CheckIcon, PackageIcon } from './ui/Icons';

export default function PackageGrid() {
    const { t, to } = useLocale();

    return (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {PACKAGE_IDS.map((id) => {
                const words = t.packages.items[id];
                return (
                    <li key={id} className="flex flex-col border border-line bg-paper-bright/80 p-6 transition-colors hover:border-ink/40">
                        <span className="flex h-11 w-11 items-center justify-center bg-ink text-paper">
                            <PackageIcon id={id} className="h-5 w-5" />
                        </span>
                        <h3 className="mt-6 font-display text-xl leading-tight font-semibold tracking-[-0.01em]">{words.name}</h3>
                        <p className="mt-1.5 text-ink-soft">{words.outcome}</p>

                        <ul aria-label={t.packages.includesLabel} className="mt-6 space-y-2.5 border-t border-line pt-5 text-[0.95rem]">
                            {words.includes.map((item) => (
                                <li key={item} className="flex gap-2.5">
                                    <CheckIcon className="mt-[0.2rem] h-4 w-4 shrink-0 text-accent" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-7">
                            <Link
                                to={`${to('plan')}?package=${id}`}
                                // four links with the same words, so each one says which package it adds
                                aria-label={`${t.home.addToPlan}: ${words.name}`}
                                className="group inline-flex items-center gap-2 text-sm font-medium underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
                            >
                                {t.home.addToPlan}
                                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
