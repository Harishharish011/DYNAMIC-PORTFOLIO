import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Sidebar } from '../../components/admin/Sidebar.js';
import { Topbar } from '../../components/admin/Topbar.js';
import { adminApi, getAdminToken, type AdminUser } from '../../services/adminService.js';
import { BlogsPage } from './BlogsPage.js';
import { DashboardPage } from './DashboardPage.js';
import { GitHubPage } from './GitHubPage.js';
import { MessagesPage } from './MessagesPage.js';
import { ProjectsPage } from './ProjectsPage.js';
import { SettingsPage } from './SettingsPage.js';
import './admin.css';

export function AdminLayout() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    void adminApi
      .profile()
      .then((payload) => setAdmin(payload.admin))
      .catch(() => setAdmin(null))
      .finally(() => setIsChecking(false));
  }, []);

  if (!getAdminToken()) return <Navigate to="/admin/login" replace />;

  if (isChecking) {
    return <main className="bbAdminRoot"><div className="bbAdminPanel">Checking admin session...</div></main>;
  }

  if (!admin) return <Navigate to="/admin/login" replace />;

  return (
    <main className="bbAdminRoot">
      <div className="bbAdminShell">
        <Sidebar />
        <div className="bbAdminMain">
          <Topbar admin={admin} />
          <Routes>
            <Route index element={<DashboardPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="github" element={<GitHubPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="settings" element={<SettingsPage admin={admin} />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

