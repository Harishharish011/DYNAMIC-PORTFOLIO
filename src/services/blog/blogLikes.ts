import type { Blog } from '../../types/blog.js';

// In-memory placeholder store. Will be replaced by backend later.
const likesByBlogId = new Map<string, Set<string>>();

export function getLikesCount(blogId: string): number {
  const set = likesByBlogId.get(blogId);
  return set ? set.size : 0;
}

export function likeBlog(blogs: Blog[], blogId: string, userId: string): Blog[] {
  const blog = blogs.find((b) => b.id === blogId);
  if (!blog) return blogs;

  const set = likesByBlogId.get(blogId) ?? new Set<string>();

  if (set.has(userId)) {
    // toggle off
    set.delete(userId);
  } else {
    set.add(userId);
  }

  likesByBlogId.set(blogId, set);

  const updatedLikesCount = set.size;

  return blogs.map((b) =>
    b.id === blogId
      ? {
          ...b,
          likes: {
            total: updatedLikesCount,
            userIds: Array.from(set),
          },
        }
      : b
  );
}


