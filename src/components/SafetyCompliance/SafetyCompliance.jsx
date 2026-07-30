import React from 'react';
import { ShieldCheck, UserCheck } from 'lucide-react';
import './SafetyCompliance.css';

export default function SafetyCompliance() {
  const safetyPoints = [
    {
      title: 'Safety-Focused Network',
      desc: 'Connecting safety-conscious technical professionals dedicated to zero-harm operations.'
    },
    {
      title: 'Compliance-Aware Professionals',
      desc: 'Candidates experienced in international HSE guidelines and site safety protocols.'
    },
    {
      title: 'Industry Best Practices',
      desc: 'Promoting operational excellence across onshore, offshore, and subsea projects.'
    },
    {
      title: 'Credential Transparency',
      desc: 'Enabling professionals to showcase verified trade certifications and safety credentials.'
    }
  ];

  return (
    <section id="safety" className="section-padding" style={{
      background: '#F4F6F9',
      color: 'var(--color-navy-950)'
    }}>
      <div className="container">

        <div style={{ alignItems: 'center' }} className="safety-grid">

          {/* Left Column Text & Features */}
          <div>
            <h2 style={{ marginBottom: '1rem' }}>
              Safety-Focused <span style={{ color: 'var(--color-gold-primary)' }}>& Compliance Network</span>
            </h2>
            <p style={{ color: 'var(--color-steel-grey)', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '2.5rem' }}>
              In the energy industry, safety and regulatory alignment are paramount. NGTKWT provides a platform that connects energy organizations with compliance-aware technical talent trained in international HSE best practices.
            </p>

            <div className="safety-points-grid">
              {safetyPoints.map((point, idx) => (
                <div key={idx} style={{
                  background: '#FFFFFF',
                  padding: '1.25rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #D1D9E0',
                  boxShadow: '0 2px 8px rgba(10,37,64,0.04)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-primary)', fontWeight: 700, marginBottom: '0.35rem' }}>
                    <ShieldCheck size={18} />
                    <span>{point.title}</span>
                  </div>
                  <p style={{ color: 'var(--color-steel-grey)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Control Room Graphic with Floating Badge */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '1.25rem',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(10, 37, 64, 0.15)',
              border: '1px solid #D1D9E0',
              position: 'relative'
            }}>
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                alt="Offshore Operations Control Room"
                style={{ width: '100%', height: 'clamp(250px, 35vh, 420px)', objectFit: 'cover', display: 'block' }}
              />

              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                maxWidth: 'calc(100% - 2rem)',
                background: 'var(--color-navy-950)',
                color: '#FFFFFF',
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--color-gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0A2540',
                  flexShrink: 0
                }}>
                  <UserCheck size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em' }}>SAFETY-FOCUSED NETWORK</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-gray-300)' }}>ENTERPRISE COMPLIANT</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
