// every English word on the site, one object.
// es.ts and zh.ts have the exact same shape, so a view just reads t.home.tagline
// and never needs to know which language it's showing.
// the long legal documents are separate, in src/content/legal
import type { PackageId } from '../../../shared/portal';

/** the words for one package card (home page and Build your plan) */
type PackageWords = { name: string; outcome: string; includes: string[] };

const en = {
    code: 'en' as const,
    htmlLang: 'en',       // <html lang>
    hreflang: 'en',       // what search engines call this language
    ogLocale: 'en_US',    // what link previews call it
    languageName: 'English',

    nav: {
        label: 'Main',
        home: 'GradientV home',
        skip: 'Skip to content',
        services: 'Services',
        clients: 'Clients',
        story: 'Story',
        team: 'Team',
        contact: 'Contact',
        login: 'Client login',
        portal: 'Client portal',
        plan: 'Build your plan',
        openMenu: 'Open menu',
        closeMenu: 'Close menu'
    },

    footer: {
        site: 'Site',
        legal: 'Legal',
        language: 'Language',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        accessibility: 'Accessibility',
        copyright: '© 2026 GradientV LLC. All rights reserved.'
    },

    // the little link buttons under a person
    links: {
        website: 'Website',
        linkedin: 'LinkedIn',
        github: 'GitHub'
    },

    home: {
        seo: {
            title: 'GradientV - Websites, marketing and software for small businesses',
            description: 'GradientV builds websites, marketing, automation, custom software and AI tools for small businesses, with one client portal to see it all. Every project starts with a conversation.'
        },
        // the line under the big logo at the top of the page
        tagline: 'The human side of AI.',
        heroLead: 'Websites, marketing and software for small businesses, starting with a conversation.',
        primaryCta: 'Build your plan',
        secondaryCta: 'See our work',
        // the heading over the package cards (their words are in packages, below)
        packagesHeading: 'Packages',
        addToPlan: 'Add to your plan',
        // the client portal, shown off on the home page
        portal: {
            label: 'The client portal',
            heading: 'Everything we build, in one login.',
            text: 'Every plan comes with the GradientV portal. See how your site is doing, read what it collects, and send us changes without chasing anyone over email.',
            points: [
                'Visitors, and where they came from, including AI search',
                'The leads and signups your site collects',
                'Change requests, tracked from new to done'
            ],
            login: 'Client login',
            // the example portal drawn next to the text. every number on it is made up
            preview: {
                caption: 'An example of the client portal. Each client sees their own site.',
                title: 'Client portal',
                business: 'Example Cafe',
                visitors: 'Visitors',
                period: 'Last 30 days',
                sources: 'Where they came from',
                direct: 'Direct',
                requests: 'Requests',
                requestDone: 'Add our holiday hours',
                requestOpen: 'New photos for the lunch menu',
                done: 'Done',
                inProgress: 'In progress',
                signups: 'Newsletter signups',
                signupsValue: '+23 this month'
            }
        },
        clientsLabel: 'Clients',
        // the small "coming next" section on the home page. the button opens an email to us
        learn: {
            heading: 'Coming next',
            cta: 'Get early access',
            emailSubject: 'Early access: newsletter and courses',
            items: [
                { title: 'AI newsletter', text: 'Short, practical updates on what’s new in AI and how a small business can use it.' },
                { title: 'AI courses', text: 'Hands-on lessons that teach owners and their teams to use AI in their daily work.' }
            ]
        },
        visit: 'Visit site',
        // every answer here repeats something the site already says (Story, Contact,
        // the client portal). the same questions go into the structured data and llms.txt
        faqLabel: 'FAQ',
        faq: [
            {
                question: 'What does GradientV build?',
                answer: 'Five packages for small businesses: Website & Brand, Growth (SEO, AI search and reviews), Automation, Custom Software, and AI Upgrade (chatbots, RAG, MCP and AI agents). Everything is built around how your business already works, and all of it shows up in one client portal.'
            },
            {
                question: 'What kinds of businesses do you work with?',
                answer: 'Small businesses. Our clients include Bukas Cafe, Swabe Food Truck, and InfoReporting Solutions, a tax advisory firm.'
            },
            {
                question: 'How does a project start?',
                answer: 'With a conversation. Build your plan by picking the packages you need, or just call us. We go through how your business runs, including whether software is the right fix, before anything gets built.'
            },
            {
                question: 'How much does it cost?',
                answer: 'Every project is quoted after the first conversation, because no two businesses need the same thing. You get a clear price before anything gets built.'
            },
            {
                question: 'What is GEO, and do I need it?',
                answer: 'GEO means getting recommended when customers ask AI tools like ChatGPT, Gemini or Perplexity for a business like yours. It’s part of the Growth package, and your client portal shows which visitors came from AI search.'
            },
            {
                question: 'What are RAG and MCP, and do I need them?',
                answer: 'RAG lets an AI assistant answer from your own documents, like menus, policies or past work, and show where each answer came from. MCP is a standard way to connect AI tools like Claude and ChatGPT to the software you already use. We set up and build both as part of AI Upgrade, and we’ll tell you if your business doesn’t need them yet.'
            },
            {
                question: 'Why not hire a developer or buy off-the-shelf software?',
                answer: 'A full-time engineer is a six-figure commitment before anyone knows whether there’s a year of work, and off-the-shelf software stops fitting the moment you need something its makers didn’t plan for. We build and run software made for your business, without you hiring an engineering team.'
            },
            {
                question: 'Do you look after the software after launch?',
                answer: 'Yes. We build and run what we make, so you don’t have to hire for it. Every client gets a portal where they can see how their site is doing, read what it collects, and send us change requests.'
            },
            {
                question: 'How do you use AI?',
                answer: 'Where it actually saves you time. We start with the bottleneck that’s costing you the most, apply the smallest thing that solves it, and make sure you understand what it does and where it stops.'
            },
            {
                question: 'Who will I be working with?',
                answer: 'Ashton Reyes, GradientV’s founder. You get one point of contact who explains things in plain language and is accountable when something needs to change.'
            }
        ]
    },

    // the packages, on the home page and on Build your plan.
    // keyed by the ids in shared/portal.ts, so a package can't be missing its words
    packages: {
        includesLabel: 'Includes',
        portalIncluded: 'Every plan includes the client portal.',
        items: {
            website: {
                name: 'Website & Brand',
                outcome: 'Get online, properly.',
                includes: ['A fast, full-stack website', 'Logo and brand identity', 'Your own domain and business email', 'Contact, booking or ordering forms']
            },
            growth: {
                name: 'Growth',
                outcome: 'Get found by more customers.',
                includes: ['SEO: show up on Google', 'GEO: get recommended by ChatGPT and other AI search', 'Google Business profile and reviews', 'Email newsletters and social content']
            },
            automation: {
                name: 'Automation',
                outcome: 'Save hours every week.',
                includes: ['Lead follow-ups and booking confirmations', 'Review requests and reminders', 'Invoices and payment reminders', 'Connects the tools you already use']
            },
            custom: {
                name: 'Custom Software',
                outcome: 'Run your business your way.',
                includes: ['Internal tools and dashboards', 'Online ordering and client portals', 'AI assistants trained on your business', 'Built around how you already work']
            },
            // chatbots, RAG, MCP and the other AI work. it gets its own full-width card
            ai: {
                name: 'AI Upgrade',
                outcome: 'Put AI to work in your business.',
                includes: ['AI chatbot for your website', 'RAG: AI that answers from your own files', 'MCP: connect AI tools to your software', 'AI agents that handle multi-step tasks', 'Custom GPTs and Claude skills for your team', 'AI that reads invoices, receipts and forms']
            }
        } satisfies Record<PackageId, PackageWords>
    },

    // the Build your plan page: pick packages, say who you are, send it
    plan: {
        seo: {
            title: 'Build your plan - GradientV',
            description: 'Pick the packages your small business needs (website and brand, growth, automation, custom software or AI upgrades) and we’ll reply within one business day.'
        },
        label: 'Build your plan',
        heading: 'Pick what your business needs. We’ll take it from there.',
        intro: 'No prices to compare and nothing to pay. Every plan starts with a conversation.',
        stepPackages: 'What do you need?',
        stepPackagesHint: 'Pick one or more. You can change your mind on the call.',
        stepBusiness: 'About your business',
        stepContact: 'How should we reach you?',
        businessName: 'Business name',
        businessType: 'Type of business',
        businessTypePlaceholder: 'Cafe, salon, law office…',
        message: 'What’s slowing you down?',
        messagePlaceholder: 'For example: we answer the same booking questions all day.',
        name: 'Your name',
        email: 'Email',
        phone: 'Phone',
        optional: 'optional',
        summaryHeading: 'Your plan',
        summaryEmpty: 'Nothing picked yet.',
        portalLine: 'Client portal',
        portalIncluded: 'Included',
        remove: (name: string) => `Remove ${name}`,
        submit: 'Request my plan',
        sending: 'Sending…',
        pickOne: 'Pick at least one package first.',
        reply: 'We reply within one business day.',
        error: 'Something went wrong sending your plan. Try again, or call us at (917) 907-1034.',
        tooMany: 'We’ve had a lot of requests today. Call or email us and we’ll get right back to you.',
        // the hidden field only a bot fills in. a screen reader never reaches it, this is just in case
        honeypot: 'Leave this empty',
        done: {
            heading: (name: string) => `Thanks, ${name}. Your plan is in.`,
            picked: 'You picked',
            next: 'What happens next',
            steps: [
                'We look over what you picked and what you told us.',
                'We call or email you within one business day.',
                'Together we shape the plan, and you get a clear quote before anything gets built.'
            ],
            home: 'Back to home'
        }
    },

    contact: {
        seo: {
            title: 'Contact - GradientV',
            description: 'Call (917) 907-1034 or email contact@gradientv.com to tell us about your project. We build websites, marketing, automation, custom software and AI tools for small businesses.'
        },
        label: 'Contact',
        heading: 'Tell us how your business runs today.',
        text: 'Start with the work that takes too long or keeps going wrong. We’ll go through it with you, including whether software is the right fix.',
        phone: 'Phone',
        email: 'Email',
        linkedin: 'LinkedIn',
        planHeading: 'Already know what you need?',
        planText: 'Pick your packages and we’ll come back with a plan within one business day.'
    },

    story: {
        seo: {
            title: 'Story - GradientV',
            description: 'Why GradientV exists: small businesses know AI could help, but few have the time or staff to put it to work. We build the software and train their teams to use it.'
        },
        label: 'Story',
        heading: 'Making AI useful for small businesses.',
        lead: 'Software is faster to build than ever, but most small business owners have no time to learn how to build it with AI. GradientV does that part for them, then teaches their teams to use what we build.',
        gap: {
            heading: 'The gap.',
            body: [
                'Small businesses know AI could change how they work. Few know where to start. In a May 2026 U.S. Census Bureau report, 37% of firms with 250 or more employees said they use AI. Among firms with four or fewer employees, it was under 20%.',
                'Most owners are already running everything themselves, so learning a new technology falls to the bottom of the list. When they do look for help, they usually find two options.'
            ],
            // the two choices a small business is normally left with
            options: [
                {
                    title: 'Hire an engineer',
                    cost: 'Six figures a year',
                    text: 'A full-time salary, benefits and a hiring process most owners have no time to run, all before anyone knows if there’s a full year of work. For a fifteen-person company, that can take up a big part of the budget.'
                },
                {
                    title: 'Buy a generic tool',
                    cost: 'Fast to start, hard to change',
                    text: 'Affordable and often useful, until you need something its makers didn’t plan for. From then on, your business has to work around the tool.'
                }
            ]
        },
        middle: {
            label: 'What we do',
            heading: 'We’re the bridge between your business and AI.',
            body: [
                'GradientV is a software company built around AI. AI lets us build custom software far faster than before, so a small business can get tools that once required hiring an engineer.',
                'Every project starts with a conversation about how your business runs and where the time goes. Then we build what you need through five packages: Website & Brand, Growth, Automation, Custom Software and AI Upgrade. Everything connects to one client portal, where you can see results and send us changes.'
            ]
        },
        ai: {
            heading: 'How we use AI.',
            body: [
                'We start with the problem costing you the most time and use the smallest thing that solves it. That might be an automation, an assistant that answers from your own documents, or a connection that lets AI tools work with the software you already use.',
                'If software isn’t the right fix, we’ll tell you. When it is, we train your team and explain what it does and where it stops, so you always know what you have and how to use it.'
            ]
        },
        next: {
            heading: 'Where this is going.',
            body: [
                'Every project leaves us with parts we can reuse, which makes the next one faster and more affordable. Over time, those builds will become a software platform for small and mid-size businesses.',
                'We’re also working on a newsletter and courses, so owners and their teams can keep learning how to use AI on their own.'
            ]
        },
        founder: {
            heading: "Who you're working with.",
            role: 'Founder',
            body: [
                "I started GradientV because I kept running into the same gap from both sides. I'm a Computer Science and Applied Mathematics student at Stony Brook University, focused on data science, machine learning, and applied AI systems, and I kept meeting small business owners who needed exactly that kind of work and had nowhere sensible to get it.",
                "My background includes coursework in data science, data mining, machine learning, and analytics. I'm an Undergraduate Researcher at CRIZM, an AI-powered platform built to support grading workflows, feedback systems, and academic outcomes reporting, and I bring that experience into my work at GradientV.",
                "I'm early in my career, I'm still learning, and I would rather say that plainly than oversell it. What I can promise is that I'll be direct about what I can build, honest about what I can't, and that you'll always be talking to the person actually doing the work."
            ]
        }
    },

    team: {
        seo: {
            title: 'Team - GradientV',
            description: 'Meet the people behind GradientV.'
        },
        label: 'Team',
        heading: 'The people you’ll actually work with.',
        portraitAlt: (name: string) => `Portrait of ${name}`,
        storyLink: 'Read the full story',
        // keyed by the person's id in src/data/team.ts
        members: {
            ashton: {
                role: 'Founder',
                bio: "I'm Ashton Reyes, founder of GradientV, with a background in Computer Science and Applied Mathematics and a focus on data science, machine learning, and applied AI systems."
            }
        }
    },

    login: {
        seo: {
            title: 'Client login - GradientV',
            description: 'Sign in to the GradientV client portal.'
        },
        label: 'Client portal',
        heading: 'Sign in',
        intro: 'For GradientV clients.',
        email: 'Email',
        password: 'Password',
        submit: 'Sign in',
        sending: 'Signing in…',
        // shown after pressing Sign in when the server or its database can't be reached
        unavailable: "The client portal can't be reached right now. Try again in a few minutes, or reach us directly.",
        contact: 'Contact us',
        pitchHeading: 'One place for everything we build for you.',
        pitchText: 'See how your site is doing and send us change requests, all in one place.',
        notClient: 'Not a client yet?'
    },

    // the two pages behind the login are English only for now, like videos

    // where an invite link lands
    setPassword: {
        seo: {
            title: 'Choose your password - GradientV',
            description: 'Choose a password for the GradientV client portal.'
        },
        label: 'Client portal',
        heading: 'Choose your password',
        checking: 'Checking your link…',
        introFor: 'This sets up the login for',
        email: 'Email',
        password: 'New password',
        confirm: 'Type it again',
        hint: 'At least 10 characters.',
        submit: 'Save and sign in',
        sending: 'Saving…',
        mismatch: 'Those two passwords are not the same.',
        badLink: 'This link does not work anymore. It was already used, or it is more than 7 days old. Ask us for a new one.',
        contact: 'Contact us'
    },

    portal: {
        seo: {
            title: 'Client portal - GradientV',
            description: 'The GradientV client portal.'
        },
        label: 'Client portal',
        checking: 'Checking who is signed in…',
        signedInAs: 'Signed in as',
        signOut: 'Sign out',
        signingOut: 'Signing out…',
        requests: {
            heading: 'Requests',
            intro: 'Tell us what you would like changed on your site.',
            label: 'What would you like changed?',
            placeholder: 'For example: we close at 9pm on Fridays now.',
            submit: 'Send request',
            sending: 'Sending…',
            sent: 'Sent. We will take a look.',
            loading: 'Loading requests…',
            listHeading: 'What you have sent',
            empty: 'Nothing sent yet.',
            // the next two are what i see in place of the form when i look at a client's portal
            viewOnly: 'The box for sending a request is hidden while you are viewing as a client.',
            listHeadingTheirs: 'What they have sent',
            // the keys are the statuses the server uses (server/src/models/ChangeRequest.ts)
            status: {
                'new': 'New',
                'in progress': 'In progress',
                'done': 'Done'
            },
            // what the admin login sees instead of the box
            inboxHeading: 'Requests from clients',
            inboxEmpty: 'No requests yet.',
            statusLabel: 'Status'
        },
        stats: {
            heading: 'Site stats',
            periodLabel: 'Time period',
            // the keys are how many days the server gets asked for
            periods: {
                7: 'Last 7 days',
                30: 'Last 30 days'
            },
            loading: 'Loading your stats…',
            visitors: 'Visitors',
            pageviews: 'Page views',
            chartHeading: 'Visitors per day',
            day: 'Day',
            pagesHeading: 'Most viewed pages',
            homePage: 'Home page',
            sourcesHeading: 'Where visitors came from',
            direct: 'Direct or unknown',
            otherSources: 'Other sites',
            none: 'Nothing to show for these days yet.',
            note: 'Days are counted on UTC time, so each one starts in the evening in New York. The numbers refresh every 10 minutes.'
        },
        // admin only: what came in through Build your plan on the public site
        plans: {
            heading: 'Plan requests',
            intro: 'Sent from Build your plan on the public site. Nobody here is a client yet.',
            loading: 'Loading plan requests…',
            empty: 'No plan requests yet.',
            statusLabel: 'Status',
            noBusiness: 'No business name given',
            // the languages the form can be filled in, so i know which one to answer in
            languages: { en: 'English', es: 'Spanish', zh: 'Chinese' } as Record<string, string>
        },
        // admin only: the menu for looking at a client's portal the way they see it
        viewAs: {
            label: 'View as',
            mine: 'Me: requests from clients',
            notSignedUp: 'invite not used yet',
            // the business name goes between these two
            noticeStart: 'This is the portal as',
            noticeEnd: 'sees it. Nothing can be changed from here.'
        },
        // the next two only show for a client whose own website sends things to the portal
        assessments: {
            heading: 'Assessments',
            intro: 'Every self-assessment finished on your site. Results are anonymous: nothing here says who took one.',
            loading: 'Loading your assessments…',
            total: 'Completed',
            last30: 'Last 30 days',
            byTypeHeading: 'By assessment',
            completed: 'completed',
            averageScore: 'Average score',
            // the keys are the risk levels the server uses (server/src/models/AssessmentResult.ts)
            risk: {
                low: 'Low risk',
                medium: 'Medium risk',
                high: 'High risk'
            },
            recentHeading: 'Latest results',
            date: 'Date',
            assessment: 'Assessment',
            score: 'Score',
            riskLevel: 'Risk level',
            showAll: 'Show all',
            showFewer: 'Show fewer',
            latestOnly: 'These are the latest results. The numbers above count all of them.'
        },
        subscribers: {
            heading: 'Newsletter signups',
            intro: 'Everyone who signed up for updates on your site.',
            loading: 'Loading your signups…',
            total: 'Signed up',
            empty: 'Nobody has signed up yet.',
            copy: 'Copy all emails',
            copied: 'Copied. Paste them wherever you send email from.',
            copyFailed: 'Could not copy. Select them from the list below.',
            listHeading: 'Newest first',
            from: 'from',
            showAll: 'Show all',
            showFewer: 'Show fewer',
            newestOnly: 'This list and the copy button stop at the newest 1,000.'
        }
    },

    notFound: {
        seo: {
            title: 'Page Not Found - GradientV',
            description: 'This page moved, or never existed.'
        },
        label: 'Error 404',
        heading: 'This page moved, or never existed.',
        body: 'The link you followed points somewhere we do not have a page. Nothing is broken on your end. Head back to the homepage, or tell us what you were looking for and we will point you to it.',
        home: 'Back to home',
        contact: 'Contact us',
        work: 'See our work'
    },

    // English only. the page is not in the nav
    videos: {
        seo: {
            title: 'Videos - GradientV',
            description: 'A short introduction to GradientV, which builds websites, internal tools, and automations for small businesses.'
        },
        heading: 'Videos',
        title: 'GradientV Introduction',
        text: 'Learn about GradientV and our mission to help businesses adopt AI in practical, measurable ways.',
        captions: 'English',
        unsupported: "Your browser doesn't support HTML5 video. Please update your browser.",
        summaryHeading: 'Video summary',
        summary: [
            'This short introduction shows how GradientV helps growing businesses adopt AI in practical, measurable ways, from modern websites and workflow automation to AI-powered dashboards and internal assistants.',
            'This video has no narration. Its only audio is an instrumental music track, so nothing spoken is missed by watching it without sound. Captions identifying the music are available through the player.'
        ]
    }
};

export default en;
