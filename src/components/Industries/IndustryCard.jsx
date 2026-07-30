import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function IndustryCard({ industry }) {
  return (
    <div 
      className="glass-card-light" 
      style={{
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid #D1D9E0'
      }}
    >
      <div>
        <div style={{
          width: '4rem',
          height: '4rem',
          borderRadius: '1rem',
          background: 'rgba(212, 175, 55, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          {industry.icon}
        </div>
        <h3 style={{ color: 'var(--color-navy-950)', fontSize: '1.25rem', marginBottom: '0.35rem' }}>
          {industry.title}
        </h3>
        <div style={{ color: 'var(--color-gold-primary)', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.85rem' }}>
          {industry.subtitle}
        </div>
        <p style={{ color: 'var(--color-steel-grey)', fontSize: '0.875rem', lineHeight: 1.6 }}>
          {industry.description}
        </p>
      </div>

      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
        <a href="#employers" style={{ color: 'var(--color-navy-950)', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Explore Sector Talent</span>
          <ArrowRight size={14} style={{ color: 'var(--color-gold-primary)' }} />
        </a>
      </div>
    </div>
  );
}
