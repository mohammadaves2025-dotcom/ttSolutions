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
import './Carousel.css';

const slides = [
  { id: 1, image: slider1, title: 'Ultimate Data Security', subtitle: 'Protect sensitive information with our high-performance document shredders', cta: 'Explore Shredders', link: '/select-brand/document-shredders' },
  { id: 2, image: slider2, title: 'Heavy-Duty Efficiency', subtitle: 'Engineered for continuous operation and maximum durability in demanding environments', cta: 'View Range', link: '/products' },
  { id: 3, image: slider3, title: 'Smart Office Automation', subtitle: 'Streamline your document workflow with our advanced office solutions', cta: 'Discover Products', link: '/products' },
  { id: 4, image: slider4, title: 'Precision Laminating', subtitle: 'Preserve and protect important documents with professional-grade lamination', cta: 'View Laminators', link: '/select-brand/laminators-binders' },
  { id: 5, image: slider5, title: 'Secure & Sustainable', subtitle: 'Eco-friendly shredding technology for the modern responsible office', cta: 'Learn More', link: '/select-brand/waste-management-recycling' },
  { id: 6, image: slider6, title: 'Trusted by Professionals', subtitle: 'The preferred choice for government, corporate, and industrial document security', cta: 'About Us', link: '/aboutus' },
];

// Admin-added slides come from settings.carouselImages, which is now an
// array of { image, title, subtitle, ctaLabel, ctaLink } objects. This also
// accepts the old plain-string format for backward compatibility with any
// data saved before the admin form was upgraded.
const normalizeAdminSlide = (slide, i) => {
  if (typeof slide === 'string') {
    return { id: i, image: slide, title: '', subtitle: '', cta: 'Explore', link: '/products' };
  }
  return {
    id: i,
    image: slide.image,
    title: slide.title || '',
    subtitle: slide.subtitle || '',
    cta: slide.ctaLabel || 'Explore',
    link: slide.ctaLink || '/products',
  };
};

const Carousel = () => {
  const { settings } = useData();
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();

  const displaySlides = (settings?.carouselImages && settings.carouselImages.length > 0)
    ? settings.carouselImages.map(normalizeAdminSlide)
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
                      <button
                        className="btn carousel-cta-secondary"
                        style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)' }}
                        onClick={() => navigate('/contactus')}
                      >
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
  );
};

export default Carousel;