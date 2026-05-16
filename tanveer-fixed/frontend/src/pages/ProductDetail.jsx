import React from 'react';
import './ProductDetail.css';
import AvantiPS300Img from '../assets/shredders.png'; // Using existing image as placeholder/actual image for PS 300

const ProductDetail = () => {
    return (
        <div className="product-detail-page container">
            <div className="product-detail-layout">
                {/* Left Column: Featured Product Image */}
                <div className="left-column">
                    <div className="featured-image-container">
                        <img src={AvantiPS300Img} alt="Avanti PS 300" className="featured-image" />
                        <h2 className="featured-title">AVANTI PS 300</h2>
                        <p className="featured-specs">15 sheets/Strip cut /Continuous run</p>
                    </div>
                </div>

                {/* Right Column: Key Features / Model Lists */}
                <div className="right-column">
                    <div className="models-grid">
                        {/* Office and Desk Side Office Shredders */}
                        <div className="model-category">
                            <h3>Office and Desk Side Office Shredders</h3>
                            <ul>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 225 <span className="specs">(8 sheets/ strip cut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 225 E <span className="specs">(12 sheets/ strip cut)</span></a> <span className="tag">PRODUCT AVAILABLE ON <span className="gem">GeM</span></span></li>
                            </ul>
                        </div>

                        {/* Departmental Office Shred Series */}
                        <div className="model-category">
                            <h3>Departmental Office Shred Series</h3>
                            <ul>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 240 <span className="specs">(28-32 sheets/ Strip Cut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 240 HD <span className="specs">(42-46 sheets/ Strip Cut)</span></a> <span className="tag">PRODUCT AVAILABLE ON <span className="gem">GeM</span></span></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 240 CC <span className="specs">(26-28 sheets/ Cross Cut)</span></a> <span className="tag">PRODUCT AVAILABLE ON <span className="gem">GeM</span></span></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 240 CCX <span className="specs">(16-18 sheets/ Micro Cut)</span></a> <span className="tag">PRODUCT AVAILABLE ON <span className="gem">GeM</span></span></li>
                            </ul>
                        </div>

                        {/* Departmental Shredders */}
                        <div className="model-category">
                            <h3>Departmental Shredders</h3>
                            <ul>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 300 <span className="specs">(15 sheets/ strip cut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 300 CC <span className="specs">(18-20/ cross cut)</span></a> <span className="tag">PRODUCT AVAILABLE ON <span className="gem">GeM</span></span></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 300 HD <span className="specs">(27-30 sheets/ strip cut)</span></a> <span className="tag">PRODUCT AVAILABLE ON <span className="gem">GeM</span></span></li>
                            </ul>
                        </div>

                        {/* Heavy Duty Shredders */}
                        <div className="model-category">
                            <h3>Heavy Duty Shredders</h3>
                            <ul>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 400 <span className="specs">(30 sheets/ strip cut)</span></a> <span className="tag">PRODUCT AVAILABLE ON <span className="gem">GeM</span></span></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 403 <span className="specs">(40 sheets/ strip cut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 306 <span className="specs">(50 sheets/ strip cut)</span></a></li>
                            </ul>
                        </div>

                        {/* Departmental Heavy Duty Shredders */}
                        <div className="model-category">
                            <h3>Departmental Heavy Duty Shredders</h3>
                            <ul>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 404 <span className="specs">(55 sheets/ Stripcut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 404 CC <span className="specs">(70 sheets/ Crosscut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 407 <span className="specs">(75 sheets/ Stripcut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 407 CC <span className="specs">(100 sheets/ Crosscut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 407 CCX <span className="specs">(60 sheets/ Crosscut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 409 <span className="specs">(95 sheets/ Stripcut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 409 CC <span className="specs">(125 sheets/ Crosscut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 409 CCX <span className="specs">(80 sheets/ Crosscut)</span></a></li>
                            </ul>
                        </div>

                        {/* Departmental Heavy Duty Document Shredders With High Speed */}
                        <div className="model-category">
                            <h3>Departmental Heavy Duty Document Shredders With High Speed & High Motor Power</h3>
                            <ul>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 4071 <span className="specs">(70 Sheets/ Stripcut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 4071 CC <span className="specs">(95 Sheets/ Crosscut)</span></a></li>
                            </ul>
                        </div>

                        {/* High Capacity Departmental Heavy Duty */}
                        <div className="model-category">
                            <h3>High Capacity Departmental Heavy Duty Document Shredders With High Speed and High Motor Power</h3>
                            <ul>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 4091 <span className="specs">(95 sheets/ Stripcut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 4091 CC <span className="specs">(125 sheets/ Crosscut)</span></a></li>
                            </ul>
                        </div>

                        {/* Industrial Shredders */}
                        <div className="model-category">
                            <h3>Industrial Shredders</h3>
                            <ul>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 409 HD <span className="specs">(100 sheets/ Strip Cut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 409 HDCC <span className="specs">(125 sheets/ Cross Cut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 500 <span className="specs">(96 sheets/ Strip Cut)</span></a></li>
                                <li><a href="#"><span>&gt;</span> AVANTI PS 500 CC <span className="specs">(125 sheets/ Cross Cut)</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
