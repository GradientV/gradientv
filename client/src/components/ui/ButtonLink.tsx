// a link that looks like a button: a square-cornered box with words in it, no icon.
// two looks, so a button can't be almost right:
//   solid   = the main thing to do on the page
//   outline = everything else
// light is the solid one for a dark band.
// size 'sm' is the tighter one for the header on a phone, where space is short
import { Link, type LinkProps } from 'react-router';

export const BUTTON_STYLES = {
    base: 'inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors',
    baseSmall: 'inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium transition-colors sm:px-6 sm:py-3',
    solid: 'bg-ink text-paper hover:bg-accent',
    light: 'bg-chalk text-night hover:bg-accent hover:text-chalk',
    outline: 'border border-ink/70 text-ink hover:bg-ink hover:text-paper'
};

type Variant = 'solid' | 'light' | 'outline';

type ButtonLinkProps = LinkProps & { variant?: Variant; size?: 'md' | 'sm' };

export default function ButtonLink({ to, variant = 'outline', size = 'md', className = '', children, ...rest }: ButtonLinkProps) {
    const base = size === 'sm' ? BUTTON_STYLES.baseSmall : BUTTON_STYLES.base;
    return (
        <Link to={to} className={`${base} ${BUTTON_STYLES[variant]} ${className}`} {...rest}>
            {children}
        </Link>
    );
}
