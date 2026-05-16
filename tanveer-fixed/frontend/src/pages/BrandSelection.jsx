import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import './BrandSelection.css';

const BrandSelection = () => {
    const { category } = useParams();
    const { allModels } = useData();
    const navigate = useNavigate();
    
    // State to hold the selected brand before showing products
    const [selectedBrand, setSelectedBrand] = useState(null);

    // Map URL slug to the actual category name
    const categoryMapping = {
        'document-shredders': 'Document Shredders',
        'multipurpose-shredders': 'Multipurpose Application Shredders',
        'laminators-binders': 'Document Laminators & Binders',
        'waste-management-recycling': 'Waste Management & Recycling',
        'products-on-gem': 'Products on GeM'
    };

    const actualCategory = categoryMapping[category] || category;

    // Filter products that belong to this category
    const categoryProducts = Object.values(allModels).filter(model => {
        if (actualCategory === 'Products on GeM') {
            return model.isAvailableOnGeM === true || model.category?.toLowerCase() === actualCategory.toLowerCase();
        }
        return model.category?.toLowerCase() === actualCategory.toLowerCase();
    });

    // If no brand selected, show brand selection UI
    if (!selectedBrand) {
        return (
            <div className="page-container" style={{ paddingBottom: '60px' }}>
                <div className="container" style={{ marginTop: '40px', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ color: '#0f8b4d', margin: 0 }}>{actualCategory} - Select Brand</h2>
                        <button className="back-btn" onClick={() => navigate(-1)} style={{ padding: '8px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Go Back</button>
                    </div>
                    <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #ddd' }} />
                    
                    <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666', marginTop: '30px' }}>Please select a brand to view products in this category:</p>

                    <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', marginTop: '40px', flexWrap: 'wrap' }}>
                        <div 
                            onClick={() => setSelectedBrand('Avanti')}
                            style={{ width: '300px', height: '200px', border: '3px solid #0f8b4d', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'white', transition: 'all 0.3s ease', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(15,139,77,0.2)'; e.currentTarget.style.background = '#f0fdf4'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'; e.currentTarget.style.background = 'white'; }}
                        >
                            <img src="/assets/brand_avanti.png" alt="Avanti" style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                        </div>
                        <div 
                            onClick={() => setSelectedBrand('Antiva')}
                            style={{ width: '300px', height: '200px', border: '3px solid #e74c3c', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'white', transition: 'all 0.3s ease', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(231,76,60,0.2)'; e.currentTarget.style.background = '#fef2f2'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'; e.currentTarget.style.background = 'white'; }}
                        >
                            <img src="/assets/brand_antiva.png" alt="Antiva" style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Filter products further by the selected brand
    const displayedProducts = categoryProducts.filter(m => 
        (m.brand && m.brand.toLowerCase() === selectedBrand.toLowerCase()) || 
        (m.title && m.title.toLowerCase().includes(selectedBrand.toLowerCase())) ||
        (m.id && m.id.toLowerCase().includes(selectedBrand.toLowerCase()))
    );

    return (
        <div className="page-container" style={{ paddingBottom: '60px' }}>
            <div className="container" style={{ marginTop: '40px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ color: '#0f8b4d', margin: 0 }}>{actualCategory} - {selectedBrand}</h2>
                    <button className="back-btn" onClick={() => setSelectedBrand(null)} style={{ padding: '8px 16px', background: '#0f8b4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Change Brand</button>
                </div>
                <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #ddd' }} />

                {displayedProducts.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '40px', background: '#f8f9fa', borderRadius: '8px', fontSize: '1.2rem', color: '#666' }}>No {selectedBrand} products found in this category.</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                        {displayedProducts.map(model => (
                            <div key={model.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', background: 'white', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                                    <img src={model.image} alt={model.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                </div>
                                <div style={{ flexGrow: 1 }}>
                                    <h4 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>{model.title}</h4>
                                    {model.subtitle && <p style={{ fontSize: '13px', color: '#666', margin: '0 0 10px 0' }}>{model.subtitle}</p>}
                                    <div style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase', marginBottom: '15px' }}>
                                        {selectedBrand}
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/model/${model.id}`)}
                                    style={{ background: '#0f8b4d', color: 'white', border: 'none', padding: '10px', borderRadius: '20px', width: '100%', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.3s' }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#0a6336'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = '#0f8b4d'}
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandSelection;
