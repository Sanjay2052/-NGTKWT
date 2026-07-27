import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';

export default function HeroSection() {
  const clientLogos = [
    'SCHLUMBERGER',
    'HALLIBURTON',
    'BAKER HUGHES',
    'AIRSWIFT',
    'BRUNEL'
  ];

  return (
    <section id="home" style={{
      position: 'relative',
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '6.5rem',
      overflow: 'hidden',
      background: `
        linear-gradient(to right, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.75) 50%, rgba(15, 23, 42, 0.5) 100%),
        url('/hero-bg.png') center/cover no-repeat
      `
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '2rem', paddingBottom: '3.5rem' }}>
        <div style={{ maxWidth: '680px' }}>

          {/* Top Badge */}
          <div className="badge-gold" style={{ marginBottom: '1.25rem', background: 'rgba(212, 175, 55, 0.2)', borderColor: 'rgba(212, 175, 55, 0.5)', color: '#D4AF37' }}>
            B2B TALENT CONNECTION PLATFORM
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(2.1rem, 5.5vw + 0.5rem, 3.6rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.15,
            marginBottom: '1.25rem',
            letterSpacing: '-0.03em'
          }}>
            Connecting <span style={{ color: 'var(--color-gold-primary)' }}>Top-Tier Oil & Gas Talent</span> with Industry Leaders
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(0.95rem, 2vw + 0.4rem, 1.1rem)',
            color: '#E2E8F0',
            lineHeight: 1.65,
            marginBottom: '2.25rem',
            maxWidth: '640px'
          }}>
            NGTKWT is a B2B platform connecting global energy companies with highly qualified technical professionals. We help organizations discover specialized expertise while enabling skilled talent to showcase their experience.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }} className="hero-cta-buttons">
            <a href="#employers" className="btn-gold" style={{ padding: '0.95rem 2.2rem', fontSize: '1rem' }}>
              Enterprise Solutions <ArrowRight size={18} />
            </a>
            <a href="#jobseekers" className="btn-secondary-glass" style={{ padding: '0.95rem 2.2rem', fontSize: '1rem', background: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.4)' }}>
              Submit Your CV <ExternalLink size={16} />
            </a>
          </div>

        </div>
      </div>

      {/* Energy Sectors Ribbon */}
      <div style={{
        background: '#F4F6F9',
        borderTop: '1px solid #D1D9E0',
        borderBottom: '1px solid #D1D9E0',
        padding: '1.1rem 0',
        marginTop: 'auto'
      }}>
        <div className="container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-steel-grey)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Professionals with Experience Across Global Energy Sectors
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem 2rem'
          }}>
            {['DRILLING & RIGS', 'HSE & SAFETY', 'OFFSHORE & SUBSEA', 'REFINERY & LNG', 'EPC CONSTRUCTION'].map((sector, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)',
                  fontWeight: 700,
                  color: 'var(--color-navy-950)',
                  letterSpacing: '0.06em',
                  textAlign: 'center'
                }}
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
