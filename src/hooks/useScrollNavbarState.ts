import { useEffect, useMemo, useState } from 'react';

export function useScrollNavbarState() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setIsScrolled(y > 40);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const variant = useMemo(() => (isScrolled ? 'glass' : 'transparent'), [isScrolled]);
  return { isScrolled, variant };
}
