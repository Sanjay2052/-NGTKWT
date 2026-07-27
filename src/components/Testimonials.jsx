import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const [activeFilter, setActiveFilter] = useState('all');

  const testimonials = [
    {
      type: 'company',
      name: 'Tariq Al-Mansoor',
      role: 'Operations & Technical Director',
      company: 'Middle East Energy EPC Partner',
      location: 'State of Kuwait',
      rating: 5,
      quote: 'NGTKWT\'s platform allowed our engineering leads to quickly discover OPITO and BOSIET certified drilling talent for our technical project needs. The interface is direct and highly efficient.',
      logo: 'T'
    },
    {
      type: 'worker',
      name: 'Marcus Vance',
      role: 'Senior Offshore Subsea Specialist',
      company: 'Technical Talent Network Member',
      location: 'Global Energy Network',
      rating: 5,
      quote: 'Submitting my technical credentials on NGTKWT gave me direct exposure to major enterprise energy projects. The profile submission process was straightforward and professional.',
      logo: 'M'
    },
    {
      type: 'company',
      name: 'Elena Rostova',
      role: 'Technical Operations Director',
      company: 'Energy Infrastructure Operations',
      location: 'International Hub',
      rating: 5,
      quote: 'The platform streamlines the discovery of specialized refinery turnaround technicians. We can easily review verified trade certifications and candidate field background.',
      logo: 'E'
    },
    {
      type: 'worker',
      name: 'Ahmed El-Sayed',
      role: 'Lead HSE Safety Specialist',
      company: 'LNG Technical Specialist',
      location: 'Regional Energy Sector',
      rating: 5,
      quote: 'Finding a B2B platform that understands technical energy disciplines and safety qualifications is invaluable. NGTKWT provided a direct channel to showcase my HSE credentials.',
      logo: 'A'
    }
  ];

  const filtered = activeFilter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.type === activeFilter);

  return (
    <section id="testimonials" className="section-padding" style={{
      background: 'var(--color-navy-950)',
      borderTop: '1px solid rgba(212,175,55,0.2)'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem', background: 'rgba(212, 175, 55, 0.2)', borderColor: 'rgba(212, 175, 55, 0.5)', color: '#D4AF37' }}>
            PLATFORM FEEDBACK
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#FFFFFF', marginBottom: '1.25rem' }}>
            Trusted by <span style={{ color: 'var(--color-gold-primary)' }}>Energy Companies & Technical Experts</span>
          </h2>
          <p style={{ color: '#E2E8F0', fontSize: '1.1rem', lineHeight: 1.65 }}>
            Discover how global energy organizations and certified technical specialists connect through the NGTKWT platform.
          </p>

          {/* Filter Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {['all', 'company', 'worker'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  background: activeFilter === f ? 'var(--color-gold-primary)' : 'rgba(255,255,255,0.08)',
                  color: activeFilter === f ? '#0A2540' : '#FFFFFF',
                  border: activeFilter === f ? '1px solid var(--color-gold-primary)' : '1px solid rgba(255,255,255,0.15)',
                  padding: '0.5rem 1.35rem',
                  borderRadius: '2rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s ease'
                }}
              >
                {f === 'all' ? 'All Feedback' : f === 'company' ? 'Energy Companies' : 'Technical Professionals'}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid-2">
          {filtered.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '1rem',
                padding: '2.25rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#D4AF37" color="#D4AF37" />
                    ))}
                  </div>
                  <Quote size={28} style={{ color: 'rgba(212, 175, 55, 0.3)' }} />
                </div>

                <p style={{ color: '#E2E8F0', fontSize: '1rem', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  "{item.quote}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  background: 'var(--color-gold-primary)',
                  color: '#0A2540',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.logo}
                </div>
                <div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700 }}>
                    {item.name}
                  </h4>
                  <div style={{ color: 'var(--color-gold-primary)', fontSize: '0.825rem', fontWeight: 600 }}>
                    {item.role} • {item.company}
                  </div>
                  <div style={{ color: '#9AA6B5', fontSize: '0.75rem' }}>
                    {item.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
