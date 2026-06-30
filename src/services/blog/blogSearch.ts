import type { Blog } from '../../types/blog.js';

export type BlogSearchQuery = {
  title?: string;
  tags?: string[];
  keywords?: string;
  category?: string;
};

function normalizeText(v: string): string {
  return v.trim().toLowerCase();
}

function includesAllNormalized(haystack: string, needles: string[]): boolean {
  return needles.every((n) => haystack.includes(n));
}

export function searchBlogs(blogs: Blog[], query: BlogSearchQuery): Blog[] {
  const titleQ = query.title ? normalizeText(query.title) : '';
  const keywordsQ = query.keywords ? normalizeText(query.keywords) : '';
  const categoryQ = query.category ? normalizeText(query.category) : '';
  const tagsQ = (query.tags ?? []).map(normalizeText).filter(Boolean);

  if (!titleQ && !keywordsQ && !categoryQ && tagsQ.length === 0) return blogs;

  return blogs.filter((b) => {
    const title = normalizeText(b.title);
    const excerpt = normalizeText(b.excerpt ?? '');
    const contentText = normalizeText(
      (b.content?.blocks ?? [])
        .map((blk) => ('text' in blk ? blk.text : ''))
        .join(' ')
    );
    const category = normalizeText(b.category);
    const tags = (b.tags ?? []).map(normalizeText);

    const titleOk = titleQ ? title.includes(titleQ) : true;

    // Keyword search: allow multiple tokens.
    const keywordOk = keywordsQ
      ? includesAllNormalized(`${title} ${excerpt} ${contentText}`, keywordsQ.split(/\s+/g).filter(Boolean))
      : true;

    const categoryOk = categoryQ ? category === categoryQ : true;

    const tagsOk = tagsQ.length
      ? tagsQ.every((t) => tags.includes(t)) || tagsQ.some((t) => tags.includes(t))
      : true;

    return titleOk && keywordOk && categoryOk && tagsOk;
  });
}

