import type { Blog } from '../types/blog.js';

export const blogs: Blog[] = [
  {
    id: 'blog_1',
    slug: 'nebula-ui-glass',
    title: 'Nebula UI: Glassmorphism Without Compromise',
    category: 'Design Systems',
    excerpt:
      'A practical look at building a glassmorphism-first UI with readable hierarchy, stable spacing, and premium motion.',
    shortDescription:
      'A practical look at building a glassmorphism-first UI with readable hierarchy, stable spacing, and premium motion.',
    coverImage: '/src/assets/hero.png',

    author: {
      name: 'Harish',
      role: 'UI Engineering',
      avatarImage: '/src/assets/typescript.svg',
    },

    tags: ['Glassmorphism', 'Typography', 'Motion'],

    content: {
      blocks: [
        {
          type: 'heading',
          text: 'A native-feeling UI is a system, not a style',
        },
        {
          type: 'paragraph',
          text: 'This is placeholder content for the Blog module. The structure is intentionally built to match the portfolio’s existing motion and glass identity.',
        },
        {
          type: 'paragraph',
          text: 'Future phases can replace these blocks with real CMS/DB data, while keeping the same page structure and visuals.',
        },
      ],
    },

    likes: { total: 0, userIds: [] },
    commentsCount: 0,
    readingTime: '6 min',

    featured: true,

    publishedAt: '2026-01-18',
    updatedAt: '2026-01-18',

    // Backward compatibility fields used by current UI
    publishedDate: '2026-01-18',
    readTime: '6 min',
  },
  {
    id: 'blog_2',
    slug: 'performance-motion',
    title: 'Performance-Minded Motion: GSAP + Framer Patterns',
    category: 'Front-End Engineering',
    excerpt:
      'How to combine animation systems carefully so interactions stay smooth, legible, and stable across devices.',
    shortDescription:
      'How to combine animation systems carefully so interactions stay smooth, legible, and stable across devices.',
    coverImage: '/src/assets/hero.png',

    author: {
      name: 'Harish',
      role: 'Full-Stack / UI',
      avatarImage: '/src/assets/vite.svg',
    },

    tags: ['GSAP', 'Framer Motion', 'Performance'],

    content: {
      blocks: [
        {
          type: 'heading',
          text: 'Motion should amplify clarity',
        },
        {
          type: 'paragraph',
          text: 'Placeholder blog content. Replace later with real data sources; keep the same structure and component composition.',
        },
      ],
    },

    likes: { total: 0, userIds: [] },
    commentsCount: 0,
    readingTime: '8 min',

    featured: true,

    publishedAt: '2026-02-03',
    updatedAt: '2026-02-03',

    publishedDate: '2026-02-03',
    readTime: '8 min',
  },
  {
    id: 'blog_3',
    slug: 'routing-a11y',
    title: 'Routing, A11y, and State: Small Choices, Big UX',
    category: 'UX Engineering',
    excerpt:
      'A checklist for building routes and UI states that feel consistent—especially when mixing scroll behaviors and overlays.',
    shortDescription:
      'A checklist for building routes and UI states that feel consistent—especially when mixing scroll behaviors and overlays.',
    coverImage: '/src/assets/hero.png',

    author: {
      name: 'Harish',
      role: 'Product Engineering',
      avatarImage: '/src/assets/typescript.svg',
    },

    tags: ['Accessibility', 'Routing', 'UI Stability'],

    content: {
      blocks: [
        {
          type: 'heading',
          text: 'Consistency is the hidden feature',
        },
        {
          type: 'paragraph',
          text: 'Placeholder blog content for the blog details page. The “Like/Comment/Share/Save” elements will be added as reusable placeholders.',
        },
      ],
    },

    likes: { total: 0, userIds: [] },
    commentsCount: 0,
    readingTime: '5 min',

    featured: true,

    publishedAt: '2026-02-21',
    updatedAt: '2026-02-21',

    publishedDate: '2026-02-21',
    readTime: '5 min',
  },
];


