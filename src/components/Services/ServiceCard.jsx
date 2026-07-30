import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ServiceCard({ item }) {
  return (
    <div 
      className="glass-card-light"
      style={{
        background: '#FFFFFF',
        border: '1px solid #D1D9E0',
        borderRadius: '1rem',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 4px 15px rgba(10,37,64,0.04)',
        transition: 'transform 0.3s ease, boxShadow 0.3s ease'
      }}
    >
      <div>
        <div style={{
          position: 'relative',
          height: '180px',
          width: '100%',
          overflow: 'hidden',
          background: '#0B1E36',
          borderBottom: '1px solid #E2E8F0'
        }}>
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
          <span style={{
            position: 'absolute',
            top: '0.85rem',
            right: '0.85rem',
            fontSize: '0.725rem',
            color: '#FFFFFF',
            background: 'rgba(11, 30, 54, 0.85)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(212, 175, 55, 0.6)',
            padding: '0.35rem 0.85rem',
            borderRadius: '1rem',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            {item.badge}
          </span>
        </div>

        <div style={{ padding: '1.5rem 1.5rem 0.75rem 1.5rem' }}>
          <h3 style={{ color: 'var(--color-navy-950)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.6rem' }}>
            {item.name}
          </h3>
          <p style={{ color: 'var(--color-steel-grey)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {item.description}
          </p>
        </div>
      </div>

      <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
        <div style={{ paddingTop: '1rem', borderTop: '1px solid #F1F5F9' }}>
          <a href="#employers" style={{ color: 'var(--color-navy-950)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            Request Talent <ArrowUpRight size={16} style={{ color: 'var(--color-gold-primary)' }} />
          </a>
        </div>
      </div>
    </div>
  );
}
