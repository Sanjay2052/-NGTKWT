import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/NGTKWTlogo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E2E8F0',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.06)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.8rem' }}>
        
        {/* Brand Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <img 
            src={logo} 
            alt="NGTKWT Logo" 
            style={{ 
              height: '3.2rem', 
              maxHeight: '52px', 
              width: 'auto', 
              objectFit: 'contain',
              display: 'block' 
            }} 
          />
        </a>

        {/* Center Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }} className="desktop-nav">
          <a href="#about" style={{ color: '#0A2540', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em' }}>ABOUT</a>
          <a href="#services" style={{ color: '#0A2540', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em' }}>SERVICES</a>
          <a href="#industries" style={{ color: '#0A2540', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em' }}>INDUSTRIES</a>
          <a href="#why-us" style={{ color: '#0A2540', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em' }}>WHY US</a>
          <a href="#faq" style={{ color: '#0A2540', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em' }}>FAQ</a>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="desktop-nav">
          <a href="#jobseekers" style={{ color: 'var(--color-navy-950)', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, padding: '0.5rem 0.9rem', border: '1px solid #CBD5E1', borderRadius: '0.5rem' }}>
            APPLY (CV)
          </a>
          <a href="#employers" className="btn-gold" style={{ padding: '0.55rem 1.25rem', fontSize: '0.8rem' }}>
            HIRE TALENT
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: '#0A2540',
            cursor: 'pointer',
            padding: '0.4rem'
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {mobileMenuOpen && (
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
          <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ color: '#0A2540', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>About Us</a>
          <a href="#why-us" onClick={() => setMobileMenuOpen(false)} style={{ color: '#0A2540', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>Why Choose Us</a>
          <a href="#safety" onClick={() => setMobileMenuOpen(false)} style={{ color: '#0A2540', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>Safety & Compliance</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#0A2540', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>Services & Talent</a>
          <a href="#industries" onClick={() => setMobileMenuOpen(false)} style={{ color: '#0A2540', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>Industries</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} style={{ color: '#0A2540', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>FAQ</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ color: '#0A2540', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>Contact</a>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            <a href="#employers" className="btn-gold" onClick={() => setMobileMenuOpen(false)} style={{ width: '100%', textAlign: 'center' }}>HIRE TALENT</a>
            <a href="#jobseekers" onClick={() => setMobileMenuOpen(false)} style={{ width: '100%', textAlign: 'center', color: '#0A2540', fontWeight: 700, padding: '0.6rem', border: '1px solid #CBD5E1', borderRadius: '0.5rem', textDecoration: 'none' }}>APPLY NOW (WORKERS)</a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
