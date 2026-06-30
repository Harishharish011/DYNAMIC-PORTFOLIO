import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../../components/admin/LoadingSpinner.js';
import { StatsCard } from '../../components/admin/StatsCard.js';
import { adminApi, type AdminStats } from '../../services/adminService.js';

export function DashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    void adminApi.stats().then((payload) => setStats(payload.stats));
  }, []);

  if (!stats) return <LoadingSpinner label="Loading dashboard..." />;

  return (
    <>
      <div className="bbAdminPageHead">
        <div>
          <h1 className="bbAdminTitle">Dashboard</h1>
          <p className="bbAdminMuted">Portfolio content overview.</p>
        </div>
      </div>
      <div className="bbAdminGrid">
        <StatsCard label="Total Projects" value={stats.totalProjects} />
        <StatsCard label="Total Blogs" value={stats.totalBlogs} />
        <StatsCard label="Total Messages" value={stats.totalMessages} />
        <StatsCard label="GitHub Repositories" value={stats.githubRepositories} />
      </div>
      <div className="bbAdminPanel">
        <strong>Last Updated</strong>
        <div className="bbAdminMuted">{new Date(stats.lastUpdated).toLocaleString()}</div>
      </div>
    </>
  );
}

