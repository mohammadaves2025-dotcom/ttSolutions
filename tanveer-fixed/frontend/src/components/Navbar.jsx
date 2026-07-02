import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Menu, X, Phone, Mail, ChevronDown, Facebook, Twitter, Instagram, Linkedin, Youtube, Home as HomeIcon, Package, BookOpen, LifeBuoy, Users, Send } from 'lucide-react';
import logo from '../assets/logo.png';
import './Navbar.css';

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
    // FIX: the old version used a single threshold (scrollY > 30) with no
    // buffer. Trackpad/mouse-wheel scrolling jitters by a few px even during
    // a single "smooth" scroll, so scrollY kept crossing 30 back and forth —
    // that's what was making the utility strip collapse/expand repeatedly
    // ("dancing"). Two fixes: hysteresis (different on/off thresholds so a
    // few px of jitter can't flip it), and rAF-throttling so we only check
    // once per frame instead of on every scroll event.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(prev => (prev ? y > 20 : y > 60));
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setProductsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setProductsOpen(false);
    setMobileProductsOpen(false);
  }, [location]);

  // Lock body scroll while the mobile drawer is open. Only ever fires
  // when isOpen is true, which only ever happens via .mobile-toggle,
  // a button that's display:none on desktop — so this is mobile-only in practice.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navIcons = {
    '/': HomeIcon,
    '/blog': BookOpen,
    '/support': LifeBuoy,
    '/aboutus': Users,
    '/contactus': Send,
  };

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
      <header className="tt-header">
        {/* Utility Strip — collapses with max-height transition, no layout jump */}
        <div className={`utility-strip${scrolled ? ' hidden' : ''}`}>
          <div className="utility-strip-inner">
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
                {settings?.facebookUrl  && <a href={settings.facebookUrl}  target="_blank" rel="noopener noreferrer" className="util-social"><Facebook  size={14} /></a>}
                {settings?.instagramUrl && <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="util-social"><Instagram size={14} /></a>}
                {settings?.linkedinUrl  && <a href={settings.linkedinUrl}  target="_blank" rel="noopener noreferrer" className="util-social"><Linkedin  size={14} /></a>}
                {settings?.youtubeUrl   && <a href={settings.youtubeUrl}   target="_blank" rel="noopener noreferrer" className="util-social"><Youtube   size={14} /></a>}
              </div>
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

      {/* Mobile Menu backdrop — tap outside the drawer to close it */}
      <div className={`mobile-menu-backdrop${isOpen ? ' open' : ''}`} onClick={() => setIsOpen(false)} />

      {/* Mobile Menu */}
      <div className={`mobile-menu${isOpen ? ' open' : ''}`}>
        <div className="mobile-menu-header">
          <img src={logoUrl} alt={companyName} style={{ height: 40 }} onError={e => e.target.src = logo} />
          <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={28} />
          </button>
        </div>
        <div className="mobile-menu-links">
          <Link to="/" className={location.pathname === '/' ? 'mobile-link-active' : ''}><HomeIcon size={18} className="mobile-link-icon" /> Home</Link>
          <button className="mobile-prod-toggle" onClick={() => setMobileProductsOpen(p => !p)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Package size={18} className="mobile-link-icon" /> Products</span>
            <ChevronDown size={18} style={{ transform: mobileProductsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
          {mobileProductsOpen && (
            <div className="mobile-sub-links">
              {products.map(p => <Link key={p.url} to={p.url}>{p.label}</Link>)}
            </div>
          )}
          {navLinks.slice(1).map(l => {
            const Icon = navIcons[l.url];
            return (
              <Link key={l.url} to={l.url} className={location.pathname === l.url ? 'mobile-link-active' : ''}>
                {Icon && <Icon size={18} className="mobile-link-icon" />} {l.label}
              </Link>
            );
          })}
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