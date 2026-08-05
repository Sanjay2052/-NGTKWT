import React, { useState } from 'react';
import { UserCheck, Upload, CheckCircle2, Send, AlertCircle, Paperclip, Loader2, FileCheck, Zap } from 'lucide-react';
import { sendToGoogleSheets } from '../../config/googleConfig';
import SearchableSelect from '../Common/SearchableSelect';
import PhoneInput from '../Common/PhoneInput';
import { WORKER_POSITIONS, JOB_CATEGORIES, JOBS_BY_CATEGORY } from '../../data/jobData';
import { validateWorkerForm, formatKuwaitPhone, getKuwaitFormattedDateTime } from './WorkerValidation';
import { compressFileIfNeeded } from '../../utils/fileCompressor';
import './WorkerForm.css';

export default function WorkerForm({ onSubmissionSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    category: '',
    position: '',
    yearsExperience: '',
    certifications: ''
  });

  const [cvFile, setCvFile] = useState(null);
  const [cvCompressing, setCvCompressing] = useState(false);
  const [cvStatus, setCvStatus] = useState('');
  const [cvStats, setCvStats] = useState(null);

  const [certFile, setCertFile] = useState(null);
  const [certCompressing, setCertCompressing] = useState(false);
  const [certStatus, setCertStatus] = useState('');
  const [certStats, setCertStats] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorField, setErrorField] = useState('');

  const availablePositions = formData.category && JOBS_BY_CATEGORY[formData.category]
    ? JOBS_BY_CATEGORY[formData.category]
    : WORKER_POSITIONS;

  const readFileAsBase64 = (file) => {
    if (!file) return Promise.resolve(null);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        type: file.type || 'application/pdf',
        data: reader.result
      });
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleCvChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ['pdf', 'doc', 'docx'];
    const ext = file.name.split('.').pop().toLowerCase();
    if (!allowed.includes(ext)) {
      setError('Invalid file format. Please upload a PDF, DOC, or DOCX document.');
      setErrorField('cvFile');
      return;
    }

    setError('');
    setErrorField('');
    setCvCompressing(true);
    setCvStatus(`Optimizing ${file.name}...`);

    try {
      const result = await compressFileIfNeeded(file, (msg) => setCvStatus(msg));
      setCvFile(result.file);
      setCvStats(result);
    } catch (err) {
      console.error('CV Compression Error:', err);
      setCvFile(file);
    } finally {
      setCvCompressing(false);
      setCvStatus('');
    }
  };

  const handleCertChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setErrorField('');
    setCertCompressing(true);
    setCertStatus(`Optimizing ${file.name}...`);

    try {
      const result = await compressFileIfNeeded(file, (msg) => setCertStatus(msg));
      setCertFile(result.file);
      setCertStats(result);
    } catch (err) {
      console.error('Certificate Compression Error:', err);
      setCertFile(file);
    } finally {
      setCertCompressing(false);
      setCertStatus('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrorField('');

    const valResult = validateWorkerForm(formData, cvFile);
    if (valResult) {
      setError(valResult.message);
      setErrorField(valResult.field);

      const targetEl = document.getElementById(`field-${valResult.field}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const inputEl = targetEl.querySelector('input, select, button') || targetEl;
        if (inputEl && inputEl.focus) {
          setTimeout(() => inputEl.focus(), 350);
        }
      }
      return;
    }

    setLoading(true);

    try {
      let cvBase64 = null;
      if (cvFile) {
        cvBase64 = await readFileAsBase64(cvFile);
      }
      let certBase64 = null;
      if (certFile) {
        certBase64 = await readFileAsBase64(certFile);
      }

      const application = {
        id: `APP-${Date.now().toString().slice(-6)}`,
        date: getKuwaitFormattedDateTime(),
        type: 'worker',
        status: 'Unscreened',
        ...formData,
        phone: formatKuwaitPhone(formData.phone),
        cv: cvBase64,
        certDoc: certBase64
      };

      // Asynchronous background sync to Google Sheets (non-blocking for fast UI)
      sendToGoogleSheets(application).catch(err => console.error('Background sync error:', err));

      setLoading(false);
      setSubmitted(true);
      if (onSubmissionSuccess) onSubmissionSuccess('Job Application Received');

      setTimeout(() => {
        const cardEl = document.getElementById('worker-form-card') || document.getElementById('jobseekers');
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } catch (err) {
      console.error('Submission error:', err);
      setLoading(false);
      setError(err?.message || 'Failed to process file upload. Please try again.');
    }
  };

  return (
    <section id="jobseekers" className="section-padding" style={{
      background: '#F8FAFC',
      borderTop: '1px solid #E2E8F0',
      position: 'relative'
    }}>
      <div className="container">

        <div style={{ alignItems: 'center' }} className="form-grid">

          <div id="worker-form-card" style={{
            padding: 'clamp(0.9rem, 3vw, 2.5rem)',
            background: '#FFFFFF',
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
                  Application Submitted!
                </h3>
                <p style={{ color: 'var(--color-gray-600)', fontSize: '1rem', marginBottom: '2rem' }}>
                  Your profile and CV have been safely stored in our global talent database. Our technical recruiters will review your credentials for active project deployments.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCvFile(null);
                    setCertFile(null);
                    setError('');
                    setErrorField('');
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      nationality: '',
                      category: '',
                      position: '',
                      yearsExperience: '',
                      certifications: ''
                    });
                  }}
                  className="btn-secondary-glass"
                >
                  Submit Another Candidate Profile
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit}>
                <h3 style={{ color: 'var(--color-navy-950)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  Submit Your CV to Join Our Talent Network
                </h3>
                <p style={{ color: 'var(--color-steel-grey)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
                  Connect your professional profile with top employers and global enterprises.
                </p>

                <div className="form-subgrid">

                  <div id="field-fullName">
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Robert Sterling"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errorField === 'fullName') setErrorField('');
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#FFFFFF',
                        border: errorField === 'fullName' ? '2px solid #EF4444' : '1px solid #CBD5E1',
                        boxShadow: errorField === 'fullName' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                        color: 'var(--color-navy-950)',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    />
                    {errorField === 'fullName' && (
                      <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={13} /> {error}
                      </div>
                    )}
                  </div>

                  <div id="field-email">
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="robert@example.com"
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

                  <div id="field-phone">
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Phone / Mobile *
                    </label>
                    <PhoneInput
                      id="worker-phone-input"
                      value={formData.phone}
                      onChange={(val) => {
                        setFormData({ ...formData, phone: val });
                        if (errorField === 'phone') setErrorField('');
                      }}
                      error={errorField === 'phone'}
                    />
                    {errorField === 'phone' && (
                      <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={13} /> {error}
                      </div>
                    )}
                  </div>

                  <div id="field-nationality">
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Nationality *
                    </label>
                    <input
                      type="text"
                      placeholder="British / Kuwaiti / Indian..."
                      value={formData.nationality}
                      onChange={(e) => {
                        setFormData({ ...formData, nationality: e.target.value });
                        if (errorField === 'nationality') setErrorField('');
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#FFFFFF',
                        border: errorField === 'nationality' ? '2px solid #EF4444' : '1px solid #CBD5E1',
                        boxShadow: errorField === 'nationality' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                        color: 'var(--color-navy-950)',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    />
                    {errorField === 'nationality' && (
                      <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={13} /> {error}
                      </div>
                    )}
                  </div>

                  <div id="field-category" style={{
                    borderRadius: '0.5rem',
                    border: errorField === 'category' ? '2px solid #EF4444' : 'none',
                    boxShadow: errorField === 'category' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                    padding: errorField === 'category' ? '2px' : '0',
                    transition: 'all 0.2s ease'
                  }}>
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Job Category *
                    </label>
                    <SearchableSelect
                      options={JOB_CATEGORIES}
                      value={formData.category}
                      onChange={(val) => {
                        setFormData({ ...formData, category: val, position: '' });
                        if (errorField === 'category') setErrorField('');
                      }}
                      placeholder="Select Job Category *"
                      searchPlaceholder="Search 20+ categories (e.g. Construction, Mechanical, IT)..."
                      accentColor="#D4AF37"
                    />
                    {errorField === 'category' && (
                      <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={13} /> {error}
                      </div>
                    )}
                  </div>

                  <div id="field-position" style={{
                    borderRadius: '0.5rem',
                    border: errorField === 'position' ? '2px solid #EF4444' : 'none',
                    boxShadow: errorField === 'position' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                    padding: errorField === 'position' ? '2px' : '0',
                    transition: 'all 0.2s ease'
                  }}>
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Position Applying For *
                    </label>
                    <SearchableSelect
                      options={availablePositions}
                      value={formData.position}
                      onChange={(val) => {
                        setFormData({ ...formData, position: val });
                        if (errorField === 'position') setErrorField('');
                      }}
                      placeholder="Select Primary Role *"
                      searchPlaceholder="Search 200+ roles (e.g. Civil Engineer, Electrician, HVAC)..."
                      accentColor="#D4AF37"
                    />
                    {errorField === 'position' && (
                      <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={13} /> {error}
                      </div>
                    )}
                  </div>

                  <div id="field-yearsExperience">
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Years of Experience *
                    </label>
                    <select
                      value={formData.yearsExperience}
                      onChange={(e) => {
                        setFormData({ ...formData, yearsExperience: e.target.value });
                        if (errorField === 'yearsExperience') setErrorField('');
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: '#FFFFFF',
                        border: errorField === 'yearsExperience' ? '2px solid #EF4444' : '1px solid #CBD5E1',
                        boxShadow: errorField === 'yearsExperience' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                        color: 'var(--color-navy-950)',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <option value="">Select Experience Level *</option>
                      <option value="1-3 Years">1 - 3 Years</option>
                      <option value="3-5 Years">3 - 5 Years</option>
                      <option value="5-10 Years">5 - 10 Years</option>
                      <option value="10+ Years">10+ Senior Expert</option>
                    </select>
                    {errorField === 'yearsExperience' && (
                      <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={13} /> {error}
                      </div>
                    )}
                  </div>

                </div>

                <div id="field-certifications" style={{ marginTop: '1.25rem' }}>
                  <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Certifications Held (e.g. PMP, NEBOSH, ISO, AWS, Trade License) *
                  </label>
                  <input
                    type="text"
                    placeholder="List certificates & expiry dates"
                    value={formData.certifications}
                    onChange={(e) => {
                      setFormData({ ...formData, certifications: e.target.value });
                      if (errorField === 'certifications') setErrorField('');
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      background: '#FFFFFF',
                      border: errorField === 'certifications' ? '2px solid #EF4444' : '1px solid #CBD5E1',
                      boxShadow: errorField === 'certifications' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                      color: 'var(--color-navy-950)',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  />
                  {errorField === 'certifications' && (
                    <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <AlertCircle size={13} /> {error}
                    </div>
                  )}
                </div>

                <div id="field-cvFile" style={{ marginTop: '1.25rem' }}>
                  <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Upload CV Document (PDF / DOC / DOCX, max 10MB) *
                  </label>

                  <div style={{
                    border: errorField === 'cvFile' ? '2px solid #EF4444' : (cvFile ? '2px solid #22C55E' : '2px dashed rgba(249, 87, 56, 0.4)'),
                    boxShadow: errorField === 'cvFile' ? '0 0 0 3px rgba(239, 68, 68, 0.15)' : 'none',
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                    textAlign: 'center',
                    background: cvFile ? 'rgba(34, 197, 94, 0.03)' : '#F8FAFC',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease'
                  }}>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCvChange}
                      disabled={cvCompressing}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0,
                        cursor: cvCompressing ? 'wait' : 'pointer',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                    {cvCompressing ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <Loader2 size={26} className="spinner" style={{ color: 'var(--color-orange-primary)' }} />
                        <div style={{ color: 'var(--color-navy-950)', fontWeight: 600, fontSize: '0.85rem' }}>
                          Processing CV document...
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload size={24} style={{ color: cvFile ? '#16A34A' : 'var(--color-orange-primary)', marginBottom: '0.5rem' }} />
                        <div style={{ color: 'var(--color-navy-950)', fontWeight: 600, fontSize: '0.9rem' }}>
                          {cvFile ? cvFile.name : 'Click or Drag CV file here to upload'}
                        </div>
                      </>
                    )}
                  </div>
                  {errorField === 'cvFile' && (
                    <div style={{ color: '#DC2626', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <AlertCircle size={13} /> {error}
                    </div>
                  )}
                </div>

                <div id="field-certFile" style={{ marginTop: '1.25rem', marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Upload Certifications Document (Optional)
                  </label>
                  <div style={{
                    border: certFile ? '1px solid #22C55E' : '1px dashed #CBD5E1',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: certFile ? 'rgba(34, 197, 94, 0.03)' : '#FFFFFF',
                    position: 'relative'
                  }}>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleCertChange}
                      disabled={certCompressing}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0,
                        cursor: certCompressing ? 'wait' : 'pointer'
                      }}
                    />
                    {certCompressing ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-orange-primary)', fontSize: '0.85rem' }}>
                        <Loader2 size={18} className="spinner" />
                        <span>Processing certificate document...</span>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gray-700)', fontSize: '0.85rem', fontWeight: certFile ? 600 : 400 }}>
                          <Paperclip size={16} style={{ color: certFile ? '#16A34A' : 'inherit' }} />
                          <span>{certFile ? certFile.name : 'Attach certificates document (optional)'}</span>
                        </div>
                        <span style={{ color: 'var(--color-orange-primary)', fontSize: '0.75rem', fontWeight: 600 }}>Browse</span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold"
                  style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
                >
                  {loading ? 'Submitting CV...' : 'Submit Your CV'} <Send size={18} />
                </button>
              </form>
            )}
          </div>

          <div>
            <div className="badge-gold" style={{ marginBottom: '1rem' }}>
              FOR TECHNICAL PROFESSIONALS
            </div>
            <h2 style={{ color: 'var(--color-navy-950)', marginBottom: '1.25rem' }}>
              Showcase Your Expertise to <span style={{ color: 'var(--color-gold-primary)' }}>Industry Leaders</span>
            </h2>
            <p style={{ color: 'var(--color-steel-grey)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              NGTKWT provides a platform for qualified engineers, supervisors, technicians, and skilled professionals across Construction, Mechanical, Electrical, IT, Logistics, Oil & Gas, and multi-industry sectors to connect with top corporations across GCC and international markets.
            </p>

            <div style={{
              background: '#FFFFFF',
              border: '1px solid #D1D9E0',
              borderRadius: '1rem',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '0 4px 12px rgba(10,37,64,0.04)'
            }}>
              <h4 style={{ color: 'var(--color-navy-950)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserCheck size={20} style={{ color: 'var(--color-gold-primary)' }} /> Why Join NGTKWT Network?
              </h4>
              <ul style={{ color: 'var(--color-steel-grey)', fontSize: '0.9rem', paddingLeft: '1.25rem', lineHeight: 1.7 }}>
                <li>Direct visibility with top enterprise operators & EPC clients</li>
                <li>Verified profile presentation for specialized technical roles</li>
                <li>Cross-border exposure to international industry projects</li>
                <li>Fast & secure candidate CV submission process</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
