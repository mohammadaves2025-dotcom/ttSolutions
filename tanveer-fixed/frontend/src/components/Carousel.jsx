import React, { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import slider1 from '../assets/avanti-slider1.png';
import slider2 from '../assets/avanti-slider2.png';
import slider3 from '../assets/avanti-slider3.png';
import slider4 from '../assets/avanti-slider4.png';
import slider5 from '../assets/avanti-slider5.png';
import slider6 from '../assets/avanti-slider6.png';

const slides = [
  { id: 1, image: slider1, title: 'Ultimate Data Security', subtitle: 'Protect sensitive information with our high-performance document shredders', cta: 'Explore Shredders', link: '/select-brand/document-shredders' },
  { id: 2, image: slider2, title: 'Heavy-Duty Efficiency', subtitle: 'Engineered for continuous operation and maximum durability in demanding environments', cta: 'View Range', link: '/products' },
  { id: 3, image: slider3, title: 'Smart Office Automation', subtitle: 'Streamline your document workflow with our advanced office solutions', cta: 'Discover Products', link: '/products' },
  { id: 4, image: slider4, title: 'Precision Laminating', subtitle: 'Preserve and protect important documents with professional-grade lamination', cta: 'View Laminators', link: '/select-brand/laminators-binders' },
  { id: 5, image: slider5, title: 'Secure & Sustainable', subtitle: 'Eco-friendly shredding technology for the modern responsible office', cta: 'Learn More', link: '/select-brand/waste-management-recycling' },
  { id: 6, image: slider6, title: 'Trusted by Professionals', subtitle: 'The preferred choice for government, corporate, and industrial document security', cta: 'About Us', link: '/aboutus' },
];

const Carousel = () => {
  const { settings } = useData();
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();

  const displaySlides = (settings?.carouselImages && settings.carouselImages.length > 0)
    ? settings.carouselImages.map((url, i) => ({ id: i, image: url, title: '', subtitle: '', cta: 'Explore', link: '/products' }))
    : slides;

  const goTo = useCallback((index) => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrent(index);
    setTimeout(() => setTransitioning(false), 700);
  }, [transitioning]);

  const next = useCallback(() => goTo(current === displaySlides.length - 1 ? 0 : current + 1), [current, displaySlides.length, goTo]);
  const prev = useCallback(() => goTo(current === 0 ? displaySlides.length - 1 : current - 1), [current, displaySlides.length, goTo]);

  useEffect(() => {
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next]);

  const slide = displaySlides[current];

  return (
    <>
      <style>{`
        .premium-carousel {
          position: relative; width: 100%; overflow: hidden;
          aspect-ratio: 16/6.5; min-height: 380px; max-height: 680px;
          background: var(--ink);
        }
        .carousel-slide {
          position: absolute; inset: 0;
          opacity: 0; transition: opacity 0.7s ease;
        }
        .carousel-slide.active { opacity: 1; }
        .carousel-bg {
          position: absolute; inset: 0;
        }
        .carousel-bg img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 8s ease;
        }
        .carousel-slide.active .carousel-bg img { transform: scale(1.05); }
        .carousel-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(6,90,50,0.82) 0%, rgba(10,122,69,0.5) 55%, rgba(0,0,0,0.15) 100%);
        }
        .carousel-content {
          position: absolute; inset: 0;
          display: flex; align-items: center;
          padding: 0;
        }
        .carousel-content-inner {
          padding: 0 64px; max-width: 700px;
          animation: slideIn 0.8s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes slideIn { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        .carousel-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.25em;
          text-transform: uppercase; color: rgba(255,255,255,0.6);
          margin-bottom: 16px; display: flex; align-items: center; gap: 10px;
        }
        .carousel-label::before { content: ''; display: block; width: 24px; height: 2px; background: var(--emerald-bright); }
        .carousel-title {
          font-family: var(--font-display) !important;
          font-size: clamp(28px, 4.5vw, 60px); font-weight: 700;
          color: var(--white); line-height: 1.1; margin-bottom: 18px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }
        .carousel-subtitle {
          font-size: clamp(13px, 1.5vw, 17px); color: rgba(255,255,255,0.8);
          line-height: 1.6; margin-bottom: 36px; max-width: 500px;
        }
        .carousel-actions { display: flex; gap: 14px; flex-wrap: wrap; }

        /* Controls */
        .carousel-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 10; width: 48px; height: 48px; border-radius: 50%;
          background: rgba(255,255,255,0.12); border: 1.5px solid rgba(255,255,255,0.3);
          color: white; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.25s; backdrop-filter: blur(8px);
        }
        .carousel-arrow:hover { background: var(--emerald); border-color: var(--emerald); }
        .carousel-arrow.left { left: 24px; }
        .carousel-arrow.right { right: 24px; }

        /* Dots */
        .carousel-dots {
          position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 8px; z-index: 10;
        }
        .carousel-dot {
          height: 4px; border-radius: 2px; cursor: pointer;
          transition: all 0.35s ease; background: rgba(255,255,255,0.35);
        }
        .carousel-dot.active { background: var(--white); width: 28px; }
        .carousel-dot:not(.active) { width: 14px; }
        .carousel-dot:hover { background: rgba(255,255,255,0.7); }

        /* Progress */
        .carousel-progress {
          position: absolute; bottom: 0; left: 0;
          height: 3px; background: var(--emerald);
          animation: progress 5.5s linear infinite;
        }
        @keyframes progress { from{width:0%} to{width:100%} }

        @media (max-width: 768px) {
          .premium-carousel { aspect-ratio: 16/9; min-height: 280px; }
          .carousel-content-inner { padding: 0 24px; }
          .carousel-title { font-size: clamp(22px, 6vw, 36px); }
          .carousel-arrow { width: 36px; height: 36px; }
          .carousel-arrow.left { left: 12px; }
          .carousel-arrow.right { right: 12px; }
        }
      `}</style>

      <div className="premium-carousel">
        {displaySlides.map((s, i) => (
          <div key={s.id} className={`carousel-slide${i === current ? ' active' : ''}`}>
            <div className="carousel-bg">
              <img src={s.image} alt={s.title || 'Slide'} />
            </div>
            <div className="carousel-overlay" />
            {i === current && (
              <div className="carousel-content">
                <div className="container" style={{ width: '100%' }}>
                  <div className="carousel-content-inner">
                    {s.title && <div className="carousel-label">T&T Office Solutions</div>}
                    {s.title && <h1 className="carousel-title">{s.title}</h1>}
                    {s.subtitle && <p className="carousel-subtitle">{s.subtitle}</p>}
                    {s.title && (
                      <div className="carousel-actions">
                        <button className="btn btn-ghost" onClick={() => navigate(s.link)}>
                          {s.cta} <ArrowRight size={16} />
                        </button>
                        <button className="btn" style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)' }} onClick={() => navigate('/contactus')}>
                          Get a Quote
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <button className="carousel-arrow left" onClick={prev}><ChevronLeft size={20} /></button>
        <button className="carousel-arrow right" onClick={next}><ChevronRight size={20} /></button>

        <div className="carousel-dots">
          {displaySlides.map((_, i) => (
            <div key={i} className={`carousel-dot${i === current ? ' active' : ''}`} onClick={() => goTo(i)} />
          ))}
        </div>

        <div className="carousel-progress" key={current} />
      </div>
    </>
  );
};

export default Carousel;
