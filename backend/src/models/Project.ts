import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const projectSchema = new Schema(
  {
    id: { type: String },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    shortDescription: { type: String, default: '' },
    fullDescription: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    category: { type: String, default: '' },
    description: { type: String, default: '' },
    overview: { type: String, default: '' },
    technologies: { type: [String], default: [] },
    challenges: { type: [String], default: [] },
    solutions: { type: [String], default: [] },
    gallery: { type: [String], default: [] },
    galleryImages: { type: [String], default: [] },
    outcome: { type: [String], default: [] },
    outcomes: { type: [String], default: [] },
    futureImprovements: { type: [String], default: [] },
    heroImage: { type: String, default: '' },
    thumbnailImage: { type: String, default: '' },
    gradientAccent: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    liveDemoUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    status: { type: String, default: 'published' },
  },
  { timestamps: true }
);

export type ProjectDoc = InferSchemaType<typeof projectSchema>;
export const Project = mongoose.model('Project', projectSchema);

