import React, { useState } from 'react';
import { UserCheck, Upload, CheckCircle2, Send, AlertCircle, Paperclip } from 'lucide-react';
import { sendToGoogleSheets } from '../config/googleConfig';

export default function WorkerForm({ onSubmissionSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    position: '',
    yearsExperience: '5-10 Years',
    certifications: ''
  });

  const [cvFile, setCvFile] = useState(null);
  const [certFile, setCertFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const positions = [
    'Drilling Engineer / Supervisor',
    'Offshore Subsea Technician',
    'HSE Safety Officer / Lead',
    'Rig Mechanic & Electrician',
    'Process Operator (Refinery/LNG)',
    'ROV Pilot & Inspector',
    'QA/QC Piping Inspector',
    'Marine Engineer / Captain'
  ];

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        type: file.type,
        data: reader.result
      });
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError('CV File size exceeds maximum limit of 10MB.');
      return;
    }

    const allowed = ['pdf', 'doc', 'docx'];
    const ext = file.name.split('.').pop().toLowerCase();
    if (!allowed.includes(ext)) {
      setError('Invalid file format. Please upload a PDF, DOC, or DOCX document.');
      return;
    }

    setError('');
    setCvFile(file);
  };

  const handleCertChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError('Certificates file size exceeds 10MB.');
      return;
    }
    setError('');
    setCertFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.phone || !formData.position) {
      setError('Please complete all required fields marked with *');
      return;
    }

    if (!cvFile) {
      setError('Please upload your CV document (PDF/DOC/DOCX).');
      return;
    }

    setLoading(true);

    try {
      const cvBase64 = await readFileAsBase64(cvFile);
      let certBase64 = null;
      if (certFile) {
        certBase64 = await readFileAsBase64(certFile);
      }

      const application = {
        id: `APP-${Date.now().toString().slice(-6)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        type: 'worker',
        status: 'Unscreened',
        ...formData,
        cv: cvBase64,
        certDoc: certBase64
      };

      const existing = JSON.parse(localStorage.getItem('ngtkwt_candidate_apps') || '[]');
      existing.unshift(application);
      localStorage.setItem('ngtkwt_candidate_apps', JSON.stringify(existing));

      await sendToGoogleSheets(application);

      setLoading(false);
      setSubmitted(true);
      if (onSubmissionSuccess) onSubmissionSuccess('Job Application Received');
    } catch (err) {
      setLoading(false);
      setError('Failed to process file upload. Please try again.');
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

          <div style={{
            padding: 'clamp(1.25rem, 3vw, 2.5rem)',
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
                  Your profile and CV have been safely stored in our global talent database. Our technical recruiters will review your credentials for active oilfield deployments.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCvFile(null);
                    setCertFile(null);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      nationality: '',
                      position: '',
                      yearsExperience: '5-10 Years',
                      certifications: ''
                    });
                  }}
                  className="btn-secondary-glass"
                >
                  Submit Another Candidate Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ color: 'var(--color-navy-950)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  Submit Your CV to Join Our Talent Network
                </h3>
                <p style={{ color: 'var(--color-steel-grey)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
                  Connect your technical profile with enterprise oil & gas companies worldwide.
                </p>

                {error && (
                  <div style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#DC2626',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <AlertCircle size={18} /> {error}
                  </div>
                )}

                <div className="form-subgrid">

                  <div>
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Robert Sterling"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="robert@example.com"
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
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 7911 123456"
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
                      Nationality
                    </label>
                    <input
                      type="text"
                      placeholder="British / Kuwaiti / Indian..."
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
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
                      Position Applying For *
                    </label>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
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
                      <option value="">Select Primary Role</option>
                      {positions.map((p, idx) => (
                        <option key={idx} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                      Years of Experience
                    </label>
                    <select
                      value={formData.yearsExperience}
                      onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
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
                      <option value="1-3 Years">1 - 3 Years</option>
                      <option value="3-5 Years">3 - 5 Years</option>
                      <option value="5-10 Years">5 - 10 Years</option>
                      <option value="10+ Years">10+ Senior Expert</option>
                    </select>
                  </div>

                </div>

                <div style={{ marginTop: '1.25rem' }}>
                  <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Certifications Held (e.g. OPITO, BOSIET, NEBOSH, IWCF, OGUK)
                  </label>
                  <input
                    type="text"
                    placeholder="List certificates & expiry dates"
                    value={formData.certifications}
                    onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
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

                <div style={{ marginTop: '1.25rem' }}>
                  <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Upload CV Document (PDF / DOC / DOCX, max 10MB) *
                  </label>

                  <div style={{
                    border: '2px dashed rgba(249, 87, 56, 0.4)',
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                    textAlign: 'center',
                    background: cvFile ? 'rgba(249, 87, 56, 0.05)' : '#F8FAFC',
                    cursor: 'pointer',
                    position: 'relative'
                  }}>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCvChange}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0,
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                    <Upload size={24} style={{ color: 'var(--color-orange-primary)', marginBottom: '0.5rem' }} />
                    <div style={{ color: 'var(--color-navy-950)', fontWeight: 600, fontSize: '0.9rem' }}>
                      {cvFile ? cvFile.name : 'Click or Drag CV file here to upload'}
                    </div>
                    <div style={{ color: 'var(--color-gray-600)', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                      {cvFile ? `${(cvFile.size / 1024 / 1024).toFixed(2)} MB Attached` : 'PDF, DOC, DOCX up to 10MB'}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', color: 'var(--color-navy-950)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Upload Certifications Document (Optional)
                  </label>
                  <div style={{
                    border: '1px dashed #CBD5E1',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#FFFFFF',
                    position: 'relative'
                  }}>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      onChange={handleCertChange}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0,
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gray-700)', fontSize: '0.85rem' }}>
                      <Paperclip size={16} />
                      <span>{certFile ? certFile.name : 'Attach certificates document (optional)'}</span>
                    </div>
                    <span style={{ color: 'var(--color-orange-primary)', fontSize: '0.75rem', fontWeight: 600 }}>Browse</span>
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
              NGTKWT provides a platform for qualified offshore rig professionals, subsea specialists, safety leads, and refinery technicians to connect with energy corporations across GCC, Europe, and international markets.
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
                <li>Direct visibility with top energy operators & EPC clients</li>
                <li>Verified profile presentation for specialized technical roles</li>
                <li>Cross-border exposure to international energy initiatives</li>
                <li>Fast & secure candidate CV submission process</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
