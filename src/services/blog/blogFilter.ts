import type { Blog } from '../../types/blog.js';

export function filterBlogsByCategory(blogs: Blog[], category?: string | null): Blog[] {
  const q = (category ?? '').trim().toLowerCase();
  if (!q) return blogs;
  return blogs.filter((b) => (b.category ?? '').trim().toLowerCase() === q);
}

