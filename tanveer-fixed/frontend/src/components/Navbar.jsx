import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Menu, X, Phone, Mail, ChevronDown, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { settings } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const location = useLocation();
  const dropRef = useRef(null);

  const phone = settings?.phone || '+91 9811757846';
  const email = settings?.email || 'ttofficesolutions786@gmail.com';
  const logoUrl = settings?.logoUrl || logo;
  const companyName = settings?.companyName || 'T&T Office Solutions';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setProductsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => { setIsOpen(false); setProductsOpen(false); setMobileProductsOpen(false); }, [location]);

  const products = [
    { label: 'Document Shredders', url: '/select-brand/document-shredders' },
    { label: 'Multipurpose Application Shredders', url: '/select-brand/multipurpose-shredders' },
    { label: 'Document Laminators & Binders', url: '/select-brand/laminators-binders' },
    { label: 'Waste Management & Recycling', url: '/select-brand/waste-management-recycling' },
    { label: 'Products on GeM', url: '/select-brand/products-on-gem' },
  ];

  const navLinks = [
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/blog' },
    { label: 'Support', url: '/support' },
    { label: 'About Us', url: '/aboutus' },
    { label: 'Contact Us', url: '/contactus' },
  ];

  return (
    <>
      <style>{`
        .tt-header { position: sticky; top: 0; z-index: 1000; transition: all 0.3s ease; }
        .utility-strip {
          background: var(--emerald-deep);
          padding: 8px 0;
          transition: all 0.3s;
        }
        .utility-strip.hidden { display: none; }
        .utility-inner {
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
        }
        .util-contact { display: flex; gap: 24px; }
        .util-link {
          display: flex; align-items: center; gap: 6px;
          color: rgba(255,255,255,0.85); font-size: 13px; font-weight: 500;
          transition: color 0.2s;
        }
        .util-link:hover { color: #fff; }
        .util-socials { display: flex; gap: 12px; }
        .util-social {
          color: rgba(255,255,255,0.6); transition: color 0.2s;
          display: flex; align-items: center;
        }
        .util-social:hover { color: #fff; }

        .main-bar {
          background: var(--white);
          border-bottom: 1px solid var(--border);
          box-shadow: none;
          transition: box-shadow 0.3s;
        }
        .main-bar.shadow { box-shadow: 0 4px 24px rgba(10,122,69,0.1); }
        .main-bar-inner {
          display: flex; align-items: center; justify-content: space-between;
          height: 72px; gap: 32px;
        }
        .nav-logo { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
        .nav-logo img { height: 48px; width: auto; object-fit: contain; }
        .nav-logo-text { display: flex; flex-direction: column; }
        .nav-logo-name {
          font-family: var(--font-display) !important;
          font-size: 18px; font-weight: 700; color: var(--emerald);
          line-height: 1.1; letter-spacing: -0.01em;
        }
        .nav-logo-tagline {
          font-size: 10px; font-weight: 500; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--gray-mid); margin-top: 2px;
        }

        .nav-links-desktop {
          display: flex; align-items: center; gap: 4px;
          list-style: none;
        }
        .nav-links-desktop li a, .nav-links-desktop li button {
          padding: 8px 16px; border-radius: 50px;
          font-size: 14px; font-weight: 500; color: var(--ink-soft);
          transition: all 0.2s; white-space: nowrap;
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 4px;
          font-family: var(--font-body) !important;
        }
        .nav-links-desktop li a:hover,
        .nav-links-desktop li button:hover { color: var(--emerald); background: var(--emerald-xlight); }
        .nav-links-desktop li a.active { color: var(--emerald); background: var(--emerald-light); font-weight: 600; }

        .nav-cta { margin-left: 8px; }
        .mobile-toggle {
          display: none; background: none; border: none; color: var(--ink);
          padding: 8px; border-radius: 8px; cursor: pointer;
        }

        /* Dropdown */
        .products-dropdown { position: relative; }
        .dropdown-panel {
          position: absolute; top: calc(100% + 12px); left: 0;
          background: var(--white); border: 1px solid var(--border);
          border-radius: var(--radius-md); box-shadow: var(--shadow-lg);
          min-width: 280px; overflow: hidden;
          animation: fadeUp 0.2s ease both;
          z-index: 100;
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .dropdown-panel a {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 20px; font-size: 14px; font-weight: 500; color: var(--ink-soft);
          border-bottom: 1px solid var(--border); transition: all 0.15s;
        }
        .dropdown-panel a:last-child { border-bottom: none; }
        .dropdown-panel a::before {
          content: ''; width: 6px; height: 6px;
          background: var(--emerald); border-radius: 50%; flex-shrink: 0;
          opacity: 0; transition: opacity 0.15s;
        }
        .dropdown-panel a:hover { color: var(--emerald); background: var(--emerald-xlight); padding-left: 24px; }
        .dropdown-panel a:hover::before { opacity: 1; }

        /* Mobile */
        .mobile-menu {
          position: fixed; inset: 0; z-index: 999;
          background: var(--white); overflow-y: auto;
          display: flex; flex-direction: column;
          transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .mobile-menu.open { transform: translateX(0); }
        .mobile-menu-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px; border-bottom: 1px solid var(--border);
        }
        .mobile-menu-links { padding: 24px; flex: 1; }
        .mobile-menu-links a, .mobile-prod-toggle {
          display: block; padding: 14px 0; font-size: 17px; font-weight: 600;
          color: var(--ink); border-bottom: 1px solid var(--border);
          transition: color 0.2s;
        }
        .mobile-menu-links a:hover, .mobile-prod-toggle:hover { color: var(--emerald); }
        .mobile-prod-toggle {
          background: none; border: none; width: 100%; text-align: left;
          cursor: pointer; display: flex; justify-content: space-between; align-items: center;
        }
        .mobile-sub-links { padding: 8px 0 8px 16px; }
        .mobile-sub-links a { font-size: 14px; font-weight: 400; color: var(--gray-mid); padding: 10px 0; }
        .mobile-contact { padding: 24px; border-top: 1px solid var(--border); }
        .mobile-contact p { font-size: 13px; color: var(--gray-mid); margin-bottom: 8px; }
        .mobile-contact a { font-size: 15px; font-weight: 600; color: var(--emerald); display: block; margin-bottom: 6px; }

        @media (max-width: 900px) {
          .nav-links-desktop, .nav-cta, .nav-logo-tagline { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .util-contact .util-link:nth-child(2) { display: none; }
        }
        @media (max-width: 480px) {
          .utility-strip { display: none; }
          .nav-logo-name { font-size: 15px; }
        }
      `}</style>

      <header className="tt-header">
        {/* Utility Strip */}
        <div className={`utility-strip${scrolled ? ' hidden' : ''}`}>
          <div className="container utility-inner">
            <div className="util-contact">
              <a href={`tel:${phone}`} className="util-link">
                <Phone size={13} /> {phone}
              </a>
              <a href={`mailto:${email}`} className="util-link">
                <Mail size={13} /> {email}
              </a>
            </div>
            <div className="util-socials">
              {settings?.facebookUrl && <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="util-social"><Facebook size={14} /></a>}
              {settings?.instagramUrl && <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="util-social"><Instagram size={14} /></a>}
              {settings?.linkedinUrl && <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="util-social"><Linkedin size={14} /></a>}
              {settings?.youtubeUrl && <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="util-social"><Youtube size={14} /></a>}
            </div>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className={`main-bar${scrolled ? ' shadow' : ''}`}>
          <div className="container main-bar-inner">
            <Link to="/" className="nav-logo">
              <img src={logoUrl} alt={companyName} onError={e => e.target.src = logo} />
              <div className="nav-logo-text">
                <span className="nav-logo-name">{companyName}</span>
                <span className="nav-logo-tagline">Office Solutions Since 2010</span>
              </div>
            </Link>

            <ul className="nav-links-desktop">
              <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
              <li className="products-dropdown" ref={dropRef}>
                <button onClick={() => setProductsOpen(p => !p)}>
                  Products <ChevronDown size={14} style={{ transform: productsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                {productsOpen && (
                  <div className="dropdown-panel">
                    {products.map(p => <Link key={p.url} to={p.url}>{p.label}</Link>)}
                  </div>
                )}
              </li>
              {navLinks.slice(1).map(l => (
                <li key={l.url}>
                  <Link to={l.url} className={location.pathname === l.url ? 'active' : ''}>{l.label}</Link>
                </li>
              ))}
            </ul>

            <Link to="/contactus" className="btn nav-cta" style={{ padding: '10px 22px', fontSize: '13px' }}>
              Get a Quote
            </Link>

            <button className="mobile-toggle" onClick={() => setIsOpen(true)}>
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu${isOpen ? ' open' : ''}`}>
        <div className="mobile-menu-header">
          <img src={logoUrl} alt={companyName} style={{ height: 40 }} onError={e => e.target.src = logo} />
          <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={28} />
          </button>
        </div>
        <div className="mobile-menu-links">
          <Link to="/">Home</Link>
          <button className="mobile-prod-toggle" onClick={() => setMobileProductsOpen(p => !p)}>
            Products <ChevronDown size={18} style={{ transform: mobileProductsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
          {mobileProductsOpen && (
            <div className="mobile-sub-links">
              {products.map(p => <Link key={p.url} to={p.url}>{p.label}</Link>)}
            </div>
          )}
          {navLinks.slice(1).map(l => <Link key={l.url} to={l.url}>{l.label}</Link>)}
        </div>
        <div className="mobile-contact">
          <p>Get in Touch</p>
          <a href={`tel:${phone}`}>{phone}</a>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
