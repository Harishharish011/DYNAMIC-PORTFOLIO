import type { ContactForm } from '../types/contact.js';
import { apiPost } from '../utils/apiClient.js';
import { sendEmailJs } from './emailService.js';

export type ContactPayload = ContactForm;

export type ContactSendResult = {
  emailSent: boolean;
  stored: boolean;
  storageError?: string;
};

type ContactResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Message storage failed.';
}

export async function sendContactMessage(payload: ContactPayload): Promise<ContactSendResult> {
  const subject = payload.projectType;

  const trimmedCompany = payload.company.trim();
  const appendedMessage = trimmedCompany
    ? `${payload.message.trim()}\n\nCompany:\n${trimmedCompany}`
    : payload.message.trim();

  await sendEmailJs({
    name: payload.name.trim(),
    email: payload.email.trim(),
    subject,
    message: appendedMessage,
  });

  try {
    await apiPost<ContactResponse, ContactPayload>('/contact', {
      name: payload.name.trim(),
      email: payload.email.trim(),
      company: trimmedCompany,
      projectType: payload.projectType.trim(),
      message: payload.message.trim(),
    });

    return { emailSent: true, stored: true };
  } catch (error) {
    console.error('Contact message was emailed but could not be stored in MongoDB.', error);
    return {
      emailSent: true,
      stored: false,
      storageError: getErrorMessage(error),
    };
  }
}


