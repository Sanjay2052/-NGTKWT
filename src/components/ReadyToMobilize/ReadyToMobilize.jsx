import React from 'react';
import { ArrowRight, UserCheck } from 'lucide-react';
import './ReadyToMobilize.css';

export default function ReadyToMobilize() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0B1E36, #07111E)',
      borderTop: '1px solid rgba(212,175,55,0.3)',
      borderBottom: '1px solid rgba(212,175,55,0.3)',
      paddingTop: '2.5rem',
      paddingBottom: '2.5rem',
      color: '#FFFFFF'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <h3 style={{
            fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '0.4rem'
          }}>
            Ready to Connect with Energy Experts?
          </h3>
          <p style={{
            color: '#CBD5E1',
            fontSize: '0.95rem',
            lineHeight: 1.5
          }}>
            Connect enterprise energy projects with verified technical professionals or submit your candidate credentials today.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="#employers" className="btn-gold" style={{ padding: '0.75rem 1.6rem', fontSize: '0.9rem' }}>
            ENTERPRISE INQUIRY <ArrowRight size={16} />
          </a>
          <a href="#jobseekers" style={{
            padding: '0.75rem 1.6rem',
            fontSize: '0.9rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#FFFFFF',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            SUBMIT CV <UserCheck size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
