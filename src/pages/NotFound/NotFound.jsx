import React from 'react';

export default function NotFound() {
  return (
    <div className="container" style={{ paddingTop: '10rem', paddingBottom: '6rem', textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p style={{ marginTop: '1rem', color: 'var(--color-steel-grey)' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <a href="/" className="btn-gold" style={{ marginTop: '2rem', display: 'inline-block' }}>
        Return to Home Page
      </a>
    </div>
  );
}
