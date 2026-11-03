// phone / email / LinkedIn as three big rows, each one a link.
// onNight = inside a dark band (the contact band at the bottom of the home page):
// the rows sit in a dark box. on paper (the Contact page) they're plain rows between thin rules
import { useLocale } from '../context/LocaleContext.jsx';
import { COMPANY } from '../data/site.js';
import { ArrowOutIcon, ArrowRightIcon } from './ui/Icons.jsx';

const LOOKS = {
    night: {
        list: 'border border-white/12 bg-night/70 px-5 backdrop-blur-sm sm:px-6',
        row: 'border-b border-white/12 last:border-b-0',
        label: 'text-chalk/60',
        arrow: 'text-chalk/50 group-hover:text-chalk'
    },
    paper: {
        list: 'border-t border-ink/20',
        row: 'border-b border-ink/20',
        label: 'text-ink-soft',
        arrow: 'text-ink-soft group-hover:text-ink'
    }
};

export default function ContactRows({ onNight = false, className = '' }) {
    const { t } = useLocale();
    const look = onNight ? LOOKS.night : LOOKS.paper;

    const rows = [
        { label: t.contact.phone, value: COMPANY.phone.label, href: COMPANY.phone.href },
        { label: t.contact.email, value: COMPANY.email, href: `mailto:${COMPANY.email}` },
        { label: t.contact.linkedin, value: COMPANY.linkedin.label, href: COMPANY.linkedin.href, external: true }
    ];

    return (
        <ul className={`${look.list} ${className}`}>
            {rows.map((row) => {
                const Arrow = row.external ? ArrowOutIcon : ArrowRightIcon;
                return (
                    <li key={row.href} className={look.row}>
                        <a
                            href={row.href}
                            className="group flex items-center justify-between gap-4 py-5"
                            {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                            <span className="min-w-0">
                                <span className={`eyebrow block text-xs uppercase tracking-[0.2em] ${look.label}`}>{row.label}</span>
                                <span className="mt-1 block font-display text-lg font-medium [overflow-wrap:anywhere] sm:text-xl">{row.value}</span>
                            </span>
                            <Arrow className={`h-5 w-5 shrink-0 transition group-hover:translate-x-1 ${look.arrow}`} />
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
