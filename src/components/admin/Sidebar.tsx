import { NavLink, useNavigate } from 'react-router-dom';
import { clearAdminToken } from '../../services/adminService.js';

const links = [
  ['Dashboard', '/admin'],
  ['Projects', '/admin/projects'],
  ['Blogs', '/admin/blogs'],
  ['GitHub', '/admin/github'],
  ['Messages', '/admin/messages'],
  ['Settings', '/admin/settings'],
];

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="bbAdminSidebar">
      <div className="bbAdminBrand">PORTFOLIO CMS</div>
      <nav className="bbAdminNav">
        {links.map(([label, to]) => (
          <NavLink key={to} to={to} end={to === '/admin'}>
            {label}
          </NavLink>
        ))}
        <button
          className="bbAdminLogout"
          type="button"
          onClick={() => {
            clearAdminToken();
            navigate('/admin/login', { replace: true });
          }}
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}

