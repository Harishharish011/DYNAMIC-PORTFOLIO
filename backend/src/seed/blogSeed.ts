import { Blog } from '../models/Blog';

export const blogSeedData = [
  {
    title: 'React Performance Patterns for Smooth Interfaces',
    slug: 'react-performance-patterns',
    category: 'React Performance',
    excerpt:
      'Practical patterns for reducing unnecessary renders, keeping interactions responsive, and building React screens that feel immediate.',
    coverImage: '/src/assets/hero.png',
    content:
      'React performance starts with data flow clarity. Keep state close to where it is used, memoize expensive derived values, and avoid passing unstable object references through deeply nested trees. For interactive interfaces, measure before optimizing: React DevTools, browser performance traces, and simple render counters often reveal the real bottleneck. The best optimizations are usually small architectural choices that prevent work from being scheduled in the first place.',
    tags: ['React', 'Performance', 'Memoization', 'UX'],
    readingTime: '7 min',
    publishedDate: '2026-01-12',
    author: { name: 'Harish', role: 'Full-Stack Developer', avatarImage: '/src/assets/prof-me.jpg' },
    featured: true,
    published: true,
  },
  {
    title: 'Designing Node.js REST APIs That Stay Maintainable',
    slug: 'node-rest-api-maintainability',
    category: 'Node.js REST APIs',
    excerpt:
      'A guide to controllers, routes, validation, middleware, and service boundaries for backend APIs that remain easy to extend.',
    coverImage: '/src/assets/hero.png',
    content:
      'A maintainable REST API is less about clever abstractions and more about predictable boundaries. Routes should define the public surface, controllers should translate requests and responses, middleware should handle cross-cutting concerns, and models should protect data shape. Keep validation close to incoming requests and centralize error handling so every failure has the same response structure.',
    tags: ['Node.js', 'Express', 'REST', 'Backend'],
    readingTime: '8 min',
    publishedDate: '2026-01-20',
    author: { name: 'Harish', role: 'Full-Stack Developer', avatarImage: '/src/assets/prof-me.jpg' },
    featured: true,
    published: true,
  },
  {
    title: 'MongoDB Tips for MERN Applications',
    slug: 'mongodb-tips-for-mern',
    category: 'MongoDB Tips',
    excerpt:
      'Small MongoDB decisions that improve reliability: indexes, schema defaults, connection handling, and safe seed scripts.',
    coverImage: '/src/assets/hero.png',
    content:
      'MongoDB works best when flexible documents are still treated with discipline. Add indexes for lookup fields such as slugs and emails, use schema defaults for predictable API responses, and keep connection logic explicit during server startup. For seed data, prefer idempotent scripts that check existing documents before inserting, so development databases can be rebuilt safely.',
    tags: ['MongoDB', 'Mongoose', 'Database', 'MERN'],
    readingTime: '6 min',
    publishedDate: '2026-02-02',
    author: { name: 'Harish', role: 'Full-Stack Developer', avatarImage: '/src/assets/prof-me.jpg' },
    featured: true,
    published: true,
  },
  {
    title: 'MERN Authentication: Practical JWT Flow',
    slug: 'mern-authentication-jwt-flow',
    category: 'MERN Authentication',
    excerpt:
      'How to structure registration, login, protected routes, password hashing, and JWT verification in a MERN backend.',
    coverImage: '/src/assets/hero.png',
    content:
      'A practical MERN authentication flow begins with clear trust boundaries. Hash passwords before storage, return signed JWTs only after credentials are verified, and keep protected route logic in middleware. The frontend should never need to know how tokens are verified; it only consumes the API contract and handles authenticated or unauthenticated states.',
    tags: ['MERN', 'JWT', 'Authentication', 'Security'],
    readingTime: '9 min',
    publishedDate: '2026-02-14',
    author: { name: 'Harish', role: 'Full-Stack Developer', avatarImage: '/src/assets/prof-me.jpg' },
    featured: true,
    published: true,
  },
  {
    title: 'GSAP Animations Without Sacrificing Usability',
    slug: 'gsap-animations-usability',
    category: 'GSAP Animations',
    excerpt:
      'Animation should support clarity. Here is how to use GSAP timing, reveal sequences, and scroll motion responsibly.',
    coverImage: '/src/assets/hero.png',
    content:
      'GSAP is powerful because it gives precise control over timing, sequencing, and scroll-based motion. The key is restraint: animate hierarchy, not everything. Use motion to guide attention, keep durations short for repeated interactions, and test on lower-powered devices. Good animation makes an interface feel intentional without making users wait for content.',
    tags: ['GSAP', 'Animation', 'Frontend', 'UX'],
    readingTime: '5 min',
    publishedDate: '2026-03-01',
    author: { name: 'Harish', role: 'Full-Stack Developer', avatarImage: '/src/assets/prof-me.jpg' },
    featured: true,
    published: true,
  },
  {
    title: 'Engineering a Portfolio That Feels Like a Product',
    slug: 'portfolio-engineering-product-thinking',
    category: 'Portfolio Engineering',
    excerpt:
      'A portfolio can be more than a gallery. Treat it like a product with architecture, content systems, and reliable data flows.',
    coverImage: '/src/assets/hero.png',
    content:
      'A strong portfolio is a product experience. It needs clear information architecture, fast navigation, reliable data, and a coherent design system. Moving projects and blogs into MongoDB turns content into an editable system, while a service layer keeps the frontend stable. The goal is not just to show work, but to demonstrate how thoughtfully the work is built.',
    tags: ['Portfolio', 'Architecture', 'MERN', 'Product Engineering'],
    readingTime: '7 min',
    publishedDate: '2026-03-18',
    author: { name: 'Harish', role: 'Full-Stack Developer', avatarImage: '/src/assets/prof-me.jpg' },
    featured: true,
    published: true,
  },
];

export async function seedBlogs() {
  if (await Blog.countDocuments() === 0) {
    await Blog.insertMany(blogSeedData);
  }
}

