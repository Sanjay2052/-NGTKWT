import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactForm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="glass-card-light" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
        <div style={{
          width: '45px',
          height: '45px',
          borderRadius: '0.75rem',
          background: 'rgba(212, 175, 55, 0.12)',
          color: 'var(--color-gold-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <MapPin size={24} />
        </div>
        <div>
          <h4 style={{ color: 'var(--color-navy-950)', fontSize: '1.1rem', marginBottom: '0.35rem' }}>Location</h4>
          <p style={{ color: 'var(--color-steel-grey)', fontSize: '0.925rem', lineHeight: 1.6 }}>
            State of Kuwait
          </p>
        </div>
      </div>

      <div className="glass-card-light" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
        <div style={{
          width: '45px',
          height: '45px',
          borderRadius: '0.75rem',
          background: 'rgba(212, 175, 55, 0.12)',
          color: 'var(--color-gold-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Mail size={24} />
        </div>
        <div>
          <h4 style={{ color: 'var(--color-navy-950)', fontSize: '1.1rem', marginBottom: '0.35rem' }}>Official Email</h4>
          <p style={{ color: 'var(--color-steel-grey)', fontSize: '0.925rem' }}>
            Enterprise & Candidate Inquiries: <a href="mailto:mohcenbenjame3@ngtkwt.com" style={{ color: 'var(--color-gold-primary)', textDecoration: 'none', fontWeight: 600 }}>mohcenbenjame3@ngtkwt.com</a>
          </p>
        </div>
      </div>

      <div className="glass-card-light" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
        <div style={{
          width: '45px',
          height: '45px',
          borderRadius: '0.75rem',
          background: 'rgba(212, 175, 55, 0.12)',
          color: 'var(--color-gold-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Clock size={24} />
        </div>
        <div>
          <h4 style={{ color: 'var(--color-navy-950)', fontSize: '1.1rem', marginBottom: '0.35rem' }}>Platform Support</h4>
          <p style={{ color: 'var(--color-steel-grey)', fontSize: '0.925rem' }}>
            Sunday – Thursday: 8:00 AM – 5:00 PM (AST)
          </p>
        </div>
      </div>
    </div>
  );
}
