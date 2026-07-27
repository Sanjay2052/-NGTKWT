import React from 'react';
import { 
  Users, 
  UserCheck, 
  Clock, 
  Building, 
  Plane, 
  Flame, 
  HardHat, 
  ShieldAlert, 
  Wrench, 
  Anchor, 
  Compass, 
  ArrowUpRight
} from 'lucide-react';

export default function ServicesSection() {
  const mainServices = [
    {
      icon: <Users size={28} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Talent Discovery Platform',
      tagline: 'Discover specialized energy expertise',
      description: 'Streamlined search interface allowing energy companies to discover technical operators, drilling leads, and field experts.'
    },
    {
      icon: <UserCheck size={28} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Enterprise Connection Gateway',
      tagline: 'Direct B2B matching channel',
      description: 'Facilitates direct alignment between enterprise energy organizations and qualified technical industry professionals.'
    },
    {
      icon: <Clock size={28} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Specialized Discipline Networks',
      tagline: 'Across key oil & gas sectors',
      description: 'Vetted candidate pools focused on drilling, HSE compliance, subsea engineering, marine operations, and refinery turnarounds.'
    },
    {
      icon: <Building size={28} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Candidate Credential Showcase',
      tagline: 'Verified professional profiles',
      description: 'Allows experienced candidates to present their trade credentials (OPITO, BOSIET, NEBOSH, IWCF) and project background.'
    },
    {
      icon: <Plane size={28} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Cross-Border Talent Reach',
      tagline: 'International energy network',
      description: 'Global platform visibility connecting energy companies in Kuwait and the Middle East with international technical talent.'
    },
    {
      icon: <Flame size={28} style={{ color: 'var(--color-gold-primary)' }} />,
      title: 'Streamlined Workforce Inquiries',
      tagline: 'B2B enterprise requirements',
      description: 'Simple, direct submission workflow for companies to communicate technical manpower needs and project timelines.'
    }
  ];

  const specializedDisciplines = [
    { 
      name: 'Drilling & Rig Engineers', 
      image: '/Drilling & Rig Engineers.png', 
      badge: 'Certified Experts',
      description: 'Experienced onshore and offshore drilling engineers, petroleum engineers, and rig supervisors.' 
    },
    { 
      name: 'HSE & Safety Professionals', 
      image: '/HSE & Safety Professionals.png', 
      badge: 'Compliance Focused',
      description: 'Health, Safety & Environment specialists committed to international safety and compliance standards.' 
    },
    { 
      name: 'Electrical & Mechanical Technicians', 
      image: '/Electrical & Mechanical Technicians.png', 
      badge: 'Technical Pool',
      description: 'Skilled maintenance technicians, electrical engineers, instrumentation, and mechanical experts.' 
    },
    { 
      name: 'Offshore & Subsea Specialists', 
      image: '/Offshore & Subsea Specialists.png', 
      badge: 'Deepwater Ready',
      description: 'Offshore operators, subsea technicians, inspection divers, and deepwater specialists.' 
    },
    { 
      name: 'Marine & Vessel Engineers', 
      image: '/Marine & Vessel Engineers.png', 
      badge: 'Maritime Network',
      description: 'Marine engineers, vessel operators, offshore captains, and maritime technical professionals.' 
    },
    { 
      name: 'Civil & Construction Experts', 
      image: '/Civil & Construction Experts.png', 
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
            <div 
              key={index} 
              className="glass-card-light"
              style={{
                background: '#FFFFFF',
                border: '1px solid #D1D9E0',
                borderRadius: '1rem',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 15px rgba(10,37,64,0.04)',
                transition: 'transform 0.3s ease, boxShadow 0.3s ease'
              }}
            >
              <div>
                {/* Large Featured Image Header */}
                <div style={{
                  position: 'relative',
                  height: '180px',
                  width: '100%',
                  overflow: 'hidden',
                  background: '#0B1E36',
                  borderBottom: '1px solid #E2E8F0'
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  {/* Floating Overlay Badge */}
                  <span style={{
                    position: 'absolute',
                    top: '0.85rem',
                    right: '0.85rem',
                    fontSize: '0.725rem',
                    color: '#FFFFFF',
                    background: 'rgba(11, 30, 54, 0.85)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(212, 175, 55, 0.6)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '1rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}>
                    {item.badge}
                  </span>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.5rem 1.5rem 0.75rem 1.5rem' }}>
                  <h3 style={{ color: 'var(--color-navy-950)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.6rem' }}>
                    {item.name}
                  </h3>
                  <p style={{ color: 'var(--color-steel-grey)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
                <div style={{ paddingTop: '1rem', borderTop: '1px solid #F1F5F9' }}>
                  <a href="#employers" style={{ color: 'var(--color-navy-950)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    Request Talent <ArrowUpRight size={16} style={{ color: 'var(--color-gold-primary)' }} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
