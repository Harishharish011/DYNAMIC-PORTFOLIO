export type Particle = {
  x: number; // percent
  y: number; // percent
  size: number; // px
  opacity: number; // 0..1
  blur: number; // px
  delay: number; // s
  duration: number; // s
};

export function createParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    // Bias toward center region for a premium nebula feel
    const cx = 50 + (Math.random() - 0.5) * 60; // 20..80-ish
    const cy = 50 + (Math.random() - 0.5) * 60;

    particles.push({
      x: Math.max(0, Math.min(100, cx)),
      y: Math.max(0, Math.min(100, cy)),
      size: 1 + Math.random() * 2.5, // 1..3.5px
      opacity: 0.05 + Math.random() * 0.12, // low opacity
      blur: Math.random() * 1.2, // subtle
      delay: Math.random() * 1.5, // small stagger
      duration: 10 + Math.random() * 18, // long, subtle drift
    });
  }
  return particles;
}
