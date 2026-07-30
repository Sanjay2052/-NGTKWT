import React, { useState } from 'react';
import { Search } from 'lucide-react';
import FAQItem from './FAQItem';
import './FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'How does the NGTKWT platform connect companies with professionals?',
      answer: 'NGTKWT is a B2B talent connection platform. Enterprise energy companies submit technical workforce requirements, and our platform aligns them with qualified technical professionals across drilling, HSE, offshore, marine, and EPC disciplines.'
    },
    {
      question: 'What candidate qualifications and credentials can be displayed?',
      answer: 'Technical professionals can showcase international trade credentials on their platform profiles, including OPITO, BOSIET, NEBOSH, IWCF, OGUK medical fitness, and specialized engineering certifications.'
    },
    {
      question: 'How do enterprise energy companies submit workforce requirements?',
      answer: 'Organizations can use our streamlined Enterprise Inquiry form to detail specific project needs, required technical disciplines, and operational scope.'
    },
    {
      question: 'Can international technical professionals submit their CVs?',
      answer: 'Yes. NGTKWT connects global energy talent with industry leaders. Technical professionals worldwide can submit their CVs through our platform to join our specialized network.'
    },
    {
      question: 'Is NGTKWT a direct recruitment or staffing agency?',
      answer: 'No. NGTKWT operates exclusively as a B2B talent connection platform bridging enterprise oil & gas companies with highly qualified technical professionals.'
    },
    {
      question: 'How do technical professionals submit their profiles?',
      answer: 'Candidates can submit their CV and technical credentials directly using our Submit Your CV portal form on the website.'
    }
  ];

  const filteredFaqs = faqs.filter(
    f => f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
         f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="section-padding" style={{
      background: '#F4F6F9',
      color: 'var(--color-navy-950)'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 style={{ color: 'var(--color-navy-950)', marginBottom: '1.25rem' }}>
            Frequently Asked <span style={{ color: 'var(--color-gold-primary)' }}>Questions</span>
          </h2>
          <p style={{ color: 'var(--color-steel-grey)', fontSize: '1.1rem' }}>
            Learn how the NGTKWT platform connects enterprise energy companies with qualified technical professionals.
          </p>

          <div style={{
            position: 'relative',
            marginTop: '2rem',
            maxWidth: '550px',
            margin: '2rem auto 0 auto'
          }}>
            <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gold-primary)' }} />
            <input 
              type="text" 
              placeholder="Search questions (e.g. platform, CV submission, credentials)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem 1rem 0.9rem 3.25rem',
                borderRadius: '0.75rem',
                background: '#FFFFFF',
                border: '1px solid #D1D9E0',
                color: 'var(--color-navy-950)',
                fontSize: '0.95rem',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(10,37,64,0.04)'
              }}
            />
          </div>
        </div>

        <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => (
              <FAQItem 
                key={idx} 
                faq={faq} 
                isOpen={openIndex === idx} 
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)} 
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--color-steel-grey)', padding: '2rem' }}>
              No matching questions found for "{searchQuery}". Contact our team directly below.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
