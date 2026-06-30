import { PropsWithChildren } from 'react';

type ContactCardProps = PropsWithChildren<{
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}>;

export function ContactCard({ icon, label, value, href }: ContactCardProps) {
  const content = (
    <>
      <div className="bbContactCardIcon" aria-hidden="true">
        {icon}
      </div>
      <div className="bbContactCardText">
        <div className="bbContactCardLabel">{label}</div>
        <div className="bbContactCardValue">{value}</div>
      </div>
    </>
  );

  return (
    <div className="bbContactCard glass-card glass-edge glass-panel">
      {href ? (
        <a className="bbContactCardLink" href={href} target="_blank" rel="noreferrer">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
