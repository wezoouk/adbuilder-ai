import React from 'react';

const PageSkeleton = ({ title }) => (
  <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
    <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>{title}</h1>
    <div style={{ padding: '3rem', border: '2px dashed var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center', color: 'var(--text-tertiary)' }}>
      {title} page is currently under development.
    </div>
  </div>
);

export default PageSkeleton;
