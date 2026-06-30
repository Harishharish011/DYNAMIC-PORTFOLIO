import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAdminToken, loginAdmin } from '../../services/adminService.js';
import './admin.css';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (getAdminToken()) return <Navigate to="/admin" replace />;

  async function submit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await loginAdmin(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="bbAdminLogin">
      <form className="bbAdminPanel bbAdminLoginCard" onSubmit={submit}>
        <h1 className="bbAdminTitle">Admin Login</h1>
        <p className="bbAdminMuted">Sign in to manage portfolio content.</p>
        <div className="bbAdminForm" style={{ gridTemplateColumns: '1fr' }}>
          <input className="bbAdminInput" type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input className="bbAdminInput" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          {error ? <div className="bbAdminMuted">{error}</div> : null}
          <button className="bbAdminButton" type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </div>
      </form>
    </main>
  );
}

