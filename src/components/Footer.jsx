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

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn"
                style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '0.75rem', 
                  background: 'rgba(212, 175, 55, 0.12)', 
                  border: '1.5px solid rgba(212, 175, 55, 0.35)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(10,37,64,0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-gold-primary)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.setAttribute('stroke', '#0A2540');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.12)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.setAttribute('stroke', 'var(--color-gold-primary)');
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="X (Twitter)"
                style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '0.75rem', 
                  background: 'rgba(212, 175, 55, 0.12)', 
                  border: '1.5px solid rgba(212, 175, 55, 0.35)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(10,37,64,0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-gold-primary)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.setAttribute('stroke', '#0A2540');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.12)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.setAttribute('stroke', 'var(--color-gold-primary)');
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '0.75rem', 
                  background: 'rgba(212, 175, 55, 0.12)', 
                  border: '1.5px solid rgba(212, 175, 55, 0.35)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(10,37,64,0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-gold-primary)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.setAttribute('stroke', '#0A2540');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.12)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  const svg = e.currentTarget.querySelector('svg');
                  if (svg) svg.setAttribute('stroke', 'var(--color-gold-primary)');
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
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
