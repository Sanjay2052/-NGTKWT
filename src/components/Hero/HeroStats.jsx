import React from 'react';

export default function HeroStats() {
  const sectors = ['DRILLING & RIGS', 'HSE & SAFETY', 'OFFSHORE & SUBSEA', 'REFINERY & LNG', 'EPC CONSTRUCTION'];

  return (
    <div style={{
      background: '#F4F6F9',
      borderTop: '1px solid #D1D9E0',
      borderBottom: '1px solid #D1D9E0',
      padding: '0.85rem 0',
      marginTop: 'auto'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-steel-grey)', letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center' }}>
          Professionals with Experience Across Global Energy Sectors
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem 1.25rem'
        }}>
          {sectors.map((sector, idx) => (
            <span
              key={idx}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
                fontWeight: 700,
                color: 'var(--color-navy-950)',
                letterSpacing: '0.04em',
                textAlign: 'center'
              }}
            >
              {sector}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
