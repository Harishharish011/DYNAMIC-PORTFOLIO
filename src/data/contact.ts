export type ContactMethod = {
  id: string;
  label: string;
  value: string;
  href?: string;
};

export const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'vkharish011@gmail.com',
    href: 'mailto:vkharish011@gmail.com',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/Harishharish011',
    href: 'https://github.com/Harishharish011',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/harish-vk',
    href: 'https://www.linkedin.com/in/harish-vk/',
  },
  {
    id: 'location',
    label: 'Location',
    value: 'Coimbatore, Tamil Nadu, India',
  },

  {
    id: 'resume',
    label: 'Resume',
    value: 'Available upon request',
  },
];
