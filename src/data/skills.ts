export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'Programming Languages'
  | 'Database'
  | 'Tools & Platforms';

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
};

export const skills: Skill[] = [
  { id: 'html5', name: 'HTML5', category: 'Frontend' },
  { id: 'css3', name: 'CSS3', category: 'Frontend' },
  { id: 'js', name: 'JavaScript (ES6+)', category: 'Frontend' },
  { id: 'ts', name: 'TypeScript', category: 'Frontend' },
  { id: 'react', name: 'React.js', category: 'Frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend' },
  { id: 'framer-motion', name: 'Framer Motion', category: 'Frontend' },

  { id: 'node', name: 'Node.js', category: 'Backend' },
  { id: 'express', name: 'Express.js', category: 'Backend' },
  { id: 'rest', name: 'REST API Development', category: 'Backend' },

  { id: 'python', name: 'Python', category: 'Programming Languages' },
  { id: 'js-lang', name: 'JavaScript', category: 'Programming Languages' },
  { id: 'ts-lang', name: 'TypeScript', category: 'Programming Languages' },

  { id: 'mongo', name: 'MongoDB', category: 'Database' },
  { id: 'mysql', name: 'MySQL', category: 'Database' },

  { id: 'git', name: 'Git', category: 'Tools & Platforms' },
  { id: 'github', name: 'GitHub', category: 'Tools & Platforms' },
  { id: 'vscode', name: 'VS Code', category: 'Tools & Platforms' },
  { id: 'postman', name: 'Postman', category: 'Tools & Platforms' },
  { id: 'figma', name: 'Figma', category: 'Tools & Platforms' },
];
