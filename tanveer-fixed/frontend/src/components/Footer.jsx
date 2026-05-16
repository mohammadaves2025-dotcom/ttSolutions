import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter, ArrowRight } from 'lucide-react';

const Footer = () => {
  const { settings } = useData();
  const currentYear = new Date().getFullYear();
  const companyName = settings?.companyName || 'T&T Office Solutions';
  const address = settings?.address || 'B-7 Okhla Vihar, Jamia Nagar\nNew Delhi, Delhi 110025';
  const email = settings?.email || 'ttofficesolutions786@gmail.com';
  const phone = settings?.phone || '+91 9811757846';
  const footerText = settings?.footerText || `© ${currentYear} T&T Office Solutions. All rights reserved.`;

  const footerLinks = settings?.footerLinks || [
    { label: 'Document Shredders', url: '/select-brand/document-shredders' },
    { label: 'Multipurpose Application Shredders', url: '/select-brand/multipurpose-shredders' },
    { label: 'Document Laminators & Binders', url: '/select-brand/laminators-binders' },
    { label: 'Waste Management & Recycling', url: '/select-brand/waste-management-recycling' },
    { label: 'Products on GeM', url: '/select-brand/products-on-gem' },
  ];

  const socials = [
    { icon: Facebook, url: settings?.facebookUrl },
    { icon: Twitter, url: settings?.twitterUrl },
    { icon: Instagram, url: settings?.instagramUrl },
    { icon: Linkedin, url: settings?.linkedinUrl },
    { icon: Youtube, url: settings?.youtubeUrl },
  ].filter(s => s.url);

  return (
    <>
      <style>{`
        .tt-footer {
          background: var(--ink);
          color: rgba(255,255,255,0.75);
          padding: 72px 0 0;
          font-size: 14px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 48px;
          padding-bottom: 56px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .footer-brand-name {
          font-family: var(--font-display) !important;
          font-size: 22px; font-weight: 700; color: var(--white); margin-bottom: 4px;
        }
        .footer-brand-tagline {
          font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em;
          color: var(--emerald-bright); margin-bottom: 18px;
        }
        .footer-brand-desc { line-height: 1.7; margin-bottom: 28px; color: rgba(255,255,255,0.55); }
        .footer-socials { display: flex; gap: 12px; }
        .footer-social {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.6); transition: all 0.2s;
        }
        .footer-social:hover { background: var(--emerald); border-color: var(--emerald); color: white; }
        .footer-col-title {
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--white); margin-bottom: 20px;
        }
        .footer-links { display: flex; flex-direction: column; gap: 10px; }
        .footer-links a {
          color: rgba(255,255,255,0.55); transition: color 0.2s;
          display: flex; align-items: center; gap: 6px; font-size: 14px;
        }
        .footer-links a::before {
          content: ''; display: block; width: 4px; height: 4px;
          background: var(--emerald); border-radius: 50%; flex-shrink: 0;
          opacity: 0; transition: opacity 0.2s;
        }
        .footer-links a:hover { color: var(--white); }
        .footer-links a:hover::before { opacity: 1; }
        .footer-contact-item {
          display: flex; gap: 12px; margin-bottom: 16px;
        }
        .footer-contact-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(10,122,69,0.2); display: flex; align-items: center; justify-content: center;
          color: var(--emerald-bright); flex-shrink: 0; margin-top: 2px;
        }
        .footer-contact-text { line-height: 1.5; color: rgba(255,255,255,0.55); }
        .footer-contact-text a:hover { color: var(--emerald-bright); }
        .footer-bottom {
          padding: 20px 0; display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
        }
        .footer-bottom-text { font-size: 13px; color: rgba(255,255,255,0.35); }
        .footer-bottom-links { display: flex; gap: 24px; }
        .footer-bottom-links a { font-size: 13px; color: rgba(255,255,255,0.35); transition: color 0.2s; }
        .footer-bottom-links a:hover { color: var(--emerald-bright); }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; gap: 36px; }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>
      <footer className="tt-footer">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div>
              <div className="footer-brand-name">{companyName}</div>
              <div className="footer-brand-tagline">Trusted Office Solutions Since 2010</div>
              <p className="footer-brand-desc">
                India's premier distributor of professional shredding, laminating, and waste management solutions. Serving government, corporate, and institutional clients nationwide.
              </p>
              {socials.length > 0 && (
                <div className="footer-socials">
                  {socials.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="footer-social">
                      <s.icon size={15} />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Products */}
            <div>
              <div className="footer-col-title">Products</div>
              <div className="footer-links">
                {footerLinks.map((l, i) => <Link key={i} to={l.url}>{l.label}</Link>)}
              </div>
            </div>

            {/* Company */}
            <div>
              <div className="footer-col-title">Company</div>
              <div className="footer-links">
                <Link to="/aboutus">About Us</Link>
                <Link to="/blog">Blog & Insights</Link>
                <Link to="/support">Support</Link>
                <Link to="/contactus">Contact Us</Link>
                <Link to="/select-brand/products-on-gem">GeM Products</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="footer-col-title">Get in Touch</div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon"><MapPin size={15} /></div>
                <div className="footer-contact-text">
                  {address.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
                </div>
              </div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon"><Phone size={15} /></div>
                <div className="footer-contact-text">
                  <a href={`tel:${phone}`} style={{ color: 'rgba(255,255,255,0.55)' }}>{phone}</a>
                </div>
              </div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon"><Mail size={15} /></div>
                <div className="footer-contact-text">
                  <a href={`mailto:${email}`} style={{ color: 'rgba(255,255,255,0.55)' }}>{email}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-bottom-text">{footerText}</span>
            <div className="footer-bottom-links">
              <Link to="/aboutus">Privacy</Link>
              <Link to="/support">Support</Link>
              <Link to="/contactus">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
