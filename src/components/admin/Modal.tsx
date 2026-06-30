import type { ReactNode } from 'react';

export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="bbAdminOverlay" role="dialog" aria-modal="true">
      <div className="bbAdminModal">
        <div className="bbAdminPageHead">
          <h2 className="bbAdminTitle">{title}</h2>
          <button className="bbAdminButton bbAdminButton--ghost" type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <div style={{ marginTop: 16 }}>{children}</div>
      </div>
    </div>
  );
}

