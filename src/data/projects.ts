export type Project = {
  id: string;
  title: string;
  category: string;
  shortDescription: string;

  /** For the case study experience */
  fullDescription: string;
  heroImage: string;
  galleryImages: string[];
  challenges: string[];
  solutions: string[];
  outcomes: string[];

  technologies: string[];

  thumbnailImage: string;
  gradientAccent: string;

  githubUrl: string;
  liveDemoUrl: string;

  featured: boolean;
};

export const projects: Project[] = [
  {
    id: 'nexora-crm',
    title: 'NEXORA CRM',
    category: 'CRM Platform',
    shortDescription:
      'A full-stack CRM platform inspired by HubSpot and Salesforce with contacts, campaigns, analytics, and AI-assisted workflows.',
    fullDescription:
      'NEXORA CRM streamlines customer relationship management by providing an intuitive dashboard for contact management, campaign tracking, analytics, AI-assisted content generation, and secure authentication. The platform emphasizes scalability, modular architecture, and responsive design.',
    technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    heroImage: '/src/assets/images/projects/nexora-crm.webp',
    galleryImages: [
      '/src/assets/images/projects/nexora-crm.webp',
      '/src/assets/images/projects/nexora-crm.webp',
      '/src/assets/images/projects/nexora-crm.webp',
    ],
    challenges: [
      'Small and medium businesses often rely on multiple disconnected tools to manage customers, campaigns, and communications, leading to inefficiencies and poor visibility.',
      'Designing scalable backend architecture.',
      'Managing relationships between multiple CRM modules.',
    ],
    solutions: [
      'Developed a centralized CRM platform that unifies customer management, campaign tracking, AI-assisted workflows, analytics, and authentication into a single modern web application.',
      'Adopted a modular MERN architecture.',
      'Structured REST APIs around feature modules and implemented JWT authentication and middleware.',
    ],
    outcomes: [
      'Successfully established a scalable CRM foundation capable of supporting future AI modules, reporting features, and enterprise-level functionality.',
      'Improved cohesion across authentication, dashboards, campaigns, and customer interactions.',
      'Reusable frontend components and modular backend services.',
    ],
    thumbnailImage: '/src/assets/images/projects/nexora-crm.webp',
    gradientAccent:
      'linear-gradient(135deg, rgba(147,51,234,0.55), rgba(59,130,246,0.35))',
    githubUrl: 'https://github.com/Harishharish011/NEXORA_CRM',
    liveDemoUrl: 'COMING_SOON',
    featured: true,
  },
  {
    id: 'cartify-ecommerce',
    title: 'Cartify E-Commerce Platform',
    category: 'E-Commerce',
    shortDescription:
      'A full-stack MERN e-commerce platform featuring authentication, cart workflows, product management, and order processing.',
    fullDescription:
      'Cartify provides a complete online shopping experience with user authentication, product browsing, cart management, order tracking, and scalable backend APIs.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    heroImage: '/src/assets/images/projects/cartify-ecommerce.webp',
    galleryImages: [
      '/src/assets/images/projects/cartify-ecommerce.webp',
      '/src/assets/images/projects/cartify-ecommerce.webp',
      '/src/assets/images/projects/cartify-ecommerce.webp',
    ],
    challenges: [
      'Many small businesses require an affordable and scalable e-commerce platform capable of managing products, customers, and orders efficiently.',
      'Managing application state across multiple shopping flows.',
      'Structuring scalable REST APIs.',
    ],
    solutions: [
      'Developed a modular MERN application that supports secure authentication, product management, shopping cart workflows, and order tracking.',
      'Organized backend into modular services and used JWT authentication.',
      'Designed reusable React components and structured REST APIs using REST principles.',
    ],
    outcomes: [
      'Built a scalable e-commerce foundation suitable for future payment integration and advanced inventory management.',
      'Improved security and reliability of auth + order processing.',
      'A clean separation of concerns across frontend and backend modules.',
    ],
    thumbnailImage: '/src/assets/images/projects/cartify-ecommerce.webp',
    gradientAccent:
      'linear-gradient(135deg, rgba(59,130,246,0.55), rgba(109,40,217,0.35))',
    githubUrl: 'https://github.com/Harishharish011/CARTIFY-E-COM',
    liveDemoUrl: 'COMING_SOON',
    featured: true,
  },
  {
    id: 'interactive-portfolio',
    title: 'Interactive Portfolio Platform',
    category: 'Developer Portfolio',
    shortDescription:
      'A premium interactive developer portfolio focused on immersive animations, reusable components, and a modern user experience.',
    fullDescription:
      'This portfolio demonstrates advanced frontend engineering practices through cinematic backgrounds, smooth scrolling, modular architecture, reusable UI components, dynamic routing, and responsive layouts.',
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Lenis'],
    heroImage: '/src/assets/images/projects/interactive-portfolio.webp',
    galleryImages: [
      '/src/assets/images/projects/interactive-portfolio.webp',
      '/src/assets/images/projects/interactive-portfolio.webp',
      '/src/assets/images/projects/interactive-portfolio.webp',
    ],
    challenges: [
      'Traditional developer portfolios often lack engagement and fail to effectively showcase both technical and design capabilities.',
      'Balancing animations with performance.',
      'Coordinating multiple animation libraries while maintaining responsiveness.',
    ],
    solutions: [
      'Built a modern interactive portfolio combining premium UI design, smooth animations, and scalable architecture while maintaining excellent performance and responsiveness.',
      'Optimized GSAP timelines and used Lenis for smooth scrolling.',
      'Built reusable component architecture and applied responsive utility-first styling with Tailwind CSS.',
    ],
    outcomes: [
      'Created a production-ready portfolio that effectively showcases technical expertise, UI engineering skills, and scalable frontend architecture.',
      'Improved navigation continuity and reusable routing structure.',
      'A foundation ready for future backend/CMS integration.',
    ],
    thumbnailImage: '/src/assets/images/projects/interactive-portfolio.webp',
    gradientAccent:
      'linear-gradient(135deg, rgba(109,40,217,0.55), rgba(59,130,246,0.35))',
    githubUrl: 'https://github.com/Harishharish011/PORTFOLIO',
    liveDemoUrl: 'COMING_SOON',
    featured: true,
  },
];

