import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Gauge, Cpu, Layers, Recycle, Award, ArrowRight } from 'lucide-react';

/*
  HeroMobile — the mobile-only hero for the homepage.

  Why this exists as a separate component instead of a media query on
  Carousel: the desktop hero leans on wide (1000x305) marketing photography
  that was shot for a horizontal banner with dead space on one side for
  text. Cropping/upscaling that same asset into a tall mobile hero either
  shows mostly empty background or stretches a low-resolution image ~2.5x,
  which is why it looked blurry and unpleasant no matter how the CSS
  wash/crop was tuned. Rather than keep fighting a source-asset problem
  with CSS, mobile gets its own icon-illustrated hero that needs no
  photography at all — so it can never look blurry or awkwardly cropped
  on any phone size.

  This file has zero shared class names with Carousel.css and is toggled
  purely by a CSS display rule in Home.jsx — Carousel's own file has no
  mobile media query anymore, so there is no code path by which this
  component can affect desktop rendering.
*/

const slides = [
  {
    icon: ShieldCheck,
    label: 'T&T Office Solutions',
    title: 'Ultimate Data Security',
    subtitle: 'Protect sensitive information with high-performance document shredders',
    cta: 'Explore Shredders',
    link: '/select-brand/document-shredders',
  },
  {
    icon: Gauge,
    label: 'T&T Office Solutions',
    title: 'Heavy-Duty Efficiency',
    subtitle: 'Engineered for continuous operation and maximum durability',
    cta: 'View Range',
    link: '/products',
  },
  {
    icon: Cpu,
    label: 'T&T Office Solutions',
    title: 'Smart Office Automation',
    subtitle: 'Streamline your document workflow with advanced office solutions',
    cta: 'Discover Products',
    link: '/products',
  },
  {
    icon: Layers,
    label: 'T&T Office Solutions',
    title: 'Precision Laminating',
    subtitle: 'Preserve and protect important documents with professional-grade lamination',
    cta: 'View Laminators',
    link: '/select-brand/laminators-binders',
  },
  {
    icon: Recycle,
    label: 'T&T Office Solutions',
    title: 'Secure & Sustainable',
    subtitle: 'Eco-friendly shredding technology for the modern responsible office',
    cta: 'Learn More',
    link: '/select-brand/waste-management-recycling',
  },
  {
    icon: Award,
    label: 'T&T Office Solutions',
    title: 'Trusted by Professionals',
    subtitle: 'The preferred choice for government, corporate, and industrial clients',
    cta: 'About Us',
    link: '/aboutus',
  },
];

const SLIDE_DURATION = 5500;

const HeroMobile = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const goTo = useCallback((i) => setCurrent((i + slides.length) % slides.length), []);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(t);
  }, [next, paused]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 40) goTo(current - 1);
    else if (delta < -40) goTo(current + 1);
    touchStartX.current = null;
    setPaused(false);
  };

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <section
      className="mh-hero"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Ambient background glows — pure CSS, never blurry/pixelated at any size */}
      <div className="mh-glow mh-glow-a" />
      <div className="mh-glow mh-glow-b" />
      <div className="mh-grain" />

      {/* Segmented slide progress */}
      <div className="mh-progress">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`mh-seg${i === current ? ' active' : i < current ? ' passed' : ''}`}
            onClick={() => { goTo(i); setPaused(true); setTimeout(() => setPaused(false), 300); }}
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === current && <span className="mh-seg-fill" key={current} />}
          </button>
        ))}
      </div>

      <div className="mh-content" key={current}>
        <div className="mh-icon-wrap">
          <span className="mh-icon-ring" />
          <span className="mh-icon-dot mh-icon-dot-1" />
          <span className="mh-icon-dot mh-icon-dot-2" />
          <span className="mh-icon-dot mh-icon-dot-3" />
          <div className="mh-icon-badge">
            <Icon size={40} strokeWidth={1.75} />
          </div>
        </div>

        <div className="mh-label"><span className="mh-label-dash" />{slide.label}</div>
        <h1 className="mh-title">{slide.title}</h1>
        <p className="mh-subtitle">{slide.subtitle}</p>

        <div className="mh-actions">
          <Link to={slide.link} className="mh-cta-primary">
            {slide.cta} <ArrowRight size={16} />
          </Link>
          <Link to="/contactus" className="mh-cta-secondary">Get a Quote</Link>
        </div>

        <p className="mh-trust">Trusted across Delhi NCR since 2010</p>
      </div>
    </section>
  );
};

export default HeroMobile;