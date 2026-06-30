import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

type Props = {
  label: string;
  href: string;
  isActive?: boolean;
};

export function NavLinkItem({ label, href, isActive = false }: Props) {
  const navigate = useNavigate();

  const isRoute = href.startsWith('/');

  const className = `bbNavLink ${isActive ? 'isActive' : ''}`;

  if (isRoute) {
    return (
      <motion.a
        className={className}
        href={href}
        onClick={(e) => {
          e.preventDefault();
          navigate(href);
        }}
      >
        <span className="bbNavLinkLabel">{label}</span>
        <span className="bbNavLinkUnderline" aria-hidden="true" />
      </motion.a>
    );
  }

  return (
    <a className={className} href={href}>
      <span className="bbNavLinkLabel">{label}</span>
      <span className="bbNavLinkUnderline" aria-hidden="true" />
    </a>
  );
}

