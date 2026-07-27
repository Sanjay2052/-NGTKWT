import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsCounter from './components/StatsCounter';
import AboutSection from './components/AboutSection';
import WhyChooseUs from './components/WhyChooseUs';
import SafetyCompliance from './components/SafetyCompliance';
import ServicesSection from './components/ServicesSection';
import IndustriesSection from './components/IndustriesSection';
import CompanyForm from './components/CompanyForm';
import WorkerForm from './components/WorkerForm';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import { CheckCircle2, X, ArrowUp } from 'lucide-react';

export default function App() {
  const [legalType, setLegalType] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Force manual scroll restoration so browsers do not restore scroll position on site refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll to top immediately on refresh/load
    window.scrollTo(0, 0);

    // Reinforce scroll to top after initial layout paint
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', color: 'var(--color-navy-950)' }}>

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 99999,
          background: 'linear-gradient(135deg, #0B1E36, #07111E)',
          border: '1px solid var(--color-orange-primary)',
          padding: '1rem 1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 30px rgba(249, 87, 56, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#FFFFFF'
        }}>
          <CheckCircle2 size={22} style={{ color: '#4ADE80' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Success</div>
            <div style={{ fontSize: '0.825rem', color: 'var(--color-gray-300)' }}>{toastMessage}</div>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            style={{ background: 'transparent', border: 'none', color: 'var(--color-gray-400)', cursor: 'pointer', marginLeft: '0.5rem' }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Sticky Header */}
      <Navbar />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Stats / Key Metrics */}
      <StatsCounter />

      {/* 3. About NGTKWT */}
      <AboutSection />

      {/* 5. Why Choose NGTKWT */}
      <WhyChooseUs />

      {/* 6. Safety & Compliance */}
      <SafetyCompliance />

      {/* 7. Specialized Talent Categories */}
      <ServicesSection />

      {/* 8. Industries We Serve */}
      <IndustriesSection />

      {/* 11. Company Request Form */}
      <CompanyForm onSubmissionSuccess={showToast} />

      {/* 12. Worker Application Form */}
      <WorkerForm onSubmissionSuccess={showToast} />

      {/* 13. FAQ Accordion */}
      <FAQSection />

      {/* 14. Contact Details & Map */}
      <ContactSection />

      {/* 15. Footer */}
      <Footer onOpenLegal={(type) => setLegalType(type)} />

      {/* Legal Modal */}
      <LegalModal type={legalType} onClose={() => setLegalType(null)} />

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            bottom: toastMessage ? '7rem' : '2rem',
            right: '2rem',
            zIndex: 9999,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0B1E36, #07111E)',
            border: '1.5px solid var(--color-orange-primary, #F95738)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(249, 87, 56, 0.4)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(249, 87, 56, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(249, 87, 56, 0.4)';
          }}
        >
          <ArrowUp size={22} style={{ color: 'var(--color-orange-primary, #F95738)' }} />
        </button>
      )}

    </div>
  );
}


