import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import './Admin.css';

const DEFAULT_FOOTER_LINKS = [
    { label: 'Document Shredders', url: '/select-brand/document-shredders' },
    { label: 'Multipurpose Application Shredders', url: '/select-brand/multipurpose-shredders' },
    { label: 'Document Laminators & Binders', url: '/select-brand/laminators-binders' },
    { label: 'Waste Management & Recycling', url: '/select-brand/waste-management-recycling' },
    { label: 'Products on GeM', url: '/select-brand/products-on-gem' }
];

const EMPTY_SLIDE = { image: '', title: '', subtitle: '', ctaLabel: 'Explore', ctaLink: '/products' };

const AdminSettings = () => {
    const { settings, updateSettings } = useData();
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        companyName: '',
        logoUrl: '',
        address: '',
        facebookUrl: '',
        twitterUrl: '',
        instagramUrl: '',
        linkedinUrl: '',
        youtubeUrl: '',
        homePageTitle: '',
        brandSelectionTitle: '',
        aboutUsText: '',
        contactInfoText: '',
        footerText: ''
    });
    const [footerLinks, setFooterLinks] = useState(DEFAULT_FOOTER_LINKS);
    const [carouselSlides, setCarouselSlides] = useState([{ ...EMPTY_SLIDE }]);

    useEffect(() => {
        if (settings) {
            setFormData({
                phone: settings.phone || '',
                email: settings.email || '',
                companyName: settings.companyName || '',
                logoUrl: settings.logoUrl || '',
                address: settings.address || '',
                facebookUrl: settings.facebookUrl || '',
                twitterUrl: settings.twitterUrl || '',
                instagramUrl: settings.instagramUrl || '',
                linkedinUrl: settings.linkedinUrl || '',
                youtubeUrl: settings.youtubeUrl || '',
                homePageTitle: settings.homePageTitle || '',
                brandSelectionTitle: settings.brandSelectionTitle || '',
                aboutUsText: settings.aboutUsText || '',
                contactInfoText: settings.contactInfoText || '',
                footerText: settings.footerText || ''
            });
            if (settings.footerLinks && settings.footerLinks.length > 0) {
                setFooterLinks(settings.footerLinks);
            }
            if (settings.carouselImages && settings.carouselImages.length > 0) {
                // Backward-compat: older data may just be an array of URL strings
                // (from before slides had title/subtitle/CTA fields). Normalize
                // those into the new object shape so the form doesn't break.
                const normalized = settings.carouselImages.map((slide) =>
                    typeof slide === 'string'
                        ? { ...EMPTY_SLIDE, image: slide }
                        : { ...EMPTY_SLIDE, ...slide }
                );
                setCarouselSlides(normalized);
            }
        }
    }, [settings]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFooterLinkChange = (index, field, value) => {
        setFooterLinks(prev => prev.map((link, i) => i === index ? { ...link, [field]: value } : link));
    };

    const addFooterLink = () => {
        setFooterLinks(prev => [...prev, { label: '', url: '' }]);
    };

    const removeFooterLink = (index) => {
        setFooterLinks(prev => prev.filter((_, i) => i !== index));
    };

    const handleSlideChange = (index, field, value) => {
        setCarouselSlides(prev => prev.map((slide, i) => i === index ? { ...slide, [field]: value } : slide));
    };

    const addSlide = () => {
        setCarouselSlides(prev => [...prev, { ...EMPTY_SLIDE }]);
    };

    const removeSlide = (index) => {
        setCarouselSlides(prev => prev.filter((_, i) => i !== index));
    };

    const moveSlide = (index, direction) => {
        setCarouselSlides(prev => {
            const next = [...prev];
            const target = index + direction;
            if (target < 0 || target >= next.length) return prev;
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSave = {
                ...formData,
                carouselImages: carouselSlides.filter(s => s.image.trim()),
                footerLinks: footerLinks.filter(l => l.label.trim())
            };
            await updateSettings(dataToSave);
            alert('Settings updated successfully!');
        } catch (err) {
            alert('Failed to update settings: ' + err.message);
        }
    };

    return (
        <div className="admin-dashboard container">
            <div className="dashboard-header">
                <h2>Site Settings</h2>
                <Link to="/admin/dashboard" className="cancel-btn" style={{ background: '#666' }}>Back</Link>
            </div>

            <div className="edit-form-container">
                <form onSubmit={handleSubmit}>

                    {/* ── Basic Information ── */}
                    <h3>Basic Information</h3>
                    <div className="form-group">
                        <label>Company Name</label>
                        <input name="companyName" value={formData.companyName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>📞 Phone Number</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 9811757846" />
                    </div>
                    <div className="form-group">
                        <label>✉️ Email Address</label>
                        <input name="email" value={formData.email} onChange={handleChange} placeholder="ttofficesolutions786@gmail.com" />
                    </div>
                    <div className="form-group">
                        <label>🏢 Registered Office Address</label>
                        <textarea
                            name="address"
                            rows="4"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder={`1-10-72/5/1/A, Cheekoti Gardens,\nBegumpet, Hyderabad - 500 016,\nTelangana, India.`}
                        />
                        <p style={{ fontSize: '0.8em', color: '#666' }}>Each line break will appear as a new line in the footer.</p>
                    </div>

                    {/* ── Branding ── */}
                    <h3>Branding</h3>
                    <div className="form-group">
                        <label>Logo URL</label>
                        <ImageUpload
                            label="Upload Logo"
                            onUpload={(url) => setFormData(prev => ({ ...prev, logoUrl: url }))}
                            existingImage={formData.logoUrl}
                        />
                        <input
                            name="logoUrl"
                            value={formData.logoUrl}
                            onChange={handleChange}
                            placeholder="Or enter URL manually"
                            style={{ marginTop: '10px' }}
                        />
                        {formData.logoUrl && (
                            <div style={{ marginTop: '10px', padding: '10px', background: '#eee' }}>
                                <img src={formData.logoUrl} alt="Logo Preview" style={{ maxHeight: '50px' }} />
                            </div>
                        )}
                    </div>

                    {/* ── Social Media ── */}
                    <h3>Social Media Links</h3>
                    <p style={{ color: '#666', fontSize: '0.85em', marginBottom: '15px' }}>These links appear as icons in the website header.</p>
                    <div className="form-group">
                        <label>📘 Facebook URL</label>
                        <input name="facebookUrl" value={formData.facebookUrl} onChange={handleChange} placeholder="https://facebook.com/yourpage" />
                    </div>
                    <div className="form-group">
                        <label>🐦 Twitter / X URL</label>
                        <input name="twitterUrl" value={formData.twitterUrl} onChange={handleChange} placeholder="https://twitter.com/yourhandle" />
                    </div>
                    <div className="form-group">
                        <label>📸 Instagram URL</label>
                        <input name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} placeholder="https://instagram.com/yourprofile" />
                    </div>
                    <div className="form-group">
                        <label>💼 LinkedIn URL</label>
                        <input name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} placeholder="https://linkedin.com/company/yourcompany" />
                    </div>
                    <div className="form-group">
                        <label>▶️ YouTube URL</label>
                        <input name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} placeholder="https://youtube.com/@yourchannel" />
                    </div>

                    {/* ── Footer Settings ── */}
                    <h3>Footer Settings</h3>

                    <div className="form-group">
                        <label>📋 Footer — Products Links</label>
                        <p style={{ fontSize: '0.85em', color: '#666', marginBottom: '10px' }}>
                            These are the product links shown in the footer's "Products" column.
                        </p>
                        {footerLinks.map((link, index) => (
                            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                                <input
                                    value={link.label}
                                    onChange={(e) => handleFooterLinkChange(index, 'label', e.target.value)}
                                    placeholder="Link Label (e.g. Document Shredders)"
                                    style={{ flex: 1 }}
                                />
                                <input
                                    value={link.url}
                                    onChange={(e) => handleFooterLinkChange(index, 'url', e.target.value)}
                                    placeholder="URL (e.g. /select-brand/document-shredders)"
                                    style={{ flex: 1 }}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeFooterLink(index)}
                                    style={{ background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                                >
                                    ✕ Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addFooterLink}
                            style={{ background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer', marginTop: '5px' }}
                        >
                            + Add Link
                        </button>
                    </div>

                    <div className="form-group">
                        <label>© Footer Copyright Text</label>
                        <input
                            name="footerText"
                            value={formData.footerText}
                            onChange={handleChange}
                            placeholder="© 2024 T&T Office Solutions. All rights reserved."
                        />
                    </div>

                    {/* ── Home Page Slider ── */}
                    <h3>Home Page Slider (Carousel)</h3>
                    <p style={{ fontSize: '0.85em', color: '#666', marginBottom: '15px' }}>
                        Each slide needs an image plus a headline — slides with no headline show up as a bare photo with no text on the site, so fill in at least the headline for every slide you add. Leave all slides empty to fall back to the default banner images.
                    </p>

                    {carouselSlides.map((slide, index) => (
                        <div
                            key={index}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                padding: '16px',
                                marginBottom: '16px',
                                background: '#fafafa'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <strong>Slide {index + 1}</strong>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        type="button"
                                        onClick={() => moveSlide(index, -1)}
                                        disabled={index === 0}
                                        style={{ background: '#eee', border: 'none', borderRadius: '4px', padding: '6px 10px', cursor: index === 0 ? 'not-allowed' : 'pointer' }}
                                    >
                                        ↑
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveSlide(index, 1)}
                                        disabled={index === carouselSlides.length - 1}
                                        style={{ background: '#eee', border: 'none', borderRadius: '4px', padding: '6px 10px', cursor: index === carouselSlides.length - 1 ? 'not-allowed' : 'pointer' }}
                                    >
                                        ↓
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => removeSlide(index)}
                                        style={{ background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer' }}
                                    >
                                        ✕ Remove Slide
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Slide Image</label>
                                <ImageUpload
                                    label="Upload Slide Image"
                                    onUpload={(url) => handleSlideChange(index, 'image', url)}
                                    existingImage={slide.image}
                                />
                                <input
                                    value={slide.image}
                                    onChange={(e) => handleSlideChange(index, 'image', e.target.value)}
                                    placeholder="Or enter image URL manually"
                                    style={{ marginTop: '10px' }}
                                />
                            </div>

                            <div className="form-group">
                                <label>Headline</label>
                                <input
                                    value={slide.title}
                                    onChange={(e) => handleSlideChange(index, 'title', e.target.value)}
                                    placeholder="e.g. Heavy-Duty Efficiency"
                                />
                            </div>

                            <div className="form-group">
                                <label>Subtitle</label>
                                <input
                                    value={slide.subtitle}
                                    onChange={(e) => handleSlideChange(index, 'subtitle', e.target.value)}
                                    placeholder="e.g. Engineered for continuous operation and maximum durability"
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Button Text</label>
                                    <input
                                        value={slide.ctaLabel}
                                        onChange={(e) => handleSlideChange(index, 'ctaLabel', e.target.value)}
                                        placeholder="View Range"
                                    />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Button Link</label>
                                    <input
                                        value={slide.ctaLink}
                                        onChange={(e) => handleSlideChange(index, 'ctaLink', e.target.value)}
                                        placeholder="/products"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addSlide}
                        style={{ background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer', marginTop: '5px', marginBottom: '20px' }}
                    >
                        + Add Slide
                    </button>

                    {/* ── Content Management ── */}
                    <h3>Content Management</h3>
                    <div className="form-group">
                        <label>Home Page Title (Best Sellers Section)</label>
                        <input name="homePageTitle" value={formData.homePageTitle} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Brand Selection Title</label>
                        <input name="brandSelectionTitle" value={formData.brandSelectionTitle} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>About Us Text</label>
                        <textarea name="aboutUsText" rows="4" value={formData.aboutUsText} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Contact Info Text (Intro text)</label>
                        <textarea name="contactInfoText" rows="3" value={formData.contactInfoText} onChange={handleChange} />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="save-btn">Save Settings</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSettings;