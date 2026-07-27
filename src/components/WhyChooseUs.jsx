import React from 'react';
import { 
  Award, 
  Zap, 
  Globe, 
  ShieldCheck, 
  Flame, 
  Target, 
  CheckCircle2, 
  Headphones
} from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: <Award size={26} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Qualified Technical Professionals',
      description: 'Vetted candidates presenting verified trade credentials (OPITO, BOSIET, NEBOSH, IWCF).'
    },
    {
      icon: <Zap size={26} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Streamlined Discovery',
      description: 'Accelerated connection platform enabling enterprise energy companies to discover technical talent efficiently.'
    },
    {
      icon: <Globe size={26} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Global Energy Network',
      description: 'Connecting top-tier energy professionals across Middle East, Europe, Asia, and Americas.'
    },
    {
      icon: <ShieldCheck size={26} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Safety & Compliance Focus',
      description: 'Designed to align with international labor guidelines, HSE protocols, and statutory compliance standards.'
    },
    {
      icon: <Flame size={26} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'HSE Commitment',
      description: 'Prioritizing safety-oriented professionals dedicated to zero-harm site operations.'
    },
    {
      icon: <Target size={26} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Industry Expertise',
      description: 'Specialized focus built around actual oilfield, subsea, and refinery engineering requirements.'
    },
    {
      icon: <CheckCircle2 size={26} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Enterprise Connections',
      description: 'A trusted B2B gateway connecting enterprise operators with high-caliber talent.'
    },
    {
      icon: <Headphones size={26} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Dedicated Support',
      description: 'Responsive assistance for corporate inquiries and candidate profile submissions.'
    }
  ];

  return (
    <section id="why-us" className="section-padding" style={{
      background: '#FFFFFF',
      color: 'var(--color-navy-950)'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem auto' }}>
          <div className="badge-orange" style={{ marginBottom: '1rem' }}>
            THE NGTKWT ADVANTAGE
          </div>
          <h2 style={{ color: 'var(--color-navy-950)', marginBottom: '1.25rem' }}>
            Why Energy Leaders <span style={{ color: 'var(--color-orange-primary)' }}>Choose NGTKWT</span>
          </h2>
          <p style={{ color: 'var(--color-gray-600)', fontSize: '1.1rem' }}>
            We combine deep technical oilfield knowledge with rigorous compliance and global reach to deliver workforce solutions that minimize project risk.
          </p>
        </div>

        {/* 8 Benefits Grid */}
        <div className="grid-4">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className="glass-card-light"
              style={{
                padding: '1.75rem',
                borderRadius: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '0.6rem',
                  background: 'rgba(249, 87, 56, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {benefit.icon}
                </div>
                <h3 style={{ color: 'var(--color-navy-950)', fontSize: '1.1rem', fontWeight: 700 }}>
                  {benefit.title}
                </h3>
              </div>
              <p style={{ color: 'var(--color-gray-600)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
