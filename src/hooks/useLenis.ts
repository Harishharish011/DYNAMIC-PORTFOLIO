import { useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';

/**
 * useLenis
 * - Creates a single Lenis instance.
 * - Wires Lenis' RAF loop.
 * - Cleans up on unmount to prevent memory leaks.
 *
 * This is intentionally animation-free to keep it compatible with future:
 * - GSAP ScrollTrigger (later phase)
 * - Framer Motion interactions
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  const options = useMemo(() => {
    // Portfolio-friendly, controlled feel:
    // - duration: higher = smoother catch-up, but too high can feel floaty
    // - lerp: lower = more responsive, higher = smoother
    // - wheel/touch multipliers: tune for consistent speed across devices
    return {
      duration: 1.1,
      lerp: 0.08,

      // Wheel
      wheelMultiplier: 1.0,

      // Touch
      touchMultiplier: 1.2,

      // Keep interactions feeling responsive/control.
      smoothWheel: true,
      smoothTouch: true,
    } as const;
  }, []);

  useEffect(() => {
    const lenis = new Lenis(options);
    lenisRef.current = lenis;

    // Expose for GSAP/ScrollTrigger synchronization in animation-only components.
    // Kept non-invasive to existing smooth scrolling behavior.
    (window as any).__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    // Ensure we don't block browser layout on pages with large videos.
    // Lenis uses transform-based scrolling under the hood; we keep it default.
    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;

      // Cleanup global reference
      if ((window as any).__lenis === lenis) {
        (window as any).__lenis = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { lenisRef };
}
