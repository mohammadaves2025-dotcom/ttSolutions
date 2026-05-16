import React from 'react';
import { useData } from '../context/DataContext';
import { Shield, Award, Users, TrendingUp, CheckCircle, Building2, Heart } from 'lucide-react';

const milestones = [
  { year: '2010', title: 'Founded', desc: 'T&T Office Solutions established in New Delhi' },
  { year: '2013', title: 'Avanti Partnership', desc: 'Became authorized distributors for Avanti brand' },
  { year: '2017', title: 'Antiva Launch', desc: 'Expanded portfolio with premium Antiva products' },
  { year: '2022', title: 'GeM Listing', desc: 'Products listed on Government e-Marketplace' },
  { year: '2024', title: '5000+ Units', desc: 'Milestone of 5000+ products sold across India' },
];

const values = [
  { icon: Shield, title: 'Integrity', desc: 'We stand behind every product we sell with full transparency and accountability.' },
  { icon: Award, title: 'Excellence', desc: 'Only the highest quality products make it into our portfolio.' },
  { icon: Heart, title: 'Customer First', desc: 'Your satisfaction and security drive every decision we make.' },
  { icon: TrendingUp, title: 'Innovation', desc: 'We stay ahead of the curve, bringing you the latest in office technology.' },
];

const About = () => {
  const { settings } = useData();
  const heading = settings?.aboutPageHeading || 'About Us';
  const subHeading = settings?.aboutPageSubHeading || 'T&T OFFICE SOLUTIONS';
  const mainText = settings?.aboutUsText || 'Start your journey with T&T Office Solutions, a leader in office automation. We are committed to providing widespread solutions for document presentation and protection.';
  const extra1 = settings?.aboutPageExtra1 || 'Our products are designed with precision and durability in mind, serving thousands of satisfied customers across India.';
  const extra2 = settings?.aboutPageExtra2 || 'Our Prestigious Customers: Government organizations, Banks, Corporate Offices, and Educational Institutions trust T&T Office Solutions.';

  return (
    <div>
      <style>{`
        .about-hero {
          background: linear-gradient(135deg, var(--emerald-deep) 0%, var(--emerald) 60%, var(--emerald-bright) 100%);
          padding: 96px 0 80px;
          position: relative; overflow: hidden;
        }
        .about-hero::before {
          content: ''; position: absolute; top: -100px; right: -100px;
          width: 400px; height: 400px; border-radius: 50%;
          background: rgba(255,255,255,0.05);
        }
        .about-hero-inner { position: relative; z-index: 1; max-width: 680px; }
        .about-hero-label { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 16px; }
        .about-hero-title {
          font-family: var(--font-display) !important;
          font-size: clamp(36px,5vw,60px); font-weight: 700; color: var(--white);
          line-height: 1.1; margin-bottom: 24px;
        }
        .about-hero-sub { font-size: 18px; color: rgba(255,255,255,0.75); line-height: 1.7; }

        .about-story { padding: 96px 0; background: var(--white); }
        .about-story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .about-story-text .section-label { margin-bottom: 12px; }
        .about-story-text p { color: var(--gray-mid); line-height: 1.8; margin-bottom: 20px; font-size: 16px; }
        .about-story-highlights { background: var(--emerald-xlight); border-radius: 16px; padding: 32px; border: 1px solid var(--emerald-light); }
        .highlight-item { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px; }
        .highlight-item:last-child { margin-bottom: 0; }
        .highlight-icon { color: var(--emerald); flex-shrink: 0; margin-top: 2px; }
        .highlight-text { font-size: 15px; color: var(--ink-soft); line-height: 1.6; }

        .timeline-section { padding: 80px 0; background: var(--off-white); }
        .timeline { position: relative; padding-left: 32px; }
        .timeline::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--emerald-light); }
        .timeline-item { position: relative; margin-bottom: 40px; }
        .timeline-item::before {
          content: ''; position: absolute; left: -40px; top: 6px;
          width: 14px; height: 14px; border-radius: 50%;
          background: var(--emerald); border: 3px solid var(--white);
          box-shadow: 0 0 0 2px var(--emerald);
        }
        .timeline-year { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--emerald); margin-bottom: 6px; }
        .timeline-title { font-family: var(--font-display) !important; font-size: 18px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
        .timeline-desc { font-size: 14px; color: var(--gray-mid); }

        .values-section { padding: 96px 0; background: var(--white); }
        .values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .value-card { padding: 32px 24px; border-radius: 16px; background: var(--off-white); border: 1px solid var(--border); transition: all 0.3s; }
        .value-card:hover { background: var(--emerald-xlight); border-color: var(--emerald-light); transform: translateY(-4px); }
        .value-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--emerald-light); display: flex; align-items: center; justify-content: center; color: var(--emerald); margin-bottom: 18px; }
        .value-card:hover .value-icon { background: var(--emerald); color: var(--white); }
        .value-title { font-family: var(--font-display) !important; font-size: 17px; font-weight: 700; color: var(--ink); margin-bottom: 10px; }
        .value-desc { font-size: 14px; color: var(--gray-mid); line-height: 1.65; }

        @media (max-width: 900px) {
          .about-story-grid { grid-template-columns: 1fr; gap: 40px; }
          .values-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .values-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <div className="about-hero">
        <div className="container">
          <div className="about-hero-inner">
            <div className="about-hero-label">Our Story</div>
            <h1 className="about-hero-title">{heading}</h1>
            <p className="about-hero-sub">{subHeading}</p>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="about-story">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-text">
              <span className="section-label">Who We Are</span>
              <h2 className="section-title">Delhi's Most Trusted Office Equipment Specialists</h2>
              <p>{mainText}</p>
              {extra1 && <p>{extra1}</p>}
            </div>
            <div>
              <div className="about-story-highlights">
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '24px', color: 'var(--ink)' }}>Our Prestigious Clientele</h3>
                {[
                  'Government Organizations & Ministries',
                  'Leading Banks & Financial Institutions',
                  'Corporate Offices & MNCs',
                  'Educational Institutions & Universities',
                  'Healthcare Facilities & Hospitals',
                  'Legal Firms & Judiciary'
                ].map((item, i) => (
                  <div key={i} className="highlight-item">
                    <CheckCircle size={18} className="highlight-icon" />
                    <span className="highlight-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div>
              <span className="section-label">Our Journey</span>
              <h2 className="section-title">A Decade of Growing Excellence</h2>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.7, marginBottom: '40px' }}>From a small office in Delhi to becoming one of India's most trusted office solutions providers — our journey has been defined by commitment and growth.</p>
            </div>
            <div className="timeline">
              {milestones.map((m, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-year">{m.year}</div>
                  <div className="timeline-title">{m.title}</div>
                  <div className="timeline-desc">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">What We Stand For</span>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon"><v.icon size={22} /></div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
