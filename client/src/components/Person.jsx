// how a team member is drawn. three sizes, picked by `size` in src/data/team.js:
//   PersonFeature  big photo beside the bio (the founder)
//   PersonCard     a card with a photo
//   PersonRow      one slim row with initials, for someone without a photo yet
// PersonLinks is the row of Website / LinkedIn / GitHub links they all share
import { useLocale } from '../context/LocaleContext.jsx';
import Eyebrow from './ui/Eyebrow.jsx';

export function PersonLinks({ person, className = '' }) {
    const { t } = useLocale();

    return (
        <ul className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`}>
            {person.links.map((link) => (
                <li key={link.href}>
                    <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        // the visible word is just "LinkedIn", so the label adds whose it is
                        aria-label={`${t.links[link.kind]}: ${person.name}`}
                        className="text-sm font-medium text-ink-soft underline decoration-ink/30 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                    >
                        {t.links[link.kind]}
                    </a>
                </li>
            ))}
        </ul>
    );
}

/** children = anything extra under the links, like the "read the full story" link */
export function PersonFeature({ person, children }) {
    const { t } = useLocale();
    const words = t.team.members[person.id];

    return (
        <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
            <img
                src={person.photo.src}
                alt={t.team.portraitAlt(person.name)}
                width={person.photo.width}
                height={person.photo.height}
                className="aspect-[4/5] w-full max-w-sm object-cover md:col-span-4"
            />
            <div className="md:col-span-8">
                <Eyebrow>{words.role}</Eyebrow>
                <h2 className="display-lg mt-4">{person.name}</h2>
                <p className="mt-5 max-w-[58ch] text-lg text-ink-soft">{words.bio}</p>
                <PersonLinks person={person} className="mt-6" />
                {children}
            </div>
        </article>
    );
}

export function PersonCard({ person }) {
    const { t } = useLocale();
    const words = t.team.members[person.id];

    return (
        <li className="flex flex-col gap-5 border border-line bg-paper-bright/70 p-5 sm:flex-row sm:p-6">
            {/* kept under 200px wide on purpose: the headshots are 400px, so they stay sharp */}
            <img
                src={person.photo.src}
                alt={t.team.portraitAlt(person.name)}
                width={person.photo.width}
                height={person.photo.height}
                loading="lazy"
                className="h-40 w-40 shrink-0 object-cover sm:h-44 sm:w-44"
            />
            <div className="flex min-w-0 flex-col">
                <Eyebrow>{words.role}</Eyebrow>
                <h2 className="display-md mt-3">{person.name}</h2>
                <p className="mt-3 text-[0.95rem] text-ink-soft">{words.bio}</p>
                <PersonLinks person={person} className="mt-auto pt-5" />
            </div>
        </li>
    );
}

export function PersonRow({ person }) {
    const { t } = useLocale();
    const words = t.team.members[person.id];

    return (
        <li className="flex flex-wrap items-center gap-x-4 gap-y-3 border border-line px-5 py-4">
            <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center bg-ink font-display text-sm font-semibold text-paper"
            >
                {person.initials}
            </span>
            <div className="min-w-0 flex-1">
                <h2 className="font-display text-lg leading-tight font-semibold">{person.name}</h2>
                <p className="text-sm text-ink-soft">{words.role}</p>
            </div>
            <PersonLinks person={person} />
        </li>
    );
}
