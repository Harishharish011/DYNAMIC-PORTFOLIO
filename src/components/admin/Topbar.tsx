import { useNavigate } from 'react-router-dom';
import { clearAdminToken, type AdminUser } from '../../services/adminService.js';

export function Topbar({ admin }: { admin: AdminUser | null }) {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="bbAdminTopbar">
      <div>
        <div className="bbAdminMuted">Admin Dashboard</div>
        <strong>{currentDate}</strong>
      </div>
      <div className="bbAdminTopMeta">
        <div className="bbAdminAvatar">{admin?.name?.charAt(0)?.toUpperCase() ?? 'A'}</div>
        <button
          className="bbAdminButton bbAdminButton--ghost"
          type="button"
          onClick={() => {
            clearAdminToken();
            navigate('/admin/login', { replace: true });
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

