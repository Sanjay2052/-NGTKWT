import React, { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';

export default function App() {
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <MainLayout toastMessage={toastMessage} setToastMessage={setToastMessage}>
      <Home onSubmissionSuccess={showToast} />
    </MainLayout>
  );
}
