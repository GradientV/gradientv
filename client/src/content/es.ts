// every Spanish word on the site. same shape as en.ts, see the notes there

import en from './en';
import type { Content } from './index';

const es: Content = {
    code: 'es',
    htmlLang: 'es',
    hreflang: 'es',
    ogLocale: 'es_ES',
    languageName: 'Español',

    nav: {
        label: 'Principal',
        home: 'Inicio de GradientV',
        skip: 'Saltar al contenido',
        services: 'Servicios',
        clients: 'Clientes',
        story: 'Historia',
        team: 'Equipo',
        contact: 'Contacto',
        login: 'Acceso clientes',
        plan: 'Arme su plan',
        openMenu: 'Abrir menú',
        closeMenu: 'Cerrar menú'
    },

    footer: {
        site: 'Sitio',
        legal: 'Legal',
        language: 'Idioma',
        privacy: 'Política de privacidad',
        terms: 'Términos del servicio',
        accessibility: 'Accesibilidad',
        copyright: '© 2026 GradientV LLC. Todos los derechos reservados.'
    },

    links: {
        website: 'Sitio web',
        linkedin: 'LinkedIn',
        github: 'GitHub'
    },

    home: {
        seo: {
            title: 'GradientV - Sitios web, marketing y software para pequeñas empresas',
            description: 'GradientV crea sitios web, marketing, automatización y software a medida para pequeñas empresas, con un portal de clientes para verlo todo. Cada proyecto empieza con una conversación.'
        },
        tagline: 'El lado humano de la IA.',
        heroLead: 'Sitios web, marketing y software para pequeñas empresas, empezando por una conversación.',
        primaryCta: 'Arme su plan',
        secondaryCta: 'Vea nuestro trabajo',
        packagesHeading: 'Paquetes',
        addToPlan: 'Agregar a su plan',
        portal: {
            label: 'El portal de clientes',
            heading: 'Todo lo que construimos, en un solo acceso.',
            text: 'Cada plan incluye el portal de GradientV. Vea cómo va su sitio, revise lo que recoge y envíenos cambios sin perseguir a nadie por correo.',
            points: [
                'Las visitas y de dónde llegan, incluida la búsqueda con IA',
                'Los contactos y suscripciones que recoge su sitio',
                'Las solicitudes de cambios, de nuevas a terminadas'
            ],
            login: 'Acceso clientes',
            preview: {
                caption: 'Un ejemplo del portal de clientes. Cada cliente ve su propio sitio.',
                title: 'Portal de clientes',
                business: 'Café de ejemplo',
                visitors: 'Visitas',
                period: 'Últimos 30 días',
                sources: 'De dónde llegaron',
                direct: 'Directo',
                requests: 'Solicitudes',
                requestDone: 'Agregar el horario de fiestas',
                requestOpen: 'Fotos nuevas del menú de almuerzo',
                done: 'Terminada',
                inProgress: 'En curso',
                signups: 'Suscripciones al boletín',
                signupsValue: '+23 este mes'
            }
        },
        clientsLabel: 'Clientes',
        visit: 'Visitar el sitio',
        faqLabel: 'Preguntas frecuentes',
        faq: [
            {
                question: '¿Qué construye GradientV?',
                answer: 'Cuatro paquetes para pequeñas empresas: Sitio web y marca, Crecimiento (SEO, búsqueda con IA y reseñas), Automatización y Software a medida. Todo se construye en torno a cómo ya funciona su negocio, y todo aparece en un solo portal de clientes.'
            },
            {
                question: '¿Con qué tipo de negocios trabajan?',
                answer: 'Con pequeñas empresas. Entre nuestros clientes están Bukas Cafe, Swabe Food Truck e InfoReporting Solutions, una firma de asesoría fiscal.'
            },
            {
                question: '¿Cómo empieza un proyecto?',
                answer: 'Con una conversación. Arme su plan eligiendo los paquetes que necesita, o simplemente llámenos. Revisamos con usted cómo funciona su negocio, incluida la pregunta de si el software es la solución adecuada, antes de construir nada.'
            },
            {
                question: '¿Cuánto cuesta?',
                answer: 'Cada proyecto se cotiza después de la primera conversación, porque no hay dos negocios que necesiten lo mismo. Recibe un precio claro antes de construir nada.'
            },
            {
                question: '¿Qué es GEO y lo necesito?',
                answer: 'GEO significa lograr que herramientas de IA como ChatGPT, Gemini o Perplexity lo recomienden cuando un cliente busca un negocio como el suyo. Es parte del paquete Crecimiento, y su portal de clientes muestra qué visitas llegaron desde la búsqueda con IA.'
            },
            {
                question: '¿Por qué no contratar a un programador o comprar un software ya hecho?',
                answer: 'Un ingeniero a tiempo completo es un compromiso de seis cifras antes de saber si hay un año entero de trabajo, y el software ya hecho deja de servir en cuanto necesita algo que sus creadores no previeron. Nosotros construimos y mantenemos software hecho para su negocio, sin que tenga que contratar a un equipo de ingeniería.'
            },
            {
                question: '¿Se ocupan del software después del lanzamiento?',
                answer: 'Sí. Construimos y mantenemos lo que hacemos, para que usted no tenga que contratar a nadie para ello. Cada cliente tiene un portal donde ve cómo va su sitio, revisa lo que recoge y nos envía solicitudes de cambios.'
            },
            {
                question: '¿Cómo usan la inteligencia artificial?',
                answer: 'Donde de verdad le ahorra tiempo. Empezamos por el cuello de botella que más le cuesta, aplicamos lo más pequeño que lo resuelva y nos aseguramos de que entienda qué hace y dónde termina.'
            },
            {
                question: '¿Con quién voy a trabajar?',
                answer: 'Con las personas que hacen el trabajo. Tendrá un único contacto que le explica todo en lenguaje claro y que responde cuando algo tiene que cambiar.'
            }
        ]
    },

    packages: {
        includesLabel: 'Incluye',
        portalIncluded: 'Cada plan incluye el portal de clientes.',
        items: {
            website: {
                name: 'Sitio web y marca',
                outcome: 'Esté en línea, como se debe.',
                includes: ['Un sitio web rápido y completo', 'Logotipo e identidad de marca', 'Su propio dominio y correo de empresa', 'Formularios de contacto, reservas o pedidos']
            },
            growth: {
                name: 'Crecimiento',
                outcome: 'Que más clientes lo encuentren.',
                includes: ['SEO: aparecer en Google', 'GEO: que ChatGPT y otras búsquedas con IA lo recomienden', 'Perfil de Google Business y reseñas', 'Boletines por correo y contenido para redes']
            },
            automation: {
                name: 'Automatización',
                outcome: 'Ahorre horas cada semana.',
                includes: ['Seguimiento de contactos y confirmación de reservas', 'Solicitudes de reseñas y recordatorios', 'Facturas y recordatorios de pago', 'Se conecta con las herramientas que ya usa']
            },
            custom: {
                name: 'Software a medida',
                outcome: 'Lleve su negocio a su manera.',
                includes: ['Herramientas internas y paneles', 'Pedidos en línea y portales para clientes', 'Asistentes de IA entrenados con su negocio', 'Construido en torno a cómo ya trabaja']
            }
        }
    },

    plan: {
        seo: {
            title: 'Arme su plan - GradientV',
            description: 'Elija los paquetes que necesita su pequeña empresa (sitio web y marca, crecimiento, automatización o software a medida) y le respondemos en un día hábil.'
        },
        label: 'Arme su plan',
        heading: 'Elija lo que necesita su negocio. Nosotros nos encargamos del resto.',
        intro: 'Sin precios que comparar y sin nada que pagar. Cada plan empieza con una conversación.',
        stepPackages: '¿Qué necesita?',
        stepPackagesHint: 'Elija uno o varios. Puede cambiar de opinión en la llamada.',
        stepBusiness: 'Sobre su negocio',
        stepContact: '¿Cómo le contactamos?',
        businessName: 'Nombre del negocio',
        businessType: 'Tipo de negocio',
        businessTypePlaceholder: 'Cafetería, salón, despacho de abogados…',
        message: '¿Qué le está frenando?',
        messagePlaceholder: 'Por ejemplo: respondemos las mismas preguntas sobre reservas todo el día.',
        name: 'Su nombre',
        email: 'Correo electrónico',
        phone: 'Teléfono',
        optional: 'opcional',
        summaryHeading: 'Su plan',
        summaryEmpty: 'Todavía no eligió nada.',
        portalLine: 'Portal de clientes',
        portalIncluded: 'Incluido',
        remove: (name) => `Quitar ${name}`,
        submit: 'Solicitar mi plan',
        sending: 'Enviando…',
        pickOne: 'Primero elija al menos un paquete.',
        reply: 'Respondemos en un día hábil.',
        error: 'Algo salió mal al enviar su plan. Inténtelo de nuevo o llámenos al (917) 907-1034.',
        tooMany: 'Hoy recibimos muchas solicitudes. Llámenos o escríbanos y le responderemos enseguida.',
        honeypot: 'Deje esto en blanco',
        done: {
            heading: (name) => `Gracias, ${name}. Recibimos su plan.`,
            picked: 'Usted eligió',
            next: 'Lo que sigue',
            steps: [
                'Revisamos lo que eligió y lo que nos contó.',
                'Le llamamos o escribimos en un día hábil.',
                'Juntos definimos el plan, y recibe un presupuesto claro antes de construir nada.'
            ],
            home: 'Volver al inicio'
        }
    },

    contact: {
        seo: {
            title: 'Contacto - GradientV',
            description: 'Llame al (917) 907-1034 o escriba a contact@gradientv.com para contarnos sobre su proyecto. Creamos sitios web, marketing, automatización y software a medida para pequeñas empresas.'
        },
        label: 'Contacto',
        heading: 'Cuéntenos cómo funciona hoy su negocio.',
        text: 'Empiece por el trabajo que toma demasiado tiempo o que siempre sale mal. Lo revisamos con usted, incluida la pregunta de si el software es la solución adecuada.',
        phone: 'Teléfono',
        email: 'Correo electrónico',
        linkedin: 'LinkedIn',
        planHeading: '¿Ya sabe lo que necesita?',
        planText: 'Elija sus paquetes y le respondemos con un plan en un día hábil.'
    },

    story: {
        seo: {
            title: 'Historia - GradientV',
            description: 'Por qué existe GradientV: a los pequeños negocios se les ofrece o contratar a un ingeniero por seis cifras o alquilar un software que no controlan. Nosotros construimos la tercera opción y les ayudamos a adoptar la IA.'
        },
        label: 'Historia',
        heading: 'El software no debería ser un lujo.',
        lead: 'A la mayoría de los pequeños negocios se les ofrecen dos opciones: contratar a un ingeniero de software con un sueldo que no pueden justificar, o alquilar un software que no controlan. GradientV existe para ofrecer una tercera.',
        gap: {
            heading: 'La brecha.',
            body: [
                'El software a medida nunca ha sido tan capaz y, para la mayoría de los pequeños negocios, nunca ha parecido tan fuera de su alcance. Las empresas que más se beneficiarían de un software construido en torno a su forma real de trabajar son justamente las que menos posibilidades tienen de conseguirlo.',
                'No es porque la tecnología sea difícil de conseguir. Es por la forma en que se vende.'
            ],
            options: [
                {
                    title: 'Contratar a un ingeniero',
                    cost: 'Seis cifras, antes de la primera línea',
                    text: 'Un sueldo a tiempo completo, prestaciones y un proceso de selección que casi ningún dueño tiene tiempo de gestionar, comprometido antes de saber siquiera si el puesto da para un año entero de trabajo. Para una empresa de quince personas, eso no es una contratación. Es apostar el presupuesto completo.'
                },
                {
                    title: 'Alquilar un producto SaaS',
                    cost: 'Rápido de arrancar, rígido para siempre',
                    text: 'Barato al principio y realmente útil, justo hasta el momento en que necesita que haga algo que sus creadores no previeron. Termina adaptando su negocio a la herramienta, y las partes que más quiere cambiar son precisamente las que no puede tocar.'
                }
            ]
        },
        middle: {
            label: 'Lo que hacemos',
            heading: 'Somos la vía intermedia, y el intermediario.',
            body: [
                'GradientV construye y opera el software para que usted no tenga que contratar a nadie que lo haga, y lo construye en torno a su forma actual de trabajar para que no tenga que amoldarse a la hoja de ruta de otro. Obtiene sistemas que encajan, sin montar un departamento de ingeniería para mantenerlos en marcha.',
                'También somos la cara del trabajo técnico. Una sola persona a quien llamar, que explica lo que ocurre en lenguaje claro y no en jerga, y que responde cuando algo tiene que cambiar. Usted nunca debería tener que volverse técnico para conseguir un software que le funcione: esa traducción es nuestro trabajo, no el suyo.'
            ]
        },
        ai: {
            heading: 'Adaptarse con la IA.',
            body: [
                'La IA es donde esa brecha es hoy más ancha. Las herramientas son reales y verdaderamente útiles, y la mayoría de los pequeños negocios todavía no tiene una vía práctica de entrada: la orientación disponible es o material de marketing o un artículo académico, y ninguno le dice a un dueño qué hacer el lunes por la mañana.',
                'Lo abordamos igual que todo lo demás. Empezamos por el cuello de botella que de verdad le cuesta tiempo, aplicamos lo mínimo que lo resuelva y nos aseguramos de que usted entienda qué hace y dónde se detiene. Sin rehacer su operación alrededor de una moda, y sin dependencias que nadie en su empresa sepa explicar.',
                'Adoptar bien la IA es, sobre todo, una cuestión de criterio sobre a qué problemas conviene apuntarla. Ese criterio es justamente lo que venimos a aportar.'
            ]
        },
        founder: {
            heading: 'Con quién trabaja.',
            role: 'Fundador',
            body: [
                'Fundé GradientV porque me encontraba una y otra vez con la misma brecha, desde los dos lados. Soy estudiante de Ciencias de la Computación y Matemáticas Aplicadas en Stony Brook University, centrado en ciencia de datos, aprendizaje automático y sistemas de IA aplicada, y no dejaba de conocer a dueños de pequeños negocios que necesitaban exactamente ese tipo de trabajo y no tenían dónde conseguirlo de forma razonable.',
                'Mi formación incluye cursos de ciencia de datos, minería de datos, aprendizaje automático y analítica. Soy investigador de pregrado en CRIZM, una plataforma impulsada por IA creada para apoyar flujos de calificación, sistemas de retroalimentación e informes de resultados académicos, y aplico esa experiencia en mi trabajo en GradientV.',
                'Estoy al principio de mi carrera, sigo aprendiendo y prefiero decirlo con claridad antes que exagerar. Lo que sí puedo prometer es que seré directo sobre lo que puedo construir, honesto sobre lo que no, y que siempre hablará con la persona que realmente hace el trabajo.'
            ],
            teamLink: 'Conozca al resto del equipo'
        }
    },

    team: {
        seo: {
            title: 'Equipo - GradientV',
            description: 'Conozca a las personas detrás de GradientV.'
        },
        label: 'Equipo',
        heading: 'Las personas con las que de verdad va a trabajar.',
        portraitAlt: (name) => `Retrato de ${name}`,
        storyLink: 'Lea la historia completa',
        members: {
            ashton: {
                role: 'Fundador',
                bio: 'Soy Ashton Reyes, fundador de GradientV, con formación en Ciencias de la Computación y Matemáticas Aplicadas y un enfoque en ciencia de datos, aprendizaje automático y sistemas de IA aplicada.'
            },
            jorel: {
                role: 'Director de Estrategia y Crecimiento',
                bio: 'Jorel Chan dirige la estrategia y el crecimiento en GradientV, y define cómo la empresa identifica oportunidades y construye relaciones duraderas con clientes y socios.'
            },
            bryce: {
                role: 'Director de Ingeniería',
                bio: 'Bryce Whiteside dirige la ingeniería en GradientV y supervisa la arquitectura técnica y la ejecución detrás de los productos del equipo y del trabajo para clientes.'
            },
            emily: {
                role: 'Directora de Marketing y Finanzas',
                bio: 'Emily Fisherman dirige el marketing y las finanzas en GradientV, y conecta el trabajo técnico de la empresa con mensajes claros y decisiones financieras sólidas.'
            },
            // no bio yet. the card leaves it out until one is filled in
            brian: { role: 'Ingeniero de software', bio: '' },
            katie: { role: 'Soluciones para clientes y alcance', bio: '' }
        }
    },

    login: {
        seo: {
            title: 'Acceso clientes - GradientV',
            description: 'Inicie sesión en el portal de clientes de GradientV.'
        },
        label: 'Portal de clientes',
        heading: 'Iniciar sesión',
        intro: 'Para clientes de GradientV.',
        email: 'Correo electrónico',
        password: 'Contraseña',
        submit: 'Iniciar sesión',
        sending: 'Iniciando sesión…',
        unavailable: 'No se puede acceder al portal de clientes en este momento. Inténtelo de nuevo en unos minutos o comuníquese con nosotros directamente.',
        contact: 'Contáctenos',
        pitchHeading: 'Un solo lugar para todo lo que construimos para usted.',
        pitchText: 'Vea cómo va su sitio y envíenos solicitudes de cambios, todo en un solo lugar.',
        notClient: '¿Todavía no es cliente?'
    },

    notFound: {
        seo: {
            title: 'Página no encontrada - GradientV',
            description: 'Esta página se movió o nunca existió.'
        },
        label: 'Error 404',
        heading: 'Esta página se movió o nunca existió.',
        body: 'El enlace que siguió apunta a un lugar donde no tenemos ninguna página. No hay nada roto de su lado. Vuelva al inicio, o cuéntenos qué buscaba y le indicaremos dónde está.',
        home: 'Volver al inicio',
        contact: 'Contáctenos',
        work: 'Ver nuestro trabajo'
    },

    // the set-password, portal and videos pages are English only for now (see src/data/pages.ts),
    // so they use the English words
    setPassword: en.setPassword,
    portal: en.portal,
    videos: en.videos
};

export default es;
