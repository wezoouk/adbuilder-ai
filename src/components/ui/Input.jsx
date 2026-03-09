import React from 'react';

const Input = ({ label, error, hint, className = '', ...props }) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <input className={`input-field ${error ? 'input-error' : ''}`} {...props} />
      {error && <p className="error-text">{error}</p>}
      {hint && !error && <p className="hint-text">{hint}</p>}

      <style dangerouslySetInnerHTML={{ __html: `
        .input-group {
          margin-bottom: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .input-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .input-field {
          padding: 0.625rem 0.875rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background-color: var(--bg-primary);
          color: var(--text-primary);
          transition: var(--transition-fast);
          outline: none;
        }

        .input-field:focus {
          border-color: var(--brand);
          box-shadow: 0 0 0 3px var(--brand-light);
        }

        .input-field.input-error {
          border-color: var(--error);
        }

        .error-text {
          font-size: 0.75rem;
          color: var(--error);
          font-weight: 500;
        }

        .hint-text {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }
      `}} />
    </div>
  );
};

export default Input;
