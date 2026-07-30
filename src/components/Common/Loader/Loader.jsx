import React from 'react';
import './Loader.css';

export default function Loader({ size = 'medium', color = 'var(--color-gold-primary)' }) {
  return (
    <div className="loader-container">
      <div className={`spinner ${size}`} style={{ borderColor: `${color} transparent transparent transparent` }} />
    </div>
  );
}
