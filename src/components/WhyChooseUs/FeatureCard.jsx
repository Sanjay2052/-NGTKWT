import React from 'react';

export default function FeatureCard({ benefit }) {
  return (
    <div 
      className="glass-card-light"
      style={{
        padding: '1.75rem',
        borderRadius: '1rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '0.6rem',
          background: 'rgba(249, 87, 56, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {benefit.icon}
        </div>
        <h3 style={{ color: 'var(--color-navy-950)', fontSize: '1.1rem', fontWeight: 700 }}>
          {benefit.title}
        </h3>
      </div>
      <p style={{ color: 'var(--color-gray-600)', fontSize: '0.875rem', lineHeight: 1.6 }}>
        {benefit.description}
      </p>
    </div>
  );
}
