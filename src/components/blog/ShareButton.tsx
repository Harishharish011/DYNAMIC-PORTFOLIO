import { ButtonHTMLAttributes } from 'react';

export function ShareButton({
  className = '',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      type="button"
      className={`bbBlogAction bbBlogAction--share ${className}`}
      aria-label="Share (placeholder)"
      disabled
      {...rest}
    >
      Share
    </button>
  );
}

