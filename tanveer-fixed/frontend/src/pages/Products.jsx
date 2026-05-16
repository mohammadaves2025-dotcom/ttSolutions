import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Search } from 'lucide-react';
import ProductsBanner from '../components/ProductsBanner';
import ProductSection from '../components/ProductSection';
import ShreddersImg from '../assets/shredders.png';
import AppShreddersImg from '../assets/application-shredders.png';
import LaminatorsImg from '../assets/binders-and-laminators.png';

const Products = () => {
    const { allModels } = useData();
    const [searchTerm, setSearchTerm] = React.useState('');

    const products = [
        { id: 1, title: 'Document Shredders', image: ShreddersImg, link: '/select-brand/document-shredders', slug: 'document-shredders' },
        { id: 2, title: 'Multipurpose Application Shredders', image: AppShreddersImg, link: '/select-brand/multipurpose-shredders', slug: 'multipurpose-shredders' },
        { id: 3, title: 'Document Laminators & Binders', image: LaminatorsImg, link: '/select-brand/laminators-binders', slug: 'laminators-binders' },
        { id: 4, title: 'Waste Management & Recycling', image: AppShreddersImg, link: '/select-brand/waste-management-recycling', slug: 'waste-management-recycling' },
        { id: 5, title: 'Products on GeM', image: ShreddersImg, link: '/select-brand/products-on-gem', slug: 'products-on-gem' }
    ];

    const filteredModels = searchTerm
        ? Object.values(allModels).filter(model =>
            model.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            model.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            model.subcategory?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div className="page-container" style={{ paddingBottom: '60px' }}>
            <ProductsBanner />

            <div className="container" style={{ marginTop: '30px', marginBottom: '20px', position: 'relative' }}>
                <Search size={20} color="#0f8b4d" style={{ position: 'absolute', left: '35px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                    type="text"
                    placeholder="Search all products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '15px 15px 15px 45px',
                        fontSize: '16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                />
            </div>

            {searchTerm ? (
                <div className="container">
                    <h3>Search Results ({filteredModels.length})</h3>
                    {filteredModels.length === 0 ? (
                        <p>No products found matching "{searchTerm}"</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
                            {filteredModels.map(model => (
                                <Link to={`/model/${model.id}`} key={model.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', background: 'white', height: '100%', transition: 'transform 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <h4 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>{model.title}</h4>
                                        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                                            {typeof model.specs === 'object' ? 'View Details for Specs' : (model.specs || 'View Details')}
                                        </p>
                                        <div style={{ marginTop: '10px', fontSize: '12px', color: '#999', textTransform: 'uppercase' }}>{model.category}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <ProductSection title="Complete Product Catalog" products={products} showViewDetails={false} />
            )}

            {/* Brand Section Removed - Moved to App.jsx */}
        </div>
    );
};

export default Products;
