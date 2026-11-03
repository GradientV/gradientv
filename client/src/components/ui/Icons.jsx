// the handful of icons the site uses, as inline SVG.
// they take the text color (currentColor) and are hidden from screen readers,
// because there is always a word right next to them saying the same thing

const LINE = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
};

export function ArrowRightIcon({ className = '' }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...LINE}>
            <path d="M4 12h15M13 6l6 6-6 6" />
        </svg>
    );
}

/** the "opens another site" arrow */
export function ArrowOutIcon({ className = '' }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...LINE}>
            <path d="M7 17 17 7M8 7h9v9" />
        </svg>
    );
}

export function MenuIcon({ className = '' }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...LINE}>
            <path d="M4 8h16M4 16h16" />
        </svg>
    );
}

export function CloseIcon({ className = '' }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...LINE}>
            <path d="M6 6l12 12M18 6 6 18" />
        </svg>
    );
}
