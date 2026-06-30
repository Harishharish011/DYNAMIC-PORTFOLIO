import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type ContactDoc = InferSchemaType<typeof contactSchema>;
export const Contact = mongoose.model('Contact', contactSchema);

