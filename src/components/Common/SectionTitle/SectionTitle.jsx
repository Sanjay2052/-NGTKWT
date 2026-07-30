import React from 'react';
import './SectionTitle.css';

export default function SectionTitle({ badge, title, subtitle, centered = false }) {
  return (
    <div className={`section-header-title ${centered ? 'text-center' : ''}`}>
      {badge && <span className="badge-gold mb-3">{badge}</span>}
      {title && <h2 className="section-main-heading">{title}</h2>}
      {subtitle && <p className="section-sub-heading">{subtitle}</p>}
    </div>
  );
}
