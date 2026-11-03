// the word that says where a request stands. plain text, in three looks
// so they can be told apart at a glance:
//   new          = dark, nothing has happened yet
//   in progress  = the accent blue, being worked on
//   done         = faded, finished
import { useLocale } from '../../context/LocaleContext.jsx';

const LOOKS = {
    'new': 'text-ink',
    'in progress': 'text-accent',
    'done': 'text-ink-soft'
};

export default function StatusBadge({ status }) {
    const { t } = useLocale();
    return (
        <span className={`shrink-0 text-sm font-medium ${LOOKS[status]}`}>
            {t.portal.requests.status[status]}
        </span>
    );
}

/** 'Oct 5, 2026' */
export function shortDate(isoDate) {
    return new Date(isoDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
