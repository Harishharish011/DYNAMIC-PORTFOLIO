import { Github } from '../models/Github';

export const githubSeedData = {
  username: 'Harishharish011',
  avatarUrl: 'https://avatars.githubusercontent.com/u/0?v=4',
  bio: 'Full-stack developer building polished MERN applications, interactive portfolios, and scalable API-backed products.',
  followers: 0,
  following: 0,
  publicRepos: 3,
  repos: [
    {
      name: 'NEXORA CRM',
      htmlUrl: 'https://github.com/Harishharish011/NEXORA_CRM',
      language: 'JavaScript',
      description: 'A full-stack CRM platform for contacts, campaigns, analytics, and AI-assisted workflows.',
      stars: 0,
      updatedAt: '2026-01-15',
    },
    {
      name: 'Cartify',
      htmlUrl: 'https://github.com/Harishharish011/CARTIFY-E-COM',
      language: 'JavaScript',
      description: 'A MERN e-commerce platform with authentication, cart workflows, products, and orders.',
      stars: 0,
      updatedAt: '2026-02-10',
    },
    {
      name: 'Interactive Portfolio',
      htmlUrl: 'https://github.com/Harishharish011/PORTFOLIO',
      language: 'TypeScript',
      description: 'A premium interactive developer portfolio with animations, reusable components, and backend APIs.',
      stars: 0,
      updatedAt: '2026-03-20',
    },
  ],
  topLanguages: [
    { name: 'React', percent: 28 },
    { name: 'TypeScript', percent: 24 },
    { name: 'JavaScript', percent: 20 },
    { name: 'Node.js', percent: 16 },
    { name: 'MongoDB', percent: 12 },
  ],
  contributionImageUrl: '',
};

export async function seedGithub() {
  if (await Github.countDocuments() === 0) {
    await Github.create(githubSeedData);
  }
}

