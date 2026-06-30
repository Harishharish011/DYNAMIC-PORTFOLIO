import { ButtonHTMLAttributes } from 'react';

export function SaveButton({
  className = '',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      type="button"
      className={`bbBlogAction bbBlogAction--save ${className}`}
      aria-label="Save (placeholder)"
      disabled
      {...rest}
    >
      Save
    </button>
  );
}

