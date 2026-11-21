// the whole site in one screenful.
// React Router looks at the URL and picks which view goes inside <Layout>.
// the routes aren't typed out by hand: they're built from PAGES (src/data/pages.ts),
// one for every page in every language it's translated into, so /story, /es/story
// and /zh/story all land on the same <StoryView /> and it reads its words by language
import type { ReactElement } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import Layout from './components/layout/Layout';
import { AuthProvider } from './context/AuthContext';
import { LocaleProvider } from './context/LocaleContext';
import { PAGES, pagePath, type Page, type PageId } from './data/pages';
import ContactView from './views/ContactView';
import HomeView from './views/HomeView';
import LegalView from './views/LegalView';
import LoginView from './views/LoginView';
import NotFoundView from './views/NotFoundView';
import PlanView from './views/PlanView';
import PortalView from './views/PortalView';
import SetPasswordView from './views/SetPasswordView';
import StoryView from './views/StoryView';
import TeamView from './views/TeamView';
import VideosView from './views/VideosView';

/** which view draws each page id. a page in PAGES without a view here is an error */
const VIEWS: Record<PageId, ReactElement> = {
    home: <HomeView />,
    plan: <PlanView />,
    story: <StoryView />,
    team: <TeamView />,
    contact: <ContactView />,
    login: <LoginView />,
    setPassword: <SetPasswordView />,
    portal: <PortalView />,
    privacy: <LegalView doc="privacy" />,
    terms: <LegalView doc="terms" />,
    accessibility: <LegalView doc="accessibility" />,
    videos: <VideosView />
};

/** one <Route> for every language each of these pages is in */
function routesFor(pages: readonly Page[]) {
    return pages.flatMap((page) => page.locales.map((code) => (
        <Route key={`${code}:${page.id}`} path={pagePath(page.id, code)} element={VIEWS[page.id]} />
    )));
}

/**
 * Anything that isn't a page. The old site's addresses ended in .html
 * (/story.html, /es/index.html), so those get sent to the new address instead
 * of a 404. On Vercel this never runs, vercel.json redirects them first.
 */
function UnknownPath() {
    const { pathname } = useLocation();
    if (pathname.endsWith('.html')) {
        return <Navigate to={pathname.replace(/(\/index)?\.html$/, '') || '/'} replace />;
    }
    return <NotFoundView />;
}

export default function App() {
    return (
        <LocaleProvider>
            {/* around everything, so the header can tell a signed-in client from a visitor.
                it only asks the server on the pages marked auth in src/data/pages.ts */}
            <AuthProvider>
                <Routes>
                    <Route element={<Layout />}>
                        {routesFor(PAGES)}
                        <Route path="*" element={<UnknownPath />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </LocaleProvider>
    );
}
