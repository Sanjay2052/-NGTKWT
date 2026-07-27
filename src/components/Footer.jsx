import React from 'react';
import { Globe2, Mail, Phone, MapPin, Building2, Share2 } from 'lucide-react';
import logo from '../assets/NGTKWTlogo.png';

export default function Footer({ onOpenLegal }) {
  return (
    <footer style={{
      background: '#F8FAFC',
      borderTop: '1px solid #E2E8F0',
      paddingTop: '4rem',
      paddingBottom: '2rem',
      color: 'var(--color-gray-600)',
      fontSize: '0.875rem'
    }}>
      <div className="container-fluid">

        <div style={{ marginBottom: '3.5rem' }} className="footer-grid">

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
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
            </div>

            <p style={{ color: 'var(--color-steel-grey)', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Connecting enterprise energy companies with highly qualified technical professionals across the global oil and gas industry.
            </p>

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'var(--color-navy-950)', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid rgba(212, 175, 55, 0.3)', width: '36px', height: '36px', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><Building2 size={17} style={{ color: 'var(--color-gold-primary)' }} /></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" style={{ color: 'var(--color-navy-950)', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid rgba(212, 175, 55, 0.3)', width: '36px', height: '36px', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><Globe2 size={17} style={{ color: 'var(--color-gold-primary)' }} /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: 'var(--color-navy-950)', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid rgba(212, 175, 55, 0.3)', width: '36px', height: '36px', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><Share2 size={17} style={{ color: 'var(--color-gold-primary)' }} /></a>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--color-navy-950)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>QUICK LINKS</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#employers" style={{ color: 'var(--color-steel-grey)', textDecoration: 'none' }}>For Companies</a></li>
              <li><a href="#jobseekers" style={{ color: 'var(--color-steel-grey)', textDecoration: 'none' }}>For Candidates</a></li>
              <li><a href="#services" style={{ color: 'var(--color-steel-grey)', textDecoration: 'none' }}>Offshore Roles</a></li>
              <li><a href="#safety" style={{ color: 'var(--color-steel-grey)', textDecoration: 'none' }}>HSE Requirements</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--color-navy-950)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>ENTERPRISE</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#about" style={{ color: 'var(--color-steel-grey)', textDecoration: 'none' }}>Precision Placement</a></li>
              <li><a href="#services" style={{ color: 'var(--color-steel-grey)', textDecoration: 'none' }}>Contract Staffing</a></li>
              <li><a href="#services" style={{ color: 'var(--color-steel-grey)', textDecoration: 'none' }}>Executive Search</a></li>
              <li><a href="#contact" style={{ color: 'var(--color-steel-grey)', textDecoration: 'none' }}>Kuwait Headquarters</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--color-navy-950)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>CONTACT HQ</h4>
            <p style={{ color: 'var(--color-steel-grey)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={15} style={{ color: 'var(--color-gold-primary)' }} /> 
              <a href="mailto:mohcenbenjame3@ngtkwt.com" style={{ color: 'var(--color-steel-grey)', textDecoration: 'none' }}>mohcenbenjame3@ngtkwt.com</a>
            </p>
            <p style={{ color: 'var(--color-steel-grey)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={15} style={{ color: 'var(--color-gold-primary)' }} /> +965 2200 8888
            </p>
            <p style={{ color: 'var(--color-steel-grey)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={15} style={{ color: 'var(--color-gold-primary)' }} /> Kuwait City, State of Kuwait
            </p>
          </div>

        </div>

        <div className="footer-bottom-bar" style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem'
        }}>
          <div>
            © {new Date().getFullYear()} NGTKWT LLC. State of Kuwait. Professional Workforce Solutions.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button onClick={() => onOpenLegal('privacy')} style={{ background: 'transparent', border: 'none', color: 'var(--color-gray-600)', cursor: 'pointer' }}>Privacy Policy</button>
            <button onClick={() => onOpenLegal('terms')} style={{ background: 'transparent', border: 'none', color: 'var(--color-gray-600)', cursor: 'pointer' }}>Terms of Service</button>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 2rem !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .footer-bottom-bar {
            flex-direction: column !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
