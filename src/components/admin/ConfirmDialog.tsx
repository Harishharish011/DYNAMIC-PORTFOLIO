import { Modal } from './Modal.js';

export function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="bbAdminMuted">{message}</p>
      <div className="bbAdminActions">
        <button className="bbAdminButton" type="button" onClick={onConfirm}>
          Confirm
        </button>
        <button className="bbAdminButton bbAdminButton--ghost" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}

