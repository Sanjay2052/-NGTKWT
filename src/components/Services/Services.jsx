import React from 'react';
import ServiceCard from './ServiceCard';
import { 
  drillingImg, 
  hseImg, 
  electricalImg, 
  offshoreImg, 
  marineImg, 
  civilImg 
} from '../../assets/images';
import './Services.css';

export default function Services() {
  const specializedDisciplines = [
    { 
      name: 'Drilling & Rig Engineers', 
      image: drillingImg, 
      badge: 'Certified Experts',
      description: 'Experienced onshore and offshore drilling engineers, petroleum engineers, and rig supervisors.' 
    },
    { 
      name: 'HSE & Safety Professionals', 
      image: hseImg, 
      badge: 'Compliance Focused',
      description: 'Health, Safety & Environment specialists committed to international safety and compliance standards.' 
    },
    { 
      name: 'Electrical & Mechanical Technicians', 
      image: electricalImg, 
      badge: 'Technical Pool',
      description: 'Skilled maintenance technicians, electrical engineers, instrumentation, and mechanical experts.' 
    },
    { 
      name: 'Offshore & Subsea Specialists', 
      image: offshoreImg, 
      badge: 'Deepwater Ready',
      description: 'Offshore operators, subsea technicians, inspection divers, and deepwater specialists.' 
    },
    { 
      name: 'Marine & Vessel Engineers', 
      image: marineImg, 
      badge: 'Maritime Network',
      description: 'Marine engineers, vessel operators, offshore captains, and maritime technical professionals.' 
    },
    { 
      name: 'Civil & Construction Experts', 
      image: civilImg, 
      badge: 'EPC Specialists',
      description: 'Civil engineers, refinery construction professionals, structural engineers, and EPC project specialists.' 
    }
  ];

  return (
    <section id="services" className="section-padding" style={{
      background: '#FFFFFF',
      color: 'var(--color-navy-950)'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            TECHNICAL EXPERTISE
          </div>
          <h2 style={{ color: 'var(--color-navy-950)', marginBottom: '1.25rem' }}>
            Specialized <span style={{ color: 'var(--color-gold-primary)' }}>Talent Categories</span>
          </h2>
          <p style={{ color: 'var(--color-steel-grey)', fontSize: '1.1rem', lineHeight: 1.7 }}>
            NGTKWT connects global energy companies with highly qualified technical professionals across onshore, offshore, subsea, refinery, and EPC engineering disciplines.
          </p>
        </div>

        {/* Specialized Talent Disciplines Grid */}
        <div className="grid-3">
          {specializedDisciplines.map((item, index) => (
            <ServiceCard key={index} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}
