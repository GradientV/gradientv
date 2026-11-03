// facts about the company that are the same in every language.
// the words around them (labels, headings) live in src/content

export const SITE_URL = 'https://gradientv.com';

export const COMPANY = {
    name: 'GradientV',
    // how the logo spells it, so search engines and AI tools treat "Gradient V" as the same company
    alternateName: 'Gradient V',
    legalName: 'GradientV LLC',
    phone: { label: '(917) 907-1034', href: 'tel:9179071034', schema: '+1-917-907-1034' },
    email: 'contact@gradientv.com',
    linkedin: { label: 'linkedin.com/company/gradientv', href: 'https://www.linkedin.com/company/gradientv' }
};

/** the picture that shows up when a link to the site is shared */
export const SHARE_IMAGE = {
    url: `${SITE_URL}/images/brand/og-cover.png`,
    width: 1200,
    height: 630
};

/**
 * logo is the image file, width + height stop the page jumping while it loads.
 * href is the client's real domain, not a preview address: these links tell search
 * engines and AI tools that GradientV made these sites.
 * about is one line in English for the structured data and llms.txt
 */
export const CLIENTS = [
    {
        name: 'InfoReporting Solutions',
        href: 'https://www.inforeportingsolutions.com/',
        about: 'Website, articles and self-assessment tools for a U.S. tax advisory firm',
        logo: '/images/clients/inforeportingsolutionsnew.png',
        width: 657,
        height: 561
    },
    {
        name: 'Bukas Cafe',
        href: 'https://bukascafe.vercel.app/',
        about: 'Website for a café',
        logo: '/images/clients/bukascafe.png',
        width: 825,
        height: 829
    },
    {
        name: 'Swabe Food Truck',
        href: 'https://www.swabefoodtruck.com/',
        about: 'Website for a food truck',
        logo: '/images/clients/swabefoodtruck.png',
        width: 1400,
        height: 1185
    }
];
