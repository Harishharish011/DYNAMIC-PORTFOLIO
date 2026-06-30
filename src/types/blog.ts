export type BlogId = string;

export type BlogBlock = {
  type: 'paragraph' | 'heading';
  text: string;
};

export type BlogAuthor = {
  name: string;
  role: string;
  avatarImage: string;
};

export type BlogContent = {
  blocks: BlogBlock[];
};

export type BlogLikes = {
  total: number;
  /** Placeholder for future Mongo/DB mapping */
  userIds: string[];
};

export type Blog = {
  id: BlogId;
  slug: string;

  title: string;
  excerpt: string;
  content: BlogContent;
  coverImage: string;

  author: BlogAuthor;
  category: string;
  tags: string[];

  likes: BlogLikes;
  commentsCount: number;
  readingTime: string;

  featured: boolean;

  publishedAt: string;
  updatedAt: string;

  // ---- Backward-compatible fields used by current UI ----
  shortDescription?: string;
  readTime?: string;
  publishedDate?: string;
};

