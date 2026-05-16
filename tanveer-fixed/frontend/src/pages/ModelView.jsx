import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import './ProductDetail.css';
import './ModelView.css';

const ModelView = () => {
    const { modelId } = useParams();
    const { allModels } = useData();
    const model = allModels[modelId];

    if (!model) {
        return (
            <div className="container" style={{ padding: '50px', toString: 'center' }}>
                <h2>Model Not Found</h2>
                <p>The requested model ({modelId}) could not be found.</p>
                <Link to="/products" className="btn-primary">Back to Products</Link>
            </div>
        );
    }

    return (
        <div className="model-view-page container">
            <div className="model-view-layout">
                {/* Left Column: Image & Highlights */}
                <div className="model-left-column">
                    <div className="model-image-container">
                        <img src={model.image} alt={model.title} className="model-image" />
                    </div>
                    <div className="model-info-header">
                        <h1 className="model-title">{model.title}</h1>
                        <h3 className="model-subtitle">{model.subtitle}</h3>
                        {model.description && <p className="model-description">{model.description}</p>}
                    </div>

                    {model.keyFeatures && (
                        <div className="model-features">
                            <h4>key Features:</h4>
                            <ul>
                                {model.keyFeatures.map((feature, index) => (
                                    <li key={index}>&gt; {feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right Column: Tech Specs Table */}
                <div className="model-right-column">
                    <h2 className="specs-title">TECHNICAL SPECIFICATIONS</h2>
                    <table className="specs-table">
                        <thead>
                            <tr>
                                <th>Model</th>
                                <th>{model.title.split(' ')[1] + ' ' + model.title.split(' ')[2]}</th> {/* Heuristic for short model name */}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(model.specs).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Brochure and Video Section */}
            <div className="model-extras-section">
                <div className="extras-container">
                    {/* Brochure Section */}
                    <div className="brochure-section">
                        <h3>Product Brochure</h3>
                        <p>Download the detailed technical brochure for this model.</p>
                        <a href={model.brochureLink || "#"} className="btn-download" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-file-pdf"></i> Download Brochure
                        </a>
                    </div>

                    {/* Video Section */}
                    <div className="video-section">
                        <h3>Product Demo</h3>
                        <div className="video-wrapper">
                            {model.videoLink ? (
                                <iframe
                                    src={model.videoLink}
                                    title={`Video for ${model.title}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="video-placeholder">
                                    <p>Video coming soon...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelView;
