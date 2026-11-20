// the section right under a dark band (the home hero or a PageHero).
// it tucks up under the band's diagonal so its wave texture fills the corner the slant
// cuts away, and the extra top padding keeps the text clear of the edge.
// className goes on the inner column, for the layout and the bottom padding.
// id is for sections the nav links to, like the home page's #services
import type { ReactNode } from 'react';

type UnderBandProps = { id?: string; className?: string; children: ReactNode };

export default function UnderBand({ id, className = '', children }: UnderBandProps) {
    return (
        <section id={id} className="relative -mt-(--slant) overflow-hidden">
            <div className="tx tx-under" aria-hidden="true" />
            <div className={`wrap relative pt-[calc(4rem+var(--slant))] md:pt-[calc(6rem+var(--slant))] ${className}`}>
                {children}
            </div>
        </section>
    );
}
