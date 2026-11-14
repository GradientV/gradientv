// the same <App /> as main.tsx, but drawn to a string of HTML instead of to the screen.
// nothing in the browser ever loads this file. `npm run build` compiles it, and
// scripts/prerender.ts calls render() once for every page to make the real HTML files.
//
// StaticRouter is BrowserRouter's twin for when there is no browser: you hand it
// the address as text and it shows that page
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';

// the prerender script needs the list of pages, each language's <html lang>,
// and the builders for the two files written next to the pages
export { CONTENT } from './content/index';
export { PAGES, pagePath } from './data/pages';
export { buildSitemap } from './data/sitemap';
export { buildLlmsTxt } from './data/llms';

/** the HTML for one page. path is like '/es/story' */
export function render(path: string): string {
    return renderToString(
        <StrictMode>
            <StaticRouter location={path}>
                <App />
            </StaticRouter>
        </StrictMode>
    );
}
