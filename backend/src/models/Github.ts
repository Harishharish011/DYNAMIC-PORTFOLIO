import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const githubRepoSchema = new Schema(
  {
    name: { type: String, required: true },
    htmlUrl: { type: String, required: true },
    language: { type: String, default: '' },
    description: { type: String, default: '' },
    stars: { type: Number, default: 0 },
    updatedAt: { type: String, default: '' },
  },
  { _id: false }
);

const githubLanguageSchema = new Schema(
  {
    name: { type: String, required: true },
    percent: { type: Number, required: true },
  },
  { _id: false }
);

const githubSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, index: true },
    personalAccessToken: { type: String, default: '' },
    avatarUrl: { type: String, default: 'https://avatars.githubusercontent.com/u/0?v=4' },
    bio: { type: String, default: 'Building thoughtful, scalable web experiences.' },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    publicRepos: { type: Number, default: 0 },
    repos: { type: [githubRepoSchema], default: [] },
    topLanguages: { type: [githubLanguageSchema], default: [] },
    contributionImageUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export type GithubDoc = InferSchemaType<typeof githubSchema>;
export const Github = mongoose.model('Github', githubSchema);
