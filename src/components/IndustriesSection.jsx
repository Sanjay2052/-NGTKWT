import React from 'react';
import { 
  Anchor, 
  Flame, 
  Factory, 
  Fuel, 
  Atom, 
  Ship, 
  HardHat, 
  Layers,
  ArrowRight
} from 'lucide-react';

export default function IndustriesSection() {
  const industries = [
    {
      icon: <Anchor size={32} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Offshore Oil',
      subtitle: 'Jack-ups, Semi-submersibles & FPSOs',
      description: 'Connecting BOSIET & OPITO certified offshore drillers, subsea engineers, rig supervisors, and ROV operators.'
    },
    {
      icon: <Flame size={32} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Onshore Oil',
      subtitle: 'Field Development & Well Operations',
      description: 'Connecting onshore drilling personnel, field managers, production technicians, and artificial lift specialists.'
    },
    {
      icon: <Factory size={32} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Gas Plants',
      subtitle: 'LNG & Gas Processing Facilities',
      description: 'Specialized technical experts for gas treatment, liquefaction terminals, compression stations, and pipeline maintenance.'
    },
    {
      icon: <Fuel size={32} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Refineries',
      subtitle: 'Downstream Processing & Turnarounds',
      description: 'Turnaround specialists, process engineers, hydrotreating experts, and DCS panel operators.'
    },
    {
      icon: <Atom size={32} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Petrochemical',
      subtitle: 'Chemical Synthesis & Polymer Plants',
      description: 'Technical profiles for ethylene crackers, polymer units, chemical safety officers, and quality control chemists.'
    },
    {
      icon: <Ship size={32} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Marine Operations',
      subtitle: 'OSVs, AHTS, Tugs & Support Vessels',
      description: 'Master mariners, chief engineers, DP operators, and deck crew for offshore supply and towing vessels.'
    },
    {
      icon: <HardHat size={32} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'EPC Projects',
      subtitle: 'Engineering, Procurement & Construction',
      description: 'Project management leads, QA/QC inspectors, piping engineers, and commissioning specialists.'
    },
    {
      icon: <Layers size={32} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Subsea & Pipelines',
      subtitle: 'Deepwater Infrastructure & Flowlines',
      description: 'Subsea inspection engineers, pipeline integrity specialists, umbilical technicians, and ROV pilots.'
    }
  ];

  return (
    <section id="industries" className="section-padding" style={{
      background: '#F4F6F9',
      color: 'var(--color-navy-950)'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem auto' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            SECTORS COVERED
          </div>
          <h2 style={{ color: 'var(--color-navy-950)', marginBottom: '1.25rem' }}>
            Specialized Talent Networks Across <span style={{ color: 'var(--color-gold-primary)' }}>8 Core Energy Sectors</span>
          </h2>
          <p style={{ color: 'var(--color-steel-grey)', fontSize: '1.1rem', lineHeight: 1.65 }}>
            Whether operating in deepwater offshore environments or major downstream refining complexes, NGTKWT connects energy companies with specialized technical talent.
          </p>
        </div>

        {/* 8 Industry Cards Grid */}
        <div className="grid-4">
          {industries.map((ind, idx) => (
            <div 
              key={idx} 
              className="glass-card-light" 
              style={{
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #D1D9E0'
              }}
            >
              <div>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '1rem',
                  background: 'rgba(212, 175, 55, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  {ind.icon}
                </div>
                <h3 style={{ color: 'var(--color-navy-950)', fontSize: '1.25rem', marginBottom: '0.35rem' }}>
                  {ind.title}
                </h3>
                <div style={{ color: 'var(--color-gold-primary)', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.85rem' }}>
                  {ind.subtitle}
                </div>
                <p style={{ color: 'var(--color-steel-grey)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  {ind.description}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                <a href="#employers" style={{ color: 'var(--color-navy-950)', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Explore Sector Talent</span>
                  <ArrowRight size={14} style={{ color: 'var(--color-gold-primary)' }} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
