import React, { useState } from 'react';
import { Briefcase, Building, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendToGoogleSheets } from '../../config/googleConfig';
import SearchableSelect from '../Common/SearchableSelect';
import { JOB_CATEGORIES, WORKER_POSITIONS, JOBS_BY_CATEGORY } from '../../data/jobData';
import { formatKuwaitPhone, getKuwaitFormattedDateTime } from '../WorkerForm/WorkerValidation';
import './CompanyForm.css';

export default function CompanyForm({ onSubmissionSuccess }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: 'Kuwait',
    jobCategory: '',
    jobTitle: '',
    workersNeeded: '',
    projectLocation: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorField, setErrorField] = useState('');

  const availableRoles = formData.jobCategory && JOBS_BY_CATEGORY[formData.jobCategory]
    ? JOBS_BY_CATEGORY[formData.jobCategory]
    : WORKER_POSITIONS;

  const validateCompanyForm = () => {
    if (!formData.companyName || !formData.companyName.trim()) {
      return { field: 'companyName', message: 'Please enter your company name.' };
    }
    if (!formData.contactPerson || !formData.contactPerson.trim()) {
      return { field: 'contactPerson', message: 'Please enter the contact person name.' };
    }
    if (!formData.email || !formData.email.trim()) {
      return { field: 'email', message: 'Please enter your work email.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return { field: 'email', message: 'Please enter a valid work email address (e.g. name@company.com).' };
    }
    if (!formData.phone || !formData.phone.trim()) {
      return { field: 'phone', message: 'Please enter your phone / WhatsApp number.' };
    }
    const cleanCompPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    const kuwaitCompNum = cleanCompPhone.replace(/^(00965|965)/, '');
    if (!/^[569]\d{7}$/.test(kuwaitCompNum) || /^(\d)\1{7}$/.test(kuwaitCompNum)) {
      return { field: 'phone', message: 'Please enter a valid Kuwait mobile number (8 digits starting with 5, 6, or 9, e.g. 98765432 or +965 9876 5432).' };
    }
    if (!formData.country || !formData.country.trim()) {
      return { field: 'country', message: 'Please enter country.' };
    }
    if (!formData.jobCategory || !formData.jobCategory.trim()) {
      return { field: 'jobCategory', message: 'Please select a job category.' };
    }
    if (!formData.jobTitle || !formData.jobTitle.trim()) {
      return { field: 'jobTitle', message: 'Please select the job title needed.' };
    }
    if (!formData.workersNeeded || !formData.workersNeeded.trim()) {
      return { field: 'workersNeeded', message: 'Please select workers needed.' };
    }
    if (!formData.projectLocation || !formData.projectLocation.trim()) {
      return { field: 'projectLocation', message: 'Please enter the project location / site.' };
    }
    if (!formData.message || !formData.message.trim()) {
      return { field: 'message', message: 'Please detail your specific scope & technical requirements.' };
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrorField('');

    const valResult = validateCompanyForm();
    if (valResult) {
      setError(valResult.message);
      setErrorField(valResult.field);

      const targetEl = document.getElementById(`comp-field-${valResult.field}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const inputEl = targetEl.querySelector('input, select, textarea, button') || targetEl;
        if (inputEl && inputEl.focus) {
          setTimeout(() => inputEl.focus(), 350);
        }
      }
      return;
    }

    setLoading(true);

    const submission = {
      id: `REQ-${Date.now().toString().slice(-6)}`,
      date: getKuwaitFormattedDateTime(),
      type: 'employer',
      status: 'Pending',
      ...formData,
      phone: formatKuwaitPhone(formData.phone)
    };

    // Asynchronous background sync to Google Sheets (non-blocking for fast UI)
    sendToGoogleSheets(submission).catch(err => console.error('Background sync error:', err));

    setLoading(false);
    setSubmitted(true);
    if (onSubmissionSuccess) onSubmissionSuccess('Employer Request Received');

    setTimeout(() => {
      const cardEl = document.getElementById('company-form-card') || document.getElementById('employers');
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
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

          <div id="company-form-card" style={{
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
                    setError('');
                    setErrorField('');
                    setFormData({
                      companyName: '',
                      contactPerson: '',
                      email: '',
                      phone: '',
                      country: 'Kuwait',
                      jobCategory: '',
                      jobTitle: '',
                      workersNeeded: '',
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
              <form noValidate onSubmit={handleSubmit}>
                <h3 style={{ color: 'var(--color-navy-950)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  Submit Employer Requisition
                </h3>
                <p style={{ color: 'var(--color-gray-600)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
                  All fields marked with <span style={{ color: '#EF4444' }}>*</span> are required.
                </p>

                <div className="form-subgrid">

                  <div id="comp-field-companyName">
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Company Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Contracting / Engineering / Enterprise Co."
                      value={formData.companyName}
                      onChange={(e) => {
                        setFormData({ ...formData, companyName: e.target.value });
                        if (errorField === 'companyName') setErrorField('');
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#FFFFFF',
                        border: errorField === 'companyName' ? '2px solid #EF4444' : '1px solid #CBD5E1',
                        boxShadow: errorField === 'companyName' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                        color: 'var(--color-navy-950)',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    />
                    {errorField === 'companyName' && (
                      <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={13} /> {error}
                      </div>
                    )}
                  </div>

                  <div id="comp-field-contactPerson">
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={formData.contactPerson}
                      onChange={(e) => {
                        setFormData({ ...formData, contactPerson: e.target.value });
                        if (errorField === 'contactPerson') setErrorField('');
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#FFFFFF',
                        border: errorField === 'contactPerson' ? '2px solid #EF4444' : '1px solid #CBD5E1',
                        boxShadow: errorField === 'contactPerson' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                        color: 'var(--color-navy-950)',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    />
                    {errorField === 'contactPerson' && (
                      <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={13} /> {error}
                      </div>
                    )}
                  </div>

                  <div id="comp-field-email">
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Work Email *
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errorField === 'email') setErrorField('');
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#FFFFFF',
                        border: errorField === 'email' ? '2px solid #EF4444' : '1px solid #CBD5E1',
                        boxShadow: errorField === 'email' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                        color: 'var(--color-navy-950)',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    />
                    {errorField === 'email' && (
                      <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={13} /> {error}
                      </div>
                    )}
                  </div>

                  <div id="comp-field-phone">
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      placeholder="+965 9876 5432"
                      maxLength={formData.phone.startsWith('+') ? 16 : 9}
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errorField === 'phone') setErrorField('');
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#FFFFFF',
                        border: errorField === 'phone' ? '2px solid #EF4444' : '1px solid #CBD5E1',
                        boxShadow: errorField === 'phone' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                        color: 'var(--color-navy-950)',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    />
                    {errorField === 'phone' && (
                      <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={13} /> {error}
                      </div>
                    )}
                  </div>

                  <div id="comp-field-country">
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Country *
                    </label>
                    <input
                      type="text"
                      placeholder="Kuwait, UAE, Saudi Arabia..."
                      value={formData.country}
                      onChange={(e) => {
                        setFormData({ ...formData, country: e.target.value });
                        if (errorField === 'country') setErrorField('');
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#FFFFFF',
                        border: errorField === 'country' ? '2px solid #EF4444' : '1px solid #CBD5E1',
                        boxShadow: errorField === 'country' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                        color: 'var(--color-navy-950)',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    />
                    {errorField === 'country' && (
                      <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={13} /> {error}
                      </div>
                    )}
                  </div>

                  <div id="comp-field-jobCategory" style={{
                    borderRadius: '0.5rem',
                    border: errorField === 'jobCategory' ? '2px solid #EF4444' : 'none',
                    boxShadow: errorField === 'jobCategory' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                    padding: errorField === 'jobCategory' ? '2px' : '0',
                    transition: 'all 0.2s ease'
                  }}>
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Job Category *
                    </label>
                    <SearchableSelect
                      options={JOB_CATEGORIES}
                      value={formData.jobCategory}
                      onChange={(val) => {
                        setFormData({ ...formData, jobCategory: val, jobTitle: '' });
                        if (errorField === 'jobCategory') setErrorField('');
                      }}
                      placeholder="Select Job Category *"
                      searchPlaceholder="Search 20+ categories (e.g. Construction, Mechanical, IT)..."
                      accentColor="#D4AF37"
                    />
                    {errorField === 'jobCategory' && (
                      <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={13} /> {error}
                      </div>
                    )}
                  </div>

                  <div id="comp-field-jobTitle" style={{
                    borderRadius: '0.5rem',
                    border: errorField === 'jobTitle' ? '2px solid #EF4444' : 'none',
                    boxShadow: errorField === 'jobTitle' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                    padding: errorField === 'jobTitle' ? '2px' : '0',
                    transition: 'all 0.2s ease'
                  }}>
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Job Title Needed *
                    </label>
                    <SearchableSelect
                      options={availableRoles}
                      value={formData.jobTitle}
                      onChange={(val) => {
                        setFormData({ ...formData, jobTitle: val });
                        if (errorField === 'jobTitle') setErrorField('');
                      }}
                      placeholder="Select Role Needed *"
                      searchPlaceholder="Search 200+ roles (e.g. Civil Engineer, Electrician, Project Manager)..."
                      accentColor="#D4AF37"
                    />
                    {errorField === 'jobTitle' && (
                      <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={13} /> {error}
                      </div>
                    )}
                  </div>

                  <div id="comp-field-workersNeeded">
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Workers Needed *
                    </label>
                    <select
                      value={formData.workersNeeded}
                      onChange={(e) => {
                        setFormData({ ...formData, workersNeeded: e.target.value });
                        if (errorField === 'workersNeeded') setErrorField('');
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#FFFFFF',
                        border: errorField === 'workersNeeded' ? '2px solid #EF4444' : '1px solid #CBD5E1',
                        boxShadow: errorField === 'workersNeeded' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                        color: 'var(--color-navy-950)',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <option value="">Select Workers Needed *</option>
                      <option value="1-5 Workers">1 - 5 Workers</option>
                      <option value="6-20 Workers">6 - 20 Workers</option>
                      <option value="21-50 Workers">21 - 50 Workers</option>
                      <option value="50+ Workers">50+ Turnaround Team</option>
                    </select>
                    {errorField === 'workersNeeded' && (
                      <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={13} /> {error}
                      </div>
                    )}
                  </div>

                </div>

                <div id="comp-field-projectLocation" style={{ marginTop: '1.25rem' }}>
                  <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Project Location / Site *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Project Site / Industrial Zone / Kuwait City"
                    value={formData.projectLocation}
                    onChange={(e) => {
                      setFormData({ ...formData, projectLocation: e.target.value });
                      if (errorField === 'projectLocation') setErrorField('');
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      background: '#FFFFFF',
                      border: errorField === 'projectLocation' ? '2px solid #EF4444' : '1px solid #CBD5E1',
                      boxShadow: errorField === 'projectLocation' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                      color: 'var(--color-navy-950)',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  />
                  {errorField === 'projectLocation' && (
                    <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <AlertCircle size={13} /> {error}
                    </div>
                  )}
                </div>

                <div id="comp-field-message" style={{ marginTop: '1.25rem', marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Specific Scope & Technical Requirements *
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Detail certifications required, experience needed, shift duration, start date..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errorField === 'message') setErrorField('');
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      background: '#FFFFFF',
                      border: errorField === 'message' ? '2px solid #EF4444' : '1px solid #CBD5E1',
                      boxShadow: errorField === 'message' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                      color: 'var(--color-navy-950)',
                      outline: 'none',
                      resize: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  ></textarea>
                  {errorField === 'message' && (
                    <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <AlertCircle size={13} /> {error}
                    </div>
                  )}
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

