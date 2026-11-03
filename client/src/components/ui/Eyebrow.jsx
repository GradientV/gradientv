// the small uppercase label that sits above a heading. words only, nothing in front of them.
// onNight = it's inside a dark band, so it switches to the light color.
// as = the tag. a <p> by default; pass 'h2' when the label is the only heading a section has
export default function Eyebrow({ as: Tag = 'p', children, onNight = false, className = '' }) {
    return (
        <Tag className={`eyebrow text-[0.78rem] font-medium uppercase tracking-[0.2em] ${onNight ? 'text-chalk/65' : 'text-ink-soft'} ${className}`}>
            {children}
        </Tag>
    );
}
