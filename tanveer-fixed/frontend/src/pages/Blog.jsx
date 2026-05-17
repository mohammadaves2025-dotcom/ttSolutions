import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { ArrowRight, Calendar, User } from 'lucide-react';

const Blog = () => {
  const { blogs } = useData();
  const gridRef = useScrollAnimation();

  return (
    <div>
      <style>{`
        .blog-hero {
          background: linear-gradient(135deg, var(--emerald-deep), var(--emerald));
          padding: 80px 0; text-align: center; color: white;
        }
        .blog-hero h1 { font-family: var(--font-display) !important; font-size: clamp(32px,5vw,52px); font-weight: 700; margin-bottom: 14px; }
        .blog-hero p { font-size: 17px; color: rgba(255,255,255,0.75); max-width: 480px; margin: 0 auto; }

        .blog-section { padding: 96px 0; background: var(--off-white); }
        .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }

        .blog-card {
          background: var(--white); border-radius: 16px; overflow: hidden;
          border: 1px solid var(--border); box-shadow: 0 2px 12px rgba(13,27,18,0.06);
          display: flex; flex-direction: column;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .blog-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(10,122,69,0.13); border-color: var(--emerald); }

        .blog-card-img { aspect-ratio: 16/9; overflow: hidden; background: var(--emerald-xlight); }
        .blog-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .blog-card:hover .blog-card-img img { transform: scale(1.05); }

        .blog-card-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
        .blog-card-meta { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
        .blog-meta-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--gray-mid); }
        .blog-card-title { font-family: var(--font-display) !important; font-size: 18px; font-weight: 700; color: var(--ink); line-height: 1.35; margin-bottom: 10px; }
        .blog-card-excerpt { font-size: 14px; color: var(--gray-mid); line-height: 1.6; flex: 1; margin-bottom: 20px; }
        .blog-card-cta { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--emerald); transition: gap 0.2s; margin-top: auto; }
        .blog-card:hover .blog-card-cta { gap: 10px; }

        .blog-empty { text-align: center; padding: 80px 0; color: var(--gray-mid); }
        .blog-empty h3 { font-family: var(--font-display) !important; font-size: 24px; color: var(--ink); margin-bottom: 12px; }

        @media (max-width: 900px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px)  { .blog-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* Hero */}
      <div className="blog-hero">
        <div className="container">
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Knowledge Hub</span>
          <h1>Our Blog</h1>
          <p>Latest insights on document security, office productivity, and equipment best practices.</p>
        </div>
      </div>

      {/* Grid */}
      <section className="blog-section" ref={gridRef}>
        <div className="container">
          {blogs.length === 0 ? (
            <div className="blog-empty">
              <h3>No posts yet</h3>
              <p>Check back soon — we're working on some great content.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {blogs.map((blog, i) => (
                <Link to={`/blog/${blog.id}`} key={blog.id} className={`blog-card reveal reveal-delay-${(i % 3) + 1}`} style={{ textDecoration: 'none' }}>
                  <div className="blog-card-img">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      onError={(e) => { e.target.src = '/logo.png'; e.target.style.objectFit = 'contain'; e.target.style.padding = '24px'; }}
                    />
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-meta-item"><Calendar size={12} />{blog.date}</span>
                      {blog.author && <span className="blog-meta-item"><User size={12} />{blog.author}</span>}
                    </div>
                    <h3 className="blog-card-title">{blog.title}</h3>
                    <p className="blog-card-excerpt">
                      {blog.content?.replace(/<[^>]+>/g, '').substring(0, 120)}…
                    </p>
                    <span className="blog-card-cta">Read Article <ArrowRight size={14} /></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
