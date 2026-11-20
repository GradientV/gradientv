// every Chinese (Simplified) word on the site. same shape as en.ts, see the notes there

import en from './en';
import type { Content } from './index';

const zh: Content = {
    code: 'zh',
    htmlLang: 'zh-Hans',
    hreflang: 'zh-Hans',
    ogLocale: 'zh_CN',
    languageName: '中文',

    nav: {
        label: '主导航',
        home: 'GradientV 首页',
        skip: '跳到主要内容',
        services: '服务',
        clients: '客户',
        story: '故事',
        team: '团队',
        contact: '联系我们',
        login: '客户登录',
        plan: '定制您的方案',
        openMenu: '打开菜单',
        closeMenu: '关闭菜单'
    },

    footer: {
        site: '网站',
        legal: '法律信息',
        language: '语言',
        privacy: '隐私政策',
        terms: '服务条款',
        accessibility: '无障碍声明',
        copyright: '© 2026 GradientV LLC. 保留所有权利。'
    },

    links: {
        website: '个人网站',
        linkedin: 'LinkedIn',
        github: 'GitHub'
    },

    home: {
        seo: {
            title: 'GradientV - 为小企业打造网站、营销与软件',
            description: 'GradientV 为小企业打造网站、营销、自动化和定制软件，并提供一个客户门户，让一切一目了然。每个项目都从一次对话开始。'
        },
        tagline: '让 AI 有人情味。',
        heroLead: '为小企业打造网站、营销和软件，从一次对话开始。',
        primaryCta: '定制您的方案',
        secondaryCta: '看看我们的作品',
        packagesHeading: '服务套餐',
        addToPlan: '加入方案',
        portal: {
            label: '客户门户',
            heading: '我们打造的一切，一个账号全看到。',
            text: '每个方案都包含 GradientV 客户门户。查看网站表现和收集到的信息，并直接向我们提交修改需求，不用再来回发邮件。',
            points: [
                '访客数量及来源，包括 AI 搜索',
                '网站收集到的潜在客户和订阅',
                '修改需求，从提交到完成全程可见'
            ],
            login: '客户登录',
            preview: {
                caption: '客户门户示例。每位客户看到的都是自己的网站。',
                title: '客户门户',
                business: '示例咖啡馆',
                visitors: '访客',
                period: '最近 30 天',
                sources: '访客来源',
                direct: '直接访问',
                requests: '修改需求',
                requestDone: '添加节假日营业时间',
                requestOpen: '更新午餐菜单照片',
                done: '已完成',
                inProgress: '进行中',
                signups: '电子报订阅',
                signupsValue: '本月 +23'
            }
        },
        clientsLabel: '客户',
        visit: '访问网站',
        faqLabel: '常见问题',
        faq: [
            {
                question: 'GradientV 打造什么？',
                answer: '我们为小企业提供四个服务套餐：网站与品牌、增长（SEO、AI 搜索与评价）、自动化和定制软件。一切都围绕您现有的工作方式来做，并且都汇集在同一个客户门户里。'
            },
            {
                question: '你们和哪些企业合作？',
                answer: '小企业。我们的客户包括 Bukas Cafe、Swabe Food Truck，以及税务咨询公司 InfoReporting Solutions。'
            },
            {
                question: '项目是怎么开始的？',
                answer: '从一次对话开始。您可以选好需要的套餐来定制方案，也可以直接给我们打电话。我们会和您一起梳理生意的运转方式，包括软件到底是不是合适的解决办法，然后才开始动手。'
            },
            {
                question: '费用是多少？',
                answer: '每个项目都会在第一次对话之后报价，因为没有两家企业的需求是一样的。在动手之前，您会先拿到清晰的价格。'
            },
            {
                question: '什么是 GEO？我需要吗？',
                answer: 'GEO 指的是当顾客向 ChatGPT、Gemini 或 Perplexity 等 AI 工具寻找像您这样的商家时，让 AI 推荐您。它属于增长套餐，您的客户门户会显示哪些访客来自 AI 搜索。'
            },
            {
                question: '为什么不直接招一名工程师，或者买现成的软件？',
                answer: '全职工程师意味着六位数的投入，而且要在确定是否有一整年工作量之前就先承诺；现成软件一旦遇到开发商没考虑到的需求，就不再合用。我们为您的企业量身打造并持续运行软件，您无需组建工程团队。'
            },
            {
                question: '上线之后你们还负责吗？',
                answer: '负责。我们打造并持续运行自己做的东西，您不必为此另外招人。每位客户都有一个专属门户，可以查看网站表现和网站收集到的信息，并直接向我们提交修改需求。'
            },
            {
                question: '你们怎么用 AI？',
                answer: '用在真正能为您节省时间的地方。我们从最耗费您时间的瓶颈入手，用最小的方案解决它，并确保您清楚它能做什么、做不到什么。'
            },
            {
                question: '我会和谁合作？',
                answer: '和真正做事的人。您会有一位固定联系人，用通俗的语言解释一切，并在需要调整时负责到底。'
            }
        ]
    },

    packages: {
        includesLabel: '包含',
        portalIncluded: '每个方案都包含客户门户。',
        items: {
            website: {
                name: '网站与品牌',
                outcome: '把生意好好地搬到线上。',
                includes: ['快速、完整的网站', '标志与品牌形象', '专属域名和企业邮箱', '联系、预约或下单表单']
            },
            growth: {
                name: '增长',
                outcome: '让更多顾客找到您。',
                includes: ['SEO：出现在 Google 搜索中', 'GEO：获得 ChatGPT 等 AI 搜索的推荐', 'Google 商家资料与评价', '电子报和社交媒体内容']
            },
            automation: {
                name: '自动化',
                outcome: '每周省下好几个小时。',
                includes: ['潜在客户跟进与预约确认', '邀请评价与提醒', '发票与付款提醒', '连接您已经在用的工具']
            },
            custom: {
                name: '定制软件',
                outcome: '按您的方式经营。',
                includes: ['内部工具与数据仪表盘', '在线点单与客户门户', '基于您业务训练的 AI 助手', '围绕您现有的工作方式打造']
            }
        }
    },

    plan: {
        seo: {
            title: '定制您的方案 - GradientV',
            description: '为您的小企业选择需要的服务套餐（网站与品牌、增长、自动化或定制软件），我们会在一个工作日内回复。'
        },
        label: '定制您的方案',
        heading: '选出您的生意需要什么，剩下的交给我们。',
        intro: '不用比价，也不用付款。每个方案都从一次对话开始。',
        stepPackages: '您需要什么？',
        stepPackagesHint: '可以选一个或多个，通话时也可以再改。',
        stepBusiness: '关于您的生意',
        stepContact: '我们怎么联系您？',
        businessName: '商家名称',
        businessType: '行业类型',
        businessTypePlaceholder: '咖啡馆、美发店、律师事务所…',
        message: '是什么在拖慢您？',
        messagePlaceholder: '例如：我们整天都在回答同样的预约问题。',
        name: '您的姓名',
        email: '电子邮箱',
        phone: '电话',
        optional: '选填',
        summaryHeading: '您的方案',
        summaryEmpty: '还没有选择。',
        portalLine: '客户门户',
        portalIncluded: '已包含',
        remove: (name) => `移除 ${name}`,
        submit: '提交我的方案',
        sending: '正在发送…',
        pickOne: '请先至少选择一个套餐。',
        reply: '我们会在一个工作日内回复。',
        error: '发送方案时出了点问题。请再试一次，或致电 (917) 907-1034。',
        tooMany: '今天收到的请求很多。请直接打电话或发邮件给我们，我们会尽快回复。',
        honeypot: '请留空',
        done: {
            heading: (name) => `谢谢，${name}。我们已收到您的方案。`,
            picked: '您选择了',
            next: '接下来会这样进行',
            steps: [
                '我们会查看您选择的内容和您告诉我们的情况。',
                '我们会在一个工作日内致电或发邮件给您。',
                '我们和您一起确定方案，在动手之前您会先拿到清晰的报价。'
            ],
            home: '返回首页'
        }
    },

    contact: {
        seo: {
            title: '联系我们 - GradientV',
            description: '致电 (917) 907-1034 或发送邮件至 contact@gradientv.com，告诉我们您的项目。GradientV 为小企业打造网站、营销、自动化和定制软件。'
        },
        label: '联系我们',
        heading: '告诉我们，您的业务现在是怎么运转的。',
        text: '从那些耗时太久或总是出错的工作说起。我们会和您一起梳理，也包括软件到底是不是合适的解决办法。',
        phone: '电话',
        email: '电子邮箱',
        linkedin: '领英',
        planHeading: '已经知道需要什么了？',
        planText: '选好服务套餐，我们会在一个工作日内给您一份方案。'
    },

    story: {
        seo: {
            title: '故事 - GradientV',
            description: 'GradientV 为何存在：小企业面前只有两条路，要么高薪聘请软件工程师，要么租用无法掌控的 SaaS。我们提供第三种选择，并帮助他们适应 AI。'
        },
        label: '故事',
        heading: '软件不该是一种奢侈品。',
        lead: '大多数小企业只被给了两个选择：以难以承受的薪资聘请一名软件工程师，或者租用一套自己无法掌控的软件。GradientV 的存在，就是为了提供第三种选择。',
        gap: {
            heading: '落差所在。',
            body: [
                '定制软件的能力从未如此强大，而对多数小企业来说，它也从未显得如此遥不可及。最能从贴合自身实际工作方式的软件中获益的公司，恰恰是最难得到它的那一批。',
                '这并不是因为技术难以获得，而是因为它的销售方式。'
            ],
            options: [
                {
                    title: '聘请工程师',
                    cost: '六位数薪资，代码尚未写下第一行',
                    text: '全职薪资、福利，加上大多数企业主根本没时间推进的招聘流程，而这一切都要在还不知道这个岗位是否够做满一年之前就先承诺下来。对一家十五人的公司而言，这不是一次招聘，而是拿整个预算下注。'
                },
                {
                    title: '租用 SaaS 产品',
                    cost: '上手很快，从此固定',
                    text: '起步便宜，也确实好用，直到您需要它做一件它的开发者没有预设的事。最后是您的业务去迁就工具，而您最想改动的部分，恰恰是您无权触碰的部分。'
                }
            ]
        },
        middle: {
            label: '我们做什么',
            heading: '我们是中间那条路，也是中间那个人。',
            body: [
                'GradientV 负责构建并运行这些软件，您无需为此招人；我们围绕您既有的工作方式来搭建，您也不必迁就别人的产品路线图。您得到的是真正合身的系统，却不必养一个工程团队来维持它。',
                '我们也是这项技术工作的门面。只需联系一个人，他会用平实的语言而不是术语解释正在发生的事，并在需要改动时承担责任。您不该为了获得好用的软件而被迫变成技术人员。把技术译成人话，是我们的工作，不是您的。'
            ]
        },
        ai: {
            heading: '与 AI 一同调整。',
            body: [
                'AI 正是这道落差今天最宽的地方。这些工具是真实的，也确实有用，而多数小企业仍然找不到切实的入口：能找到的指引不是营销文案，就是研究论文，两者都不会告诉一位企业主周一早上该做什么。',
                '我们的做法和处理其他事情一样：先从真正消耗您时间的瓶颈入手，用能解决它的最小方案，并确保您明白它做什么、边界在哪里。不为追逐潮流而重建您的运营方式，也不留下公司里没人能解释的依赖。',
                '把 AI 用好，多半是一种判断力：判断哪些问题值得让它去解决。这份判断力，正是我们要提供的部分。'
            ]
        },
        founder: {
            heading: '与您合作的人。',
            role: '创始人',
            body: [
                '我创办 GradientV，是因为我从两边都不断遇到同一道落差。我是石溪大学（Stony Brook University）计算机科学与应用数学专业的学生，专注于数据科学、机器学习和应用 AI 系统，而我不断遇到需要这类工作、却找不到合理途径的小企业主。',
                '我的背景包括数据科学、数据挖掘、机器学习与分析方面的课程。我目前是 CRIZM（一个以 AI 驱动、用于支持评分流程、反馈系统与学业成果报告的平台）的本科研究员，并将这些经验运用到我在 GradientV 的工作中。',
                '我职业生涯尚早，仍在学习，我宁愿把这一点说清楚，也不愿夸大其词。我能承诺的是：我会直接告诉您我能做什么，坦率承认我做不到什么，并且您面对的始终是真正在做这件事的人。'
            ],
            teamLink: '认识团队其他成员'
        }
    },

    team: {
        seo: {
            title: '团队 - GradientV',
            description: '认识 GradientV 背后的团队。'
        },
        label: '团队',
        heading: '真正和您一起工作的人。',
        portraitAlt: (name) => `${name} 的肖像`,
        storyLink: '阅读完整故事',
        members: {
            ashton: {
                role: '创始人',
                bio: '我是 Ashton Reyes，GradientV 的创始人，拥有计算机科学与应用数学背景，专注于数据科学、机器学习和应用 AI 系统。'
            },
            jorel: {
                role: '战略与增长负责人',
                bio: 'Jorel Chan 负责 GradientV 的战略与增长，决定公司如何发现机会，并与客户和合作伙伴建立长期关系。'
            },
            bryce: {
                role: '工程负责人',
                bio: 'Bryce Whiteside 负责 GradientV 的工程工作，统筹团队产品与客户项目背后的技术架构与执行。'
            },
            emily: {
                role: '市场与财务负责人',
                bio: 'Emily Fisherman 负责 GradientV 的市场与财务，把公司的技术工作转化为清晰的信息传达和稳健的财务决策。'
            },
            // no bio yet. the card leaves it out until one is filled in
            brian: { role: '软件工程师', bio: '' },
            katie: { role: '客户解决方案与外联', bio: '' }
        }
    },

    login: {
        seo: {
            title: '客户登录 - GradientV',
            description: '登录 GradientV 客户门户。'
        },
        label: '客户门户',
        heading: '登录',
        intro: '仅供 GradientV 客户使用。',
        email: '电子邮箱',
        password: '密码',
        submit: '登录',
        sending: '正在登录…',
        unavailable: '客户门户暂时无法访问。请稍后再试，或直接联系我们。',
        contact: '联系我们',
        pitchHeading: '我们为您打造的一切，尽在一处。',
        pitchText: '在这里查看网站的访问情况，并向我们提交修改需求。',
        notClient: '还不是客户？'
    },

    notFound: {
        seo: {
            title: '页面未找到 - GradientV',
            description: '此页面已移动，或从未存在。'
        },
        label: '错误 404',
        heading: '此页面已移动，或从未存在。',
        body: '您点击的链接指向了一个我们没有页面的地址。您那边没有任何问题。请返回首页，或告诉我们您在找什么，我们会为您指路。',
        home: '返回首页',
        contact: '联系我们',
        work: '查看我们的作品'
    },

    // the set-password, portal and videos pages are English only for now (see src/data/pages.ts),
    // so they use the English words
    setPassword: en.setPassword,
    portal: en.portal,
    videos: en.videos
};

export default zh;
