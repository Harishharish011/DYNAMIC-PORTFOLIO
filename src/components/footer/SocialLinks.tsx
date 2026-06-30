import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiFileText } from 'react-icons/fi';

import './footer.css';

const links = [
  { key: 'github', label: 'GitHub', href: 'https://github.com/yourname', icon: FiGithub },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yourname',
    icon: FiLinkedin,
  },
  { key: 'email', label: 'Email', href: 'mailto:yourname@example.com', icon: FiMail },
  {
    key: 'resume',
    label: 'Resume',
    href: '#',
    icon: FiFileText,
  },
] as const;

export function SocialLinks() {
  return (
    <div className="bbSocialLinks" aria-label="Social links">
      {links.map((l, idx) => {
        const Icon = l.icon;
        return (
          <motion.a
            key={l.key}
            className="bbSocialIcon"
            href={l.href}
            target={l.key === 'resume' ? undefined : '_blank'}
            rel={l.key === 'resume' ? undefined : 'noreferrer'}
            aria-label={l.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.06 * idx, ease: 'easeOut' }}
            whileHover={{ y: -3 }}
          >
            <Icon size={18} aria-hidden="true" />
          </motion.a>
        );
      })}
    </div>
  );
}
