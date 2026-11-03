// a link that looks like a button: a square-cornered box with words in it, no icon.
// two looks, so a button can't be almost right:
//   solid   = the main thing to do on the page
//   outline = everything else
// light is the solid one for a dark band
import { Link } from 'react-router';

export const BUTTON_STYLES = {
    base: 'inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors',
    solid: 'bg-ink text-paper hover:bg-accent',
    light: 'bg-chalk text-night hover:bg-accent hover:text-chalk',
    outline: 'border border-ink/70 text-ink hover:bg-ink hover:text-paper'
};

export default function ButtonLink({ to, variant = 'outline', className = '', children, ...rest }) {
    return (
        <Link to={to} className={`${BUTTON_STYLES.base} ${BUTTON_STYLES[variant]} ${className}`} {...rest}>
            {children}
        </Link>
    );
}
