import type { Comment } from './commentTypes.js';

// Placeholder in-memory comment store (no backend yet).
const commentsByBlogId = new Map<string, Comment[]>();

export async function getCommentsForBlog(blogId: string): Promise<Comment[]> {
  return commentsByBlogId.get(blogId) ?? [];
}

export async function addCommentToBlog(input: {
  blogId: string;
  authorName: string;
  authorAvatarImage?: string;
  content: string;
}): Promise<Comment> {
  const comment: Comment = {
    id: `comment_${Date.now()}`,
    blogId: input.blogId,
    author: {
      name: input.authorName,
      avatarImage: input.authorAvatarImage,
    },
    content: input.content,
    createdAt: new Date().toISOString(),
  };

  const list = commentsByBlogId.get(input.blogId) ?? [];
  commentsByBlogId.set(input.blogId, [comment, ...list]);
  return comment;
}

