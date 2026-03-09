import React from 'react';
import { Copy, FileText, Table, Share2, CheckCircle2 } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

const ExportStep = ({ formData }) => {
  return (
    <div className="export-step fade-in">
      <div className="export-hero">
        <div className="export-success-icon">
          <CheckCircle2 size={48} />
        </div>
        <h2>Campaign Ready for Export</h2>
        <p>Your Google Ads campaign assets are optimized and structured for immediate use.</p>
      </div>

      <div className="export-options">
        <Card title="Choose Export Format" className="export-card">
          <div className="export-grid">
            <button className="export-option-btn">
              <Copy size={24} />
              <span>Copy to Clipboard</span>
            </button>
            <button className="export-option-btn">
              <FileText size={24} />
              <span>Plain Text (.txt)</span>
            </button>
            <button className="export-option-btn">
              <Table size={24} />
              <span>Google Ads CSV</span>
            </button>
            <button className="export-option-btn">
              <Share2 size={24} />
              <span>Client Report (PDF)</span>
            </button>
          </div>
          <div className="export-actions">
            <Button className="w-full">Prepare Download</Button>
          </div>
        </Card>

        <Card title="Quick Preview" className="preview-card">
          <div className="text-preview">
            <p><strong>Campaign:</strong> Summer 2024 Wedding Bookings</p>
            <p><strong>Headlines:</strong></p>
            <ul>
              <li>Relaxed Wedding Photographer NE</li>
              <li>Natural & Authentic Photography</li>
              <li>Check Availability For 2024</li>
            </ul>
            <p><strong>Keywords:</strong></p>
            <p>wedding photographer north east, relaxed wedding photography...</p>
          </div>
        </Card>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .export-step { text-align: center; }
        .export-hero { margin-bottom: 3rem; }
        .export-success-icon { width: 80px; height: 80px; background-color: #dcfce7; color: var(--success); display: flex; align-items: center; justify-content: center; border-radius: 50%; margin: 0 auto 1.5rem; }
        .export-hero h2 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem; }
        .export-hero p { color: var(--text-secondary); }
        
        .export-options { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; text-align: left; }
        .export-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
        .export-option-btn { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 1.5rem; background-color: var(--bg-secondary); border: 1px solid var(--border); border-radius: var(--radius-md); transition: var(--transition-fast); }
        .export-option-btn:hover { border-color: var(--brand); background-color: var(--brand-light); color: var(--brand); }
        .export-option-btn span { font-size: 0.8125rem; font-weight: 600; }
        .text-preview { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.6; }
        .text-preview p { margin-bottom: 0.5rem; }
        .text-preview ul { padding-left: 1.25rem; margin-bottom: 1rem; }
        .w-full { width: 100%; }
        @media (max-width: 768px) { .export-options { grid-template-columns: 1fr; } }
      `}} />
    </div>
  );
};

export default ExportStep;
