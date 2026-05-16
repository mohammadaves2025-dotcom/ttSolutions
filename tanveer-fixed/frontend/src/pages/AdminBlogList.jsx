import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import './Admin.css'; // Reuse existing admin styles

const AdminBlogList = () => {
    const { blogs, deleteBlog } = useData();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            deleteBlog(id);
        }
    };

    return (
        <div className="admin-container container">
            <div className="admin-header">
                <h2>Manage Blogs</h2>
                <div className="header-actions">
                    <Link to="/admin/blog/new" className="add-btn">Create New Post</Link>
                    <Link to="/admin/dashboard" className="back-btn">Back to Dashboard</Link>
                </div>
            </div>

            <div className="admin-list">
                {blogs.length === 0 ? (
                    <p>No blog posts found.</p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Author</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map(blog => (
                                <tr key={blog.id}>
                                    <td>{blog.title}</td>
                                    <td>{blog.date}</td>
                                    <td>{blog.author}</td>
                                    <td className="actions-cell">
                                        <Link to={`/admin/blog/edit/${blog.id}`} className="edit-btn-small">Edit</Link>
                                        <button onClick={() => handleDelete(blog.id)} className="delete-btn-small">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminBlogList;
