import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import galaxyVideo from '../../assets/Galaxy-slowmo.mp4';
import './galaxyBackground.css';
import { createParticles } from './galaxyParticles.js';

gsap.registerPlugin(ScrollTrigger);

export default function GalaxyBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  const nebulaRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);

  const particles = useMemo(() => createParticles(22), []);

  useEffect(() => {
    const heroEl = document.querySelector<HTMLElement>('.heroRoot');
    const heroContent = document.querySelector<HTMLElement>('.heroContent');

    const getIntensity = () => {
      const isMobile = window.matchMedia('(max-width: 640px)').matches;
      const isTablet = window.matchMedia('(max-width: 1024px)').matches;

      return {
        galaxySpeed: isMobile ? 0.18 : isTablet ? 0.25 : 0.3,
        nebulaSpeed: isMobile ? 0.35 : isTablet ? 0.45 : 0.5,
        particlesSpeed: isMobile ? 1.05 : isTablet ? 1.25 : 1.45,
        heroContentShift: isMobile ? 10 : isTablet ? 14 : 18,
      };
    };

    const intensity = getIntensity();

    // Ensure the transforms start clean.
    gsap.set(videoWrapRef.current, { y: 0, scale: 1 });
    gsap.set(nebulaRef.current, { y: 0 });
    gsap.set(particlesRef.current, { y: 0 });
    if (heroContent) gsap.set(heroContent, { y: 0 });

    const lenis = (window as any).__lenis as { on?: Function } | null;

    let cleanup: (() => void) | null = null;
    if (lenis && typeof (lenis as any).on === 'function') {
      const handler = () => ScrollTrigger.update();
      (lenis as any).on('scroll', handler);
      cleanup = () => {
        try {
          (lenis as any).off?.('scroll', handler);
        } catch {
          // ignore
        }
      };
    }

    const st = ScrollTrigger.create({
      trigger: heroEl ?? rootRef.current ?? undefined,
      start: 'top top',
      end: '+=1000',
      scrub: true,
      onUpdate: (self) => {
        const prog = self.progress;

        const galaxyY = -intensity.galaxySpeed * prog * 120;
        const galaxyScale = 1 + 0.15 * prog;

        gsap.set(videoWrapRef.current, {
          y: galaxyY,
          scale: galaxyScale,
          force3D: true,
          willChange: 'transform',
        });

        gsap.set(nebulaRef.current, {
          y: -intensity.nebulaSpeed * prog * 60,
          force3D: true,
          willChange: 'transform',
        });

        gsap.set(particlesRef.current, {
          y: -intensity.particlesSpeed * prog * 120,
          force3D: true,
          willChange: 'transform',
        });

        if (heroContent) {
          gsap.set(heroContent, {
            y: -prog * (intensity.heroContentShift / 2),
            force3D: true,
            willChange: 'transform',
          });
        }
      },
    });

    ScrollTrigger.refresh();

    return () => {
      st.kill();
      cleanup?.();
    };
  }, [particles]);

  return (
    <div ref={rootRef} className="gbRoot" aria-hidden="true">
      <div ref={videoWrapRef} className="gbLayer gbVideo" aria-hidden="true">
        <video
          className="gbVideoEl"
          src={galaxyVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      <div ref={nebulaRef} className="gbLayer gbNebula" aria-hidden="true" />

      <div ref={particlesRef} className="gbLayer gbParticles" aria-hidden="true">
        {particles.map((p, idx) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className="gbParticle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              filter: `blur(${p.blur}px)`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="gbLayer gbDarkOverlay" aria-hidden="true" />
      <div className="gbLayer gbCosmicOverlay" aria-hidden="true" />
    </div>
  );
}
