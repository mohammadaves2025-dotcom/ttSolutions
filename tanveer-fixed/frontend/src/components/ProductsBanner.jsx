import React from 'react';
import './ProductsBanner.css';
import Shredder1 from '../assets/shredders.png'; // Using existing assets to mimic the banner
import Shredder2 from '../assets/application-shredders.png';

const ProductsBanner = () => {
    return (
        <div className="products-banner">
            <div className="container banner-content">
                <div className="banner-text">
                    <h2 className="ensuring-text">ENSURING</h2>
                    <h2 className="performance-text">High Performance</h2>
                </div>
                <div className="banner-images">
                    {/* Displaying images to mimic the look of the uploaded banner */}
                    <img src={Shredder1} alt="High Performance Shredder" className="banner-shredder-img" />
                    <img src={Shredder2} alt="Office Shredder" className="banner-shredder-img" />
                </div>
            </div>
        </div>
    );
};

export default ProductsBanner;
