import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import ImageUpload from '../components/ImageUpload';
import './Admin.css';

const AdminEditProduct = () => {
    const { modelId } = useParams();
    const { allModels, updateModel, addModel } = useData();
    const navigate = useNavigate();

    const isNew = !modelId;

    const [formData, setFormData] = useState({
        id: '',
        category: 'Document Shredders',
        subcategory: '',
        brand: 'Other',
        title: '',
        subtitle: '',
        description: '',
        image: '',
        videoLink: '',
        brochureLink: '',
        features: [],
        specifications: {}
    });

    useEffect(() => {
        const isAdmin = localStorage.getItem('authToken');
        if (!isAdmin) navigate('/admin');

        // Wait for allModels to load before doing anything
        if (!isNew && Object.keys(allModels).length === 0) return;

        if (!isNew && allModels[modelId]) {
            const m = allModels[modelId];
            setFormData({
                id: m.id,
                category: m.category || '',
                subcategory: m.subcategory || '',
                brand: m.brand || 'Other',
                title: m.title || '',
                subtitle: m.subtitle || '',
                description: m.description || '',
                image: m.image || '',
                videoLink: m.videoLink || '',
                brochureLink: m.brochureLink || '',
                // FIX: seed data uses keyFeatures, admin form uses features
                features: m.keyFeatures || m.features || [],
                // FIX: seed data uses specs, admin form uses specifications
                specifications: m.specs || m.specifications || {}
            });
        } else if (!isNew && Object.keys(allModels).length > 0) {
            alert('Product not found');
            navigate('/admin/dashboard');
        }
    }, [modelId, allModels, navigate, isNew]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const [specsArray, setSpecsArray] = useState([]);

    useEffect(() => {
        if (formData.specifications) {
            setSpecsArray(Object.entries(formData.specifications).map(([key, value]) => ({ key, value })));
        }
    }, [formData.specifications]);

    const handleSpecArrayChange = (index, field, value) => {
        const newSpecs = [...specsArray];
        newSpecs[index][field] = value;
        setSpecsArray(newSpecs);
    };

    const addSpec = () => {
        setSpecsArray([...specsArray, { key: '', value: '' }]);
    };

    const removeSpec = (index) => {
        setSpecsArray(specsArray.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const specsObj = specsArray.reduce((acc, item) => {
            if (item.key) acc[item.key] = item.value;
            return acc;
        }, {});

        const finalData = {
            ...formData,
            specifications: specsObj
        };

        try {
            if (isNew) {
                if (!finalData.id) finalData.id = finalData.title.toLowerCase().replace(/ /g, '-');
                await addModel(finalData);
                alert('Product created!');
            } else {
                await updateModel(modelId, finalData);
                alert('Product updated!');
            }
            navigate('/admin/dashboard');
        } catch (err) {
            console.error(err);
            alert('Error saving product');
        }
    };

    const subcategories = [...new Set(Object.values(allModels).map(m => m.subcategory).filter(Boolean))];

    return (
        <div className="admin-dashboard container">
            <div className="dashboard-header">
                <h2>{isNew ? 'New Product' : 'Edit Product'}</h2>
                <Link to="/admin/dashboard" className="cancel-btn" style={{ padding: '8px 16px', background: '#666' }}>Back</Link>
            </div>

            <div className="edit-form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Brand</label>
                            <select name="brand" value={formData.brand} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
                                <option value="ANTIVA">ANTIVA</option>
                                <option value="AVANTI">AVANTI</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="Document Shredders">Document Shredders</option>
                                <option value="Special Application">Special Application</option>
                                <option value="Laminators">Laminators</option>
                                <option value="Multipurpose Application Shredders">Multipurpose Application Shredders</option>
                                <option value="Document Laminators & Binders">Document Laminators & Binders</option>
                                <option value="Waste Management & Recycling">Waste Management & Recycling</option>
                                <option value="Products on GeM">Products on GeM</option>
                                {[...new Set(Object.values(allModels).map(m => m.category).filter(Boolean))].filter(c =>
                                    !['Document Shredders','Special Application','Laminators','Multipurpose Application Shredders',
                                      'Document Laminators & Binders','Waste Management & Recycling','Products on GeM'].includes(c)
                                ).map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Subcategory</label>
                            <input list="subcategory-list" name="subcategory" value={formData.subcategory} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
                            <datalist id="subcategory-list">
                                {subcategories.map(c => <option key={c} value={c} />)}
                            </datalist>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Product ID (Unique Key)</label>
                        <input name="id" value={formData.id} onChange={handleChange} disabled={!isNew} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
                    </div>

                    <div className="form-group">
                        <label>Product Image</label>
                        <ImageUpload
                            onUpload={(url) => setFormData(prev => ({ ...prev, image: url }))}
                            existingImage={formData.image}
                        />
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Or enter URL manually"
                            style={{ marginTop: '10px', width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
                    </div>

                    <div className="form-group">
                        <label>Subtitle / Tag</label>
                        <input name="subtitle" value={formData.subtitle} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
                    </div>

                    <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Video Embed Link</label>
                            <input name="videoLink" value={formData.videoLink} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Brochure Link</label>
                            <input name="brochureLink" value={formData.brochureLink} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
                        </div>
                    </div>

                    <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #ddd' }} />

                    <h3>Key Features</h3>
                    <div className="features-editor">
                        {formData.features.map((feature, index) => (
                            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                <input
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    placeholder="Feature description"
                                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                                <button type="button" onClick={() => removeFeature(index)} className="cancel-btn" style={{ padding: '0 10px', background: '#dc3545' }}>X</button>
                            </div>
                        ))}
                        <button type="button" onClick={addFeature} className="add-btn" style={{ background: '#3498db', padding: '5px 10px', fontSize: '0.9em' }}>+ Add Feature</button>
                    </div>

                    <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #ddd' }} />

                    <h3>Specifications (Technical Specs)</h3>
                    <div className="specs-editor">
                        {specsArray.map((spec, index) => (
                            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                <input
                                    value={spec.key}
                                    onChange={(e) => handleSpecArrayChange(index, 'key', e.target.value)}
                                    placeholder="Spec Name (e.g. Cut Size)"
                                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                                <input
                                    value={spec.value}
                                    onChange={(e) => handleSpecArrayChange(index, 'value', e.target.value)}
                                    placeholder="Value (e.g. 4mm)"
                                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                                <button type="button" onClick={() => removeSpec(index)} className="cancel-btn" style={{ padding: '0 10px', background: '#dc3545' }}>X</button>
                            </div>
                        ))}
                        <button type="button" onClick={addSpec} className="add-btn" style={{ background: '#3498db', padding: '5px 10px', fontSize: '0.9em' }}>+ Add Specification</button>
                    </div>

                    <div className="form-actions" style={{ marginTop: '30px' }}>
                        <button type="submit" className="save-btn">Save Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditProduct;