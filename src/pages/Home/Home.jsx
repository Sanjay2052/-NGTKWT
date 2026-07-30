import React from 'react';
import Hero from '../../components/Hero/Hero';
import StatsCounter from '../../components/StatsCounter/StatsCounter';
import About from '../../components/About/About';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import SafetyCompliance from '../../components/SafetyCompliance/SafetyCompliance';
import Services from '../../components/Services/Services';
import Industries from '../../components/Industries/Industries';
import ReadyToMobilize from '../../components/ReadyToMobilize/ReadyToMobilize';
import CompanyForm from '../../components/CompanyForm/CompanyForm';
import WorkerForm from '../../components/WorkerForm/WorkerForm';
import FAQ from '../../components/FAQ/FAQ';
import Contact from '../../components/Contact/Contact';
import './Home.css';

export default function Home({ onSubmissionSuccess }) {
  return (
    <div className="home-page">
      <Hero />
      <StatsCounter />
      <About />
      <WhyChooseUs />
      <SafetyCompliance />
      <Services />
      <Industries />
      <ReadyToMobilize />
      <CompanyForm onSubmissionSuccess={onSubmissionSuccess} />
      <WorkerForm onSubmissionSuccess={onSubmissionSuccess} />
      <FAQ />
      <Contact />
    </div>
  );
}
