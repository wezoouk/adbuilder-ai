import React from 'react';

const Card = ({ children, title, subtitle, footer, className = '', padding = '1.5rem', ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card-content" style={{ padding }}>
        {children}
      </div>
      {footer && <div className="card-footer">{footer}</div>}

      <style dangerouslySetInnerHTML={{ __html: `
        .card {
          background-color: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          transition: var(--transition-normal);
        }

        .card:hover {
          box-shadow: var(--shadow-md);
        }

        .card-header {
          padding: 1.5rem 1.5rem 0 1.5rem;
          margin-bottom: -0.5rem;
        }

        .card-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .card-subtitle {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .card-footer {
          padding: 1rem 1.5rem;
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border);
        }
      `}} />
    </div>
  );
};

export default Card;
