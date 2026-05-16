import { useEffect, useState } from 'react';
import { useData } from '../context/DataContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Search, LogOut, Settings, FileText, Package, Plus, Database } from 'lucide-react';
import { adminApi } from '../services/api.js';
import './Admin.css';

const AdminDashboard = () => {
  const { allModels } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [seeding, setSeeding] = useState(false);
  const [confirmSeed, setConfirmSeed] = useState(false);

  // Guard – verify token is still valid on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) { navigate('/admin'); return; }
    adminApi.verifyToken().catch(() => {
      localStorage.removeItem('authToken');
      navigate('/admin');
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/admin');
  };

  const [seedMsg, setSeedMsg] = useState('');
  const handleSeed = async () => {
    if (!confirmSeed) { setConfirmSeed(true); return; }
    setConfirmSeed(false);
    setSeeding(true);
    setSeedMsg('');
    try {
      const result = await adminApi.seedDatabase();
      setSeedMsg('Database seeded — ' + result.counts.products + ' products, ' + result.counts.blogs + ' blogs.');
      window.location.reload();
    } catch (err) {
      setSeedMsg('Seeding failed: ' + err.message);
    } finally {
      setSeeding(false);
    }
  };

  const filteredModels = Object.values(allModels).filter((m) => {
    if (!searchTerm) return true;
    const t = searchTerm.toLowerCase();
    return (m.title?.toLowerCase().includes(t) || m.category?.toLowerCase().includes(t) || m.subcategory?.toLowerCase().includes(t));
  });

  // Group by brand → category
  const grouped = filteredModels.reduce((acc, m) => {
    let brand = m.brand || 'Other';
    if (!brand || brand === 'Other') {
      if (m.title?.toUpperCase().includes('AVANTI')) brand = 'AVANTI';
      else if (m.title?.toUpperCase().includes('ANTIVA')) brand = 'ANTIVA';
      else brand = 'Other';
    }
    const cat = m.category || 'Uncategorized';
    if (!acc[brand]) acc[brand] = {};
    if (!acc[brand][cat]) acc[brand][cat] = [];
    acc[brand][cat].push(m);
    return acc;
  }, {});

  return (
    <div className="admin-dashboard container">
      <style>{`
        .dash-topbar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin: 32px 0; }
        .dash-title { font-family: var(--font-display) !important; font-size: 28px; font-weight: 700; color: var(--ink); }
        .dash-actions { display: flex; gap: 10px; }
        .dash-btn { display: flex; align-items: center; gap: 6px; padding: 10px 18px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; border: 1.5px solid transparent; transition: all 0.2s; text-decoration: none; }
        .dash-btn-outline { background: var(--white); border-color: var(--border); color: var(--ink-soft); }
        .dash-btn-outline:hover { border-color: var(--emerald); color: var(--emerald); }
        .dash-btn-danger { background: #fef2f2; border-color: #fecaca; color: #dc2626; }
        .dash-btn-danger:hover { background: #dc2626; color: white; }
        .dash-quick { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 40px; }
        .dash-card { background: var(--white); border-radius: 12px; padding: 24px; border: 1px solid var(--border); box-shadow: var(--shadow-card); display: flex; align-items: flex-start; gap: 14px; transition: border-color 0.2s; text-decoration: none; }
        .dash-card:hover { border-color: var(--emerald); }
        .dash-card-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--emerald-xlight); display: flex; align-items: center; justify-content: center; color: var(--emerald); flex-shrink: 0; }
        .dash-card-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gray-mid); margin-bottom: 4px; }
        .dash-card-val { font-family: var(--font-display) !important; font-size: 22px; font-weight: 700; color: var(--ink); }
        .dash-card-desc { font-size: 13px; color: var(--gray-mid); margin-top: 2px; }
      `}</style>

      {/* Top Bar */}
      <div className="dash-topbar">
        <h1 className="dash-title">Admin Dashboard</h1>
        <div className="dash-actions">
          <Link to="/admin/settings" className="dash-btn dash-btn-outline"><Settings size={15} /> Settings</Link>
          {confirmSeed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 8, fontSize: 13, color: '#dc2626' }}>
              This will wipe all products and blogs. Are you sure?
              <button onClick={handleSeed} className="dash-btn" style={{ background: '#dc2626', color: 'white', borderColor: '#dc2626', padding: '6px 12px', fontSize: 12 }}>Yes, wipe & seed</button>
              <button onClick={() => setConfirmSeed(false)} className="dash-btn dash-btn-outline" style={{ padding: '6px 12px', fontSize: 12 }}>Cancel</button>
            </div>
          )}
          {!confirmSeed && (
            <button onClick={handleSeed} className="dash-btn dash-btn-outline" disabled={seeding}>
              <Database size={15} /> {seeding ? 'Seeding...' : 'Re-seed DB'}
            </button>
          )}
          {seedMsg && <span style={{ fontSize: 13, color: 'var(--emerald)' }}>{seedMsg}</span>}
          <button onClick={handleLogout} className="dash-btn dash-btn-danger"><LogOut size={15} /> Logout</button>
        </div>
      </div>

      {/* Quick Cards */}
      <div className="dash-quick">
        <div className="dash-card">
          <div className="dash-card-icon"><Package size={20} /></div>
          <div>
            <div className="dash-card-label">Total Products</div>
            <div className="dash-card-val">{Object.keys(allModels).length}</div>
          </div>
        </div>
        <Link to="/admin/blog" className="dash-card">
          <div className="dash-card-icon"><FileText size={20} /></div>
          <div>
            <div className="dash-card-label">Blog Posts</div>
            <div className="dash-card-desc">Manage articles →</div>
          </div>
        </Link>
        <Link to="/admin/settings" className="dash-card">
          <div className="dash-card-icon"><Settings size={20} /></div>
          <div>
            <div className="dash-card-label">Site Settings</div>
            <div className="dash-card-desc">Contact, branding →</div>
          </div>
        </Link>
      </div>

      {/* Product List */}
      <div className="product-list dashboard-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>
            Product Catalog ({filteredModels.length})
          </h3>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--emerald)' }} />
              <input type="text" placeholder="Search products…" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px 12px 10px 36px', borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 14, width: 240, outline: 'none' }} />
            </div>
            <Link to="/admin/product/new" className="dash-btn" style={{ background: 'var(--emerald)', color: 'white', borderColor: 'var(--emerald)' }}>
              <Plus size={16} /> Add Product
            </Link>
          </div>
        </div>

        {Object.entries(grouped).map(([brand, categories]) => (
          <div key={brand} style={{ marginBottom: 32, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ background: 'var(--ink)', color: 'white', padding: '14px 20px', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>{brand}</div>
            <div style={{ padding: '16px 20px' }}>
              {Object.entries(categories).map(([cat, products]) => (
                <div key={cat} style={{ marginBottom: 24 }}>
                  <div style={{ background: 'var(--off-white)', padding: '8px 14px', borderRadius: 8, fontWeight: 600, fontSize: 14, marginBottom: 12, color: 'var(--ink-soft)' }}>{cat}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                    {products.map((m) => (
                      <div key={m.id} style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', background: 'var(--white)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: 14 }}>{m.title}</div>
                          <div style={{ fontSize: 12, color: 'var(--gray-mid)', marginTop: 2 }}>{m.subtitle}</div>
                        </div>
                        <Link to={`/admin/edit/${m.id}`} className="dash-btn dash-btn-outline" style={{ fontSize: 12, padding: '6px 12px', flexShrink: 0 }}>Edit</Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
