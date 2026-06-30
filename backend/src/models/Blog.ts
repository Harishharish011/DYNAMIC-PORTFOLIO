import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, default: '' },
    content: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    category: { type: String, default: '' },
    tags: { type: [String], default: [] },
    readingTime: { type: String, default: '' },
    publishedDate: { type: String, default: '' },
    author: {
      name: { type: String, default: 'Harish' },
      role: { type: String, default: 'Full-Stack Developer' },
      avatarImage: { type: String, default: '/src/assets/prof-me.jpg' },
    },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type BlogDoc = InferSchemaType<typeof blogSchema>;
export const Blog = mongoose.model('Blog', blogSchema);

