import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Headphones, FileText, Wrench, Download } from 'lucide-react';

const faqs = [
  { q: 'What warranty do your products come with?', a: 'All our shredders and laminators come with a 1-year manufacturer warranty. Extended warranties are available for institutional buyers.' },
  { q: 'Do you offer after-sales service and repairs?', a: 'Yes, we have a dedicated service team available across Delhi NCR. We also coordinate with service partners for other locations across India.' },
  { q: 'How do I choose the right shredder for my office?', a: 'The right shredder depends on your security level requirement (DIN standard), daily usage volume, and document type. Contact our experts for a personalized recommendation.' },
  { q: 'Are your products available on the GeM portal?', a: 'Yes, select models from our Avanti and Antiva range are listed on the Government e-Marketplace (GeM) for government procurement.' },
  { q: 'What is the delivery timeline?', a: 'Standard delivery is 5-7 business days for Delhi NCR and 7-10 days for other parts of India. Bulk orders may vary — contact us for specific timelines.' },
  { q: 'Do you provide installation and training?', a: 'Yes, we provide complimentary on-site installation and basic operator training for all institutional orders above a certain quantity.' },
];

const Support = () => {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <style>{`
        .support-hero {
          background: linear-gradient(135deg, var(--emerald-deep), var(--emerald));
          padding: 80px 0; color: white; text-align: center;
        }
        .support-hero h1 { font-family: var(--font-display) !important; font-size: clamp(32px,5vw,52px); font-weight:700; margin-bottom: 14px; }
        .support-hero p { font-size:17px; color:rgba(255,255,255,0.75); max-width:480px; margin:0 auto; }
        .support-body { padding: 96px 0; background: var(--off-white); }
        .support-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }

        .support-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 40px; }
        .support-card {
          padding: 24px; border-radius: 14px; background: var(--white);
          border: 1px solid var(--border); box-shadow: var(--shadow-card);
          transition: all 0.3s; cursor: pointer; text-align: center;
        }
        .support-card:hover { transform: translateY(-4px); border-color: var(--emerald); box-shadow: var(--shadow-md); }
        .support-card-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--emerald-xlight); display: flex; align-items: center; justify-content: center; color: var(--emerald); margin: 0 auto 14px; }
        .support-card-title { font-family: var(--font-display) !important; font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
        .support-card-desc { font-size: 13px; color: var(--gray-mid); }

        .faq-section h2 { font-family: var(--font-display) !important; font-size: 26px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .faq-item {
          border: 1px solid var(--border); border-radius: 12px;
          margin-bottom: 10px; background: var(--white); overflow: hidden;
          transition: border-color 0.2s;
        }
        .faq-item.open { border-color: var(--emerald-light); }
        .faq-q {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 20px; cursor: pointer;
          font-size: 15px; font-weight: 600; color: var(--ink);
          transition: color 0.2s;
        }
        .faq-item.open .faq-q { color: var(--emerald); }
        .faq-a {
          padding: 0 20px 18px; font-size: 14px; color: var(--gray-mid); line-height: 1.7;
          animation: fadeUp 0.2s ease;
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }

        @media (max-width: 900px) { .support-grid { grid-template-columns: 1fr; gap: 40px; } }
        @media (max-width: 480px) { .support-cards { grid-template-columns: 1fr; } }
      `}</style>

      <div className="support-hero">
        <div className="container">
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.6)' }}>We're Here</span>
          <h1>Support Center</h1>
          <p>Find answers to common questions or reach out to our dedicated support team.</p>
        </div>
      </div>

      <section className="support-body">
        <div className="container">
          <div className="support-grid">
            <div>
              <span className="section-label">How Can We Help?</span>
              <h2 className="section-title" style={{ marginBottom: 32 }}>Support Options</h2>
              <div className="support-cards">
                {[
                  { icon: Headphones, title: 'Call Support', desc: '+91 9811757846\nMon–Sat, 9AM–6PM' },
                  { icon: FileText, title: 'Product Manuals', desc: 'Download guides & documentation' },
                  { icon: Wrench, title: 'Service Request', desc: 'Book a repair or maintenance visit' },
                  { icon: Download, title: 'Warranty Claim', desc: 'Register or claim your warranty' },
                ].map((c, i) => (
                  <div key={i} className="support-card">
                    <div className="support-card-icon"><c.icon size={22} /></div>
                    <div className="support-card-title">{c.title}</div>
                    <div className="support-card-desc" style={{ whiteSpace: 'pre-line' }}>{c.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--emerald)', borderRadius: 16, padding: '28px 24px', color: 'white' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Need Immediate Help?</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 18 }}>Our support team is just a call away during business hours.</p>
                <a href="tel:+919811757846" className="btn" style={{ background: 'white', color: 'var(--emerald)', borderColor: 'white', fontSize: 14 }}>
                  <Headphones size={16} /> Call Now
                </a>
              </div>
            </div>

            <div className="faq-section">
              <span className="section-label">Common Questions</span>
              <h2>Frequently Asked Questions</h2>
              <p style={{ color: 'var(--gray-mid)', marginBottom: 28, lineHeight: 1.6 }}>Can't find your answer? Reach out to our support team directly.</p>
              {faqs.map((f, i) => (
                <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
                  <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                    <span>{f.q}</span>
                    {open === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  {open === i && <div className="faq-a">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
