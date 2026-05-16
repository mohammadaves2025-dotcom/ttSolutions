import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const { settings } = useData();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const companyName = settings?.companyName || 'T&T Office Solutions';
  const address = settings?.address || 'B-7 Okhla Vihar, Jamia Nagar\nNew Delhi, Delhi 110025';
  const email = settings?.email || 'ttofficesolutions786@gmail.com';
  const phone = settings?.phone || '+91 9811757846';

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  // NOTE: To hook this into a real backend, replace this handler with a POST to
  // your contact/email API (e.g. Nodemailer via Express, EmailJS, Formspree, etc.)
  // For now it opens the user's mail client as a reliable fallback.
  const handleSubmit = e => {
    e.preventDefault();
    const subject = encodeURIComponent('Website Enquiry from ' + form.name);
    const body = encodeURIComponent(
      'Name: ' + form.name + '\n' +
      'Phone: ' + (form.phone || 'N/A') + '\n' +
      'Email: ' + form.email + '\n\n' +
      'Message:\n' + form.message
    );
    window.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const contactItems = [
    { icon: Phone, label: 'Phone', value: phone, href: `tel:${phone}` },
    { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    { icon: MapPin, label: 'Address', value: address, href: null },
    { icon: Clock, label: 'Business Hours', value: 'Mon – Sat: 9:00 AM – 6:00 PM', href: null },
  ];

  return (
    <div>
      <style>{`
        .contact-hero {
          background: linear-gradient(135deg, var(--emerald-deep), var(--emerald));
          padding: 80px 0; color: white; text-align: center;
        }
        .contact-hero h1 { font-family: var(--font-display) !important; font-size: clamp(32px,5vw,52px); font-weight: 700; margin-bottom: 14px; }
        .contact-hero p { font-size: 17px; color: rgba(255,255,255,0.75); max-width: 480px; margin: 0 auto; }

        .contact-body { padding: 96px 0; background: var(--off-white); }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 64px; align-items: start; }

        .contact-info-card {
          background: var(--white); border-radius: 20px; padding: 40px;
          border: 1px solid var(--border); box-shadow: var(--shadow-card);
        }
        .contact-info-title { font-family: var(--font-display) !important; font-size: 22px; font-weight: 700; color: var(--ink); margin-bottom: 32px; }
        .contact-item { display: flex; gap: 16px; margin-bottom: 28px; }
        .contact-item:last-child { margin-bottom: 0; }
        .contact-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: var(--emerald-xlight); border: 1px solid var(--emerald-light);
          display: flex; align-items: center; justify-content: center;
          color: var(--emerald); flex-shrink: 0;
        }
        .contact-item-label { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--emerald); margin-bottom: 4px; }
        .contact-item-value { font-size: 14px; color: var(--ink-soft); line-height: 1.5; }
        .contact-item-value a { color: var(--ink-soft); transition: color 0.2s; }
        .contact-item-value a:hover { color: var(--emerald); }

        .contact-map {
          margin-top: 32px; border-radius: 12px; overflow: hidden;
          height: 180px; background: var(--emerald-xlight);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--gray-mid); font-size: 14px;
        }

        .contact-form-card {
          background: var(--white); border-radius: 20px; padding: 48px;
          border: 1px solid var(--border); box-shadow: var(--shadow-card);
        }
        .form-title { font-family: var(--font-display) !important; font-size: 26px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .form-sub { font-size: 14px; color: var(--gray-mid); margin-bottom: 32px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gray-mid); margin-bottom: 8px; }
        .form-input {
          width: 100%; padding: 13px 16px; border: 1.5px solid var(--border);
          border-radius: 10px; font-size: 15px; color: var(--ink);
          background: var(--white); transition: all 0.2s; outline: none;
          font-family: var(--font-body) !important;
        }
        .form-input:focus { border-color: var(--emerald); box-shadow: 0 0 0 3px rgba(10,122,69,0.1); }
        .form-input::placeholder { color: var(--gray-light); }
        .form-textarea { resize: vertical; min-height: 120px; }

        .form-success {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 20px; background: var(--emerald-xlight);
          border: 1px solid var(--emerald-light); border-radius: 10px;
          color: var(--emerald); font-weight: 600; margin-bottom: 20px;
          animation: fadeUp 0.4s ease;
        }

        @keyframes fadeUp { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; gap: 32px; }
          .form-row { grid-template-columns: 1fr; }
          .contact-form-card { padding: 32px 24px; }
        }
      `}</style>

      {/* Hero */}
      <div className="contact-hero">
        <div className="container">
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.6)' }}>We're Here to Help</span>
          <h1>Contact Us</h1>
          <p>Reach out for product enquiries, pricing, or after-sales support. Our team responds within 24 hours.</p>
        </div>
      </div>

      {/* Body */}
      <section className="contact-body">
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div className="contact-info-card">
              <div className="contact-info-title">Our Details</div>
              {contactItems.map((item, i) => (
                <div key={i} className="contact-item">
                  <div className="contact-icon"><item.icon size={20} /></div>
                  <div>
                    <div className="contact-item-label">{item.label}</div>
                    <div className="contact-item-value">
                      {item.href
                        ? <a href={item.href}>{item.value.split('\n').map((l, j) => <span key={j}>{l}<br /></span>)}</a>
                        : item.value.split('\n').map((l, j) => <span key={j}>{l}<br /></span>)
                      }
                    </div>
                  </div>
                </div>
              ))}
              <div className="contact-map">
                <MapPin size={20} style={{ marginRight: 8 }} />
                B-7 Okhla Vihar, New Delhi
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-card">
              <h2 className="form-title">Send Us a Message</h2>
              <p className="form-sub">Tell us about your requirements and we'll get back to you promptly.</p>
              {sent && (
                <div className="form-success">
                  <CheckCircle size={20} />
                  Thank you! We'll get back to you within 24 hours.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input className="form-input" name="email" value={form.email} onChange={handleChange} type="email" placeholder="your@email.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Message / Requirement *</label>
                  <textarea className="form-input form-textarea" name="message" value={form.message} onChange={handleChange} placeholder="Describe your needs — product type, quantity, location, etc." required />
                </div>
                <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={16} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
