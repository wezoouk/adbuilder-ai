import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${className}`} 
      {...props}
    >
      {children}
      <style dangerouslySetInnerHTML={{ __html: `
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 600;
          border-radius: var(--radius-md);
          transition: var(--transition-fast);
          cursor: pointer;
          white-space: nowrap;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-sm { padding: 0.4rem 0.8rem; font-size: 0.875rem; }
        .btn-md { padding: 0.6rem 1.25rem; font-size: 0.875rem; }
        .btn-lg { padding: 0.8rem 1.75rem; font-size: 1rem; }

        .btn-primary {
          background-color: var(--brand);
          color: white;
        }
        .btn-primary:hover:not(:disabled) {
          background-color: var(--brand-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .btn-secondary {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border);
        }
        .btn-secondary:hover:not(:disabled) {
          background-color: var(--bg-primary);
          border-color: var(--border-hover);
        }

        .btn-outline {
          background-color: transparent;
          color: var(--brand);
          border: 1px solid var(--brand);
        }
        .btn-outline:hover:not(:disabled) {
          background-color: var(--brand-light);
        }

        .btn-ghost {
          background-color: transparent;
          color: var(--text-secondary);
        }
        .btn-ghost:hover:not(:disabled) {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .btn-danger {
          background-color: var(--error);
          color: white;
        }
      `}} />
    </button>
  );
};

export default Button;
