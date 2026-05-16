import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import './Blog.css';

const Blog = () => {
    const { blogs } = useData();

    return (
        <div className="blog-page container">
            <div className="blog-header">
                <h1>Our Blog</h1>
                <p>Latest news, tips, and insights about document security.</p>
            </div>

            <div className="blog-grid">
                {blogs.map(blog => (
                    <div key={blog.id} className="blog-card">
                        <div className="blog-image">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                onError={(e) => { e.target.src = '/src/assets/logo.png'; e.target.style.objectFit = 'contain'; }}
                            />
                        </div>
                        <div className="blog-content">
                            <span className="blog-date">{blog.date}</span>
                            <h3>{blog.title}</h3>
                            <p>{blog.content.substring(0, 100)}...</p>
                            <Link to={`/blog/${blog.id}`} className="read-more-btn">Read More</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
