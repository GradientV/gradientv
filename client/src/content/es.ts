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
        portal: 'Portal de clientes',
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
            description: 'GradientV crea sitios web, marketing, automatización, software a medida y herramientas de IA para pequeñas empresas, con un portal de clientes para verlo todo. Cada proyecto empieza con una conversación.'
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
        // the small "coming next" section on the home page. the button opens an email to us
        learn: {
            heading: 'Próximamente',
            cta: 'Reciba acceso anticipado',
            emailSubject: 'Acceso anticipado: boletín y cursos',
            items: [
                { title: 'Boletín de IA', text: 'Novedades breves y prácticas sobre la IA y cómo puede usarla un pequeño negocio.' },
                { title: 'Cursos de IA', text: 'Clases prácticas para que los dueños y sus equipos usen la IA en su trabajo diario.' }
            ]
        },
        visit: 'Visitar el sitio',
        faqLabel: 'Preguntas frecuentes',
        faq: [
            {
                question: '¿Qué construye GradientV?',
                answer: 'Cinco paquetes para pequeñas empresas: Sitio web y marca, Crecimiento (SEO, búsqueda con IA y reseñas), Automatización, Software a medida y Mejora con IA (chatbots, RAG, MCP y agentes de IA). Todo se construye en torno a cómo ya funciona su negocio, y todo aparece en un solo portal de clientes.'
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
                question: '¿Qué son RAG y MCP, y los necesito?',
                answer: 'RAG permite que un asistente de IA responda a partir de sus propios documentos, como menús, políticas o trabajos anteriores, y muestre de dónde salió cada respuesta. MCP es un estándar para conectar herramientas de IA como Claude y ChatGPT con el software que ya usa. Configuramos y construimos ambos dentro de Mejora con IA, y le diremos si su negocio todavía no los necesita.'
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
                answer: 'Con Ashton Reyes, fundador de GradientV. Tendrá un único contacto que le explica todo en lenguaje claro y que responde cuando algo tiene que cambiar.'
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
            },
            // chatbots, RAG, MCP and the other AI work. it gets its own full-width card
            ai: {
                name: 'Mejora con IA',
                outcome: 'Ponga la IA a trabajar en su negocio.',
                includes: ['Chatbot de IA para su sitio web', 'RAG: IA que responde con sus propios archivos', 'MCP: conecte herramientas de IA con su software', 'Agentes de IA para tareas de varios pasos', 'GPT personalizados y skills de Claude para su equipo', 'IA que lee facturas, recibos y formularios']
            }
        }
    },

    plan: {
        seo: {
            title: 'Arme su plan - GradientV',
            description: 'Elija los paquetes que necesita su pequeña empresa (sitio web y marca, crecimiento, automatización, software a medida o mejoras con IA) y le respondemos en un día hábil.'
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
            description: 'Llame al (917) 907-1034 o escriba a contact@gradientv.com para contarnos sobre su proyecto. Creamos sitios web, marketing, automatización, software a medida y herramientas de IA para pequeñas empresas.'
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
            description: 'Por qué existe GradientV: los pequeños negocios saben que la IA podría ayudarles, pero pocos tienen el tiempo o el personal para ponerla a trabajar. Nosotros construimos el software y capacitamos a sus equipos para usarlo.'
        },
        label: 'Historia',
        heading: 'Hacer que la IA sea útil para los pequeños negocios.',
        lead: 'Hoy es más rápido que nunca crear software, pero la mayoría de los dueños de pequeños negocios no tiene tiempo para aprender a hacerlo con IA. GradientV se encarga de esa parte y luego enseña a sus equipos a usar lo que construimos.',
        gap: {
            heading: 'La brecha.',
            body: [
                'Los pequeños negocios saben que la IA podría cambiar su forma de trabajar, pero pocos saben por dónde empezar. En un informe de mayo de 2026 de la Oficina del Censo de EE. UU., el 37 % de las empresas con 250 empleados o más dijo usar IA. Entre las empresas con cuatro empleados o menos, la cifra fue inferior al 20 %.',
                'La mayoría de los dueños ya se encarga de todo, así que aprender una tecnología nueva queda al final de la lista. Cuando buscan ayuda, suelen encontrar dos opciones.'
            ],
            // the two choices a small business is normally left with
            options: [
                {
                    title: 'Contratar a un ingeniero',
                    cost: 'Seis cifras al año',
                    text: 'Un sueldo a tiempo completo, prestaciones y un proceso de selección que casi ningún dueño tiene tiempo de gestionar, todo antes de saber si hay trabajo para un año entero. Para una empresa de quince personas, puede consumir una gran parte del presupuesto.'
                },
                {
                    title: 'Comprar software estándar',
                    cost: 'Rápido de empezar, difícil de cambiar',
                    text: 'Asequible y a menudo útil, hasta que necesita algo que sus creadores no previeron. Desde ese momento, su negocio tiene que adaptarse a la herramienta.'
                }
            ]
        },
        middle: {
            label: 'Lo que hacemos',
            heading: 'Somos el puente entre su negocio y la IA.',
            body: [
                'GradientV es una empresa de software construida en torno a la IA. La IA nos permite crear software a medida mucho más rápido que antes, para que un pequeño negocio pueda tener herramientas que antes exigían contratar a un ingeniero.',
                'Cada proyecto empieza con una conversación sobre cómo funciona su negocio y en qué se le va el tiempo. Luego construimos lo que necesita con cinco paquetes: Sitio web y marca, Crecimiento, Automatización, Software a medida y Mejora con IA. Todo se conecta a un solo portal de clientes, donde puede ver los resultados y enviarnos cambios.'
            ]
        },
        ai: {
            heading: 'Cómo usamos la IA.',
            body: [
                'Empezamos por el problema que más tiempo le cuesta y usamos lo mínimo que lo resuelva. Puede ser una automatización, un asistente que responde a partir de sus propios documentos o una conexión que permite a las herramientas de IA trabajar con el software que ya usa.',
                'Si el software no es la solución adecuada, se lo diremos. Cuando lo es, capacitamos a su equipo y le explicamos qué hace y dónde se detiene, para que siempre sepa qué tiene y cómo usarlo.'
            ]
        },
        next: {
            heading: 'Hacia dónde vamos.',
            body: [
                'Cada proyecto nos deja piezas que podemos reutilizar, lo que hace que el siguiente sea más rápido y más asequible. Con el tiempo, esas piezas se convertirán en una plataforma de software para pequeñas y medianas empresas.',
                'También estamos preparando un boletín y cursos, para que los dueños y sus equipos sigan aprendiendo a usar la IA por su cuenta.'
            ]
        },
        founder: {
            heading: 'Con quién trabaja.',
            role: 'Fundador',
            body: [
                'Fundé GradientV porque me encontraba una y otra vez con la misma brecha, desde los dos lados. Soy estudiante de Ciencias de la Computación y Matemáticas Aplicadas en Stony Brook University, centrado en ciencia de datos, aprendizaje automático y sistemas de IA aplicada, y no dejaba de conocer a dueños de pequeños negocios que necesitaban exactamente ese tipo de trabajo y no tenían dónde conseguirlo de forma razonable.',
                'Mi formación incluye cursos de ciencia de datos, minería de datos, aprendizaje automático y analítica. Soy investigador de pregrado en CRIZM, una plataforma impulsada por IA creada para apoyar flujos de calificación, sistemas de retroalimentación e informes de resultados académicos, y aplico esa experiencia en mi trabajo en GradientV.',
                'Estoy al principio de mi carrera, sigo aprendiendo y prefiero decirlo con claridad antes que exagerar. Lo que sí puedo prometer es que seré directo sobre lo que puedo construir, honesto sobre lo que no, y que siempre hablará con la persona que realmente hace el trabajo.'
            ]
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
            }
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
