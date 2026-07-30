import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';

export default function HeroButtons() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }} className="hero-cta-buttons">
      <a href="#employers" className="btn-gold" style={{ padding: '0.95rem 2.2rem', fontSize: '1rem' }}>
        Enterprise Solutions <ArrowRight size={18} />
      </a>
      <a href="#jobseekers" className="btn-secondary-glass" style={{ padding: '0.95rem 2.2rem', fontSize: '1rem', background: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.4)' }}>
        Submit Your CV <ExternalLink size={16} />
      </a>
    </div>
  );
}
