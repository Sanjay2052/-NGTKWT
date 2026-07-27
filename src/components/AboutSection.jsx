import React from 'react';
import { Network, Target, ShieldCheck } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="section-padding" style={{
      background: '#FFFFFF',
      color: 'var(--color-navy-950)'
    }}>
      <div className="container">

        {/* Section Header Grid */}
        <div style={{ alignItems: 'flex-start', marginBottom: '3.5rem' }} className="about-header-grid">
          <div>
            <h2 style={{ marginBottom: '1rem' }}>
              Bridging Energy Enterprises & Specialized Professionals
            </h2>
            <p style={{ color: 'var(--color-steel-grey)', fontSize: '1.05rem', lineHeight: 1.65 }}>
              NGTKWT is a dedicated B2B talent connection platform. We empower oil and gas organizations to discover highly qualified technical professionals across every discipline while giving skilled experts a platform to showcase their industry capabilities.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '2rem 3rem', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-navy-950)', lineHeight: 1.2 }}>B2B Network</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-steel-grey)', fontWeight: 600, marginTop: '0.3rem' }}>Enterprise Platform</div>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-gold-primary)', lineHeight: 1.2 }}>Global Energy</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-steel-grey)', fontWeight: 600, marginTop: '0.3rem' }}>Technical Disciplines</div>
            </div>
          </div>
        </div>

        {/* 3 Cards */}
        <div className="grid-3">

          {/* Card 1 */}
          <div className="glass-card-light" style={{ padding: '2.25rem' }}>
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '0.6rem',
              background: 'rgba(212, 175, 55, 0.12)',
              color: 'var(--color-gold-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Network size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-navy-950)', marginBottom: '0.75rem' }}>
              Enterprise Talent Network
            </h3>
            <p style={{ color: 'var(--color-steel-grey)', fontSize: '0.925rem', lineHeight: 1.6 }}>
              Direct access to a verified network of drilling engineers, HSE officers, subsea operators, and technical project leads.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{
            background: 'var(--color-navy-950)',
            color: '#FFFFFF',
            borderRadius: '1rem',
            padding: '2.25rem',
            boxShadow: '0 15px 35px rgba(10, 37, 64, 0.25)',
            border: '1px solid rgba(212, 175, 55, 0.4)'
          }}>
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '0.6rem',
              background: 'var(--color-gold-primary)',
              color: '#0A2540',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>
              Technical Professional Profiles
            </h3>
            <p style={{ color: 'var(--color-gray-300)', fontSize: '0.925rem', lineHeight: 1.6 }}>
              Allowing experienced energy candidates to present their certifications, field background, and specialized technical qualifications.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card-light" style={{ padding: '2.25rem' }}>
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '0.6rem',
              background: 'rgba(212, 175, 55, 0.12)',
              color: 'var(--color-gold-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-navy-950)', marginBottom: '0.75rem' }}>
              Safety & Compliance Alignment
            </h3>
            <p style={{ color: 'var(--color-steel-grey)', fontSize: '0.925rem', lineHeight: 1.6 }}>
              Structured to align candidate qualification submissions with international oilfield safety standards and statutory requirements.
            </p>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-header-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
