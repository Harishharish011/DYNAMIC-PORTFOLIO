import { PropsWithChildren, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
  }
>) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
}
