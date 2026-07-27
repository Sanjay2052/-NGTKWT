import React from 'react';
import { Mail, Phone, MapPin, Clock, Building } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding" style={{
      background: '#FFFFFF',
      borderTop: '1px solid #E2E8F0',
      position: 'relative'
    }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            GET IN TOUCH
          </div>
          <h2 style={{ color: 'var(--color-navy-950)', marginBottom: '1.25rem' }}>
            Contact <span style={{ color: 'var(--color-gold-primary)' }}>NGTKWT</span>
          </h2>
          <p style={{ color: 'var(--color-steel-grey)', fontSize: '1.1rem' }}>
            Reach out to our team for enterprise talent inquiries or candidate profile submissions.
          </p>
        </div>

        <div className="contact-grid">

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            <div className="glass-card-light" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '45px',
                height: '45px',
                borderRadius: '0.75rem',
                background: 'rgba(212, 175, 55, 0.12)',
                color: 'var(--color-gold-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--color-navy-950)', fontSize: '1.1rem', marginBottom: '0.35rem' }}>Location</h4>
                <p style={{ color: 'var(--color-steel-grey)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                  State of Kuwait
                </p>
              </div>
            </div>

            <div className="glass-card-light" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '45px',
                height: '45px',
                borderRadius: '0.75rem',
                background: 'rgba(212, 175, 55, 0.12)',
                color: 'var(--color-gold-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Mail size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--color-navy-950)', fontSize: '1.1rem', marginBottom: '0.35rem' }}>Official Email</h4>
                <p style={{ color: 'var(--color-steel-grey)', fontSize: '0.925rem' }}>
                  Enterprise & Candidate Inquiries: <a href="mailto:mohcenbenjame3@ngtkwt.com" style={{ color: 'var(--color-gold-primary)', textDecoration: 'none', fontWeight: 600 }}>mohcenbenjame3@ngtkwt.com</a>
                </p>
              </div>
            </div>

            <div className="glass-card-light" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '45px',
                height: '45px',
                borderRadius: '0.75rem',
                background: 'rgba(212, 175, 55, 0.12)',
                color: 'var(--color-gold-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Clock size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--color-navy-950)', fontSize: '1.1rem', marginBottom: '0.35rem' }}>Platform Support</h4>
                <p style={{ color: 'var(--color-steel-grey)', fontSize: '0.925rem' }}>
                  Sunday – Thursday: 8:00 AM – 5:00 PM (AST)
                </p>
              </div>
            </div>

          </div>

          <div className="glass-card-light" style={{
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#F4F6F9'
          }}>
            <div style={{
              width: '100%',
              height: 'clamp(240px, 35vh, 350px)',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              position: 'relative',
              background: '#FFFFFF',
              border: '1px solid #D1D9E0'
            }}>
              <iframe
                title="NGTKWT Kuwait Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111242.06201736636!2d47.900000!3d29.375000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9c83ce455983%3A0xc3cb7cf5b7a0f6a6!2sKuwait%20City!5e0!3m2!1sen!2skw!4v1700000000000!5m2!1sen!2skw"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            <div style={{
              marginTop: '1.25rem',
              padding: '1rem 1.25rem',
              background: '#FFFFFF',
              border: '1px solid #D1D9E0',
              borderRadius: '0.6rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Building size={20} style={{ color: 'var(--color-gold-primary)' }} />
                <span style={{ color: 'var(--color-navy-950)', fontWeight: 600, fontSize: '0.9rem' }}>NGTKWT - State of Kuwait</span>
              </div>
              <a
                href="https://maps.google.com/?q=Kuwait+City"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--color-gold-primary)', textDecoration: 'none', fontSize: '0.825rem', fontWeight: 700 }}
              >
                Open Map ↗
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
