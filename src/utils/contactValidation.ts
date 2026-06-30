import type { ContactForm, ContactValidationErrors } from '../types/contact.js';

function isValidEmail(email: string) {
  // Pragmatic validation (client-side only)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateContactForm(input: ContactForm): { errors: ContactValidationErrors; normalized: ContactForm } {
  const normalized: ContactForm = {
    ...input,
    name: input.name.trim(),
    email: input.email.trim(),
    company: input.company.trim(),
    projectType: input.projectType.trim(),
    message: input.message.trim(),
  };

  const errors: ContactValidationErrors = {};

  if (!normalized.name) errors.name = 'Please enter your name.';
  if (!normalized.email) errors.email = 'Please enter your email.';
  else if (!isValidEmail(normalized.email)) errors.email = 'Please enter a valid email address.';

  if (!normalized.projectType) errors.projectType = 'Please select a project type.';
  if (!normalized.message) errors.message = 'Please write a message.';

  return { errors, normalized };
}

