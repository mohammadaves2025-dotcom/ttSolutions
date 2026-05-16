import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import './Blog.css';
import './RichEditor.css';

const BlogPost = () => {
    const { id } = useParams();
    const { blogs } = useData();
    const blog = blogs.find(b => b.id === id);

    if (!blog) {
        return (
            <div className="container" style={{ padding: '60px' }}>
                <h2>Blog post not found</h2>
                <Link to="/blog">Back to Blog</Link>
            </div>
        );
    }

    // Detect if content is HTML (rich text) or plain text
    const isHTML = /<[a-z][\s\S]*>/i.test(blog.content || '');

    return (
        <div className="blog-post-page container">
            <div className="blog-post-content">
                <Link to="/blog" className="back-link">&larr; Back to Blog</Link>

                <header className="post-header">
                    <h1>{blog.title}</h1>
                    <div className="post-meta">
                        <span>By {blog.author}</span>
                        <span>{blog.date}</span>
                    </div>
                </header>

                {blog.image && (
                    <div className="post-image-large">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            onError={(e) => {
                                e.target.src = '/src/assets/logo.png';
                                e.target.style.objectFit = 'contain';
                            }}
                        />
                    </div>
                )}

                <div className="post-body">
                    {isHTML ? (
                        /* Render rich HTML content with highlighted links/headings */
                        <div
                            className="blog-rich-content"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    ) : (
                        /* Fallback: render plain text */
                        <div style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                            {blog.content}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
