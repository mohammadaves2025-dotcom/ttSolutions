import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content container">
                <div className="hero-text-box">
                    <h2>Ensure your <span className="highlight">Office Documents</span></h2>
                    <h3>are better presented & protected.</h3>
                    <p>Discover our range of Laminators, Binders, and Shredders.</p>
                    <button className="btn hero-btn">Explore Products</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
