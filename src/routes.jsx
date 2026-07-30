import React from 'react';
import Home from './pages/Home/Home';
import AboutPage from './pages/About/About';
import ServicesPage from './pages/Services/Services';
import ContactPage from './pages/Contact/Contact';
import PrivacyPage from './pages/Privacy/Privacy';
import NotFound from './pages/NotFound/NotFound';

export const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '*', element: <NotFound /> },
];

export default function AppRoutes({ toastHandler }) {
  return <Home onSubmissionSuccess={toastHandler} />;
}
