import React, { useState, useEffect } from 'react';

function AnimatedNumber({ target, suffix = '', prefix = '', duration = 2000, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, target, duration]);

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function CounterCard({ stat, isVisible }) {
  return (
    <div className="counter-card">
      <div style={{
        width: '3.25rem',
        height: '3.25rem',
        borderRadius: '0.75rem',
        background: 'rgba(212, 175, 55, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {stat.icon}
      </div>

      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.1rem)',
          fontWeight: 800,
          color: 'var(--color-navy-950)',
          lineHeight: 1.1,
          marginBottom: '0.25rem'
        }}>
          <AnimatedNumber
            target={stat.target}
            suffix={stat.suffix}
            duration={2000}
            isVisible={isVisible}
          />
        </div>
        <div style={{
          fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
          fontWeight: 700,
          color: 'var(--color-gold-primary)',
          marginBottom: '0.15rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {stat.label}
        </div>
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--color-steel-grey)',
          lineHeight: 1.3
        }}>
          {stat.subtext}
        </div>
      </div>
    </div>
  );
}
