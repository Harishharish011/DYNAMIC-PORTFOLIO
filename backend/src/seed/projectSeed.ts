import { Project } from '../models/Project';

const projectImageBase = '/src/assets/images/projects';

export const projectSeedData = [
  {
    id: 'nexora-crm',
    slug: 'nexora-crm',
    title: 'NEXORA CRM',
    shortDescription:
      'A full-stack CRM platform inspired by HubSpot and Salesforce with contacts, campaigns, analytics, and AI-assisted workflows.',
    fullDescription:
      'NEXORA CRM streamlines customer relationship management by providing an intuitive dashboard for contact management, campaign tracking, analytics, AI-assisted content generation, and secure authentication. The platform emphasizes scalability, modular architecture, and responsive design.',
    subtitle:
      'A scalable CRM foundation for contacts, campaigns, analytics, and AI-assisted customer workflows.',
    category: 'CRM Platform',
    description:
      'A full-stack CRM platform inspired by HubSpot and Salesforce with contacts, campaigns, analytics, and AI-assisted workflows.',
    overview:
      'NEXORA CRM centralizes customer data, campaign management, dashboard insights, and authentication into a modular MERN application designed for long-term extensibility.',
    technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    challenges: [
      'Small and medium businesses often rely on disconnected tools to manage customers, campaigns, and communications, creating poor visibility and duplicate work.',
      'Designing a backend structure that can grow across contacts, campaigns, analytics, authentication, and future AI modules.',
      'Keeping the dashboard experience responsive and understandable while presenting dense CRM data.',
    ],
    solutions: [
      'Developed a centralized CRM platform that unifies customer management, campaign tracking, AI-assisted workflows, analytics, and authentication in one application.',
      'Used a modular MERN architecture with feature-oriented REST APIs, JWT authentication, middleware, and reusable service boundaries.',
      'Designed reusable frontend components and dashboard sections that can support additional CRM modules without rewriting the interface.',
    ],
    gallery: [`${projectImageBase}/nexora-crm.webp`, `${projectImageBase}/nexora-crm.webp`, `${projectImageBase}/nexora-crm.webp`],
    galleryImages: [`${projectImageBase}/nexora-crm.webp`, `${projectImageBase}/nexora-crm.webp`, `${projectImageBase}/nexora-crm.webp`],
    outcome: [
      'Successfully established a scalable CRM foundation capable of supporting future AI modules, reporting features, and enterprise-level functionality.',
      'Improved cohesion across authentication, dashboards, campaigns, and customer interactions.',
      'Created reusable frontend components and modular backend services for long-term iteration.',
    ],
    outcomes: [
      'Successfully established a scalable CRM foundation capable of supporting future AI modules, reporting features, and enterprise-level functionality.',
      'Improved cohesion across authentication, dashboards, campaigns, and customer interactions.',
      'Created reusable frontend components and modular backend services for long-term iteration.',
    ],
    futureImprovements: [
      'Add role-based permissions for sales, marketing, and admin teams.',
      'Introduce AI-powered lead scoring and message suggestions.',
      'Expand reporting with exportable analytics and campaign performance dashboards.',
    ],
    heroImage: `${projectImageBase}/nexora-crm.webp`,
    thumbnailImage: `${projectImageBase}/nexora-crm.webp`,
    gradientAccent: 'linear-gradient(135deg, rgba(147,51,234,0.55), rgba(59,130,246,0.35))',
    githubUrl: 'https://github.com/Harishharish011/NEXORA_CRM',
    liveDemoUrl: 'Coming Soon',
    featured: true,
    status: 'In Progress',
  },
  {
    id: 'cartify-ecommerce',
    slug: 'cartify-ecommerce',
    title: 'Cartify',
    shortDescription:
      'A full-stack MERN e-commerce platform featuring authentication, cart workflows, product management, and order processing.',
    fullDescription:
      'Cartify provides a complete online shopping experience with user authentication, product browsing, cart management, order tracking, and scalable backend APIs.',
    subtitle:
      'A MERN e-commerce platform for product browsing, secure accounts, cart flows, and order management.',
    category: 'E-Commerce',
    description:
      'A full-stack MERN e-commerce platform featuring authentication, cart workflows, product management, and order processing.',
    overview:
      'Cartify is structured as a scalable commerce foundation with reusable frontend views, RESTful product and order APIs, authentication, and a clean separation between shopping flows and backend services.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    challenges: [
      'Small businesses need an affordable and scalable e-commerce platform for products, customers, carts, and orders.',
      'Managing application state across product browsing, cart updates, authentication, and checkout preparation.',
      'Structuring backend APIs so products, users, carts, and orders can evolve independently.',
    ],
    solutions: [
      'Developed a modular MERN application that supports secure authentication, product management, shopping cart workflows, and order tracking.',
      'Organized backend logic into focused services and used JWT authentication for protected commerce workflows.',
      'Built reusable React components and REST APIs that can support future payment and inventory integrations.',
    ],
    gallery: [
      `${projectImageBase}/cartify-ecommerce.webp`,
      `${projectImageBase}/cartify-ecommerce.webp`,
      `${projectImageBase}/cartify-ecommerce.webp`,
    ],
    galleryImages: [
      `${projectImageBase}/cartify-ecommerce.webp`,
      `${projectImageBase}/cartify-ecommerce.webp`,
      `${projectImageBase}/cartify-ecommerce.webp`,
    ],
    outcome: [
      'Built a scalable e-commerce foundation suitable for future payment integration and advanced inventory management.',
      'Improved security and reliability around authentication and order processing flows.',
      'Created a clean separation of concerns across frontend and backend modules.',
    ],
    outcomes: [
      'Built a scalable e-commerce foundation suitable for future payment integration and advanced inventory management.',
      'Improved security and reliability around authentication and order processing flows.',
      'Created a clean separation of concerns across frontend and backend modules.',
    ],
    futureImprovements: [
      'Integrate payment processing and transactional email notifications.',
      'Add admin inventory controls and product analytics.',
      'Introduce wishlist, reviews, coupons, and order status tracking.',
    ],
    heroImage: `${projectImageBase}/cartify-ecommerce.webp`,
    thumbnailImage: `${projectImageBase}/cartify-ecommerce.webp`,
    gradientAccent: 'linear-gradient(135deg, rgba(59,130,246,0.55), rgba(109,40,217,0.35))',
    githubUrl: 'https://github.com/Harishharish011/CARTIFY-E-COM',
    liveDemoUrl: 'Coming Soon',
    featured: true,
    status: 'In Progress',
  },
  {
    id: 'interactive-portfolio',
    slug: 'interactive-portfolio',
    title: 'Interactive Portfolio Platform',
    shortDescription:
      'A premium interactive developer portfolio focused on immersive animations, reusable components, and a modern user experience.',
    fullDescription:
      'This portfolio demonstrates advanced frontend engineering practices through cinematic backgrounds, smooth scrolling, modular architecture, reusable UI components, dynamic routing, and responsive layouts.',
    subtitle:
      'A premium developer portfolio powered by motion, reusable architecture, and a dynamic MERN backend.',
    category: 'Developer Portfolio',
    description:
      'A premium interactive developer portfolio focused on immersive animations, reusable components, and a modern user experience.',
    overview:
      'The platform combines a polished frontend experience with service-layer architecture, dynamic backend APIs, project case studies, blogs, GitHub data, and a MongoDB-backed contact workflow.',
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Lenis'],
    challenges: [
      'Traditional developer portfolios often lack engagement and fail to communicate both engineering depth and product taste.',
      'Balancing immersive animation with performance, responsiveness, and readability.',
      'Coordinating multiple animation libraries while preserving stable routing and layout behavior.',
    ],
    solutions: [
      'Built a modern interactive portfolio combining premium UI design, smooth animations, and scalable architecture.',
      'Optimized animation timing with GSAP, Framer Motion, and Lenis while keeping content sections modular.',
      'Added a backend service layer so projects, blogs, GitHub data, and contact messages can be managed dynamically.',
    ],
    gallery: [
      `${projectImageBase}/interactive-portfolio.webp`,
      `${projectImageBase}/interactive-portfolio.webp`,
      `${projectImageBase}/interactive-portfolio.webp`,
    ],
    galleryImages: [
      `${projectImageBase}/interactive-portfolio.webp`,
      `${projectImageBase}/interactive-portfolio.webp`,
      `${projectImageBase}/interactive-portfolio.webp`,
    ],
    outcome: [
      'Created a production-ready portfolio that showcases technical expertise, UI engineering skill, and scalable frontend architecture.',
      'Improved navigation continuity and reusable routing structure.',
      'Built a foundation ready for future backend, CMS, and analytics integrations.',
    ],
    outcomes: [
      'Created a production-ready portfolio that showcases technical expertise, UI engineering skill, and scalable frontend architecture.',
      'Improved navigation continuity and reusable routing structure.',
      'Built a foundation ready for future backend, CMS, and analytics integrations.',
    ],
    futureImprovements: [
      'Add authenticated admin editing for projects and blogs.',
      'Expand analytics for project views and contact conversions.',
      'Introduce richer GitHub contribution and deployment data.',
    ],
    heroImage: `${projectImageBase}/interactive-portfolio.webp`,
    thumbnailImage: `${projectImageBase}/interactive-portfolio.webp`,
    gradientAccent: 'linear-gradient(135deg, rgba(109,40,217,0.55), rgba(59,130,246,0.35))',
    githubUrl: 'https://github.com/Harishharish011/PORTFOLIO',
    liveDemoUrl: 'Coming Soon',
    featured: true,
    status: 'Completed',
  },
];

export async function seedProjects() {
  if (await Project.countDocuments() === 0) {
    await Project.insertMany(projectSeedData);
  }
}

