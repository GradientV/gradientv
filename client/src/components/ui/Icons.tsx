// the handful of icons the site uses, as inline SVG.
// they take the text color (currentColor) and are hidden from screen readers,
// because there is always a word right next to them saying the same thing
import type { SVGProps } from 'react';
import type { PackageId } from '../../../../shared/portal';

const LINE: SVGProps<SVGSVGElement> = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
};

export function ArrowRightIcon({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...LINE}>
            <path d="M4 12h15M13 6l6 6-6 6" />
        </svg>
    );
}

/** the "opens another site" arrow */
export function ArrowOutIcon({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...LINE}>
            <path d="M7 17 17 7M8 7h9v9" />
        </svg>
    );
}

export function MenuIcon({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...LINE}>
            <path d="M4 8h16M4 16h16" />
        </svg>
    );
}

export function CloseIcon({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...LINE}>
            <path d="M6 6l12 12M18 6 6 18" />
        </svg>
    );
}

/** the FAQ's open/close sign. turned 45 degrees it's an x */
export function PlusIcon({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...LINE}>
            <path d="M12 5v14M5 12h14" />
        </svg>
    );
}

export function CheckIcon({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...LINE}>
            <path d="M5 12.5 9.5 17 19 7.5" />
        </svg>
    );
}

// ---------- one icon per package, drawn the same way as the rest ----------

const PACKAGE_PATHS: Record<PackageId, string> = {
    // a browser window
    website: 'M3.5 5.5h17v13h-17zM3.5 9.5h17M6.5 7.5h.01M9 7.5h.01',
    // a line going up
    growth: 'M4 17l5.5-5.5 4 4L20 9M14.5 9H20v5.5',
    // two arrows chasing each other
    automation: 'M19.5 12a7.5 7.5 0 0 1-13.3 4.7M4.5 12a7.5 7.5 0 0 1 13.3-4.7M18 3.5v4h-4M6 20.5v-4h4',
    // a pair of code brackets
    custom: 'M8.5 7.5 4 12l4.5 4.5M15.5 7.5 20 12l-4.5 4.5M13.5 5.5l-3 13',
    // a computer chip
    ai: 'M7.5 7.5h9v9h-9zM10 3.5v4M14 3.5v4M10 16.5v4M14 16.5v4M3.5 10h4M3.5 14h4M16.5 10h4M16.5 14h4'
};

export function PackageIcon({ id, className = '' }: { id: PackageId; className?: string }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...LINE}>
            <path d={PACKAGE_PATHS[id]} />
        </svg>
    );
}
