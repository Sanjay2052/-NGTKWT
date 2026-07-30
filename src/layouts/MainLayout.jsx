import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import LegalModal from '../components/Modal/LegalModal';
import { CheckCircle2, X, ArrowUp } from 'lucide-react';
import { useScroll } from '../hooks/useScroll';
import { scrollToTop } from '../utils/scrollToTop';
import './MainLayout.css';

export default function MainLayout({ children, toastMessage, setToastMessage }) {
  const [legalType, setLegalType] = useState(null);
  const showScrollTop = useScroll(400);

  return (
    <div className="main-layout">
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 99999,
          background: 'linear-gradient(135deg, #0B1E36, #07111E)',
          border: '1px solid var(--color-orange-primary)',
          padding: '1rem 1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 30px rgba(249, 87, 56, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#FFFFFF'
        }}>
          <CheckCircle2 size={22} style={{ color: '#4ADE80' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Success</div>
            <div style={{ fontSize: '0.825rem', color: 'var(--color-gray-300)' }}>{toastMessage}</div>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            style={{ background: 'transparent', border: 'none', color: 'var(--color-gray-400)', cursor: 'pointer', marginLeft: '0.5rem' }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar />

      {/* Main Page Slot */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <Footer onOpenLegal={(type) => setLegalType(type)} />

      {/* Legal Modal */}
      <LegalModal type={legalType} onClose={() => setLegalType(null)} />

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={() => scrollToTop(true)}
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            bottom: toastMessage ? '7rem' : '2rem',
            right: '2rem',
            zIndex: 9999,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0B1E36, #07111E)',
            border: '1.5px solid var(--color-orange-primary, #F95738)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(249, 87, 56, 0.4)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(249, 87, 56, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(249, 87, 56, 0.4)';
          }}
        >
          <ArrowUp size={22} style={{ color: 'var(--color-orange-primary, #F95738)' }} />
        </button>
      )}
    </div>
  );
}
