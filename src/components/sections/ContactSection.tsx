import { useMemo, useRef, useState } from 'react';
import { MotionWrapper } from '../animations/MotionWrapper.js';
import { Container } from '../ui/Container.js';
import { Button } from '../ui/Button.js';
import { contactMethods } from '../../data/contact.js';

import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiX, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import './contact.css';

import type { ContactForm, ContactValidationErrors } from '../../types/contact.js';
import { validateContactForm } from '../../utils/contactValidation.js';
import { sendContactMessage } from '../../services/contactService.js';

const getContact = (id: string) => contactMethods.find((m) => m.id === id);

export function ContactSection() {
  const email = getContact('email');
  const github = getContact('github');
  const linkedin = getContact('linkedin');
  const location = getContact('location');

  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [isSending, setIsSending] = useState(false);

  const [notification, setNotification] = useState<
    | null
    | {
        type: 'success' | 'error';
        title: string;
        message: string;
      }
  >(null);

  const dismissTimerRef = useRef<number | null>(null);


  const projectTypeOptions = useMemo(
    () => [
      'Full Stack Web Application',
      'Portfolio / Landing Page',
      'UI/UX Collaboration',
      'Freelance Opportunity',
      'Internship / Job Opportunity',
      'Other',
    ],
    []
  );

  return (
    <section id="contact" className="bbContact">
      <Container>
        <div className="bbContactInner">


          <MotionWrapper
            className="bbContactHeader fadeUp"
            initial={undefined}
            animate={undefined}
          >
            <div className="bbContactHeroHeader">
              <div className="bbContactEyebrow bbContactEyebrow--hero">
                LET&apos;S BUILD SOMETHING TOGETHER
              </div>

              <h2 className="bbContactHeading bbContactHeading--hero">
                Let&apos;s create something impactful
              </h2>

              <MotionWrapper
                className="bbContactHeroReveal"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <p className="bbContactSupporting bbContactSupporting--hero">
                  I enjoy collaborating with founders, teams, and creators who
                  care about building thoughtful digital experiences. Whether
                  it is a new product, an ambitious idea, or a creative
                  challenge, I am always open to meaningful conversations.
                </p>

                <div className="bbContactCtaWrap bbContactCtaWrap--hero">
                  <a href={email?.href ?? 'mailto:yourname@example.com'}>
                    <Button variant="primary">Start a Conversation</Button>
                  </a>
                </div>
              </MotionWrapper>
            </div>

            <div className="bbContactLowerGrid">
              <MotionWrapper
                className="bbContactFormCol"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {/* Premium Contact Form Panel (future-ready EmailJS integration point) */}
                    <div className="bbContactFormWrap">
                  {notification && (
                    <div className="bbContactNotificationWrap" role="status" aria-live="polite">
                      <div
                        className={`bbContactNotification ${
                          notification.type === 'success'
                            ? 'bbContactNotification--success'
                            : 'bbContactNotification--error'
                        }`}
                      >
                        <div className="bbContactNotificationIcon" aria-hidden="true">
                          {notification.type === 'success' ? (
                            <FiCheckCircle size={18} style={{ color: 'rgba(16,185,129,0.95)' }} />
                          ) : (
                            <FiAlertCircle size={18} style={{ color: 'rgba(239,68,68,0.95)' }} />
                          )}
                        </div>
                        <div className="bbContactNotificationBody">
                          <div className="bbContactNotificationTitle">{notification.title}</div>
                          <div className="bbContactNotificationMessage">{notification.message}</div>
                        </div>
                        <button
                          type="button"
                          className="bbContactNotificationClose"
                          aria-label="Dismiss notification"
                          onClick={() => setNotification(null)}
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  <form
                    className="bbContactForm glass-panel glass-edge glow-panel"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (isSending) return;

                      const { errors: nextErrors, normalized } = validateContactForm(form);
                      setErrors(nextErrors);

                      const hasErrors = Object.keys(nextErrors).length > 0;
                      if (hasErrors) return;

                      setIsSending(true);
                      setNotification(null);

                      // Ensure trimmed values are reflected in controlled inputs (no spacing/layout impact)
                      setForm(normalized);

                      if (dismissTimerRef.current) {
                        window.clearTimeout(dismissTimerRef.current);
                      }

                      dismissTimerRef.current = window.setTimeout(() => {
                        setNotification(null);
                      }, 6000);

                      try {
                        const result = await sendContactMessage(normalized);
                        if (result.stored) {
                          setNotification({
                            type: 'success',
                            title: 'Message sent successfully',
                            message: 'Thanks! Your message has been received. I will get back to you soon.',
                          });
                        } else {
                          setNotification({
                            type: 'success',
                            title: 'Email sent successfully',
                            message:
                              'Your email was delivered, but I could not save it to the database. I still received your message.',
                          });
                        }
                        setForm({
                          name: '',
                          email: '',
                          company: '',
                          projectType: '',
                          message: '',
                        });
                        setErrors({});
                      } catch (err) {
                        setNotification({
                          type: 'error',
                          title: 'Failed to send message',
                          message:
                            err instanceof Error
                              ? err.message
                              : 'Something went wrong while sending your message. Please try again.',
                        });
                      } finally {
                        setIsSending(false);
                      }
                    }}
                  >
                    <div className="bbContactFormGrid">
                      <div className="bbContactField">
                        <input
                          className="bbContactInput"
                          type="text"
                          name="name"
                          value={form.name}
                          placeholder="Your Name"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                        {errors.name && <div className="bbContactFieldError">{errors.name}</div>}
                      </div>

                      <div className="bbContactField">
                        <input
                          className="bbContactInput"
                          type="email"
                          name="email"
                          value={form.email}
                          placeholder="you@example.com"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                        {errors.email && <div className="bbContactFieldError">{errors.email}</div>}
                      </div>


                      <div className="bbContactField">
                        <input
                          className="bbContactInput"
                          type="text"
                          name="company"
                          value={form.company}
                          placeholder="Company / Organization (Optional)"
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              company: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="bbContactField">
                        <div className="bbContactSelectWrap">
                          <select
                            className="bbContactSelect"
                            name="projectType"
                            value={form.projectType}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                projectType: e.target.value,
                              }))
                            }
                          >
                            <option value="" disabled>
                              Project Type
                            </option>
                            {projectTypeOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.projectType && (
                          <div className="bbContactFieldError">{errors.projectType}</div>
                        )}
                      </div>

                      <div className="bbContactField bbContactField--message">
                        <textarea
                          className="bbContactTextarea"
                          name="message"
                          value={form.message}
                          placeholder="Tell me a little about your idea, project, or opportunity..."
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              message: e.target.value,
                            }))
                          }
                        />
                        {errors.message && <div className="bbContactFieldError">{errors.message}</div>}
                      </div>

                    </div>

                    <div className="bbContactFormActions">
                      <Button variant="primary" type="submit" disabled={isSending}>
                        {isSending ? (
                          <span className="bbContactButtonLoading">
                            <span className="bbContactSpinner" aria-hidden="true" />
                            <span>SENDING</span>
                          </span>
                        ) : (
                          'SEND MESSAGE'
                        )}
                      </Button>
                    </div>
                  </form>

                </div>
              </MotionWrapper>

              <MotionWrapper
                className="bbContactInfoCol"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {/* Contact Information Panel */}
                <div className="bbContactPanel glass-panel glass-edge glow-panel">
                  <div className="bbContactPanelRow">
                    <div className="bbContactPanelIcon" aria-hidden="true">
                      <FiMail size={18} />
                    </div>
                    <div className="bbContactPanelBody">
                      <div className="bbContactPanelLabel">Email</div>
                      <a
                        className="bbContactPanelValue"
                        href={email?.href ?? 'mailto:yourname@example.com'}
                      >
                        {email?.value ?? 'yourname@example.com'}
                      </a>
                    </div>
                  </div>

                  <div className="bbContactPanelDivider" aria-hidden="true" />

                  <div className="bbContactPanelRow">
                    <div className="bbContactPanelIcon" aria-hidden="true">
                      <FiGithub size={18} />
                    </div>
                    <div className="bbContactPanelBody">
                      <div className="bbContactPanelLabel">GitHub</div>
                      <a
                        className="bbContactPanelValue"
                        href={github?.href ?? 'https://github.com/yourname'}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {github?.value ?? 'github.com/yourname'}
                      </a>
                    </div>
                  </div>

                  <div className="bbContactPanelDivider" aria-hidden="true" />

                  <div className="bbContactPanelRow">
                    <div className="bbContactPanelIcon" aria-hidden="true">
                      <FiLinkedin size={18} />
                    </div>
                    <div className="bbContactPanelBody">
                      <div className="bbContactPanelLabel">LinkedIn</div>
                      <a
                        className="bbContactPanelValue"
                        href={linkedin?.href ?? 'https://linkedin.com/in/yourname'}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {linkedin?.value ?? 'linkedin.com/in/yourname'}
                      </a>
                    </div>
                  </div>

                  <div className="bbContactPanelDivider" aria-hidden="true" />

                  <div className="bbContactPanelRow">
                    <div className="bbContactPanelIcon" aria-hidden="true">
                      <FiMapPin size={18} />
                    </div>
                    <div className="bbContactPanelBody">
                      <div className="bbContactPanelLabel">Location</div>
                      <div className="bbContactPanelValue bbContactPanelValuePlain">
                        {location?.value ?? 'India · Remote Worldwide'}
                      </div>
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            </div>
          </MotionWrapper>
        </div>
      </Container>
    </section>
  );
}
