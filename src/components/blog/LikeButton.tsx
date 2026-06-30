import { ButtonHTMLAttributes } from 'react';

export function LikeButton({
  className = '',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      type="button"
      className={`bbBlogAction bbBlogAction--like ${className}`}
      aria-label="Like (placeholder)"
      disabled
      {...rest}
    >
      Like
    </button>
  );
}

