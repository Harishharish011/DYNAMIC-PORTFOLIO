import emailjs from '@emailjs/browser';

export type EmailServicePayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type EmailJsConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
};

function getConfig(): EmailJsConfig {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS is not configured. Missing VITE_EMAILJS_* environment variables.');
  }

  return { serviceId, templateId, publicKey };
}

export async function sendEmailJs(payload: EmailServicePayload): Promise<void> {
  const { serviceId, templateId, publicKey } = getConfig();

  // Initialize only once per runtime
  // (EmailJS SDK is safe to call init multiple times, but we keep it minimal.)
  emailjs.init(publicKey);

  await emailjs.send(serviceId, templateId, {
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    message: payload.message,
  });
}

