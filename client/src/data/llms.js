// builds llms.txt at build time: a short, factual summary of GradientV for AI tools,
// in the format from https://llmstxt.org (a title, a one-paragraph summary, then lists of links).
//
// AI crawlers mostly read the pages themselves, so this is a cover sheet, not a
// replacement for them. the summary is written here; the services, team, clients and
// page links come from the same data the site uses, so they can't drift from it.
// scripts/prerender.js writes the result to dist/llms.txt
import { CONTENT } from '../content/index.js';
import { pageUrl } from './pages.js';
import { CLIENTS, COMPANY } from './site.js';
import { TEAM } from './team.js';

export function buildLlmsTxt() {
    const en = CONTENT.en;

    const team = TEAM.map((person) => {
        const role = en.team.members[person.id].role;
        return role ? `${person.name} (${role})` : person.name;
    }).join(', ');

    return [
        `# ${COMPANY.name}`,
        '',
        `> ${COMPANY.name} (${COMPANY.legalName}) is a small software company that builds websites, internal tools, dashboards and workflow automation for small businesses. It was founded by Ashton Reyes and is based in New York City and Stony Brook, New York. Contact: ${COMPANY.phone.label}, ${COMPANY.email}.`,
        '',
        'Business owners start by describing the work that takes too long or keeps going wrong. GradientV goes through it with them, including whether software is the right fix, and then builds what fits.',
        '',
        'What GradientV builds:',
        '',
        ...en.home.builds.map((service) => `- ${service}`),
        '',
        'Key facts:',
        '',
        `- Team: ${team}`,
        '- Founder: Ashton Reyes, who studies Computer Science and Applied Mathematics at Stony Brook University',
        `- Also known as: ${COMPANY.alternateName}`,
        `- LinkedIn: ${COMPANY.linkedin.href}`,
        '- The website is in English, Spanish and Simplified Chinese',
        '',
        'Common questions:',
        '',
        ...en.home.faq.map((item) => `- ${item.question} ${item.answer}`),
        '',
        '## Pages',
        '',
        `- [Home](${pageUrl('home')}): What GradientV builds, and websites it has built for clients`,
        `- [${en.nav.story}](${pageUrl('story')}): ${en.story.seo.description}`,
        `- [${en.nav.team}](${pageUrl('team')}): The people behind GradientV`,
        `- [${en.nav.contact}](${pageUrl('contact')}): Phone, email and LinkedIn`,
        '',
        '## Client work',
        '',
        ...CLIENTS.map((client) => `- [${client.name}](${client.href}): ${client.about}, built by GradientV`),
        '',
        '## Optional',
        '',
        `- [Spanish](${pageUrl('home', 'es')}): The site in Spanish`,
        `- [Simplified Chinese](${pageUrl('home', 'zh')}): The site in Simplified Chinese`,
        `- [${en.footer.privacy}](${pageUrl('privacy')})`,
        `- [${en.footer.terms}](${pageUrl('terms')})`,
        `- [${en.footer.accessibility}](${pageUrl('accessibility')})`,
        ''
    ].join('\n');
}
