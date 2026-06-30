import { AnimatePresence, motion } from 'framer-motion';
import { navLinks, navRouteLinks, type NavKey } from './navLinks.js';
import { useNavigate } from 'react-router-dom';
import './navbar.css';


export function MobileMenu({
  open,

  active,
  onNavigate,
}: {
  open: boolean;
  active: NavKey;
  onNavigate: () => void;
}) {
  const navigate = useNavigate();


  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className="bbMobileMenu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-label="Mobile navigation menu"
        >
          <div className="bbMobileMenuInner">
            {navLinks.map((l) => (
              <button
                key={l.key}
                type="button"
                className={`bbMobileLink ${l.key === active ? 'isActive' : ''}`}
                onClick={() => {
                  onNavigate();
                  window.location.hash = l.href.replace('#', '');
                }}
              >
                <span className="bbMobileLinkText">{l.label.toUpperCase()}</span>
                <span className="bbMobileLinkUnderline" aria-hidden="true" />
              </button>
            ))}

            {navRouteLinks.map((l) => (
              <button
                key={l.key}
                type="button"
                className="bbMobileLink"
                onClick={() => {
                  onNavigate();
                  navigate(l.href);
                }}
              >
                <span className="bbMobileLinkText">{l.label.toUpperCase()}</span>
                <span className="bbMobileLinkUnderline" aria-hidden="true" />
              </button>
            ))}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

