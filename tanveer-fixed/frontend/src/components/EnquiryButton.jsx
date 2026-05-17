import React, { useState } from 'react';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';

// WhatsApp number — update if client changes their number
const WHATSAPP_NUMBER = '919811757846';
const WHATSAPP_MESSAGE = encodeURIComponent('Hello! I would like to enquire about your office solutions products.');

const EnquiryButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .enquiry-fab {
          position: fixed; bottom: 28px; right: 28px; z-index: 999;
          display: flex; flex-direction: column; align-items: flex-end; gap: 12px;
        }
        .enquiry-popup {
          background: var(--white); border: 1px solid var(--border); border-radius: 16px;
          box-shadow: var(--shadow-lg); padding: 24px; width: 268px;
          animation: scaleIn 0.2s ease; transform-origin: bottom right;
        }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        .enquiry-popup h4 { font-family: var(--font-display) !important; font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
        .enquiry-popup p { font-size: 13px; color: var(--gray-mid); margin-bottom: 16px; }
        .enquiry-option {
          display: flex; align-items: center; gap: 10px; padding: 11px 14px;
          border-radius: 10px; border: 1px solid var(--border); margin-bottom: 8px;
          font-size: 13px; font-weight: 600; color: var(--ink); cursor: pointer;
          transition: all 0.2s; background: var(--white); text-decoration: none;
        }
        .enquiry-option:last-child { margin-bottom: 0; }
        .enquiry-option:hover { background: var(--emerald); color: var(--white); border-color: var(--emerald); }
        .enquiry-option:hover svg { color: white; }
        .enquiry-option svg { color: var(--emerald); flex-shrink: 0; }
        .enquiry-option.whatsapp:hover { background: #25D366; border-color: #25D366; }

        /* WhatsApp icon inline SVG */
        .wa-icon {
          width: 16px; height: 16px; flex-shrink: 0; color: #25D366;
          transition: color 0.2s;
        }
        .enquiry-option.whatsapp:hover .wa-icon { color: white; }

        .enquiry-btn {
          width: 58px; height: 58px; border-radius: 50%;
          background: var(--emerald); border: none; color: white;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; box-shadow: 0 4px 20px rgba(10,122,69,0.4);
          transition: all 0.25s; animation: pulseGlow 2.5s infinite;
          position: relative;
        }
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 4px 20px rgba(10,122,69,0.4), 0 0 0 0 rgba(10,122,69,0.4); }
          50% { box-shadow: 0 4px 20px rgba(10,122,69,0.4), 0 0 0 12px rgba(10,122,69,0); }
        }
        .enquiry-btn:hover { background: var(--emerald-deep); transform: scale(1.08); }

        /* Notification dot when closed */
        .enquiry-dot {
          position: absolute; top: 2px; right: 2px;
          width: 14px; height: 14px; background: #ef4444; border-radius: 50%;
          border: 2px solid white; font-size: 8px; color: white;
          display: flex; align-items: center; justify-content: center; font-weight: 700;
        }
      `}</style>
      <div className="enquiry-fab">
        {open && (
          <div className="enquiry-popup">
            <h4>Quick Enquiry</h4>
            <p>How would you like to reach us?</p>

            {/* WhatsApp — primary CTA for Indian B2B */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              className="enquiry-option whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="wa-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.552 4.112 1.512 5.836L.038 23.964l6.28-1.448A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.003-1.371l-.36-.213-3.73.859.896-3.625-.234-.373A9.817 9.817 0 012.182 12c0-5.422 4.396-9.818 9.818-9.818 5.421 0 9.818 4.396 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/>
              </svg>
              WhatsApp Us
            </a>

            <a href="tel:+919811757846" className="enquiry-option">
              <Phone size={16} /> Call Us Now
            </a>
            <a href="mailto:ttofficesolutions786@gmail.com" className="enquiry-option">
              <Mail size={16} /> Send Email
            </a>
          </div>
        )}
        <button className="enquiry-btn" onClick={() => setOpen(o => !o)} aria-label="Quick enquiry">
          {open ? <X size={24} /> : <MessageCircle size={24} />}
          {!open && <span className="enquiry-dot">!</span>}
        </button>
      </div>
    </>
  );
};

export default EnquiryButton;
