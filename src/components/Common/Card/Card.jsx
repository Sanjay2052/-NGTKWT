import React from 'react';
import './Card.css';

export default function Card({ children, className = '', variant = 'glass-card-light', ...props }) {
  return (
    <div className={`${variant} ${className}`} {...props}>
      {children}
    </div>
  );
}
