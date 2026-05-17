import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to a container ref.
 * Any child with class "reveal" gets class "revealed" added when it enters
 * the viewport, triggering the fadeUp animation already defined in index.css.
 *
 * Usage:
 *   const ref = useScrollAnimation();
 *   <section ref={ref}>
 *     <div className="reveal">...</div>
 *     <div className="reveal reveal-delay-1">...</div>
 *   </section>
 */
const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options }
    );

    const targets = el.querySelectorAll('.reveal');
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  return ref;
};

export default useScrollAnimation;
