import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useActiveSection } from '../../../hooks/useActiveSection.js';
import { useScrollNavbarState } from '../../../hooks/useScrollNavbarState.js';
import { navLinks, navRouteLinks, type NavKey } from './navLinks.js';
import { MobileMenu } from './MobileMenu.js';
import { NavLinkItem } from './NavLinkItem.js';
import './navbar.css';

export function Navbar() {
  const { active } = useActiveSection();

  const { variant } = useScrollNavbarState();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onHash = () => setOpen(false);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <>
      <motion.nav
        className={`bbNav ${variant === 'glass' ? 'isGlass' : 'isTransparent'}`}
        initial={false}
        animate={{ opacity: variant === 'glass' ? 1 : 0.95 }}
        transition={{ duration: 0.25 }}
      >
        <div className="bbNavInner">
          <a
            href="#home"
            className="bbLogo"
            onClick={() => setOpen(false)}
            aria-label="Go to Home"
          >
            <span className="bbLogoGlow" aria-hidden="true" />
            <span className="bbLogoText">HARISH</span>
          </a>

          <div className="bbDesktopLinks" aria-label="Primary navigation">
            {navLinks.map((l) => (
              <a
                key={l.key}
                href={l.href}
                className={`bbNavLink ${l.key === active ? 'isActive' : ''}`}
              >
                <span className="bbNavLinkLabel">{l.label}</span>
                <span className="bbNavLinkUnderline" aria-hidden="true" />
              </a>
            ))}

            {navRouteLinks.map((l) => (
              <NavLinkItem
                key={l.key}
                label={l.label}
                href={l.href}
                isActive={false}
              />
            ))}
          </div>


          <button
            type="button"
            className="bbMobileToggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`bbHamburger ${open ? 'isOpen' : ''}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </motion.nav>

      <MobileMenu open={open} active={active as NavKey} onNavigate={() => setOpen(false)} />
    </>
  );
}
