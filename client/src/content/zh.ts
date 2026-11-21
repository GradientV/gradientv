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
        portal: '客户门户',
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
            description: 'GradientV 为小企业打造网站、营销、自动化、定制软件和 AI 工具，并提供一个客户门户，让一切一目了然。每个项目都从一次对话开始。'
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
        // the small "coming next" section on the home page. the button opens an email to us
        learn: {
            heading: '即将推出',
            cta: '申请抢先体验',
            emailSubject: '抢先体验：电子报与课程',
            items: [
                { title: 'AI 电子报', text: '简短实用地介绍 AI 的最新动态，以及小企业可以如何运用。' },
                { title: 'AI 课程', text: '通过动手实践，教企业主和团队在日常工作中使用 AI。' }
            ]
        },
        visit: '访问网站',
        faqLabel: '常见问题',
        faq: [
            {
                question: 'GradientV 打造什么？',
                answer: '我们为小企业提供五个服务套餐：网站与品牌、增长（SEO、AI 搜索与评价）、自动化、定制软件和 AI 升级（聊天机器人、RAG、MCP 与 AI 智能体）。一切都围绕您现有的工作方式来做，并且都汇集在同一个客户门户里。'
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
                question: '什么是 RAG 和 MCP？我需要吗？',
                answer: 'RAG 让 AI 助手根据您自己的文件（如菜单、政策或过往资料）作答，并标明每个答案的出处。MCP 是一种标准方式，可将 Claude、ChatGPT 等 AI 工具连接到您已在使用的软件。我们在 AI 升级套餐中负责配置和开发这两项，如果您的业务暂时用不上，也会直接告诉您。'
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
                answer: '和 GradientV 的创始人 Ashton Reyes。您会有一位固定联系人，用通俗的语言解释一切，并在需要调整时负责到底。'
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
            },
            // chatbots, RAG, MCP and the other AI work. it gets its own full-width card
            ai: {
                name: 'AI 升级',
                outcome: '让 AI 为您的业务发挥作用。',
                includes: ['网站 AI 聊天机器人', 'RAG：根据您自己的文件作答的 AI', 'MCP：将 AI 工具连接到您的软件', '处理多步骤任务的 AI 智能体', '为团队定制 GPT 和 Claude 技能', '读取发票、收据和表单的 AI']
            }
        }
    },

    plan: {
        seo: {
            title: '定制您的方案 - GradientV',
            description: '为您的小企业选择需要的服务套餐（网站与品牌、增长、自动化、定制软件或 AI 升级），我们会在一个工作日内回复。'
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
            description: '致电 (917) 907-1034 或发送邮件至 contact@gradientv.com，告诉我们您的项目。GradientV 为小企业打造网站、营销、自动化、定制软件和 AI 工具。'
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
            description: 'GradientV 为何存在：小企业知道 AI 能带来帮助，却很少有时间或人手把它用起来。我们负责打造软件，并培训他们的团队使用。'
        },
        label: '故事',
        heading: '让 AI 真正为小企业所用。',
        lead: '如今开发软件比以往任何时候都快，但多数小企业主没有时间去学习如何用 AI 来做这件事。GradientV 负责这一部分，并教会他们的团队使用这些工具。',
        gap: {
            heading: '落差所在。',
            body: [
                '小企业知道 AI 能改变工作方式，却很少有人知道从哪里开始。根据美国人口普查局 2026 年 5 月的报告，员工 250 人及以上的企业中有 37% 表示正在使用 AI；而在员工四人及以下的企业中，这一比例不到 20%。',
                '多数企业主已经事事亲力亲为，学习新技术自然排到了最后。当他们真正寻求帮助时，通常只看到两个选择。'
            ],
            // the two choices a small business is normally left with
            options: [
                {
                    title: '聘请工程师',
                    cost: '每年六位数',
                    text: '全职薪资、福利，加上大多数企业主没时间推进的招聘流程，而这一切都要在确定是否有一整年工作量之前投入。对一家十五人的公司来说，这可能占去很大一部分预算。'
                },
                {
                    title: '购买现成软件',
                    cost: '上手很快，难以改动',
                    text: '价格实惠，也常常好用，直到您需要它做开发者没有预设的事。从那时起，您的业务只能去迁就工具。'
                }
            ]
        },
        middle: {
            label: '我们做什么',
            heading: '我们是您的业务与 AI 之间的桥梁。',
            body: [
                'GradientV 是一家围绕 AI 打造的软件公司。AI 让我们能比以往快得多地开发定制软件，小企业也因此能用上过去必须聘请工程师才能拥有的工具。',
                '每个项目都从一次对话开始，了解您的业务如何运转、时间都花在哪里。然后我们通过五个套餐打造您需要的内容：网站与品牌、增长、自动化、定制软件和 AI 升级。所有内容都连接到同一个客户门户，您可以在那里查看成果并向我们提交修改需求。'
            ]
        },
        ai: {
            heading: '我们如何使用 AI。',
            body: [
                '我们先找出最消耗您时间的问题，再用能解决它的最小方案。它可能是一项自动化、一个根据您自己的文件作答的助手，或是一个让 AI 工具与您现有软件协作的连接。',
                '如果软件并不是合适的解决办法，我们会直接告诉您。如果是，我们会培训您的团队，并说明它能做什么、边界在哪里，让您始终清楚自己拥有什么、该如何使用。'
            ]
        },
        next: {
            heading: '未来的方向。',
            body: [
                '每个项目都会留下可以重复使用的部分，让下一个项目更快、更实惠。随着时间推移，这些成果将发展成面向中小企业的软件平台。',
                '我们也在筹备电子报和课程，帮助企业主和团队持续学习如何使用 AI。'
            ]
        },
        founder: {
            heading: '与您合作的人。',
            role: '创始人',
            body: [
                '我创办 GradientV，是因为我从两边都不断遇到同一道落差。我是石溪大学（Stony Brook University）计算机科学与应用数学专业的学生，专注于数据科学、机器学习和应用 AI 系统，而我不断遇到需要这类工作、却找不到合理途径的小企业主。',
                '我的背景包括数据科学、数据挖掘、机器学习与分析方面的课程。我目前是 CRIZM（一个以 AI 驱动、用于支持评分流程、反馈系统与学业成果报告的平台）的本科研究员，并将这些经验运用到我在 GradientV 的工作中。',
                '我职业生涯尚早，仍在学习，我宁愿把这一点说清楚，也不愿夸大其词。我能承诺的是：我会直接告诉您我能做什么，坦率承认我做不到什么，并且您面对的始终是真正在做这件事的人。'
            ]
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
            }
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
