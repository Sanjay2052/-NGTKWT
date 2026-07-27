import React, { useState, useEffect, useRef } from 'react';
import { Users, Building2, Globe2, Award } from 'lucide-react';

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
      
      // Easing out function for smooth deceleration curve
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

export default function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      target: 5000,
      suffix: '+',
      label: 'Certified Professionals',
      subtext: 'OPITO, BOSIET & NEBOSH verified',
      icon: <Users size={28} style={{ color: 'var(--color-gold-primary)' }} />
    },
    {
      target: 120,
      suffix: '+',
      label: 'Energy Companies',
      subtext: 'Middle East & Global EPC partners',
      icon: <Building2 size={28} style={{ color: 'var(--color-navy-950)' }} />
    },
    {
      target: 20,
      suffix: '+',
      label: 'Countries Served',
      subtext: 'Cross-border talent mobility network',
      icon: <Globe2 size={28} style={{ color: 'var(--color-gold-primary)' }} />
    },
    {
      target: 98,
      suffix: '%',
      label: 'Client Satisfaction',
      subtext: 'High-precision technical placement rate',
      icon: <Award size={28} style={{ color: 'var(--color-navy-950)' }} />
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="section-padding"
      style={{
        background: '#F4F6F9',
        borderTop: '1px solid #D1D9E0',
        borderBottom: '1px solid #D1D9E0',
        paddingTop: '3rem',
        paddingBottom: '3rem'
      }}
    >
      <div className="container">

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem'
        }}>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '1px solid #D1D9E0',
                borderRadius: '1rem',
                padding: '1.75rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                boxShadow: '0 4px 15px rgba(10,37,64,0.03)'
              }}
            >
              <div style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '0.75rem',
                background: 'rgba(212, 175, 55, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {stat.icon}
              </div>

              <div>
                <div style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
                  fontWeight: 800,
                  color: 'var(--color-navy-950)',
                  lineHeight: 1,
                  marginBottom: '0.35rem'
                }}>
                  <AnimatedNumber
                    target={stat.target}
                    suffix={stat.suffix}
                    duration={2000}
                    isVisible={isVisible}
                  />
                </div>
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--color-gold-primary)',
                  marginBottom: '0.15rem'
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '0.775rem',
                  color: 'var(--color-steel-grey)'
                }}>
                  {stat.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

