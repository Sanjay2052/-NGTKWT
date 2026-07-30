import React from 'react';

export default function NavbarMobile({ onClose }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      padding: '1.25rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.9rem',
      boxShadow: '0 10px 25px rgba(10,37,64,0.08)',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <a href="#about" onClick={onClose} style={{ color: '#0A2540', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>About Us</a>
      <a href="#why-us" onClick={onClose} style={{ color: '#0A2540', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>Why Choose Us</a>
      <a href="#safety" onClick={onClose} style={{ color: '#0A2540', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>Safety & Compliance</a>
      <a href="#services" onClick={onClose} style={{ color: '#0A2540', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>Services & Talent</a>
      <a href="#industries" onClick={onClose} style={{ color: '#0A2540', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>Industries</a>
      <a href="#faq" onClick={onClose} style={{ color: '#0A2540', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>FAQ</a>
      <a href="#contact" onClick={onClose} style={{ color: '#0A2540', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>Contact</a>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
        <a href="#employers" className="btn-gold" onClick={onClose} style={{ width: '100%', textAlign: 'center' }}>HIRE TALENT</a>
        <a href="#jobseekers" onClick={onClose} style={{ width: '100%', textAlign: 'center', color: '#0A2540', fontWeight: 700, padding: '0.6rem', border: '1px solid #CBD5E1', borderRadius: '0.5rem', textDecoration: 'none' }}>APPLY NOW (WORKERS)</a>
      </div>
    </div>
  );
}
