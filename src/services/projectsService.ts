import type { Project } from '../types/projects.js';
import { apiGet } from '../utils/apiClient.js';

type ProjectEnvelope = {
  projects?: unknown;
  project?: unknown;
  data?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function stringValue(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function booleanValue(value: unknown, fallback = false): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function firstString(record: Record<string, unknown>, keys: string[], fallback = ''): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value;
  }
  return fallback;
}

function normalizeProject(value: unknown): Project {
  const p = isRecord(value) ? value : {};
  const id = firstString(p, ['id', '_id', 'slug'], 'project');
  const slug = firstString(p, ['slug', 'id', '_id'], id);
  const thumbnail = firstString(p, ['thumbnail', 'thumbnailImage', 'heroImage', 'previewImage']);
  const screenshots = stringArray(p.screenshots).length
    ? stringArray(p.screenshots)
    : stringArray(p.galleryImages);
  const liveUrl = firstString(p, ['liveUrl', 'liveDemoUrl']);

  return {
    id,
    slug,
    title: stringValue(p.title, 'Untitled Project'),
    shortDescription: stringValue(p.shortDescription),
    fullDescription: stringValue(p.fullDescription, stringValue(p.description)),
    technologies: stringArray(p.technologies),
    category: stringValue(p.category, 'Project'),
    githubUrl: stringValue(p.githubUrl),
    liveUrl,
    featured: booleanValue(p.featured, true),
    screenshots,
    thumbnail,
    createdAt: stringValue(p.createdAt, new Date(0).toISOString()),
    heroImage: stringValue(p.heroImage, thumbnail),
    galleryImages: screenshots,
    challenges: stringArray(p.challenges),
    solutions: stringArray(p.solutions),
    outcomes: stringArray(p.outcomes),
    thumbnailImage: stringValue(p.thumbnailImage, thumbnail),
    gradientAccent: stringValue(
      p.gradientAccent,
      'linear-gradient(135deg, rgba(147,51,234,0.55), rgba(59,130,246,0.35))',
    ),
    liveDemoUrl: liveUrl,
  };
}

function unwrapProjectList(payload: ProjectEnvelope | unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!isRecord(payload)) return [];

  if (Array.isArray(payload.projects)) return payload.projects;
  if (Array.isArray(payload.data)) return payload.data;
  if (isRecord(payload.data) && Array.isArray(payload.data.projects)) return payload.data.projects;

  return [];
}

function unwrapProject(payload: ProjectEnvelope | unknown): unknown | undefined {
  if (!isRecord(payload)) return undefined;

  if (payload.project) return payload.project;
  if (isRecord(payload.data) && payload.data.project) return payload.data.project;
  if (payload.data && !Array.isArray(payload.data)) return payload.data;

  return undefined;
}

export async function getProjects(): Promise<Project[]> {
  const payload = await apiGet<ProjectEnvelope | Project[]>('/projects');
  return unwrapProjectList(payload).map(normalizeProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!slug) return undefined;

  const payload = await apiGet<ProjectEnvelope | Project>(`/projects/${encodeURIComponent(slug)}`);
  const project = unwrapProject(payload) ?? payload;
  return isRecord(project) ? normalizeProject(project) : undefined;
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  return getProjectBySlug(id);
}

