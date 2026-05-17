import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '919811757846';

const Contact = () => {
  const { settings } = useData();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const formRef = useScrollAnimation();

  const companyName = settings?.companyName || 'T&T Office Solutions';
  const address = settings?.address || 'B-7 Okhla Vihar, Jamia Nagar\nNew Delhi, Delhi 110025';
  const email = settings?.email || 'ttofficesolutions786@gmail.com';
  const phone = settings?.phone || '+91 9811757846';

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

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
    { icon: Phone, label: 'Phone', value: phone, href: `tel:${phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    { icon: MapPin, label: 'Address', value: address, href: 'https://maps.google.com/?q=B-7+Okhla+Vihar+Jamia+Nagar+New+Delhi+110025' },
    { icon: Clock, label: 'Business Hours', value: 'Mon – Sat: 9:00 AM – 6:00 PM', href: null },
  ];

  const whatsappMsg = encodeURIComponent(`Hello ${companyName}! I would like to enquire about your products.`);

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

        .contact-info-card { background: var(--white); border-radius: 20px; padding: 40px; border: 1px solid var(--border); box-shadow: var(--shadow-card); }
        .contact-info-title { font-family: var(--font-display) !important; font-size: 22px; font-weight: 700; color: var(--ink); margin-bottom: 32px; }
        .contact-item { display: flex; gap: 16px; margin-bottom: 28px; }
        .contact-item:last-child { margin-bottom: 0; }
        .contact-icon { width: 44px; height: 44px; border-radius: 12px; background: var(--emerald-xlight); border: 1px solid var(--emerald-light); display: flex; align-items: center; justify-content: center; color: var(--emerald); flex-shrink: 0; }
        .contact-item-label { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--emerald); margin-bottom: 4px; }
        .contact-item-value { font-size: 14px; color: var(--ink-soft); line-height: 1.5; }
        .contact-item-value a { color: var(--ink-soft); transition: color 0.2s; }
        .contact-item-value a:hover { color: var(--emerald); }

        /* Google Maps embed */
        .contact-map {
          margin-top: 28px; border-radius: 12px; overflow: hidden;
          border: 1px solid var(--border); height: 220px;
        }
        .contact-map iframe { width: 100%; height: 100%; border: none; display: block; }

        /* WhatsApp CTA */
        .whatsapp-cta {
          margin-top: 24px; display: flex; align-items: center; gap: 12px;
          background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 12px;
          padding: 14px 18px; text-decoration: none; transition: all 0.2s;
        }
        .whatsapp-cta:hover { background: #25D366; border-color: #25D366; }
        .whatsapp-cta:hover .wa-text { color: white; }
        .whatsapp-cta:hover .wa-sub { color: rgba(255,255,255,0.8); }
        .whatsapp-cta:hover .wa-icon-wrap { background: rgba(255,255,255,0.2); }
        .wa-icon-wrap { width: 38px; height: 38px; border-radius: 50%; background: #dcfce7; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s; }
        .wa-text { font-size: 14px; font-weight: 700; color: #166534; transition: color 0.2s; }
        .wa-sub { font-size: 12px; color: #4ade80; margin-top: 1px; transition: color 0.2s; }

        .contact-form-card { background: var(--white); border-radius: 20px; padding: 48px; border: 1px solid var(--border); box-shadow: var(--shadow-card); }
        .form-title { font-family: var(--font-display) !important; font-size: 26px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .form-sub { font-size: 14px; color: var(--gray-mid); margin-bottom: 32px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gray-mid); margin-bottom: 8px; }
        .form-input { width: 100%; padding: 13px 16px; border: 1.5px solid var(--border); border-radius: 10px; font-size: 15px; color: var(--ink); background: var(--white); transition: all 0.2s; outline: none; font-family: var(--font-body) !important; }
        .form-input:focus { border-color: var(--emerald); box-shadow: 0 0 0 3px rgba(10,122,69,0.1); }
        .form-input::placeholder { color: var(--gray-light); }
        .form-textarea { resize: vertical; min-height: 120px; }
        .form-success { display: flex; align-items: center; gap: 12px; padding: 16px 20px; background: var(--emerald-xlight); border: 1px solid var(--emerald-light); border-radius: 10px; color: var(--emerald); font-weight: 600; margin-bottom: 20px; animation: fadeUp 0.4s ease; }
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
      <section className="contact-body" ref={formRef}>
        <div className="container">
          <div className="contact-grid">

            {/* Info */}
            <div className="contact-info-card reveal">
              <div className="contact-info-title">Our Details</div>
              {contactItems.map((item, i) => (
                <div key={i} className="contact-item">
                  <div className="contact-icon"><item.icon size={20} /></div>
                  <div>
                    <div className="contact-item-label">{item.label}</div>
                    <div className="contact-item-value">
                      {item.href
                        ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                            {item.value.split('\n').map((l, j) => <span key={j}>{l}<br /></span>)}
                          </a>
                        : item.value.split('\n').map((l, j) => <span key={j}>{l}<br /></span>)
                      }
                    </div>
                  </div>
                </div>
              ))}

              {/* Google Maps embed — B-7 Okhla Vihar, New Delhi */}
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.6!2d77.2852!3d28.5494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMyJzU3LjgiTiA3N8KwMTcnMDYuNyJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin&q=B-7+Okhla+Vihar,+Jamia+Nagar,+New+Delhi,+Delhi+110025"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="T&T Office Solutions location"
                />
              </div>

              {/* WhatsApp quick contact */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                className="whatsapp-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="wa-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.552 4.112 1.512 5.836L.038 23.964l6.28-1.448A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.003-1.371l-.36-.213-3.73.859.896-3.625-.234-.373A9.817 9.817 0 012.182 12c0-5.422 4.396-9.818 9.818-9.818 5.421 0 9.818 4.396 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/>
                  </svg>
                </div>
                <div>
                  <div className="wa-text">Chat on WhatsApp</div>
                  <div className="wa-sub">Typically replies within minutes</div>
                </div>
              </a>
            </div>

            {/* Form */}
            <div className="contact-form-card reveal reveal-delay-2">
              <h2 className="form-title">Send Us a Message</h2>
              <p className="form-sub">Tell us about your requirements and we'll get back to you promptly.</p>
              {sent && (
                <div className="form-success">
                  <CheckCircle size={20} />
                  Thank you! Your email client will open with a pre-filled message. We'll reply within 24 hours.
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
