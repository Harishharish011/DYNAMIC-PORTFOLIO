import { apiGet } from '../utils/apiClient.js';

export type GithubProfileDTO = {
  username: string;
  avatarUrl: string;
  bio?: string;
  followers: number;
  following: number;
  publicRepos: number;
};

export type GithubRepoDTO = {
  name: string;
  description?: string;
  language?: string;
  stars?: number;
  updatedAt?: string;
  htmlUrl: string;
};

export type GithubLanguageDTO = {
  name: string;
  percent: number;
};

type GithubPayload = {
  profile?: unknown;
  repos?: unknown;
  repositories?: unknown;
  topLanguages?: unknown;
  languages?: unknown;
  contributionImageUrl?: unknown;
  data?: unknown;
};

let githubCache: GithubPayload | null = null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function stringValue(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function numberValue(value: unknown, fallback = 0): number {
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function getRoot(payload: GithubPayload | unknown): GithubPayload {
  if (!isRecord(payload)) return {};
  if (isRecord(payload.data)) return payload.data;
  return payload;
}

async function getGithubPayload(): Promise<GithubPayload> {
  if (githubCache) return githubCache;
  const payload = await apiGet<GithubPayload>('/github');
  githubCache = getRoot(payload);
  return githubCache;
}

function normalizeProfile(value: unknown, username: string): GithubProfileDTO {
  const profile = isRecord(value) ? value : {};

  return {
    username: stringValue(profile.username, stringValue(profile.login, username)),
    avatarUrl: stringValue(profile.avatarUrl, stringValue(profile.avatar_url, 'https://avatars.githubusercontent.com/u/0?v=4')),
    bio: stringValue(profile.bio, 'Building thoughtful, scalable web experiences.'),
    followers: numberValue(profile.followers),
    following: numberValue(profile.following),
    publicRepos: numberValue(profile.publicRepos, numberValue(profile.public_repos)),
  };
}

function normalizeRepo(value: unknown, username: string): GithubRepoDTO {
  const repo = isRecord(value) ? value : {};
  const name = stringValue(repo.name, 'Repository');

  return {
    name,
    description: stringValue(repo.description),
    language: stringValue(repo.language),
    stars: numberValue(repo.stars, numberValue(repo.stargazers_count)),
    updatedAt: stringValue(repo.updatedAt, stringValue(repo.updated_at)),
    htmlUrl: stringValue(repo.htmlUrl, stringValue(repo.html_url, `https://github.com/${username}`)),
  };
}

function normalizeLanguages(value: unknown): GithubLanguageDTO[] {
  if (Array.isArray(value)) {
    return value
      .filter(isRecord)
      .map((language) => ({
        name: stringValue(language.name),
        percent: numberValue(language.percent),
      }))
      .filter((language) => language.name.trim());
  }

  if (isRecord(value)) {
    return Object.entries(value)
      .map(([name, percent]) => ({ name, percent: numberValue(percent) }))
      .filter((language) => language.percent > 0);
  }

  return [];
}

export async function getGithubActivity(): Promise<unknown[]> {
  const payload = await getGithubPayload();
  return Array.isArray(payload.repos) ? payload.repos : [];
}

export async function getGithubProfileSafe(username: string): Promise<Partial<GithubProfileDTO>> {
  const payload = await getGithubPayload();
  return normalizeProfile(payload.profile, username);
}

export async function getFeaturedGithubRepos(username: string): Promise<GithubRepoDTO[]> {
  const payload = await getGithubPayload();
  const repos = Array.isArray(payload.repos)
    ? payload.repos
    : Array.isArray(payload.repositories)
      ? payload.repositories
      : [];

  return repos.map((repo) => normalizeRepo(repo, username));
}

export async function getGithubTopLanguagesSafe(_username: string): Promise<GithubLanguageDTO[]> {
  const payload = await getGithubPayload();
  return normalizeLanguages(payload.topLanguages ?? payload.languages);
}

export async function getGithubContributionImageSafe(username: string): Promise<string | null> {
  void username;
  const payload = await getGithubPayload();
  const image = stringValue(payload.contributionImageUrl);
  return image.trim() ? image : null;
}

