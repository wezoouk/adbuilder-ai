import React from 'react';
import { Globe, MoreVertical, ExternalLink } from 'lucide-react';

const GoogleAdPreview = ({ headlines = [], descriptions = [], url = 'www.yourbusiness.com' }) => {
  // Take first 3 headlines and 2 descriptions for the preview
  const displayHeadlines = headlines.slice(0, 3).filter(h => h.trim().length > 0);
  const displayDescriptions = descriptions.slice(0, 2).filter(d => d.trim().length > 0);

  return (
    <div className="google-preview-container">
      <div className="preview-label">Google Search Preview</div>
      
      <div className="google-ad-box">
        <div className="ad-header">
          <div className="ad-favicon">
            <Globe size={14} />
          </div>
          <div className="ad-url-info">
            <span className="ad-display-url">{url}</span>
            <div className="ad-label-pill">Sponsored <MoreVertical size={12} /></div>
          </div>
        </div>

        <div className="ad-title">
          {displayHeadlines.length > 0 
            ? displayHeadlines.join(' | ') 
            : 'Your Ad Headline Will Appear Here'}
        </div>

        <div className="ad-description">
          {displayDescriptions.length > 0 
            ? displayDescriptions.join(' ') 
            : 'Your compelling ad description will appear here to encourage users to click on your ad and visit your website.'}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .google-preview-container {
          background-color: white;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
        }
        .preview-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
        }
        .google-ad-box {
          max-width: 600px;
          font-family: arial, sans-serif;
        }
        .ad-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.25rem;
        }
        .ad-favicon {
          width: 26px;
          height: 26px;
          background-color: #f1f3f4;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5f6368;
        }
        .ad-url-info {
           display: flex;
           flex-direction: column;
        }
        .ad-display-url {
          color: #202124;
          font-size: 0.875rem;
          line-height: 1.3;
        }
        .ad-label-pill {
          font-size: 0.75rem;
          color: #4d5156;
          display: flex;
          align-items: center;
          font-weight: bold;
        }
        .ad-title {
          color: #1a0dab;
          font-size: 1.25rem;
          line-height: 1.3;
          margin-bottom: 0.25rem;
          cursor: pointer;
          word-wrap: break-word;
        }
        .ad-title:hover {
          text-decoration: underline;
        }
        .ad-description {
          color: #4d5156;
          font-size: 0.875rem;
          line-height: 1.5;
          word-wrap: break-word;
        }
      `}} />
    </div>
  );
};

export default GoogleAdPreview;
