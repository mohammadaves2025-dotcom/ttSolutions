import React, { useState } from 'react';
import { MessageCircle, X, Phone, Mail, Send } from 'lucide-react';

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
          box-shadow: var(--shadow-lg); padding: 24px; width: 260px;
          animation: scaleIn 0.2s ease; transform-origin: bottom right;
        }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        .enquiry-popup h4 { font-family: var(--font-display) !important; font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
        .enquiry-popup p { font-size: 13px; color: var(--gray-mid); margin-bottom: 16px; }
        .enquiry-option {
          display: flex; align-items: center; gap: 10px; padding: 10px 14px;
          border-radius: 10px; border: 1px solid var(--border); margin-bottom: 8px;
          font-size: 13px; font-weight: 600; color: var(--ink); cursor: pointer;
          transition: all 0.2s; background: var(--white); text-decoration: none;
        }
        .enquiry-option:hover { background: var(--emerald); color: var(--white); border-color: var(--emerald); }
        .enquiry-option:hover svg { color: white; }
        .enquiry-option svg { color: var(--emerald); }
        .enquiry-btn {
          width: 56px; height: 56px; border-radius: 50%;
          background: var(--emerald); border: none; color: white;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; box-shadow: 0 4px 20px rgba(10,122,69,0.4);
          transition: all 0.25s; animation: pulseGlow 2.5s infinite;
        }
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 4px 20px rgba(10,122,69,0.4), 0 0 0 0 rgba(10,122,69,0.4); }
          50% { box-shadow: 0 4px 20px rgba(10,122,69,0.4), 0 0 0 12px rgba(10,122,69,0); }
        }
        .enquiry-btn:hover { background: var(--emerald-deep); transform: scale(1.08); }
      `}</style>
      <div className="enquiry-fab">
        {open && (
          <div className="enquiry-popup">
            <h4>Quick Enquiry</h4>
            <p>How would you like to reach us?</p>
            <a href="tel:+919811757846" className="enquiry-option"><Phone size={16} /> Call Us Now</a>
            <a href="mailto:ttofficesolutions786@gmail.com" className="enquiry-option"><Mail size={16} /> Send Email</a>
            <a href="/contactus" className="enquiry-option"><Send size={16} /> Send Message</a>
          </div>
        )}
        <button className="enquiry-btn" onClick={() => setOpen(o => !o)}>
          {open ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>
    </>
  );
};

export default EnquiryButton;
