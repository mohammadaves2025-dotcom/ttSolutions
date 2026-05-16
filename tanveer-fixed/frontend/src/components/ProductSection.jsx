import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import './ProductSection.css';

const ProductSection = ({ title, products, showBrands = true, showViewDetails = true, hidePrice = false }) => {
    return (
        <section className="products-section">
            <div className="container">
                <h2 className="section-title">{title}</h2>
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="card-top-section">
                                {product.discount && (
                                    <div className="discount-badge">{product.discount}</div>
                                )}

                                {product.sideBrand && (
                                    <div className="side-brand-vertical">
                                        <span className="side-desc">{product.sideDesc}</span>
                                        <span className="side-name"><b>{product.sideBrand}</b> {product.sideModel}</span>
                                    </div>
                                )}

                                <div className="card-image-wrapper">
                                    <Link to={product.link}>
                                        <img src={product.image} alt={product.title} />
                                    </Link>
                                </div>

                                {product.inStock !== false && (
                                    <div className="stock-badge">
                                        <CheckCircle2 size={14} className="tick-icon" /> In stock
                                    </div>
                                )}
                            </div>

                            <div className="card-bottom-section">
                                <div className="product-sku">{product.sku || 'Omnires | Part No. 2123532'}</div>
                                <h3 className="product-card-title">{product.title}</h3>

                                {!hidePrice && (
                                <div className="product-price-box">
                                    <span className="rupee">₹</span>
                                    <span className="amount">{product.price || '4500.00'}</span>
                                    <span className="net-txt">net</span>
                                </div>
                                )}

                                <div className="product-actions">
                                    <Link to={product.link} className="btn-view-details">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
