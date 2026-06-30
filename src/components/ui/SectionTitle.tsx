import { PropsWithChildren } from 'react';

type SectionTitleProps = PropsWithChildren<{
  className?: string;
  eyebrow?: string;
}>;

export function SectionTitle({ className = '', eyebrow, children }: SectionTitleProps) {
  return (
    <div className={`bbSectionTitle ${className}`}>
      {eyebrow ? <div className="bbSectionTitleEyebrow">{eyebrow}</div> : null}
      <h2 className="bbSectionTitleHeading">{children}</h2>
    </div>
  );
}
