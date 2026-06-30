import { useEffect, useMemo, useState } from 'react';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog.js';
import { DataTable } from '../../components/admin/DataTable.js';
import { Modal } from '../../components/admin/Modal.js';
import { SearchBar } from '../../components/admin/SearchBar.js';
import { adminApi, type AdminMessage } from '../../services/adminService.js';

export function MessagesPage() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [viewing, setViewing] = useState<AdminMessage | null>(null);
  const [deleting, setDeleting] = useState<AdminMessage | null>(null);

  const load = () => adminApi.messages().then((payload) => setMessages(payload.messages));

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    let list = messages;
    if (filter === 'unread') list = list.filter((m) => !m.read);
    if (filter === 'read') list = list.filter((m) => m.read);
    return list.filter((message) =>
      `${message.name} ${message.email} ${message.subject} ${message.message}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }, [messages, query, filter]);

  async function handleView(message: AdminMessage) {
    setViewing(message);
    if (!message.read) {
      await adminApi.markMessageRead(message._id!);
      await load();
    }
  }

  return (
    <>
      <div className="bbAdminPanel bbAdminControlsPanel">
        <div className="bbAdminPageHead">
          <div><h1 className="bbAdminTitle">Messages</h1><p className="bbAdminMuted">Review, mark as read, search, filter, and delete MongoDB contact messages.</p></div>
        </div>
        <SearchBar value={query} onChange={setQuery} placeholder="Search messages" />
        <div className="bbAdminActions">
          <button className={`bbAdminButton ${filter === 'all' ? '' : 'bbAdminButton--ghost'}`} type="button" onClick={() => setFilter('all')}>All</button>
          <button className={`bbAdminButton ${filter === 'unread' ? '' : 'bbAdminButton--ghost'}`} type="button" onClick={() => setFilter('unread')}>Unread</button>
          <button className={`bbAdminButton ${filter === 'read' ? '' : 'bbAdminButton--ghost'}`} type="button" onClick={() => setFilter('read')}>Read</button>
        </div>
      </div>
      <DataTable headers={['Name', 'Email', 'Subject', 'Date', 'Status', 'Actions']}>
        {filtered.map((message) => (
          <tr key={message._id} style={{ opacity: message.read ? 0.6 : 1 }}>
            <td><strong>{message.name}</strong></td>
            <td>{message.email}</td>
            <td>{message.subject}</td>
            <td>{new Date(message.createdAt!).toLocaleDateString()}</td>
            <td><span className="bbAdminBadge">{message.read ? 'Read' : 'New'}</span></td>
            <td className="bbAdminActions">
              <button className="bbAdminButton bbAdminButton--ghost" type="button" onClick={() => handleView(message)}>View</button>
              {!message.read && (
                <button className="bbAdminButton bbAdminButton--ghost" type="button" onClick={async () => { await adminApi.markMessageRead(message._id!); await load(); }}>Mark Read</button>
              )}
              <button className="bbAdminButton bbAdminButton--ghost" type="button" onClick={() => setDeleting(message)}>Delete</button>
            </td>
          </tr>
        ))}
      </DataTable>
      {viewing && (
        <Modal title={viewing.subject} onClose={() => setViewing(null)}>
          <p className="bbAdminMuted"><strong>From:</strong> {viewing.name} ({viewing.email})</p>
          <p className="bbAdminMuted"><strong>Date:</strong> {new Date(viewing.createdAt!).toLocaleString()}</p>
          <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '12px 0' }} />
          <p>{viewing.message}</p>
        </Modal>
      )}
      {deleting && (
        <ConfirmDialog
          title="Delete Message"
          message={`Delete message from ${deleting.name}?`}
          onCancel={() => setDeleting(null)}
          onConfirm={async () => { await adminApi.deleteMessage(deleting._id!); setDeleting(null); await load(); }}
        />
      )}
    </>
  );
}
