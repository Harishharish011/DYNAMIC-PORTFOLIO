export type NavKey = 'home' | 'skills' | 'projects' | 'contact';


// Separate routing entry so we don't disturb the hash-based active-section logic.
export type NavRouteKey = 'blogs' | 'github';

export type NavLinkDef = {

  key: NavKey;
  label: string;
  href: string; // anchor link
};

export type NavRouteLinkDef = {
  key: NavRouteKey;
  label: string;
  href: string; // route path
};

export const navLinks: NavLinkDef[] = [
  { key: 'home', label: 'Home', href: '#home' },
  { key: 'skills', label: 'Skills', href: '#skills' },
  { key: 'projects', label: 'Projects', href: '#projects' },
  { key: 'contact', label: 'Contact', href: '#contact' },
];


export const navRouteLinks: NavRouteLinkDef[] = [
  { key: 'blogs', label: 'Blogs', href: '/blogs' },
  { key: 'github', label: 'GitHub', href: '/github' },
];




