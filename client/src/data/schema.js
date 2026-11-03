// the structured data that search engines and AI answer engines read (JSON-LD).
// it says, in a format a machine can't misread, who GradientV is, who works here,
// what we build, whose websites we've made, and what each page is.
//
// every page carries the same company, website and people entries, tied together
// by their @id, plus entries for the page itself. so whichever single page an AI
// tool fetches, it gets the whole picture. Seo.jsx turns the result into the <script> tag

import { CONTENT } from '../content/index.js';
import { LOCALES, pageUrl } from './pages.js';
import { CLIENTS, COMPANY, SHARE_IMAGE, SITE_URL } from './site.js';
import { TEAM } from './team.js';

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** one @id per person, the same in every language */
const personId = (id) => `${SITE_URL}/team#${id}`;

// the subjects AI tools match against when someone asks who does this kind of work.
// kept to what the site itself says we build
const KNOWS_ABOUT = [
    'Website design and development',
    'Internal tools for small businesses',
    'Business dashboards',
    'Workflow automation',
    'Applied AI for small businesses'
];

/** the company */
function organization(t) {
    return {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: COMPANY.name,
        alternateName: COMPANY.alternateName,
        legalName: COMPANY.legalName,
        url: `${SITE_URL}/`,
        description: t.home.seo.description,
        slogan: t.home.tagline,
        logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/images/brand/stacked_black_t.png`,
            width: 1174,
            height: 1106
        },
        image: SHARE_IMAGE.url,
        email: COMPANY.email,
        telephone: COMPANY.phone.schema,
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: COMPANY.email,
            telephone: COMPANY.phone.schema,
            url: pageUrl('contact', t.code)
        },
        // where the team is today. add a city here once we're taking clients there
        areaServed: [
            { '@type': 'Place', name: 'New York City, New York' },
            { '@type': 'Place', name: 'Stony Brook, New York' }
        ],
        knowsAbout: KNOWS_ABOUT,
        founder: { '@id': personId('ashton') },
        employee: TEAM.map((person) => ({ '@id': personId(person.id) })),
        sameAs: [COMPANY.linkedin.href],
        // the services, in the page's language
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: t.home.buildLabel,
            itemListElement: t.home.builds.map((service) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: service, provider: { '@id': ORGANIZATION_ID } }
            }))
        }
    };
}

/** the website, which exists in all three languages */
function website(t) {
    return {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: COMPANY.name,
        alternateName: COMPANY.alternateName,
        description: t.home.seo.description,
        inLanguage: LOCALES.map((locale) => CONTENT[locale.code].htmlLang),
        publisher: { '@id': ORGANIZATION_ID }
    };
}

/** everyone on the Team page. a role is left out until the Team page has one */
function people(t) {
    return TEAM.map((person) => {
        const role = t.team.members[person.id].role;
        const website = person.links.find((link) => link.kind === 'website');
        const profiles = person.links.filter((link) => link.kind !== 'website').map((link) => link.href);

        return {
            '@type': 'Person',
            '@id': personId(person.id),
            name: person.name,
            ...(role && { jobTitle: role }),
            worksFor: { '@id': ORGANIZATION_ID },
            ...(person.photo && { image: `${SITE_URL}${person.photo.src}` }),
            ...(website && { url: website.href }),
            ...(profiles.length > 0 && { sameAs: profiles }),
            ...(person.id === 'ashton' && { affiliation: { '@type': 'CollegeOrUniversity', name: 'Stony Brook University' } })
        };
    });
}

/** the page itself. type is a schema.org page type: WebPage, AboutPage, ContactPage */
function webPage(t, url, type, seo, hasBreadcrumb) {
    return {
        '@type': type,
        '@id': `${url}#webpage`,
        url,
        name: seo.title,
        description: seo.description,
        inLanguage: t.htmlLang,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
        ...(hasBreadcrumb && { breadcrumb: { '@id': `${url}#breadcrumb` } })
    };
}

/** GradientV > this page. search results can show it in place of the bare address */
function breadcrumb(t, url, name) {
    return {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: COMPANY.name, item: pageUrl('home', t.code) },
            { '@type': 'ListItem', position: 2, name, item: url }
        ]
    };
}

/** the sites on the home page's client tiles, each marked as made by GradientV */
function clientWork(t) {
    return {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#clients`,
        name: t.home.clientsLabel,
        itemListElement: CLIENTS.map((client, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'WebSite',
                name: client.name,
                url: client.href,
                description: client.about,
                creator: { '@id': ORGANIZATION_ID },
                publisher: { '@type': 'Organization', name: client.name }
            }
        }))
    };
}

/** the shared entries plus a page's own */
function graph(t, ...pageEntries) {
    return {
        '@context': 'https://schema.org',
        '@graph': [organization(t), website(t), ...people(t), ...pageEntries]
    };
}

/** an inner page: the page entry and its breadcrumb */
function innerPage(t, url, type, seo, name) {
    return graph(t, webPage(t, url, type, seo, true), breadcrumb(t, url, name));
}

/** the home page is also an FAQ page: its questions section, word for word */
export function homeSchema(t) {
    const url = pageUrl('home', t.code);
    return graph(
        t,
        {
            ...webPage(t, url, 'WebPage', t.home.seo, false),
            '@type': ['WebPage', 'FAQPage'],
            mainEntity: t.home.faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer }
            }))
        },
        clientWork(t)
    );
}

export function storySchema(t, url) {
    return innerPage(t, url, 'AboutPage', t.story.seo, t.story.label);
}

export function teamSchema(t, url) {
    return innerPage(t, url, 'AboutPage', t.team.seo, t.team.label);
}

export function contactSchema(t, url) {
    return innerPage(t, url, 'ContactPage', t.contact.seo, t.contact.label);
}

/** privacy, terms and accessibility. meta is the document's own title, description and heading */
export function legalSchema(t, url, meta) {
    return innerPage(t, url, 'WebPage', meta, meta.heading);
}

export function videoSchema(t) {
    return graph(t, {
        '@type': 'VideoObject',
        name: 'GradientV Introduction',
        description: 'A short brand introduction to GradientV. The video has no narration; its content is conveyed visually and its only audio is instrumental music.',
        contentUrl: `${SITE_URL}/videos/introduction.mp4`,
        encodingFormat: 'video/mp4',
        duration: 'PT11S',
        width: 3840,
        height: 2160,
        uploadDate: '2026-06-10',
        inLanguage: 'en',
        publisher: { '@id': ORGANIZATION_ID }
    });
}
