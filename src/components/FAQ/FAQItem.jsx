import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div 
      style={{
        background: '#FFFFFF',
        borderRadius: '0.85rem',
        border: isOpen ? '1.5px solid var(--color-gold-primary)' : '1px solid #D1D9E0',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(10,37,64,0.04)',
        transition: 'all 0.3s ease'
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '1.1rem clamp(1rem, 3vw, 1.75rem)',
          background: isOpen ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
          border: 'none',
          color: 'var(--color-navy-950)',
          textAlign: 'left',
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          gap: '0.75rem'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <HelpCircle size={20} style={{ color: isOpen ? 'var(--color-gold-primary)' : 'var(--color-steel-grey)', flexShrink: 0 }} />
          {faq.question}
        </span>
        <ChevronDown 
          size={20} 
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            color: isOpen ? 'var(--color-gold-primary)' : 'var(--color-steel-grey)',
            flexShrink: 0
          }} 
        />
      </button>

      {isOpen && (
        <div style={{
          padding: '0 1.75rem 1.5rem 1.75rem',
          color: 'var(--color-steel-grey)',
          fontSize: '0.95rem',
          lineHeight: 1.7,
          borderTop: '1px solid #D1D9E0',
          paddingTop: '1rem',
          background: '#FFFFFF'
        }}>
          {faq.answer}
        </div>
      )}
    </div>
  );
}
