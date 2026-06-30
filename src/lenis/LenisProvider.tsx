import { type ReactNode } from 'react';
import { useLenis } from '../hooks/useLenis.js';

/**
 * LenisProvider
 * Wraps the app root to enable smooth scrolling globally.
 *
 * GSAP compatibility (future phases):
 * - Lenis is driven via a RAF loop in useLenis().
 * - In a later phase, ScrollTrigger/GSAP can be synchronized by calling
 *   lenis.raf(time) / reading lenis.scroll or by triggering updates inside the same RAF loop.
 * - No ScrollTrigger is initialized in this phase.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
}
