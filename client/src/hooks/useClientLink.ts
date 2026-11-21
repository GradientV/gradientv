// the client link in the header and footer: "Client login", or "Client portal" for someone signed in.
// on the portal itself it says portal while the sign-in is still being checked, so it doesn't flicker
import { useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';
import { pagePath } from '../data/pages';

export function useClientLink(): { label: string; to: string } {
    const { t, to } = useLocale();
    const { status } = useAuth();
    const { pathname } = useLocation();
    // pagePath and not to(), because the portal is English only for now
    const portal = pagePath('portal');

    return status === 'signedIn' || (status === 'checking' && pathname === portal)
        ? { label: t.nav.portal, to: portal }
        : { label: t.nav.login, to: to('login') };
}
