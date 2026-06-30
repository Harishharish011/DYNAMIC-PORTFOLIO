import { motion } from 'framer-motion';
import { Container } from './ui/Container.js';
import { MotionWrapper } from './animations/MotionWrapper.js';
import { SocialLinks } from './footer/SocialLinks.js';
import './footer/footer.css';

export function Footer() {
  return (
    <footer className="bbFooter" aria-label="Site footer">
      <Container>
        <MotionWrapper
          className="bbFooterInner"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="bbFooterTop">
            <div className="bbFooterNameRow">
              <span className="bbFooterNameGlow" aria-hidden="true" />
              <div className="bbFooterName">HARISH</div>
            </div>

            <p className="bbFooterMicro">
              Building modern digital experiences through thoughtful design and
              full-stack development.
            </p>

            <SocialLinks />
          </div>

          <div className="bbFooterDivider" aria-hidden="true" />

          <div className="bbFooterBottom">
            <div className="bbFooterCopy">
              © 2026 Harish. Crafted with React, GSAP, Framer Motion &amp; a
              lot of curiosity.
            </div>
          </div>
        </MotionWrapper>
      </Container>

      {/* gentle fade-in as footer enters viewport (JS-free, uses motion) */}
      <motion.div
        className="bbFooterFadeSentinel"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />
    </footer>
  );
}
