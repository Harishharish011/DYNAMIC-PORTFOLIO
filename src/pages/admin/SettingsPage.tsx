import type { AdminUser } from '../../services/adminService.js';

export function SettingsPage({ admin }: { admin: AdminUser }) {
  return (
    <div className="bbAdminPanel">
      <h1 className="bbAdminTitle">Settings</h1>
      <p className="bbAdminMuted">Signed in as {admin.email}. Manage credentials through secure backend environment and database controls.</p>
    </div>
  );
}

