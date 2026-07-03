import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Carousel from '../components/Carousel';
import HeroMobile from '../components/HeroMobile';
import '../components/HeroMobile.css';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { Shield, Award, Headphones, Truck, ArrowRight, Star, CheckCircle } from 'lucide-react';
import ShreddersImg from '../assets/shredders.png';
import AppShreddersImg from '../assets/application-shredders.png';
import LaminatorsImg from '../assets/binders-and-laminators.png';
import PetShreddersImg from '../assets/pet-bottle-shredders.png';

const categories = [
  { title: 'Document Shredders', image: ShreddersImg, link: '/select-brand/document-shredders', desc: 'High-security shredding for offices & enterprises' },
  { title: 'Multipurpose Application Shredders', image: AppShreddersImg, link: '/select-brand/multipurpose-shredders', desc: 'Industrial-grade multi-material destruction' },
  { title: 'Document Laminators & Binders', image: LaminatorsImg, link: '/select-brand/laminators-binders', desc: 'Professional document finishing solutions' },
  { title: 'Waste Management & Recycling', image: PetShreddersImg, link: '/select-brand/waste-management-recycling', desc: 'Eco-conscious destruction & recycling systems' },
];

const stats = [
  { value: 15, suffix: '+', label: 'Years in Business' },
  { value: 5000, suffix: '+', label: 'Products Sold' },
  { value: 500, suffix: '+', label: 'Happy Clients' },
  { value: 2, suffix: '', label: 'Premium Brands' },
];

const features = [
  { icon: Shield, title: 'Data Security First', desc: 'DIN-certified shredders that protect your most sensitive information.' },
  { icon: Award, title: 'Premium Brands', desc: 'Exclusive distributors of Avanti & Antiva — trusted globally.' },
  { icon: Headphones, title: 'Expert Support', desc: 'Dedicated after-sales service team available across India.' },
  { icon: Truck, title: 'Pan-India Delivery', desc: 'Fast, reliable shipping to government & corporate offices nationwide.' },
];

const clients = ['Government Organizations', 'Banks & NBFCs', 'Corporate Offices', 'Educational Institutions', 'Healthcare Facilities', 'Legal Firms'];

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCountUp(target, duration = 1800) {
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;

      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return ref;
}

function StatItem({ value, suffix, label }) {
  const numRef = useCountUp(value);
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="stat-value">
        <span ref={numRef}>0</span>{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

const Home = () => {
  const { settings } = useData();

  const productsRef = useScrollAnimation();
  const featuresRef = useScrollAnimation();
  const brandsRef   = useScrollAnimation();
  const clientsRef  = useScrollAnimation();
  const ctaRef      = useScrollAnimation();

  return (
    <div style={{ minHeight: '100vh' }}>
      <style>{`
        /* ─── Hero toggle: desktop Carousel vs mobile HeroMobile ───
           768px matches the breakpoint Carousel itself always used.
           This is the only place the two heroes' existence is decided;
           neither component needs to know about the other. */
        .desktop-hero-wrap { display: block; }
        .mobile-hero-wrap { display: none; }
        @media (max-width: 768px) {
          .desktop-hero-wrap { display: none; }
          .mobile-hero-wrap { display: block; }
        }

        /* ─── Stats Strip ─── */
        .stats-strip { background: var(--emerald); padding: 40px 0; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center; }
        .stat-value {
          font-family: var(--font-display) !important;
          font-size: clamp(32px, 5vw, 52px); font-weight: 700;
          color: var(--white); line-height: 1;
        }
        .stat-label { font-size: 13px; color: rgba(255,255,255,0.75); margin-top: 6px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; }

        /* ─── Products Section ─── */
        .products-section { padding: 96px 0; background: var(--off-white); }
        .products-section-header { margin-bottom: 56px; }
        .products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .product-card {
          background: var(--white); border-radius: 16px; overflow: hidden;
          border: 1px solid var(--border); transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          cursor: pointer; display: flex; flex-direction: column;
          box-shadow: 0 2px 12px rgba(13,27,18,0.06);
        }
        .product-card-img { aspect-ratio: 4/3; overflow: hidden; background: var(--emerald-xlight); position: relative; display: flex; align-items: center; justify-content: center; }
        .product-card-img img { width: 60%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .product-card:hover .product-card-img img { transform: scale(1.06); }
        .product-card-badge { position: absolute; top: 12px; left: 12px; background: var(--emerald); color: white; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; }
        .product-card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
        .product-card-title { font-family: var(--font-display) !important; font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 8px; line-height: 1.3; }
        .product-card-desc { font-size: 13px; color: var(--gray-mid); flex: 1; margin-bottom: 16px; line-height: 1.5; }
        .product-card-cta { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--emerald); transition: gap 0.2s; }
        .product-card:hover .product-card-cta { gap: 10px; }

        /* ─── Features ─── */
        .features-section { padding: 96px 0; background: var(--white); }
        .features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
        .feature-card { padding: 32px 24px; border-radius: 16px; border: 1px solid var(--border); background: var(--white); transition: all 0.3s ease; }
        .feature-card:hover { background: var(--emerald-xlight); border-color: var(--emerald-light); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(10,122,69,0.1); }
        .feature-icon { width: 52px; height: 52px; border-radius: 14px; background: var(--emerald-light); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; color: var(--emerald); transition: background 0.3s; }
        .feature-card:hover .feature-icon { background: var(--emerald); color: var(--white); }
        .feature-title { font-family: var(--font-display) !important; font-size: 17px; font-weight: 700; color: var(--ink); margin-bottom: 10px; }
        .feature-desc { font-size: 14px; color: var(--gray-mid); line-height: 1.6; }

        /* ─── Brands Section ─── */
        .brands-section { padding: 80px 0; background: linear-gradient(135deg, var(--emerald-deep) 0%, var(--emerald) 100%); position: relative; overflow: hidden; }
        .brands-section::before { content: ''; position: absolute; top: -60px; right: -60px; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,0.04); pointer-events: none; }
        .brands-section::after { content: ''; position: absolute; bottom: -80px; left: -40px; width: 240px; height: 240px; border-radius: 50%; background: rgba(255,255,255,0.03); pointer-events: none; }
        .brands-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; position: relative; z-index: 1; }
        .brands-text .section-label { color: rgba(255,255,255,0.6); }
        .brands-text .section-title { color: var(--white); }
        .brands-text p { color: rgba(255,255,255,0.75); font-size: 16px; line-height: 1.7; margin-bottom: 32px; }
        .brand-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .brand-card { background: rgba(255,255,255,0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.2); border-radius: 16px; padding: 28px; text-align: center; transition: all 0.3s; cursor: pointer; }
        .brand-card:hover { background: rgba(255,255,255,0.18); transform: translateY(-4px); }
        .brand-card-name { font-family: var(--font-display) !important; font-size: 22px; font-weight: 700; color: var(--white); margin-bottom: 6px; }
        .brand-card-sub { font-size: 12px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em; }

        /* ─── GeM Badge Strip ─── */
        .gem-strip {
          background: var(--white);
          padding: 32px 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .gem-inner {
          display: flex; align-items: center; justify-content: center;
          gap: 24px; flex-wrap: wrap;
        }
        .gem-badge {
          display: flex; align-items: center; gap: 12px;
          background: var(--emerald-xlight); border: 1.5px solid var(--emerald-light);
          border-radius: 50px; padding: 10px 24px;
        }
        .gem-badge-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--emerald); flex-shrink: 0; animation: gemPulse 2s infinite; }
        @keyframes gemPulse { 0%,100%{box-shadow:0 0 0 0 rgba(10,122,69,0.4)} 50%{box-shadow:0 0 0 6px rgba(10,122,69,0)} }
        .gem-badge-text { font-size: 13px; font-weight: 700; color: var(--emerald); letter-spacing: 0.04em; }
        .gem-divider { width: 1px; height: 24px; background: var(--border); }
        .gem-note { font-size: 13px; color: var(--gray-mid); }

        /* ─── Clients ─── */
        .clients-section { padding: 80px 0; background: var(--off-white); }
        .clients-label { text-align: center; margin-bottom: 40px; }
        .clients-list { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }
        .client-pill { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: var(--white); border: 1px solid var(--border); border-radius: 50px; font-size: 14px; font-weight: 500; color: var(--ink-soft); box-shadow: var(--shadow-sm); transition: all 0.2s; }
        .client-pill:hover { border-color: var(--emerald); color: var(--emerald); transform: translateY(-2px); box-shadow: var(--shadow-md); }
        .client-pill svg { color: var(--emerald); }

        /* ─── CTA Banner ─── */
        .cta-banner { padding: 80px 0; background: var(--white); }
        .cta-inner { background: var(--emerald); border-radius: 24px; padding: 64px; display: flex; align-items: center; justify-content: space-between; gap: 40px; position: relative; overflow: hidden; }
        .cta-inner::before { content: ''; position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,0.07); }
        .cta-text .section-label { color: rgba(255,255,255,0.6); }
        .cta-title { font-family: var(--font-display) !important; font-size: clamp(24px,3vw,36px); font-weight: 700; color: var(--white); margin-bottom: 12px; }
        .cta-sub { font-size: 16px; color: rgba(255,255,255,0.75); }
        .cta-actions { display: flex; gap: 16px; flex-shrink: 0; flex-wrap: wrap; }

        @media (max-width: 1024px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); }
          .features-grid { grid-template-columns: repeat(2, 1fr); }
          .brands-inner { grid-template-columns: 1fr; gap: 40px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }
        @media (max-width: 640px) {
          .products-grid { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr; }
          .brand-cards { grid-template-columns: 1fr; }
          .cta-inner { padding: 32px 20px; flex-direction: column; text-align: center; }
          .cta-actions { justify-content: center; width: 100%; }
          .cta-actions a, .cta-actions button { width: 100%; justify-content: center; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .stats-strip { padding: 28px 0; }
          .stat-value { font-size: clamp(26px, 8vw, 40px); }
          .gem-divider { display: none; }
          .gem-inner { flex-direction: column; align-items: flex-start; gap: 12px; }
          .gem-badge { width: 100%; }
          .gem-note { font-size: 12px; }
          .products-section { padding: 56px 0; }
          .features-section { padding: 56px 0; }
          .brands-section { padding: 56px 0; }
          .clients-section { padding: 56px 0; }
          .cta-banner { padding: 48px 0; }
          .products-section-header { margin-bottom: 32px; }
          .product-card-body { padding: 16px; }
          .feature-card { padding: 24px 18px; }
          .brands-inner { gap: 28px; }
          .brands-text p { font-size: 14px; }

          /* ─── Category cards: shrunk grid → swipeable row ───
             This is the "app-like" pattern (Amazon/Flipkart category
             rails) instead of a tall stack of full-width cards. */
          .products-grid {
            display: flex;
            grid-template-columns: none;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            gap: 14px;
            margin: 0 -20px;
            padding: 4px 20px 8px;
          }
          .products-grid::-webkit-scrollbar { display: none; }
          .product-card {
            scroll-snap-align: start;
            flex: 0 0 78%;
            transition: transform 0.15s ease, box-shadow 0.15s ease;
          }
          .product-card:active {
            transform: scale(0.97);
            box-shadow: 0 2px 8px rgba(13,27,18,0.1);
          }

          /* Feature and brand cards get the same tap feedback since
             hover never fires on a touchscreen. */
          .feature-card:active, .client-pill:active, .brand-card:active {
            transform: scale(0.97);
          }
          .cta-actions a:active, .cta-actions button:active { transform: scale(0.96); }

          /* Swipe hint so first-time visitors know the row scrolls */
          .products-section-header::after {
            content: '← Swipe to see all categories';
            display: block;
            margin-top: 10px;
            font-size: 12px;
            font-weight: 600;
            color: var(--gray-mid);
            letter-spacing: 0.02em;
          }
        }
      `}</style>

      {/* Hero — desktop keeps the photo carousel exactly as-is; mobile gets
          its own dedicated icon-illustrated hero (see HeroMobile.jsx).
          Toggled purely by CSS below, so neither component's internal
          styles ever need a media query to accommodate the other. */}
      <div className="desktop-hero-wrap"><Carousel /></div>
      <div className="mobile-hero-wrap"><HeroMobile /></div>

      {/* Stats Strip */}
      <div className="stats-strip">
        <div className="container">
          <div className="stats-grid">
            {stats.map(s => (
              <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section className="products-section" ref={productsRef}>
        <div className="container">
          <div className="products-section-header reveal">
            <span className="section-label">Our Product Range</span>
            <h2 className="section-title">{settings?.homePageTitle || 'Solutions for Every Office Need'}</h2>
            <p style={{ color: 'var(--gray-mid)', fontSize: '16px', maxWidth: '560px', lineHeight: 1.7 }}>
              From document security to eco-friendly waste management — discover our complete range of professional office equipment.
            </p>
          </div>
          <div className="products-grid">
            {categories.map((cat, i) => (
              <Link to={cat.link} key={cat.link} className={`product-card reveal reveal-delay-${i + 1}`}>
                <div className="product-card-img">
                  <span className="product-card-badge">Explore</span>
                  <img src={cat.image} alt={cat.title} />
                </div>
                <div className="product-card-body">
                  <h3 className="product-card-title">{cat.title}</h3>
                  <p className="product-card-desc">{cat.desc}</p>
                  <span className="product-card-cta">View Products <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GeM Badge Strip */}
      <div className="gem-strip">
        <div className="container">
          <div className="gem-inner">
            <div className="gem-badge">
              <div className="gem-badge-dot" />
              <span className="gem-badge-text">Empanelled Supplier on GeM Portal</span>
            </div>
            <div className="gem-divider" />
            <span className="gem-note">Government e-Marketplace · Trusted by Central & State Government Departments</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="features-section" ref={featuresRef}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Built for Businesses That Demand the Best</h2>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={f.title} className={`feature-card reveal reveal-delay-${i + 1}`}>
                <div className="feature-icon"><f.icon size={24} /></div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="brands-section" ref={brandsRef}>
        <div className="container">
          <div className="brands-inner">
            <div className="brands-text reveal">
              <span className="section-label">Exclusive Distribution</span>
              <h2 className="section-title" style={{ color: 'var(--white)' }}>Two World-Class Brands, One Trusted Partner</h2>
              <p>T&T Office Solutions is the exclusive authorized distributor for Avanti and Antiva — bringing you the finest shredding and laminating technology available in India.</p>
              <Link to="/products" className="btn btn-ghost">Explore All Products <ArrowRight size={16} /></Link>
            </div>
            <div className="brand-cards reveal reveal-delay-2">
              <Link to="/select-brand/document-shredders" className="brand-card">
                <div className="brand-card-name">AVANTI</div>
                <div className="brand-card-sub">Premium Office Solutions</div>
              </Link>
              <Link to="/select-brand/document-shredders" className="brand-card">
                <div className="brand-card-name">ANTIVA</div>
                <div className="brand-card-sub">Industrial Grade</div>
              </Link>
              <div className="brand-card" style={{ gridColumn: 'span 2', background: 'rgba(255,255,255,0.06)' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Available On</div>
                <div className="brand-card-name" style={{ fontSize: '18px' }}>GeM Portal</div>
                <div className="brand-card-sub">Government e-Marketplace</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="clients-section" ref={clientsRef}>
        <div className="container">
          <div className="clients-label reveal">
            <span className="section-label">Our Prestigious Clientele</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Trusted Across India's Leading Sectors</h2>
          </div>
          <div className="clients-list">
            {clients.map((c, i) => (
              <div key={c} className={`client-pill reveal reveal-delay-${(i % 4) + 1}`}>
                <CheckCircle size={15} />
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner" ref={ctaRef}>
        <div className="container">
          <div className="cta-inner reveal">
            <div className="cta-text">
              <span className="section-label">Ready to Upgrade?</span>
              <h2 className="cta-title">Get Expert Advice on the Right Solution</h2>
              <p className="cta-sub">Our specialists help you find the perfect shredder or laminator for your needs.</p>
            </div>
            <div className="cta-actions">
              <Link to="/contactus" className="btn btn-ghost">Request a Quote <ArrowRight size={16} /></Link>
              <a href="tel:+919811757846" className="btn" style={{ background: 'var(--white)', color: 'var(--emerald)', borderColor: 'var(--white)' }}>Call Now</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;