import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { adminApi } from '../services/api.js';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (localStorage.getItem('authToken')) return <Navigate to="/admin/dashboard" replace />;

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await adminApi.login(form);
      if (data.success && data.token) {
        localStorage.setItem('authToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <style>{`
        .login-card { background: var(--white); border-radius: 20px; padding: 48px 40px; box-shadow: var(--shadow-lg); border: 1px solid var(--border); width: 100%; max-width: 420px; }
        .login-logo { text-align: center; margin-bottom: 32px; }
        .login-logo-name { font-family: var(--font-display) !important; font-size: 22px; font-weight: 700; color: var(--emerald); margin-bottom: 4px; }
        .login-logo-sub { font-size: 12px; color: var(--gray-mid); letter-spacing: 0.15em; text-transform: uppercase; }
        .login-title { font-family: var(--font-display) !important; font-size: 28px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .login-sub { font-size: 14px; color: var(--gray-mid); margin-bottom: 32px; }
        .login-field { margin-bottom: 20px; }
        .login-label { display: block; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gray-mid); margin-bottom: 8px; }
        .login-input-wrap { position: relative; }
        .login-input { width: 100%; padding: 13px 16px; border: 1.5px solid var(--border); border-radius: 10px; font-size: 15px; color: var(--ink); background: var(--white); outline: none; transition: border-color 0.2s, box-shadow 0.2s; font-family: var(--font-body) !important; }
        .login-input:focus { border-color: var(--emerald); box-shadow: 0 0 0 3px rgba(10,122,69,0.1); }
        .login-eye { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--gray-mid); cursor: pointer; padding: 0; }
        .login-error { display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; color: #dc2626; font-size: 14px; margin-bottom: 20px; }
        .login-btn { width: 100%; padding: 14px; background: var(--emerald); color: white; border: none; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.2s; font-family: var(--font-body) !important; }
        .login-btn:hover:not(:disabled) { background: var(--emerald-deep); }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-name">T&T Office Solutions</div>
          <div className="login-logo-sub">Admin Portal</div>
        </div>
        <h1 className="login-title">Welcome back</h1>
        <p className="login-sub">Sign in to manage your site content.</p>
        {error && <div className="login-error"><AlertCircle size={16} /> {error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">Username</label>
            <input className="login-input" name="username" value={form.username} onChange={handleChange} placeholder="admin" autoComplete="username" required />
          </div>
          <div className="login-field">
            <label className="login-label">Password</label>
            <div className="login-input-wrap">
              <input className="login-input" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="••••••••" autoComplete="current-password" required style={{ paddingRight: 44 }} />
              <button type="button" className="login-eye" onClick={() => setShowPassword((p) => !p)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            <LogIn size={18} /> {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
