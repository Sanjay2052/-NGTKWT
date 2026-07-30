import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import './Modal.css';

export default function LegalModal({ type, onClose }) {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="modal-overlay">
      <div style={{
        width: '100%',
        maxWidth: '800px',
        maxHeight: '88vh',
        overflowY: 'auto',
        padding: 'clamp(1.25rem, 3vw, 2.5rem)',
        background: '#FFFFFF',
        border: '1px solid #D1D9E0',
        borderRadius: '1.25rem',
        color: '#0A2540',
        boxShadow: '0 25px 60px rgba(10,37,64,0.2)'
      }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={26} style={{ color: 'var(--color-gold-primary)' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy-950)' }}>
              {isPrivacy ? 'Privacy Policy & Data Security' : 'Terms of Service & Operational Guidelines'}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#F4F6F9',
              border: '1px solid #D1D9E0',
              color: '#0A2540',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ color: 'var(--color-gray-600)', fontSize: '0.95rem', lineHeight: 1.7 }}>
          {isPrivacy ? (
            <>
              <p style={{ marginBottom: '1rem' }}>
                Next Generation Talent (NGTKWT) respects your privacy and is committed to protecting all personal and professional data submitted through our recruitment portal in accordance with Kuwait labor privacy standards and GDPR compliance.
              </p>

              <h4 style={{ color: 'var(--color-navy-950)', fontSize: '1.1rem', marginTop: '1.25rem', marginBottom: '0.5rem' }}>1. Data Collection & CV Storage</h4>
              <p style={{ marginBottom: '1rem' }}>
                When job candidates upload CVs, trade certifications, or contact details, NGTKWT collects this information exclusively for evaluating qualifications for active oil & gas project vacancies. Data is securely stored in encrypted database servers and Google Drive repository.
              </p>

              <h4 style={{ color: 'var(--color-navy-950)', fontSize: '1.1rem', marginTop: '1.25rem', marginBottom: '0.5rem' }}>2. Employer Information Confidentiality</h4>
              <p style={{ marginBottom: '1rem' }}>
                All corporate requisitions, site locations, project specifications, and worker headcounts shared by energy clients remain strictly confidential under Non-Disclosure Agreements (NDAs).
              </p>
            </>
          ) : (
            <>
              <p style={{ marginBottom: '1rem' }}>
                Welcome to NGTKWT. By accessing our platform or submitting workforce requisitions, you agree to comply with our enterprise recruitment terms and operating guidelines.
              </p>

              <h4 style={{ color: 'var(--color-navy-950)', fontSize: '1.1rem', marginTop: '1.25rem', marginBottom: '0.5rem' }}>1. Recruitment & Staffing Guarantees</h4>
              <p style={{ marginBottom: '1rem' }}>
                NGTKWT provides certified personnel who meet client job specifications. All placements are covered under our standard 90-day candidate replacement policy as set forth in commercial master service agreements.
              </p>
            </>
          )}
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'right' }}>
          <button onClick={onClose} className="btn-orange" style={{ padding: '0.6rem 1.5rem' }}>
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
}
