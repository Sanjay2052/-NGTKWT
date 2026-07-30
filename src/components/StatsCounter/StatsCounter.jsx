import React, { useState, useEffect, useRef } from 'react';
import { Users, Building2, Globe2, Award } from 'lucide-react';
import CounterCard from './CounterCard';
import './StatsCounter.css';

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
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem'
      }}
    >
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <CounterCard key={idx} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
