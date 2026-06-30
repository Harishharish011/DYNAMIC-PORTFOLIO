export type ContactForm = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
};

export type ContactValidationErrors = Partial<Record<keyof ContactForm, string>>;

