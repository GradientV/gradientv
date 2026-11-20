// the bar at the top of every page: the logo, the nav, the client login, and the one
// button that matters most for someone new: Build your plan.
// it sticks to the top and is see-through, so the page texture shows behind it.
// below the lg width the nav links (and the client login) fold into a menu that opens under the bar
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useLocale } from '../../context/LocaleContext';
import ButtonLink from '../ui/ButtonLink';
import { CloseIcon, MenuIcon } from '../ui/Icons';

export default function Header() {
    const { t, to } = useLocale();
    const { pathname, hash } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // picking a link closes the phone menu
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname, hash]);

    // Services and Clients aren't pages of their own, they're sections of the home page
    const links = [
        { label: t.nav.services, to: `${to('home')}#services` },
        { label: t.nav.clients, to: `${to('home')}#clients` },
        { label: t.nav.story, to: to('story') },
        { label: t.nav.team, to: to('team') },
        { label: t.nav.contact, to: to('contact') }
    ];

    const isCurrent = (link: { to: string }) => link.to === pathname;
    const onLogin = pathname === to('login');
    const onPlan = pathname === to('plan');

    return (
        <header className="sticky top-0 z-30 border-b border-line/70 bg-paper/85 backdrop-blur-md">
            <div className="wrap flex h-[4.75rem] items-center justify-between gap-4">
                {/* just the mark: the "GRADIENT V" under it shrank to a blur at this size,
                    and the home page already spells the name out in the hero */}
                <Link to={to('home')} aria-label={t.nav.home} className="shrink-0">
                    <img src="/images/brand/mark_black_t.png" alt="" width="847" height="689" className="h-8 w-auto" />
                </Link>

                {/* ---------- wide screens: plain text links in a row ---------- */}
                <nav aria-label={t.nav.label} className="hidden lg:block">
                    <ul className="flex items-center gap-8">
                        {links.map((link) => (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    aria-current={isCurrent(link) ? 'page' : undefined}
                                    // the page you're on is underlined. hover only darkens, so you can't
                                    // mistake the one you're hovering for the one you're on
                                    className={`block py-1.5 text-sm underline-offset-[7px] transition-colors ${
                                        isCurrent(link)
                                            ? 'font-medium text-ink underline decoration-ink decoration-1'
                                            : 'text-ink-soft hover:text-ink'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-2 lg:gap-7">
                    {/* clients know where they're going, so the login is a quiet link here.
                        on a phone it's the last item in the menu */}
                    <Link
                        to={to('login')}
                        aria-current={onLogin ? 'page' : undefined}
                        className={`hidden py-1.5 text-sm underline-offset-[7px] transition-colors lg:block ${
                            onLogin ? 'font-medium text-ink underline decoration-ink decoration-1' : 'text-ink-soft hover:text-ink'
                        }`}
                    >
                        {t.nav.login}
                    </Link>

                    <ButtonLink to={to('plan')} variant="solid" size="sm" aria-current={onPlan ? 'page' : undefined}>
                        {t.nav.plan}
                    </ButtonLink>

                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((open) => !open)}
                        aria-expanded={isMenuOpen}
                        aria-controls="phone-menu"
                        aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
                        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-line bg-paper-bright/60 lg:hidden"
                    >
                        {isMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* ---------- smaller screens: the same links stacked, then the client login ---------- */}
            {isMenuOpen && (
                <nav id="phone-menu" aria-label={t.nav.label} className="border-t border-line bg-paper lg:hidden">
                    <ul className="wrap pb-4">
                        {links.map((link) => (
                            <li key={link.to} className="border-b border-line/70">
                                <Link
                                    to={link.to}
                                    aria-current={isCurrent(link) ? 'page' : undefined}
                                    className="block py-3.5 font-display text-xl font-medium"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                to={to('login')}
                                aria-current={onLogin ? 'page' : undefined}
                                className="block py-3.5 text-base text-ink-soft"
                            >
                                {t.nav.login}
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
