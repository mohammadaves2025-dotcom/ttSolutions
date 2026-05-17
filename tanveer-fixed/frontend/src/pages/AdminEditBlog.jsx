import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import ImageUpload from '../components/ImageUpload';
import './Admin.css';
import './RichEditor.css';

const FONTS = [
    'Arial', 'Georgia', 'Times New Roman', 'Courier New',
    'Verdana', 'Trebuchet MS', 'Impact', 'Comic Sans MS', 'Tahoma', 'Palatino'
];
const FONT_SIZES = [
    '10px','12px','14px','16px','18px','20px','22px',
    '24px','28px','32px','36px','40px','48px','56px','64px','72px'
];

function wrapSelectionWithSpan(styleKey, styleValue) {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (range.collapsed) return;

    const span = document.createElement('span');
    span.style[styleKey] = styleValue;

    try {
        const fragment = range.extractContents();
        span.appendChild(fragment);
        range.insertNode(span);
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        sel.removeAllRanges();
        sel.addRange(newRange);
    } catch (e) {
        console.warn('wrapSelectionWithSpan error:', e);
    }
}

const RichEditor = ({ value, onChange, blogId }) => {
    const editorRef = useRef(null);
    const savedRangeRef = useRef(null);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');
    const [activeFontSize, setActiveFontSize] = useState('16px');
    const [activeFont, setActiveFont] = useState('Arial');

    // FIX: Track which blog ID we last initialized for
    const isInitialized = useRef(false);
    const prevBlogIdRef = useRef(null);

    useEffect(() => {
        if (!editorRef.current) return;
        // Re-initialize when blog changes or on first load with content
        if ((!isInitialized.current || prevBlogIdRef.current !== blogId) && value) {
            editorRef.current.innerHTML = value;
            isInitialized.current = true;
            prevBlogIdRef.current = blogId;
        }
    }, [value, blogId]);

    const saveSelection = useCallback(() => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            if (editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
                savedRangeRef.current = range.cloneRange();
            }
        }
    }, []);

    const restoreSelection = useCallback(() => {
        if (!savedRangeRef.current) return false;
        editorRef.current.focus();
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedRangeRef.current);
        return true;
    }, []);

    const emitChange = useCallback(() => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    }, [onChange]);

    const exec = useCallback((cmd, val = null) => {
        restoreSelection();
        document.execCommand(cmd, false, val);
        emitChange();
        saveSelection();
    }, [restoreSelection, emitChange, saveSelection]);

    const applyFont = useCallback((font) => {
        if (!font) return;
        restoreSelection();
        wrapSelectionWithSpan('fontFamily', font);
        emitChange();
        editorRef.current.focus();
    }, [restoreSelection, emitChange]);

    const applyFontSize = useCallback((size) => {
        if (!size) return;
        restoreSelection();
        wrapSelectionWithSpan('fontSize', size);
        emitChange();
        editorRef.current.focus();
        setActiveFontSize(size);
    }, [restoreSelection, emitChange]);

    const applyHeading = useCallback((tag) => {
        restoreSelection();
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;
        const range = sel.getRangeAt(0);

        const heading = document.createElement(tag);
        try {
            const fragment = range.extractContents();
            heading.appendChild(fragment);
            range.insertNode(heading);
            const newRange = document.createRange();
            newRange.setStartAfter(heading);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
        } catch (e) {
            console.warn('applyHeading error:', e);
        }
        emitChange();
    }, [restoreSelection, emitChange]);

    const insertHR = useCallback(() => {
        restoreSelection();
        document.execCommand('insertHorizontalRule', false, null);
        emitChange();
    }, [restoreSelection, emitChange]);

    const openLinkModal = useCallback(() => {
        saveSelection();
        const sel = window.getSelection();
        if (sel) setLinkText(sel.toString());
        setLinkUrl('');
        setShowLinkModal(true);
    }, [saveSelection]);

    const insertLink = useCallback(() => {
        if (!linkUrl) return;
        restoreSelection();
        const href = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
        const anchor = document.createElement('a');
        anchor.href = href;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.textContent = linkText || href;
        anchor.style.cssText = 'color:#1a56db;text-decoration:underline;font-weight:500;background:rgba(26,86,219,0.08);padding:0 3px;border-radius:3px;';

        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(anchor);
            const newRange = document.createRange();
            newRange.setStartAfter(anchor);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
        }
        emitChange();
        setShowLinkModal(false);
    }, [linkUrl, linkText, restoreSelection, emitChange]);

    const applyColor = useCallback((color, isBg) => {
        restoreSelection();
        if (isBg) {
            wrapSelectionWithSpan('backgroundColor', color);
        } else {
            wrapSelectionWithSpan('color', color);
        }
        emitChange();
        editorRef.current.focus();
    }, [restoreSelection, emitChange]);

    return (
        <div className="rich-editor-wrapper">
            <div className="rich-toolbar">
                <div className="toolbar-group">
                    <button type="button" className="tb-btn heading-btn" title="Heading 1" onMouseDown={e => { e.preventDefault(); applyHeading('h1'); }}>H1</button>
                    <button type="button" className="tb-btn heading-btn" title="Heading 2" onMouseDown={e => { e.preventDefault(); applyHeading('h2'); }}>H2</button>
                    <button type="button" className="tb-btn heading-btn" title="Heading 3" onMouseDown={e => { e.preventDefault(); applyHeading('h3'); }}>H3</button>
                </div>
                <div className="toolbar-divider" />
                <select className="tb-select" value={activeFont} onChange={e => { setActiveFont(e.target.value); applyFont(e.target.value); }} onMouseDown={saveSelection} title="Font Family">
                    {FONTS.map(f => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
                </select>
                <select className="tb-select tb-select-size" value={activeFontSize} onChange={e => applyFontSize(e.target.value)} onMouseDown={saveSelection} title="Font Size">
                    {FONT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <div className="toolbar-divider" />
                <div className="toolbar-group">
                    <button type="button" className="tb-btn tb-bold" title="Bold" onMouseDown={e => { e.preventDefault(); exec('bold'); }}><b>B</b></button>
                    <button type="button" className="tb-btn tb-italic" title="Italic" onMouseDown={e => { e.preventDefault(); exec('italic'); }}><i>I</i></button>
                    <button type="button" className="tb-btn tb-underline" title="Underline" onMouseDown={e => { e.preventDefault(); exec('underline'); }}><u>U</u></button>
                    <button type="button" className="tb-btn tb-strike" title="Strikethrough" onMouseDown={e => { e.preventDefault(); exec('strikeThrough'); }}><s>S</s></button>
                </div>
                <div className="toolbar-divider" />
                <div className="toolbar-group">
                    <label className="tb-color-label" title="Text Color">
                        <span className="color-icon">A</span>
                        <input type="color" defaultValue="#000000" onMouseDown={saveSelection} onChange={e => applyColor(e.target.value, false)} />
                    </label>
                    <label className="tb-color-label" title="Highlight Color">
                        <span className="color-icon color-highlight">H</span>
                        <input type="color" defaultValue="#ffff00" onMouseDown={saveSelection} onChange={e => applyColor(e.target.value, true)} />
                    </label>
                </div>
                <div className="toolbar-divider" />
                <div className="toolbar-group">
                    <button type="button" className="tb-btn" title="Bullet List" onMouseDown={e => { e.preventDefault(); exec('insertUnorderedList'); }}>• List</button>
                    <button type="button" className="tb-btn" title="Numbered List" onMouseDown={e => { e.preventDefault(); exec('insertOrderedList'); }}>1. List</button>
                </div>
                <div className="toolbar-divider" />
                <div className="toolbar-group">
                    <button type="button" className="tb-btn" title="Align Left" onMouseDown={e => { e.preventDefault(); exec('justifyLeft'); }}>⬅</button>
                    <button type="button" className="tb-btn" title="Align Center" onMouseDown={e => { e.preventDefault(); exec('justifyCenter'); }}>↔</button>
                    <button type="button" className="tb-btn" title="Align Right" onMouseDown={e => { e.preventDefault(); exec('justifyRight'); }}>➡</button>
                    <button type="button" className="tb-btn" title="Justify" onMouseDown={e => { e.preventDefault(); exec('justifyFull'); }}>≡</button>
                </div>
                <div className="toolbar-divider" />
                <div className="toolbar-group">
                    <button type="button" className="tb-btn link-btn" title="Insert Hyperlink" onMouseDown={e => { e.preventDefault(); openLinkModal(); }}>🔗 Link</button>
                    <button type="button" className="tb-btn" title="Insert Horizontal Line" onMouseDown={e => { e.preventDefault(); insertHR(); }}>── HR</button>
                </div>
                <div className="toolbar-divider" />
                <div className="toolbar-group">
                    <button type="button" className="tb-btn" title="Undo" onMouseDown={e => { e.preventDefault(); exec('undo'); }}>↩ Undo</button>
                    <button type="button" className="tb-btn" title="Redo" onMouseDown={e => { e.preventDefault(); exec('redo'); }}>↪ Redo</button>
                </div>
            </div>

            <div
                ref={editorRef}
                className="rich-editor-area"
                contentEditable
                suppressContentEditableWarning
                onInput={emitChange}
                onKeyUp={saveSelection}
                onMouseUp={saveSelection}
                onSelect={saveSelection}
                data-placeholder="Write your blog content here... Select text and use the toolbar to format it!"
            />

            {showLinkModal && (
                <div className="link-modal-overlay" onClick={() => setShowLinkModal(false)}>
                    <div className="link-modal" onClick={e => e.stopPropagation()}>
                        <h4>🔗 Insert Hyperlink</h4>
                        <div className="lm-field">
                            <label>Display Text</label>
                            <input value={linkText} onChange={e => setLinkText(e.target.value)} placeholder="Click here to visit" autoFocus />
                        </div>
                        <div className="lm-field">
                            <label>URL</label>
                            <input value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://example.com" onKeyDown={e => e.key === 'Enter' && insertLink()} />
                        </div>
                        <div className="lm-actions">
                            <button type="button" onClick={insertLink} className="lm-insert-btn">✅ Insert Link</button>
                            <button type="button" onClick={() => setShowLinkModal(false)} className="lm-cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminEditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { blogs, addBlog, updateBlog } = useData();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
        author: 'Admin',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (isEditMode) {
            const blogToEdit = blogs.find(b => b.id === id);
            if (blogToEdit) {
                setFormData(blogToEdit);
            } else if (blogs.length > 0) {
                // Only alert if blogs have loaded but this one wasn't found
                alert('Blog post not found!');
                navigate('/admin/blog');
            }
        }
    }, [id, blogs, isEditMode, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            const { _id, createdAt, updatedAt, __v, ...updateData } = formData;
            updateBlog(id, { ...updateData, id });
        } else {
            const newId = Date.now().toString();
            addBlog({ ...formData, id: newId });
        }
        navigate('/admin/blog');
    };

    return (
        <div className="admin-container container">
            <div className="admin-header">
                <h2>{isEditMode ? '✏️ Edit Blog Post' : '✍️ Create New Blog Post'}</h2>
                <button onClick={() => navigate('/admin/blog')} className="back-btn">Cancel</button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter blog title..."
                    />
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label>Author</label>
                        <input type="text" name="author" value={formData.author} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-group">
                    <label>Featured Image</label>
                    <ImageUpload
                        onUpload={(url) => setFormData(prev => ({ ...prev, image: url }))}
                        existingImage={formData.image}
                    />
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Or enter image URL manually"
                        style={{ marginTop: '10px' }}
                    />
                </div>

                <div className="form-group">
                    <label>
                        Content
                        <span style={{ color: '#888', fontWeight: 400, fontSize: '0.82em', marginLeft: '8px' }}>
                            — Select text first, then apply formatting from the toolbar
                        </span>
                    </label>
                    <RichEditor
                        value={formData.content}
                        onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                        blogId={id || 'new'}
                    />
                </div>

                <button type="submit" className="save-btn">
                    {isEditMode ? '💾 Update Post' : '🚀 Publish Post'}
                </button>
            </form>
        </div>
    );
};

export default AdminEditBlog;