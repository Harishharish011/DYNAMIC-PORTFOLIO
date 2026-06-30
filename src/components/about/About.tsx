import { motion } from 'framer-motion';
import profileImage from '../../assets/prof-me.jpg';
import './about.css';

export function About() {
  return (
    <section id="home" className="bbAbout">
      {/* Oversized background typography */}


      <div className="bbAboutInner">
        <motion.div
          className="bbAboutLeft"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px -40px 0px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h3 className="bbAboutHeading">Hi, I’m Harish.</h3>

          <p className="bbAboutSub">
            Aspiring full-stack developer and final-year Computer Engineering student. I build clean,
            scalable web experiences—focused on reliable architecture, thoughtful UI, and performance-minded
            engineering.
          </p>

          <div className="bbAboutMeta">
            <div className="bbAboutMetaRow">
              <span className="bbAboutDot" aria-hidden="true" />
              <span>Focused on clean, scalable UI &amp; application architecture.</span>
            </div>
            <div className="bbAboutMetaRow">
              <span className="bbAboutDot" aria-hidden="true" />
              <span>Interested in experiences that feel premium, fast, and intuitive.</span>
            </div>
          </div>

          <motion.div
            className="bbAboutCtaWrap"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 18 }}>
              <a
                href="https://github.com/Harishharish011"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="bbIconLink"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0.5C5.73 0.5 0.75 5.56 0.75 11.93C0.75 16.99 3.77 21.34 8.25 22.9C8.83 23.01 9.04 22.65 9.04 22.34C9.04 22.06 9.03 21.34 9.03 20.2C6.04 20.85 5.43 18.9 5.43 18.9C4.96 17.72 4.28 17.4 4.28 17.4C3.32 16.76 4.36 16.77 4.36 16.77C5.42 16.85 5.99 17.94 5.99 17.94C6.95 19.64 8.52 19.15 9.14 18.86C9.24 18.16 9.52 17.67 9.85 17.37C7.46 17.1 4.96 16.13 4.96 11.68C4.96 10.48 5.39 9.48 6.07 8.7C5.95 8.43 5.54 7.19 6.17 5.57C6.17 5.57 7.09 5.29 9.03 6.64C9.86 6.4 10.73 6.28 11.6 6.28C12.47 6.28 13.34 6.4 14.17 6.64C16.11 5.29 17.03 5.57 17.03 5.57C17.66 7.19 17.25 8.43 17.13 8.7C17.81 9.48 18.24 10.48 18.24 11.68C18.24 16.14 15.74 17.09 13.35 17.36C13.77 17.73 14.14 18.46 14.14 19.59C14.14 21.16 14.13 22.34 14.13 22.34C14.13 22.66 14.34 23.01 14.92 22.9C19.4 21.34 22.42 16.99 22.42 11.93C22.42 5.56 17.44 0.5 12 0.5Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/harish-vk/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="bbIconLink"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45H17.2V14.98C17.2 13.7 17.17 12.02 15.4 12.02C13.61 12.02 13.33 13.46 13.33 14.88V20.45H10.08V9.01H13.2V10.54H13.25C13.68 9.76 14.79 8.84 16.33 8.84C19.62 8.84 20.45 11.09 20.45 13.9V20.45ZM5.34 7.43C4.26 7.43 3.39 6.54 3.39 5.47C3.39 4.4 4.26 3.52 5.34 3.52C6.42 3.52 7.29 4.4 7.29 5.47C7.29 6.54 6.42 7.43 5.34 7.43ZM6.91 20.45H3.78V9.01H6.91V20.45Z" />
                </svg>
              </a>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button type="button" className="btn btn-primary bbResumeBtn" style={{ flex: 1 }}>
                Download Resume
              </button>
              <button type="button" className="btn btn-secondary bbResumeBtn" style={{ flex: 1 }}>
                View Projects
              </button>
              <button type="button" className="btn btn-secondary bbResumeBtn" style={{ flex: 1 }}>
                Contact Me
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="bbAboutRight glass-panel bbAboutVisual"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px 0px -40px 0px' }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="bbAboutVisualInner">
            <div className="bbAboutVisualGlow" aria-hidden="true" />
            <div className="bbAboutVisualFrame" aria-hidden="true" />
            <img
              className="bbAboutVisualImage"
              src={profileImage}
              alt="Harish"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

