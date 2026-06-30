import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';


import { MotionWrapper } from '../components/animations/MotionWrapper.js';
import { Container } from '../components/ui/Container.js';
import { ServiceState } from '../components/ui/ServiceState.js';

import type { Blog } from '../types/blog.js';
import { getBlogBySlug } from '../services/blogService.js';

import { SectionTitle } from '../components/ui/SectionTitle.js';

import { BlogActionButtons } from '../components/blog/BlogActionButtons.js';

import './blog-details.css';

export function BlogDetailsPage() {
  const { slug } = useParams();

  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    setLoadError(null);

    void (async () => {
      try {
        const b = await getBlogBySlug(slug);
        if (!mounted) return;
        setBlog(b);
      } catch (error) {
        console.error('Failed to load blog details.', error);
        if (!mounted) return;
        setLoadError('This article could not be loaded from the backend right now.');
        setBlog(undefined);
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <main className="bbBlogDetailsRoot">
        <section className="bbBlogDetailsSection">
          <Container>
            <ServiceState title="Loading article" message="Fetching the latest blog details." />
          </Container>
        </section>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="bbBlogDetailsRoot">
        <section className="bbBlogDetailsSection">
          <Container>
            <MotionWrapper className="bbBlogDetailsFallback">
              <h2 className="bbBlogDetailsFallbackTitle">
                {loadError ? 'Article unavailable' : 'Article not found'}
              </h2>
              <p className="bbBlogDetailsFallbackText">
                {loadError ?? 'The requested article could not be loaded.'}
              </p>
              <div className="bbBlogDetailsFallbackActions">
                <Link to="/blogs" className="bbBlogBackLink">
                  Back to Blogs
                </Link>
              </div>
            </MotionWrapper>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main className="bbBlogDetailsRoot">
      <section className="bbBlogDetailsSection">
        <div className="bbBlogDetailsBgWord" aria-hidden="true">
          BLOG
        </div>

        <Container>
          <div className="bbBlogDetailsHero glass-panel">
            <div className="bbBlogDetailsHeroAccent" aria-hidden="true" />

            <div className="bbBlogDetailsHeroContent">
              <div className="bbBlogDetailsHeroMeta">
                <span className="bbBlogDetailsCategory">{blog.category}</span>
                <span className="bbBlogDetailsMetaDot" aria-hidden="true" />
                <span className="bbBlogDetailsMetaText">{blog.readTime}</span>
              </div>

              <h1 className="bbBlogDetailsTitle">{blog.title}</h1>
              <p className="bbBlogDetailsSubtitle">{blog.shortDescription}</p>

              <div className="bbBlogDetailsAuthorRow">
                <div className="bbBlogDetailsAuthorAvatar" aria-hidden="true" />
                <div className="bbBlogDetailsAuthorMeta">
                  <div className="bbBlogDetailsAuthorName">{blog.author.name}</div>
                  <div className="bbBlogDetailsAuthorRole">{blog.author.role}</div>
                </div>
                <div className="bbBlogDetailsPublished">
                  {blog.publishedDate}
                </div>
              </div>
            </div>
          </div>

          <div className="bbBlogDetailsLayout">
            <MotionWrapper className="bbBlogDetailsContentBlock">
              <SectionTitle>Content</SectionTitle>
              <div className="bbBlogPlaceholderContent">
                {blog.content.blocks.map((blk, idx) => (
                  <div key={idx} className="bbBlogPlaceholderBlock">
                    {blk.type === 'heading' ? (
                      <h3 className="bbBlogPlaceholderHeading">{blk.text}</h3>
                    ) : (
                      <p className="bbBlogPlaceholderParagraph">{blk.text}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="bbBlogDetailsTags">
                <SectionTitle>Tags</SectionTitle>
                <div className="bbBlogTagsRow">
                  {blog.tags.map((t) => (
                    <span key={t} className="bbBlogTag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </MotionWrapper>

            <div className="bbBlogDetailsSidebar">
              <MotionWrapper className="bbBlogDetailsSidebarBlock">
                <SectionTitle>Actions</SectionTitle>
                <BlogActionButtons />
              </MotionWrapper>

              <MotionWrapper className="bbBlogDetailsSidebarBlock">
                <SectionTitle>Related Blogs</SectionTitle>
                <div className="bbBlogRelatedPlaceholders">
                  {/* Placeholders: structure only */}
                  <div className="bbBlogRelatedItem">Related article</div>
                  <div className="bbBlogRelatedItem">Related article</div>
                  <div className="bbBlogRelatedItem">Related article</div>
                </div>
              </MotionWrapper>
            </div>
          </div>

          <div className="bbBlogDetailsBottomActions">
            <Link to="/blogs" className="bbBlogBackLink">
              Back to Blogs
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

