import React from 'react';
import HeroButtons from './HeroButtons';
import HeroStats from './HeroStats';
import heroBg from '../../assets/images/hero/hero-bg.png';
import './Hero.css';

export default function Hero() {
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
        url('${heroBg}') center/cover no-repeat
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
          <HeroButtons />

        </div>
      </div>

      {/* Energy Sectors Ribbon */}
      <HeroStats />

    </section>
  );
}
