import React from 'react';

const Badge = ({ children, variant = 'neutral', size = 'md' }) => {
  return (
    <span className={`badge badge-${variant} badge-${size}`}>
      {children}
      <style dangerouslySetInnerHTML={{ __html: `
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          font-weight: 600;
          line-height: 1;
        }

        .badge-md { font-size: 0.75rem; }
        .badge-lg { font-size: 0.875rem; padding: 0.25rem 0.75rem; }

        .badge-neutral { background-color: var(--bg-tertiary); color: var(--text-secondary); }
        .badge-brand { background-color: var(--brand-light); color: var(--brand); }
        .badge-success { background-color: #dcfce7; color: #166534; }
        .badge-warning { background-color: #fef9c3; color: #854d0e; }
        .badge-error { background-color: #fee2e2; color: #991b1b; }
      `}} />
    </span>
  );
};

export default Badge;
