import { useEffect, useMemo, useState } from 'react';
import { navLinks } from '../components/layout/Navbar/navLinks.js';
import type { NavKey } from '../components/layout/Navbar/navLinks.js';

export function useActiveSection() {
  const sectionKeys = useMemo(() => navLinks.map((l) => l.key), []);
  const [active, setActive] = useState<NavKey>('home');

  useEffect(() => {
    let raf = 0;

    const compute = () => {
      const y = window.scrollY || 0;
      const focusLine = 96; // px below top for "active" feel

      const candidates = sectionKeys
        .map((key) => {
          const el = document.getElementById(key);
          if (!el) return null;

          const rect = el.getBoundingClientRect();
          // Use distance to focus line. Bias toward sections whose top is above focus line.
          const dist = Math.abs(rect.top - focusLine);
          return { key, dist, top: rect.top };
        })
        .filter(Boolean) as Array<{ key: NavKey; dist: number; top: number }>;

      if (candidates.length === 0 || y < 80) {
        setActive('home');
        return;
      }

      candidates.sort((a, b) => a.dist - b.dist);

      const above = candidates.find((c) => c.top <= focusLine);
      const picked = above ?? candidates[0];

      if (picked) setActive(picked.key);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionKeys]);

  return { active };
}
