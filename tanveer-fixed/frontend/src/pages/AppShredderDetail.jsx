import React from 'react';
import { Link } from 'react-router-dom';
import './ProductDetail.css';
import AppShreddersImg from '../assets/application-shredders.png';

const AppShredderDetail = () => {
    return (
        <div className="product-detail-page container">
            <div className="product-detail-layout">
                {/* Left Column: Featured Product Image */}
                <div className="left-column">
                    <div className="featured-image-container">
                        <img src={AppShreddersImg} alt="Multipurpose Application Shredders" className="featured-image" />
                        <h2 className="featured-title">Multipurpose Application Shredders</h2>
                        <p className="featured-specs">High-performance shredding for various materials</p>
                    </div>
                </div>

                {/* Right Column: Key Features / Model Lists */}
                <div className="right-column">
                    <div className="models-grid">

                        <div className="model-category">
                            <h3>Plastic Bottle Shredders</h3>
                            <ul>
                                <li><Link to="/model/avanti-bs-300"><span>&gt;</span> AVANTI BS 300 <span className="specs">(High Technology Document, Volumetric Material & Bottle Shredder cum Disentegrator)</span></Link></li>
                                <li><Link to="/model/avanti-bs-300x"><span>&gt;</span> AVANTI BS 300X <span className="specs">(Plastic Film Shredder)</span></Link></li>
                                <li><Link to="/model/avanti-pws-300"><span>&gt;</span> AVANTI PWS 300</Link></li>
                                <li><Link to="/model/avanti-bs-400"><span>&gt;</span> AVANTI BS 400</Link></li>
                            </ul>
                        </div>

                        <div className="model-category">
                            <h3>AVANTI Brand - Industrial Multipurpose Shredder</h3>
                            <ul>
                                <li><Link to="/model/avanti-bs-5620"><span>&gt;</span> AVANTI BS 5620 <span className="specs">(INDUSTRIAL MULTIPURPOSE SHREDDER TWIN MOTOR)</span></Link></li>
                                <li><Link to="/model/avanti-msw401"><span>&gt;</span> AVANTI MSW401 <span className="specs">(Suitable for Shredding Polythene Bags, Synthetic Cloth & Cotton Cloth Waste)</span></Link></li>
                                <li><Link to="/model/avanti-ms-400"><span>&gt;</span> AVANTI MS 400 <span className="specs">(WOVEN BAG SHREDDER)</span></Link></li>
                            </ul>
                        </div>

                        <div className="model-category">
                            <h3>Multi Application Shredder with Hopper</h3>
                            <ul>
                                <li><Link to="/model/avanti-es-5012"><span>&gt;</span> AVANTI ES 5012</Link></li>
                                <li><Link to="/model/avanti-ps-409-hu"><span>&gt;</span> AVANTI PS 409 HU</Link></li>
                            </ul>
                        </div>

                        <div className="model-category">
                            <h3>Food Waste Shredder</h3>
                            <ul><li><Link to="/model/avanti-fs-300"><span>&gt;</span> AVANTI FS 300</Link></li></ul>
                        </div>

                        <div className="model-category">
                            <h3>Glass Waste Shredder</h3>
                            <ul>
                                <li><Link to="/model/avanti-bc-300"><span>&gt;</span> AVANTI BC 300</Link></li>
                                <li><Link to="/model/avanti-bc-400"><span>&gt;</span> AVANTI BC 400</Link></li>
                            </ul>
                        </div>

                        <div className="model-category">
                            <h3>Garden Waste Shredder</h3>
                            <ul><li><Link to="/model/avanti-ms-4050"><span>&gt;</span> AVANTI MS 4050</Link></li></ul>
                        </div>

                        <div className="model-category">
                            <h3>E-Waste Shredder</h3>
                            <ul>
                                <li><Link to="/model/avanti-ec-300-hdd-combo"><span>&gt;</span> AVANTI EC 300 HDD COMBO</Link></li>
                                <li><Link to="/model/avanti-es-400-hd-combo"><span>&gt;</span> AVANTI ES 400 HD COMBO</Link></li>
                                <li><Link to="/model/avanti-ews-4050"><span>&gt;</span> AVANTI EWS 4050</Link></li>
                                <li><Link to="/model/avanti-ews-5010"><span>&gt;</span> AVANTI EWS 5010</Link></li>
                                <li><Link to="/model/avanti-ews-5515"><span>&gt;</span> AVANTI EWS 5515</Link></li>
                                <li><Link to="/model/avanti-ews-5620"><span>&gt;</span> AVANTI EWS 5620</Link></li>
                            </ul>
                        </div>

                        <div className="model-category">
                            <h3>Laminate Shredder</h3>
                            <ul><li><Link to="/model/avanti-ps-404-l"><span>&gt;</span> AVANTI PS 404 L</Link></li></ul>
                        </div>

                        <div className="model-category">
                            <h3>Large Format & Carton Box Shredders</h3>
                            <ul><li><Link to="/model/avanti-ps-750"><span>&gt;</span> AVANTI PS 750</Link></li></ul>
                        </div>

                        <div className="model-category">
                            <h3>Cardboard Perforator & Shredder</h3>
                            <ul>
                                <li><Link to="/model/avanti-cp-450"><span>&gt;</span> AVANTI CP 450</Link></li>
                                <li><Link to="/model/avanti-cp-450-v"><span>&gt;</span> AVANTI CP 450 V</Link></li>
                                <li><Link to="/model/avanti-cp-455"><span>&gt;</span> AVANTI CP 455</Link></li>
                                <li><Link to="/model/avanti-cp-455-v"><span>&gt;</span> AVANTI CP 455 V</Link></li>
                            </ul>
                        </div>

                        <div className="model-category">
                            <h3>Shredder with Segregator</h3>
                            <ul>
                                <li><Link to="/model/avanti-mr-300"><span>&gt;</span> AVANTI MR 300</Link></li>
                                <li><Link to="/model/avanti-mr-302-ss"><span>&gt;</span> AVANTI MR 302 SS</Link></li>
                            </ul>
                        </div>

                        <div className="model-category">
                            <h3>Municipal Waste Shredder with Conveyer</h3>
                            <ul><li><Link to="/model/avanti-msw401"><span>&gt;</span> AVANTI MSW401 (See Industrial section)</Link></li></ul>
                        </div>

                        <div className="model-category">
                            <h3>Compost Shredder</h3>
                            <ul><li><Link to="/model/avanti-ms-202"><span>&gt;</span> AVANTI MS 202</Link></li></ul>
                        </div>

                        <div className="model-category">
                            <h3>Pet Bottle Crusher Shredders</h3>
                            <ul>
                                <li><Link to="/model/avanti-bs-100p"><span>&gt;</span> AVANTI BS 100P</Link></li>
                                <li><Link to="/model/avanti-bs-200-p"><span>&gt;</span> AVANTI BS 200 P</Link></li>
                                <li><Link to="/model/avanti-bs-202-p"><span>&gt;</span> AVANTI BS 202 P</Link></li>
                                <li><Link to="/model/avanti-bs-203-p"><span>&gt;</span> AVANTI BS 203 P</Link></li>
                                <li><Link to="/model/avanti-bs-200-pv"><span>&gt;</span> AVANTI BS 200 PV</Link></li>
                                <li><Link to="/model/avanti-bs-202-pv"><span>&gt;</span> AVANTI BS 202 PV</Link></li>
                                <li><Link to="/model/avanti-bs-203-pv"><span>&gt;</span> AVANTI BS 203 PV</Link></li>
                                <li><Link to="/model/avanti-bs-200-px"><span>&gt;</span> AVANTI BS 200 PX</Link></li>
                                <li><Link to="/model/avanti-bs-202-px"><span>&gt;</span> AVANTI BS 202 PX</Link></li>
                                <li><Link to="/model/avanti-bs-203-px"><span>&gt;</span> AVANTI BS 203 PX</Link></li>
                                <li><Link to="/model/avanti-bs-200-pe"><span>&gt;</span> AVANTI BS 200 PE</Link></li>
                                <li><Link to="/model/avanti-bs-202-pe"><span>&gt;</span> AVANTI BS 202 PE</Link></li>
                                <li><Link to="/model/avanti-bs-203-pe"><span>&gt;</span> AVANTI BS 203 PE</Link></li>
                                <li><Link to="/model/avanti-bs-200-pears"><span>&gt;</span> AVANTI BS 200 PEARS</Link></li>
                                <li><Link to="/model/avanti-bs-200-pearl"><span>&gt;</span> AVANTI BS 200 PEARL</Link></li>
                                <li><Link to="/model/avanti-bs-201-pva"><span>&gt;</span> AVANTI BS 201 PVA</Link></li>
                                <li><Link to="/model/avanti-bs-300-p"><span>&gt;</span> AVANTI BS 300 P</Link></li>
                                <li><Link to="/model/avanti-bs-400-p"><span>&gt;</span> AVANTI BS 400 P</Link></li>
                                <li><Link to="/model/avanti-bs-4050-p"><span>&gt;</span> AVANTI BS 4050 P</Link></li>
                            </ul>
                        </div>

                        <div className="model-category">
                            <h3>Multipurpose Packaging Material & Document Shredders</h3>
                            <ul>
                                <li><Link to="/model/avanti-hs-404"><span>&gt;</span> AVANTI HS 404 <span className="specs">(Hopper 55 sheets /Stripcut)</span></Link></li>
                                <li><Link to="/model/avanti-hs-404-cc"><span>&gt;</span> AVANTI HS 404 CC <span className="specs">(Hopper 65-70 sheets /Crosscut)</span></Link></li>
                                <li><Link to="/model/avanti-hs-404-ccx"><span>&gt;</span> AVANTI HS 404 CCX <span className="specs">(Hopper / 28-32 sheets / Super Cross cut)</span></Link></li>
                                <li><Link to="/model/avanti-hs-407"><span>&gt;</span> AVANTI HS 407 <span className="specs">(Hopper / 65-70 sheets / Strip cut)</span></Link></li>
                                <li><Link to="/model/avanti-hs-407-cc"><span>&gt;</span> AVANTI HS 407 CC <span className="specs">(Hopper / 90-95 sheets / Cross cut)</span></Link></li>
                                <li><Link to="/model/avanti-hs-407-ccx"><span>&gt;</span> AVANTI HS 407 CCX <span className="specs">(Hopper / 30-35 sheets / Super Cross cut)</span></Link></li>
                                <li><Link to="/model/avanti-hs-409"><span>&gt;</span> AVANTI HS 409 <span className="specs">(Hopper / 90-95 sheets / Strip cut)</span></Link></li>
                                <li><Link to="/model/avanti-hs-409-cc"><span>&gt;</span> AVANTI HS 409 CC <span className="specs">(Hopper / 120-125 sheets / Cross cut)</span></Link></li>
                                <li><Link to="/model/avanti-hs-409-ccx"><span>&gt;</span> AVANTI HS 409 CCX <span className="specs">(Hopper / 55-60 sheets / Super Cross cut)</span></Link></li>
                            </ul>
                        </div>

                        <div className="model-category">
                            <h3>Automated Shredding Solutions</h3>
                            <ul><li><Link to="/model/avanti-es-5012-automated"><span>&gt;</span> AVANTI ES 5012 (Automated Shredding Solutions)</Link></li></ul>
                        </div>

                        <div className="model-category">
                            <h3>Cellulose/Pulp Shredder</h3>
                            <ul><li><Link to="/model/avanti-ps-1000-cc"><span>&gt;</span> AVANTI PS 1000 CC</Link></li></ul>
                        </div>

                        <div className="model-category">
                            <h3>UV C Sterilizer</h3>
                            <ul><li><Link to="/model/avanti-uv-36"><span>&gt;</span> AVANTI UV 36</Link></li></ul>
                        </div>

                        <div className="info-links-section" style={{ marginTop: '40px', textAlign: 'center' }}>
                            <a href="#" className="btn-primary" style={{ marginRight: '20px' }}>What you want to shred</a>
                            <a href="#" className="btn-secondary">Watch Shredding In Action</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppShredderDetail;
