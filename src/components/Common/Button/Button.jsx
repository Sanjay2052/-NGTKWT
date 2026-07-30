import React from 'react';
import './Button.css';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const btnClass = variant === 'secondary' ? 'btn-secondary-glass' : 'btn-gold';
  return (
    <button className={`${btnClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
