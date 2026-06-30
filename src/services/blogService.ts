import type { Blog, BlogAuthor, BlogContent, BlogLikes } from '../types/blog.js';
import { apiGet } from '../utils/apiClient.js';

import { searchBlogs } from './blog/blogSearch.js';
import { filterBlogsByCategory } from './blog/blogFilter.js';

export type BlogSearchQuery = {
  title?: string;
  tags?: string[];
  keywords?: string;
  category?: string;
};

export type GetBlogOptions = {
  slug?: string;
  id?: string;
};

type BlogEnvelope = {
  blogs?: unknown;
  blog?: unknown;
  data?: unknown;
};

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

function normalizeAuthor(value: unknown): BlogAuthor {
  const author = isRecord(value) ? value : {};
  return {
    name: stringValue(author.name, 'Harish'),
    role: stringValue(author.role, 'UI Engineering'),
    avatarImage: stringValue(author.avatarImage),
  };
}

function normalizeContent(value: unknown): BlogContent {
  if (isRecord(value) && Array.isArray(value.blocks)) {
    return {
      blocks: value.blocks
        .filter(isRecord)
        .map((block) => ({
          type: block.type === 'heading' ? 'heading' as const : 'paragraph' as const,
          text: stringValue(block.text),
        }))
        .filter((block) => block.text.trim()),
    };
  }

  if (typeof value === 'string' && value.trim()) {
    return { blocks: [{ type: 'paragraph', text: value }] };
  }

  return { blocks: [] };
}

function normalizeLikes(value: unknown): BlogLikes {
  const likes = isRecord(value) ? value : {};
  return {
    total: numberValue(likes.total),
    userIds: stringArray(likes.userIds),
  };
}

function normalizeBlog(value: unknown): Blog {
  const b = isRecord(value) ? value : {};
  const id = firstString(b, ['id', '_id', 'slug'], 'blog');
  const slug = firstString(b, ['slug', 'id', '_id'], id);
  const excerpt = firstString(b, ['excerpt', 'shortDescription', 'description']);
  const readingTime = firstString(b, ['readingTime', 'readTime']);
  const publishedAt = firstString(b, ['publishedAt', 'publishedDate', 'createdAt']);

  return {
    id,
    slug,
    title: stringValue(b.title, 'Untitled Article'),
    excerpt,
    content: normalizeContent(b.content),
    coverImage: stringValue(b.coverImage),
    author: normalizeAuthor(b.author),
    category: stringValue(b.category, 'Article'),
    tags: stringArray(b.tags),
    likes: normalizeLikes(b.likes),
    commentsCount: numberValue(b.commentsCount),
    readingTime,
    featured: booleanValue(b.featured, true),
    publishedAt,
    updatedAt: firstString(b, ['updatedAt', 'publishedAt', 'publishedDate', 'createdAt'], publishedAt),
    shortDescription: excerpt,
    readTime: readingTime,
    publishedDate: publishedAt,
  };
}

function unwrapBlogList(payload: BlogEnvelope | unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!isRecord(payload)) return [];

  if (Array.isArray(payload.blogs)) return payload.blogs;
  if (Array.isArray(payload.data)) return payload.data;
  if (isRecord(payload.data) && Array.isArray(payload.data.blogs)) return payload.data.blogs;

  return [];
}

function unwrapBlog(payload: BlogEnvelope | unknown): unknown | undefined {
  if (!isRecord(payload)) return undefined;

  if (payload.blog) return payload.blog;
  if (isRecord(payload.data) && payload.data.blog) return payload.data.blog;
  if (payload.data && !Array.isArray(payload.data)) return payload.data;

  return undefined;
}

export async function listBlogs(): Promise<Blog[]> {
  const payload = await apiGet<BlogEnvelope | Blog[]>('/blogs');
  return unwrapBlogList(payload).map(normalizeBlog);
}

export async function getBlogs(): Promise<Blog[]> {
  return listBlogs();
}

export async function getBlogBySlug(slug?: string | null): Promise<Blog | undefined> {
  if (!slug) return undefined;

  const payload = await apiGet<BlogEnvelope | Blog>(`/blogs/${encodeURIComponent(slug)}`);
  const blog = unwrapBlog(payload) ?? payload;
  return isRecord(blog) ? normalizeBlog(blog) : undefined;
}

export async function getBlog(options: GetBlogOptions): Promise<Blog | undefined> {
  if (options.slug) return getBlogBySlug(options.slug);
  if (options.id) return getBlogBySlug(options.id);
  return undefined;
}

export async function searchBlogsService(query: BlogSearchQuery): Promise<Blog[]> {
  const list = await listBlogs();
  return searchBlogs(list, query);
}

export async function filterBlogsByCategoryService(category?: string | null): Promise<Blog[]> {
  const list = await listBlogs();
  return filterBlogsByCategory(list, category);
}

export async function likeBlogService(blogId: string, userId: string): Promise<void> {
  console.info('Like API integration ready', { blogId, userId });
}
