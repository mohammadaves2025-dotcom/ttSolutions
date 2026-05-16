import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import './ProductDetail.css';
import ShreddersImg from '../assets/shredders.png';
import AppShreddersImg from '../assets/application-shredders.png';
import LaminatorsImg from '../assets/binders-and-laminators.png';

const AntivaDetail = () => {
    const { category } = useParams();

    let headerContent = {
        image: ShreddersImg,
        title: 'ANTIVA Document Shredders',
        specs: 'Premium Office Solutions'
    };

    if (category === 'app-shredders') {
        headerContent = {
            image: AppShreddersImg,
            title: 'ANTIVA Multipurpose Application Shredders',
            specs: 'High-performance shredding for various materials'
        };
    } else if (category === 'laminators') {
        headerContent = {
            image: LaminatorsImg,
            title: 'ANTIVA Document Laminators & Binders',
            specs: 'Professional finish for your documents'
        };
    }

    const [searchTerm, setSearchTerm] = React.useState('');

    const allCategories = [
        {
            id: 'app-shredders',
            groups: [
                {
                    title: 'Plastic Bottle Shredders',
                    models: [
                        { id: 'avanti-bs-300', name: 'ANTIVA BS 300', specs: '(High Technology Document, Volumetric Material & Bottle Shredder cum Disentegrator)' },
                        { id: 'avanti-bs-300x', name: 'ANTIVA BS 300X', specs: '(Plastic Film Shredder)' },
                        { id: 'avanti-pws-300', name: 'ANTIVA PWS 300', specs: '' },
                        { id: 'avanti-bs-400', name: 'ANTIVA BS 400', specs: '' }
                    ]
                },
                {
                    title: 'ANTIVA Brand - Industrial Multipurpose Shredder',
                    models: [
                        { id: 'avanti-bs-5620', name: 'ANTIVA BS 5620', specs: '(INDUSTRIAL MULTIPURPOSE SHREDDER TWIN MOTOR)' },
                        { id: 'avanti-msw401', name: 'ANTIVA MSW401', specs: '(Suitable for Shredding Polythene Bags, Synthetic Cloth & Cotton Cloth Waste)' },
                        { id: 'avanti-ms-400', name: 'ANTIVA MS 400', specs: '(WOVEN BAG SHREDDER)' }
                    ]
                },
                {
                    title: 'Multi Application Shredder with Hopper',
                    models: [
                        { id: 'avanti-es-5012', name: 'ANTIVA ES 5012', specs: '' },
                        { id: 'avanti-ps-409-hu', name: 'ANTIVA PS 409 HU', specs: '' }
                    ]
                },
                {
                    title: 'Food Waste Shredder',
                    models: [
                        { id: 'avanti-fs-300', name: 'ANTIVA FS 300', specs: '' }
                    ]
                },
                {
                    title: 'Glass Waste Shredder',
                    models: [
                        { id: 'avanti-bc-300', name: 'ANTIVA BC 300', specs: '' },
                        { id: 'avanti-bc-400', name: 'ANTIVA BC 400', specs: '' }
                    ]
                },
                {
                    title: 'Garden Waste Shredder',
                    models: [
                        { id: 'avanti-ms-4050', name: 'ANTIVA MS 4050', specs: '' }
                    ]
                },
                {
                    title: 'E- Waste Shredder',
                    models: [
                        { id: 'avanti-ec-300-hdd-combo', name: 'ANTIVA EC 300 HDD COMBO', specs: '' },
                        { id: 'avanti-es-400-hd-combo', name: 'ANTIVA ES 400 HD COMBO', specs: '' },
                        { id: 'avanti-ews-4050', name: 'ANTIVA EWS 4050', specs: '' },
                        { id: 'avanti-ews-5010', name: 'ANTIVA EWS 5010', specs: '' },
                        { id: 'avanti-ews-5515', name: 'ANTIVA EWS 5515', specs: '' },
                        { id: 'avanti-ews-5620', name: 'ANTIVA EWS 5620', specs: '' }
                    ]
                },
                {
                    title: 'Laminate Shredder',
                    models: [
                        { id: 'avanti-ps-404-l', name: 'ANTIVA PS 404 L', specs: '' }
                    ]
                },
                {
                    title: 'Large Format & Carton Box Shredders',
                    models: [
                        { id: 'avanti-ps-750', name: 'ANTIVA PS 750', specs: '' }
                    ]
                },
                {
                    title: 'Cardboard Perforator & Shredder',
                    models: [
                        { id: 'avanti-cp-450', name: 'ANTIVA CP 450', specs: '' },
                        { id: 'avanti-cp-450-v', name: 'ANTIVA CP 450 V', specs: '' },
                        { id: 'avanti-cp-455', name: 'ANTIVA CP 455', specs: '' },
                        { id: 'avanti-cp-455-v', name: 'ANTIVA CP 455 V', specs: '' }
                    ]
                },
                {
                    title: 'Shredder with Segregator',
                    models: [
                        { id: 'avanti-mr-300', name: 'ANTIVA MR 300', specs: '' },
                        { id: 'avanti-mr-302-ss', name: 'ANTIVA MR 302 SS', specs: '' }
                    ]
                },
                {
                    title: 'Municipal Waste Shredder with Conveyer',
                    models: [
                        { id: 'avanti-msw401', name: 'ANTIVA MSW401', specs: '(See Industrial section)' }
                    ]
                },
                {
                    title: 'Compost Shredder',
                    models: [
                        { id: 'avanti-ms-202', name: 'ANTIVA MS 202', specs: '' }
                    ]
                },
                {
                    title: 'Bio Medical Waste Shredder',
                    models: []
                }
            ]
        },
        {
            id: 'laminators',
            groups: [
                {
                    title: 'Comb Binders',
                    models: [
                        { id: 'avanti-clp-21', name: 'AVANTI CLP 21', specs: '' },
                        { id: 'avanti-clp-21-s', name: 'AVANTI CLP 21 S', specs: '' }
                    ]
                },
                {
                    title: 'Spiral Binders',
                    models: [
                        { id: 'avanti-sb-340', name: 'AVANTI SB 340', specs: '' }
                    ]
                },
                {
                    title: 'Roll Laminators',
                    models: [
                        { id: 'avanti-dl-685', name: 'AVANTI DL 685', specs: '' },
                        { id: 'avanti-dl-1000', name: 'AVANTI DL 1000', specs: '' }
                    ]
                },
                {
                    title: 'Pouch Laminators',
                    models: [
                        { id: 'avanti-dl-300', name: 'AVANTI DL 300', specs: '' }
                    ]
                }
            ]
        },
        {
            id: 'default',
            groups: [
                {
                    title: 'Office and Desk Side Office Shredders',
                    models: [
                        { id: 'antiva-ps-225', name: 'ANTIVA PS 225', specs: '(8 sheets/ strip cut)' },
                        { id: 'antiva-ps-225-e', name: 'ANTIVA PS 225 E', specs: '(12 sheets/ strip cut)', gem: true }
                    ]
                },
                {
                    title: 'Departmental Office Shred Series',
                    models: [
                        { id: 'antiva-ps-240', name: 'ANTIVA PS 240', specs: '(28-32 sheets/ Strip Cut)' },
                        { id: 'antiva-ps-240-hd', name: 'ANTIVA PS 240 HD', specs: '(42-46 sheets/ Strip Cut)', gem: true },
                        { id: 'antiva-ps-240-cc', name: 'ANTIVA PS 240 CC', specs: '(26-28 sheets/ Cross Cut)', gem: true },
                        { id: 'antiva-ps-240-ccx', name: 'ANTIVA PS 240 CCX', specs: '(16-18 sheets/ Micro Cut)', gem: true }
                    ]
                },
                {
                    title: 'Departmental Shredders',
                    models: [
                        { id: 'antiva-ps-300', name: 'ANTIVA PS 300', specs: '(15 sheets/ strip cut)' },
                        { id: 'antiva-ps-300-cc', name: 'ANTIVA PS 300 CC', specs: '(18-20/ cross cut)', gem: true },
                        { id: 'antiva-ps-300-hd', name: 'ANTIVA PS 300 HD', specs: '(27-30 sheets/ strip cut)', gem: true }
                    ]
                },
                {
                    title: 'Heavy Duty Shredders',
                    models: [
                        { id: 'antiva-ps-400', name: 'ANTIVA PS 400', specs: '(30 sheets/ strip cut)', gem: true },
                        { id: 'antiva-ps-403', name: 'ANTIVA PS 403', specs: '(40 sheets/ strip cut)' },
                        { id: 'antiva-ps-306', name: 'ANTIVA PS 306', specs: '(50 sheets/ strip cut)' }
                    ]
                },
                {
                    title: 'Departmental Heavy Duty Shredders',
                    models: [
                        { id: 'antiva-ps-404', name: 'ANTIVA PS 404', specs: '(55 sheets/ Stripcut)' },
                        { id: 'antiva-ps-404-cc', name: 'ANTIVA PS 404 CC', specs: '(70 sheets/ Crosscut)' },
                        { id: 'antiva-ps-407', name: 'ANTIVA PS 407', specs: '(75 sheets/ Stripcut)' },
                        { id: 'antiva-ps-407-cc', name: 'ANTIVA PS 407 CC', specs: '(100 sheets/ Crosscut)' },
                        { id: 'antiva-ps-407-ccx', name: 'ANTIVA PS 407 CCX', specs: '(60 sheets/ Crosscut)' },
                        { id: 'antiva-ps-409', name: 'ANTIVA PS 409', specs: '(95 sheets/ Stripcut)' },
                        { id: 'antiva-ps-409-cc', name: 'ANTIVA PS 409 CC', specs: '(125 sheets/ Crosscut)' },
                        { id: 'antiva-ps-409-ccx', name: 'ANTIVA PS 409 CCX', specs: '(80 sheets/ Crosscut)' }
                    ]
                },
                {
                    title: 'Departmental Heavy Duty Document Shredders With High Speed & High Motor Power',
                    models: [
                        { id: 'antiva-ps-4071', name: 'ANTIVA PS 4071', specs: '(70 Sheets/ Stripcut)' },
                        { id: 'antiva-ps-4071-cc', name: 'ANTIVA PS 4071 CC', specs: '(95 Sheets/ Crosscut)' }
                    ]
                },
                {
                    title: 'High Capacity Departmental Heavy Duty Document Shredders With High Speed and High Motor Power',
                    models: [
                        { id: 'antiva-ps-4091', name: 'ANTIVA PS 4091', specs: '(95 sheets/ Stripcut)' },
                        { id: 'antiva-ps-4091-cc', name: 'ANTIVA PS 4091 CC', specs: '(125 sheets/ Crosscut)' }
                    ]
                },
                {
                    title: 'Industrial Shredders',
                    models: [
                        { id: 'antiva-ps-409-hd', name: 'ANTIVA PS 409 HD', specs: '(100 sheets/ Strip Cut)' },
                        { id: 'antiva-ps-409-hdcc', name: 'ANTIVA PS 409 HDCC', specs: '(125 sheets/ Cross Cut)' },
                        { id: 'antiva-ps-500', name: 'ANTIVA PS 500', specs: '(96 sheets/ Strip Cut)' },
                        { id: 'antiva-ps-500-cc', name: 'ANTIVA PS 500 CC', specs: '(125 sheets/ Cross Cut)' }
                    ]
                }
            ]
        }
    ];

    const currentCategoryData = allCategories.find(c => c.id === category) || allCategories.find(c => c.id === 'default');

    // Filter Logic
    const filteredGroups = currentCategoryData.groups.map(group => {
        const filteredModels = group.models.filter(model =>
            model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            model.specs.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return { ...group, models: filteredModels };
    }).filter(group => group.models.length > 0);

    return (
        <div className="product-detail-page container">
            <div className="product-detail-layout">
                {/* Left Column: Featured Product Image */}
                <div className="left-column">
                    <div className="featured-image-container">
                        <img src={headerContent.image} alt={headerContent.title} className="featured-image" />
                        <h2 className="featured-title">{headerContent.title}</h2>
                        <p className="featured-specs">{headerContent.specs}</p>
                    </div>
                </div>

                {/* Right Column: Key Features / Model Lists */}
                <div className="right-column">
                    <div className="search-bar-container" style={{ marginBottom: '20px', position: 'relative' }}>
                        <Search size={20} color="#0f8b4d" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            placeholder="Search models..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 40px',
                                fontSize: '16px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}
                        />
                    </div>

                    <div className="models-grid">
                        {filteredGroups.length === 0 ? <p>No models found.</p> : filteredGroups.map((group, index) => (
                            <div key={index} className="model-category">
                                <h3>{group.title}</h3>
                                <ul>
                                    {group.models.map(model => (
                                        <li key={model.id}>
                                            <Link to={`/model/${model.id}`}><span>&gt;</span> {model.name} <span className="specs">{model.specs}</span></Link>
                                            {model.gem && <span className="tag">PRODUCT AVAILABLE ON <span className="gem">GeM</span></span>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {category === 'app-shredders' && (
                            <div className="info-links-section" style={{ marginTop: '40px', textAlign: 'center' }}>
                                <a href="#" className="btn-primary" style={{ marginRight: '20px' }}>What you want to shred</a>
                                <a href="#" className="btn-secondary">Watch Shredding In Action</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AntivaDetail;
