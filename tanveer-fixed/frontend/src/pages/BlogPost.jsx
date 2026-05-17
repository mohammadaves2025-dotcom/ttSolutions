import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import './RichEditor.css';

const BlogPost = () => {
  const { id } = useParams();
  const { blogs } = useData();
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--ink)' }}>Post not found</h2>
        <Link to="/blog" className="btn btn-outline">Back to Blog</Link>
      </div>
    );
  }

  const isHTML = /<[a-z][\s\S]*>/i.test(blog.content || '');

  return (
    <div>
      <style>{`
        .post-hero {
          background: linear-gradient(135deg, var(--emerald-deep), var(--emerald));
          padding: 64px 0 80px; color: white;
        }
        .post-hero-inner { max-width: 800px; }
        .post-back { display: inline-flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.7); font-size: 14px; font-weight: 500; margin-bottom: 24px; transition: color 0.2s; }
        .post-back:hover { color: white; }
        .post-hero h1 { font-family: var(--font-display) !important; font-size: clamp(26px,4vw,44px); font-weight: 700; color: white; line-height: 1.2; margin-bottom: 20px; }
        .post-meta-strip { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .post-meta-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: rgba(255,255,255,0.7); }

        .post-body-wrap { background: var(--off-white); padding: 64px 0 96px; }
        .post-body-inner { max-width: 800px; margin: 0 auto; }

        .post-featured-img { border-radius: 16px; overflow: hidden; margin-bottom: 48px; box-shadow: var(--shadow-lg); }
        .post-featured-img img { width: 100%; max-height: 480px; object-fit: cover; display: block; }

        .post-content-card { background: var(--white); border-radius: 16px; padding: 56px; border: 1px solid var(--border); box-shadow: var(--shadow-card); }

        /* Rich text typography */
        .post-content-card .blog-rich-content { font-size: 17px; color: var(--ink-soft); line-height: 1.8; }
        .post-content-card .blog-rich-content h1,
        .post-content-card .blog-rich-content h2,
        .post-content-card .blog-rich-content h3 { font-family: var(--font-display) !important; color: var(--ink); margin: 1.8em 0 0.6em; line-height: 1.25; }
        .post-content-card .blog-rich-content h2 { font-size: 1.55em; }
        .post-content-card .blog-rich-content h3 { font-size: 1.25em; }
        .post-content-card .blog-rich-content p { margin-bottom: 1.2em; }
        .post-content-card .blog-rich-content ul,
        .post-content-card .blog-rich-content ol { padding-left: 1.5em; margin-bottom: 1.2em; }
        .post-content-card .blog-rich-content li { margin-bottom: 0.4em; }
        .post-content-card .blog-rich-content a { color: var(--emerald); text-decoration: underline; }
        .post-content-card .blog-rich-content blockquote { border-left: 4px solid var(--emerald); padding: 12px 24px; margin: 1.5em 0; background: var(--emerald-xlight); border-radius: 0 8px 8px 0; font-style: italic; color: var(--ink); }
        .post-content-card .blog-rich-content img { max-width: 100%; border-radius: 10px; margin: 1.5em 0; }
        .post-content-card .blog-rich-content code { background: var(--off-white); padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }

        .post-back-footer { margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border); }

        @media (max-width: 640px) {
          .post-content-card { padding: 32px 24px; }
        }
      `}</style>

      {/* Hero */}
      <div className="post-hero">
        <div className="container">
          <div className="post-hero-inner">
            <Link to="/blog" className="post-back"><ArrowLeft size={16} /> Back to Blog</Link>
            <h1>{blog.title}</h1>
            <div className="post-meta-strip">
              {blog.date && <span className="post-meta-item"><Calendar size={14} />{blog.date}</span>}
              {blog.author && <span className="post-meta-item"><User size={14} />{blog.author}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="post-body-wrap">
        <div className="container">
          <div className="post-body-inner">
            {blog.image && (
              <div className="post-featured-img">
                <img
                  src={blog.image}
                  alt={blog.title}
                  onError={(e) => { e.target.src = '/logo.png'; e.target.style.objectFit = 'contain'; e.target.style.padding = '40px'; }}
                />
              </div>
            )}
            <div className="post-content-card">
              {isHTML ? (
                <div className="blog-rich-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
              ) : (
                <div style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--ink-soft)', whiteSpace: 'pre-line' }}>
                  {blog.content}
                </div>
              )}
              <div className="post-back-footer">
                <Link to="/blog" className="btn btn-outline"><ArrowLeft size={16} /> Back to Blog</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
