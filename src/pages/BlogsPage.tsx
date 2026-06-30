import { MotionWrapper } from '../components/animations/MotionWrapper.js';
import { Container } from '../components/ui/Container.js';
import { ServiceState } from '../components/ui/ServiceState.js';
import { useEffect, useState } from 'react';
import type { Blog } from '../types/blog.js';
import { listBlogs } from '../services/blogService.js';


import { BlogCard } from '../components/blog/BlogCard.js';

import './blogs-page.css';

export function BlogsPage() {
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    setError(null);

    void listBlogs()
      .then((blogs) => {
        if (!mounted) return;
        setFeaturedBlogs(blogs);
      })
      .catch((err) => {
        console.error('Failed to load blogs.', err);
        if (!mounted) return;
        setError('Articles could not be loaded right now.');
        setFeaturedBlogs([]);
      })
      .finally(() => {
        if (!mounted) return;
        setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="bbBlogsRoot">

      <section className="bbBlogs" aria-label="Blog list">
        <Container>
          <div className="bbBlogsInner">
            <div className="bbBlogsBgText" aria-hidden="true">
              BLOGS
            </div>

            <MotionWrapper
              className="bbBlogsHeader"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="bbBlogsEyebrow">LATEST ARTICLES</div>
              <h2 className="bbBlogsHeading">Notes on UI, motion &amp; product engineering</h2>
              <p className="bbBlogsSupporting">
                A curated set of short-form writing designed to match the Galaxy / Glass identity.
              </p>
            </MotionWrapper>

            <div className="bbBlogsList">
              {isLoading ? (
                <ServiceState title="Loading articles" message="Fetching the latest blogs from the backend." />
              ) : error ? (
                <ServiceState title="Blogs unavailable" message={error} />
              ) : featuredBlogs.length ? (
                featuredBlogs.map((blog: Blog, idx: number) => (
                  <BlogCard key={blog.slug} blog={blog} index={idx} />
                ))
              ) : (
                <ServiceState title="No blogs found" message="No published articles are available yet." />
              )}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

