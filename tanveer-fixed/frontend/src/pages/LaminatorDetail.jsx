import React from 'react';
import { Link } from 'react-router-dom';
import './ProductDetail.css';
import LaminatorsImg from '../assets/binders-and-laminators.png';

const LaminatorDetail = () => {
    return (
        <div className="product-detail-page container">
            <div className="product-detail-layout">
                {/* Left Column: Featured Product Image */}
                <div className="left-column">
                    <div className="featured-image-container">
                        <img src={LaminatorsImg} alt="Document Laminators & Binders" className="featured-image" />
                        <h2 className="featured-title">Document Laminators & Binders</h2>
                        <p className="featured-specs">Professional finish for your documents</p>
                    </div>
                </div>

                {/* Right Column: Key Features / Model Lists */}
                <div className="right-column">
                    <div className="models-grid">

                        <div className="model-category">
                            <h3>Comb Binders</h3>
                            <ul>
                                <li><Link to="/model/avanti-clp-21"><span>&gt;</span> AVANTI CLP 21</Link></li>
                                <li><Link to="/model/avanti-clp-21-s"><span>&gt;</span> AVANTI CLP 21 S</Link></li>
                            </ul>
                        </div>

                        <div className="model-category">
                            <h3>Spiral Binders</h3>
                            <ul>
                                <li><Link to="/model/avanti-sb-340"><span>&gt;</span> AVANTI SB 340</Link></li>
                            </ul>
                        </div>

                        <div className="model-category">
                            <h3>Roll Laminators</h3>
                            <ul>
                                <li><Link to="/model/avanti-dl-685"><span>&gt;</span> AVANTI DL 685</Link></li>
                                <li><Link to="/model/avanti-dl-1000"><span>&gt;</span> AVANTI DL 1000</Link></li>
                            </ul>
                        </div>

                        <div className="model-category">
                            <h3>Pouch Laminators</h3>
                            <ul>
                                <li><Link to="/model/avanti-dl-300"><span>&gt;</span> AVANTI DL 300</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaminatorDetail;
