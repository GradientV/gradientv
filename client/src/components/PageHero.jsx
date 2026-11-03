// the top of an inner page, in the same dark band as the home page: the Oculus ribs,
// the page's name as the heading, and an optional short line under it in small type.
// like the home page, it leads with a name, not a big statement.
// it ends on the diagonal, so put the page's first section in an UnderBand
export default function PageHero({ title, subtitle }) {
    return (
        <section className="on-night slope-bottom relative overflow-hidden bg-night text-chalk">
            <div className="tx tx-hero" aria-hidden="true" />
            <div className="wrap relative flex flex-col items-center pt-20 pb-[calc(4.5rem+var(--slant))] text-center md:pt-28 md:pb-[calc(6rem+var(--slant))]">
                <h1 className="font-display text-[clamp(2.1rem,4vw,3rem)] leading-none font-semibold tracking-[-0.025em]">{title}</h1>
                {subtitle && (
                    <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed text-balance text-chalk/75 md:text-lg">{subtitle}</p>
                )}
            </div>
        </section>
    );
}
