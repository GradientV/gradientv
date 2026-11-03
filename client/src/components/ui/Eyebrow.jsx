// the small uppercase label that sits above a heading. words only, nothing in front of them.
// onNight = it's inside a dark band, so it switches to the light color
export default function Eyebrow({ children, onNight = false, className = '' }) {
    return (
        <p className={`eyebrow text-[0.78rem] font-medium uppercase tracking-[0.2em] ${onNight ? 'text-chalk/65' : 'text-ink-soft'} ${className}`}>
            {children}
        </p>
    );
}
