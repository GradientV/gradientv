// the section right under a dark band (the home hero or a PageHero).
// it tucks up under the band's diagonal so its wave texture fills the corner the slant
// cuts away, and the extra top padding keeps the text clear of the edge.
// className goes on the inner column, for the layout and the bottom padding
export default function UnderBand({ className = '', children }) {
    return (
        <section className="relative -mt-(--slant) overflow-hidden">
            <div className="tx tx-under" aria-hidden="true" />
            <div className={`wrap relative pt-[calc(4rem+var(--slant))] md:pt-[calc(6rem+var(--slant))] ${className}`}>
                {children}
            </div>
        </section>
    );
}
