import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const BuyProductsBanner = () => (
  <>
    <style>{`
      .buy-banner {
        background: var(--emerald-xlight);
        border-top: 1px solid var(--emerald-light);
        border-bottom: 1px solid var(--emerald-light);
        padding: 28px 0;
      }
      .buy-banner-inner {
        display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;
      }
      .buy-banner-text { display: flex; align-items: center; gap: 16px; }
      .buy-banner-icon {
        width: 44px; height: 44px; border-radius: 12px;
        background: var(--emerald); display: flex; align-items: center; justify-content: center; color: white;
      }
      .buy-banner-title { font-family: var(--font-display) !important; font-size: 18px; font-weight: 700; color: var(--ink); }
      .buy-banner-sub { font-size: 13px; color: var(--gray-mid); }
      @media (max-width: 600px) { .buy-banner-inner { flex-direction: column; text-align: center; } .buy-banner-text { flex-direction: column; } }
    `}</style>
    <div className="buy-banner">
      <div className="container buy-banner-inner">
        <div className="buy-banner-text">
          <div className="buy-banner-icon"><ShoppingBag size={20} /></div>
          <div>
            <div className="buy-banner-title">Products also available on GeM Portal</div>
            <div className="buy-banner-sub">Government entities can purchase directly via the Government e-Marketplace</div>
          </div>
        </div>
        <Link to="/select-brand/products-on-gem" className="btn" style={{ flexShrink: 0 }}>
          View GeM Products <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </>
);

export default BuyProductsBanner;
