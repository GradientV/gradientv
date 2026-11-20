// the top of an inner page, in the same dark band as the home page: the Oculus ribs,
// the page's name as a small label, and the page's real point as the heading.
//   label     the page's name ("Story"). small, so it doesn't compete with the heading
//   title     what the page is about ("Software shouldn't be a luxury."). the h1
//   subtitle  an optional line under it
// it ends on the diagonal, so put the page's first section in an UnderBand
import Eyebrow from './ui/Eyebrow';

type PageHeroProps = { label?: string; title: string; subtitle?: string };

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
    return (
        <section className="on-night slope-bottom relative overflow-hidden bg-night text-chalk">
            <div className="tx tx-hero" aria-hidden="true" />
            <div className="wrap relative flex flex-col items-center pt-16 pb-[calc(4.5rem+var(--slant))] text-center md:pt-24 md:pb-[calc(5.5rem+var(--slant))]">
                {label && <Eyebrow onNight>{label}</Eyebrow>}
                <h1 className={`display-lg max-w-[22ch] ${label ? 'mt-5' : ''}`}>{title}</h1>
                {subtitle && (
                    <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed text-balance text-chalk/75 md:text-lg">{subtitle}</p>
                )}
            </div>
        </section>
    );
}
