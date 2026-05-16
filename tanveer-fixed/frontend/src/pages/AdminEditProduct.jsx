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

    // Load data if editing
    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) navigate('/admin');

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
                features: m.features || [],
                specifications: m.specifications || {}
            });
        } else if (!isNew && Object.keys(allModels).length > 0) {
            // alert('Product not found');
            // navigate('/admin/dashboard');
        }
    }, [modelId, allModels, navigate, isNew]);

    // Handle basic fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle Features (Array)
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

    // Handle Specifications (Map/Object)
    const handleSpecChange = (key, field, value) => {
        const newSpecs = { ...formData.specifications };

        if (field === 'key') {
            // Key change is tricky, simpler to delete old and add new, but for React input simplicity:
            // We will map specs to array for editing and convert back on save/change?
            // Easier way: store specs as array of {key, value} in state, convert to object on save
            // But for now let's try direct object manipulation logic if keys are stable.
            // Actually, let's use a temporary array state for specs editing to allow key editing
        } else {
            // value change
            newSpecs[key] = value;
            setFormData(prev => ({ ...prev, specifications: newSpecs }));
        }
    };

    // Better config for Specs: Convert to array for editing
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

        // Convert specs array back to object
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
                // Ensure ID is set
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

    // Get unique categories for suggestion
    const categories = [...new Set(Object.values(allModels).map(m => m.category).filter(Boolean))];
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
                                <option value="Antiva">Antiva</option>
                                <option value="Avanti">Avanti</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Category</label>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                >
                                    <option value="" disabled>Select Category</option>
                                    <option value="Document Shredders">Document Shredders</option>
                                    <option value="Multipurpose Application Shredders">Multipurpose Application Shredders</option>
                                    <option value="Document Laminators & Binders">Document Laminators & Binders</option>
                                    <option value="Waste Management & Recycling">Waste Management & Recycling</option>
                                    <option value="Products on GeM">Products on GeM</option>
                                    {[...new Set(Object.values(allModels).map(m => m.category).filter(Boolean))].filter(c =>
                                        c !== 'Document Shredders' &&
                                        c !== 'Multipurpose Application Shredders' &&
                                        c !== 'Document Laminators & Binders' &&
                                        c !== 'Waste Management & Recycling' &&
                                        c !== 'Products on GeM'
                                    ).map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                    <option value="New Category...">+ Add New Category</option>
                                </select>
                            </div>
                            {formData.category === 'New Category...' && (
                                <input
                                    type="text"
                                    name="category"
                                    value=""
                                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                    placeholder="Type new category"
                                    required
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', marginTop: '5px' }}
                                />
                            )}
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
                        <input name="id" value={formData.id} onChange={handleChange} disabled={!isNew} required />
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
                            style={{ marginTop: '10px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Subtitle / Tag</label>
                        <input name="subtitle" value={formData.subtitle} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />
                    </div>



                    <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Video Embed Link</label>
                            <input name="videoLink" value={formData.videoLink} onChange={handleChange} />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Brochure Link</label>
                            <input name="brochureLink" value={formData.brochureLink} onChange={handleChange} />
                        </div>
                    </div>

                    <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #ddd' }} />

                    <h3>Features</h3>
                    <div className="features-editor">
                        {formData.features.map((feature, index) => (
                            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                <input
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    placeholder="Feature description"
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
                                    style={{ flex: 1 }}
                                />
                                <input
                                    value={spec.value}
                                    onChange={(e) => handleSpecArrayChange(index, 'value', e.target.value)}
                                    placeholder="Value (e.g. 4mm)"
                                    style={{ flex: 1 }}
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
