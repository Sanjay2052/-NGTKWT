import React, { useState } from 'react';
import { Briefcase, Building, Send, CheckCircle2 } from 'lucide-react';
import { sendToGoogleSheets } from '../../config/googleConfig';
import SearchableSelect from '../Common/SearchableSelect';
import { JOB_CATEGORIES, WORKER_POSITIONS, JOBS_BY_CATEGORY } from '../../data/jobData';
import './CompanyForm.css';

export default function CompanyForm({ onSubmissionSuccess }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: 'Kuwait',
    jobCategory: 'Construction & Civil',
    jobTitle: '',
    workersNeeded: '1-5 Workers',
    projectLocation: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const availableRoles = formData.jobCategory && JOBS_BY_CATEGORY[formData.jobCategory]
    ? JOBS_BY_CATEGORY[formData.jobCategory]
    : WORKER_POSITIONS;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone || !formData.jobTitle) {
      setError('Please fill in all required fields marked with *');
      return;
    }

    setLoading(true);

    const submission = {
      id: `REQ-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      type: 'employer',
      status: 'Pending',
      ...formData
    };

    const existing = JSON.parse(localStorage.getItem('ngtkwt_employer_requests') || '[]');
    existing.unshift(submission);
    localStorage.setItem('ngtkwt_employer_requests', JSON.stringify(existing));

    await sendToGoogleSheets(submission);

    setLoading(false);
    setSubmitted(true);
    if (onSubmissionSuccess) onSubmissionSuccess('Employer Request Received');
  };

  return (
    <section id="employers" className="section-padding" style={{
      background: '#FFFFFF',
      borderTop: '1px solid #E2E8F0',
      position: 'relative'
    }}>
      <div className="container">

        <div style={{ alignItems: 'center' }} className="form-grid">

          <div>
            <div className="badge-orange" style={{ marginBottom: '1rem' }}>
              FOR EMPLOYERS & ENTERPRISES
            </div>
            <h2 style={{ color: 'var(--color-navy-950)', marginBottom: '1.25rem' }}>
              Request Certified <span style={{ color: 'var(--color-orange-primary)' }}>Workforce Talent</span>
            </h2>
            <p style={{ color: 'var(--color-gray-600)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Partner with NGTKWT to rapidly mobilize pre-screened engineers, supervisors, technicians, and specialized workforce tailored to your site requirements.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div className="glass-card-light" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Building size={24} style={{ color: 'var(--color-orange-primary)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: 'var(--color-navy-950)', fontSize: '1rem' }}>Enterprise SLAs</h4>
                  <p style={{ color: 'var(--color-gray-600)', fontSize: '0.85rem' }}>Rapid shortlist delivery in 48 hours for contract & permanent placements.</p>
                </div>
              </div>

              <div className="glass-card-light" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Briefcase size={24} style={{ color: 'var(--color-orange-primary)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: 'var(--color-navy-950)', fontSize: '1rem' }}>90-Day Candidate Replacement Guarantee</h4>
                  <p style={{ color: 'var(--color-gray-600)', fontSize: '0.85rem' }}>Complete risk mitigation with free candidate replacement coverage.</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            padding: 'clamp(0.9rem, 3vw, 2.5rem)',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '1.25rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '50%',
                  background: 'rgba(74, 222, 128, 0.15)',
                  color: '#16A34A',
                  margin: '0 auto 1.5rem auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CheckCircle2 size={40} />
                </div>
                <h3 style={{ color: 'var(--color-navy-950)', fontSize: '1.8rem', marginBottom: '0.75rem' }}>
                  Talent Request Submitted!
                </h3>
                <p style={{ color: 'var(--color-gray-600)', fontSize: '1rem', marginBottom: '2rem' }}>
                  Thank you for reaching out to NGTKWT. Our Key Account Manager will review your requirements and contact you within 4 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      companyName: '',
                      contactPerson: '',
                      email: '',
                      phone: '',
                      country: 'Kuwait',
                      jobCategory: 'Construction & Civil',
                      jobTitle: '',
                      workersNeeded: '1-5 Workers',
                      projectLocation: '',
                      message: ''
                    });
                  }}
                  className="btn-secondary-glass"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ color: 'var(--color-navy-950)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  Submit Employer Requisition
                </h3>
                <p style={{ color: 'var(--color-gray-600)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
                  Fields marked with <span style={{ color: '#EF4444' }}>*</span> are mandatory.
                </p>

                {error && (
                  <div style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#DC2626',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    marginBottom: '1.25rem'
                  }}>
                    {error}
                  </div>
                )}

                <div className="form-subgrid">

                  <div>
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Company Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Contracting / Engineering / Enterprise Co."
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        color: 'var(--color-navy-950)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        color: 'var(--color-navy-950)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Work Email *
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        color: 'var(--color-navy-950)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      placeholder="+965 9000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        color: 'var(--color-navy-950)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Country
                    </label>
                    <input
                      type="text"
                      placeholder="Kuwait, UAE, Saudi Arabia..."
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        color: 'var(--color-navy-950)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Job Category
                    </label>
                    <SearchableSelect
                      options={JOB_CATEGORIES}
                      value={formData.jobCategory}
                      onChange={(val) => setFormData({ ...formData, jobCategory: val, jobTitle: '' })}
                      placeholder="Select Job Category"
                      searchPlaceholder="Search 20+ categories (e.g. Construction, Mechanical, IT)..."
                      accentColor="#D4AF37"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Job Title Needed *
                    </label>
                    <SearchableSelect
                      options={availableRoles}
                      value={formData.jobTitle}
                      onChange={(val) => setFormData({ ...formData, jobTitle: val })}
                      placeholder="Select Role Needed"
                      searchPlaceholder="Search 200+ roles (e.g. Civil Engineer, Electrician, Project Manager)..."
                      accentColor="#D4AF37"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Workers Needed
                    </label>
                    <select
                      value={formData.workersNeeded}
                      onChange={(e) => setFormData({ ...formData, workersNeeded: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        color: 'var(--color-navy-950)',
                        outline: 'none'
                      }}
                    >
                      <option value="1-5 Workers">1 - 5 Workers</option>
                      <option value="6-20 Workers">6 - 20 Workers</option>
                      <option value="21-50 Workers">21 - 50 Workers</option>
                      <option value="50+ Workers">50+ Turnaround Team</option>
                    </select>
                  </div>

                </div>

                <div style={{ marginTop: '1.25rem' }}>
                  <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Project Location / Site
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Project Site / Industrial Zone / Kuwait City"
                    value={formData.projectLocation}
                    onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      color: 'var(--color-navy-950)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginTop: '1.25rem', marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Specific Scope & Technical Requirements
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Detail certifications required, experience needed, shift duration, start date..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      color: 'var(--color-navy-950)',
                      outline: 'none',
                      resize: 'none'
                    }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-orange"
                  style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
                >
                  {loading ? 'Processing Requisition...' : 'Request Talent'} <Send size={18} />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
