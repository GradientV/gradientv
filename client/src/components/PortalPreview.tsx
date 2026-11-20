// a drawing of the client portal for the home page, built from the site's own parts
// instead of a screenshot, so it stays sharp at any size and changes language with the page.
// every number on it is made up, and the caption under it says it's an example.
// the drawing itself is hidden from screen readers (made-up numbers read out loud would
// only confuse); the caption says what it shows
import { useLocale } from '../context/LocaleContext';
import { CheckIcon } from './ui/Icons';

// visitors per day for the little chart, oldest first. made up
const DAILY = [14, 19, 16, 23, 21, 27, 25, 31, 28, 35, 33, 41, 38, 44];
const TOTAL = 1284;

/** where the example visitors came from, in percent. 'direct' gets its word from the content */
const SOURCES = [
    { name: 'Google', share: 46 },
    { name: 'direct', share: 24 },
    { name: 'ChatGPT', share: 18 },
    { name: 'Instagram', share: 12 }
];

const TILE = 'border border-line bg-paper p-4 sm:p-5';
const LABEL = 'eyebrow text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink-soft';

export default function PortalPreview() {
    const { t } = useLocale();
    const words = t.home.portal.preview;
    const tallest = Math.max(...DAILY);
    const number = new Intl.NumberFormat(t.htmlLang);

    return (
        <figure>
            <div aria-hidden="true" className="border border-white/15 bg-paper-bright text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.75)]">
                {/* the portal's own top bar */}
                <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
                    <div className="flex items-center gap-2.5">
                        <img src="/images/brand/mark_black_t.png" alt="" width="847" height="689" className="h-auto w-5" />
                        <span className="text-sm font-medium">{words.title}</span>
                    </div>
                    <span className="truncate text-sm text-ink-soft">{words.business}</span>
                </div>

                <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4">
                    {/* visitors, with a small bar chart */}
                    <div className={TILE}>
                        <p className={LABEL}>{words.visitors}</p>
                        <p className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] tabular-nums">{number.format(TOTAL)}</p>
                        <p className="mt-0.5 text-sm text-ink-soft">{words.period}</p>
                        <div className="mt-4 flex h-16 items-end gap-1">
                            {DAILY.map((visits, index) => (
                                <span
                                    key={index}
                                    className={index === DAILY.length - 1 ? 'flex-1 bg-accent' : 'flex-1 bg-accent/35'}
                                    style={{ height: `${Math.round((visits / tallest) * 100)}%` }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* where visitors came from, AI search included */}
                    <div className={TILE}>
                        <p className={LABEL}>{words.sources}</p>
                        <ul className="mt-3 space-y-2.5">
                            {SOURCES.map((source) => (
                                <li key={source.name}>
                                    <div className="flex items-baseline justify-between gap-3 text-sm">
                                        <span>{source.name === 'direct' ? words.direct : source.name}</span>
                                        <span className="text-ink-soft tabular-nums">{source.share}%</span>
                                    </div>
                                    <div className="mt-1 h-1.5 bg-line/70">
                                        <div className="h-full bg-ink" style={{ width: `${source.share}%` }} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* change requests and where they stand */}
                    <div className={TILE}>
                        <p className={LABEL}>{words.requests}</p>
                        <ul className="mt-3 divide-y divide-line text-sm">
                            <li className="flex items-start justify-between gap-3 pb-2.5">
                                <span className="min-w-0">{words.requestOpen}</span>
                                <span className="shrink-0 font-medium text-accent">{words.inProgress}</span>
                            </li>
                            <li className="flex items-start justify-between gap-3 pt-2.5">
                                <span className="min-w-0 text-ink-soft">{words.requestDone}</span>
                                <span className="flex shrink-0 items-center gap-1 font-medium text-ink-soft">
                                    <CheckIcon className="h-3.5 w-3.5" />
                                    {words.done}
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* what the site collected */}
                    <div className={TILE}>
                        <p className={LABEL}>{words.signups}</p>
                        <p className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] tabular-nums">{number.format(312)}</p>
                        <p className="mt-0.5 text-sm text-ink-soft tabular-nums">{words.signupsValue}</p>
                    </div>
                </div>
            </div>
            <figcaption className="mt-4 text-sm text-chalk/60">{words.caption}</figcaption>
        </figure>
    );
}
