import { useNavigate } from 'react-router-dom';

import { MotionWrapper } from '../animations/MotionWrapper.js';
import type { Blog } from '../../types/blog.js';
import { Button } from '../ui/Button.js';

import './blogs.css';

export function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  const navigate = useNavigate();

  return (
    <MotionWrapper
      className={`bbBlogCard ${index % 2 === 0 ? 'bbBlogCard--mediaLeft' : 'bbBlogCard--mediaRight'}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.04 * (index % 3),
      }}
    >
      <div className="bbBlogMedia glass-panel" aria-hidden="true">
        <div className="bbBlogMediaAccent" />
        <img className="bbBlogThumb" src={blog.coverImage} alt="" loading="lazy" />
      </div>

      <div className="bbBlogBody">
        <div className="bbBlogCategory">{blog.category}</div>
        <h3 className="bbBlogTitle">{blog.title}</h3>
        <p className="bbBlogDesc">{blog.shortDescription}</p>

        <div className="bbBlogMeta" aria-label="Blog metadata">
          <span className="bbBlogMetaItem">{blog.publishedDate}</span>
          <span className="bbBlogMetaDot" aria-hidden="true" />
          <span className="bbBlogMetaItem">{blog.readTime}</span>
        </div>

        <div className="bbBlogActionsRow">
          <Button
            variant="primary"
            className="bbBlogBtn"
            onClick={() => navigate(`/blogs/${blog.slug}`)}
          >
            Read Article
          </Button>
          <Button variant="secondary" className="bbBlogBtn" disabled>
            View Author
          </Button>
        </div>
      </div>
    </MotionWrapper>
  );
}

