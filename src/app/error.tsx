'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
        background: 'var(--color-white)',
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          fontWeight: 300,
          color: 'var(--color-primary)',
          marginBottom: '1rem',
        }}
      >
        Something went wrong
      </h2>
      <p
        style={{
          fontSize: '1rem',
          color: 'var(--color-gray-500)',
          marginBottom: '2rem',
          maxWidth: '480px',
        }}
      >
        We encountered an unexpected error. Please try refreshing the page.
      </p>
      <button
        onClick={reset}
        style={{
          padding: '12px 28px',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'white',
          background: 'var(--color-accent)',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background 0.3s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = '#1a6ee0')}
        onMouseOut={(e) => (e.currentTarget.style.background = 'var(--color-accent)')}
      >
        Try Again
      </button>
    </div>
  );
}
