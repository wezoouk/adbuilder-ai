import React, { useState } from 'react';
import {
  Download, Copy, CheckCircle2, FileText, Table, Code,
  ChevronDown, Eye, Sparkles
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { SAMPLE_DATA } from '../data/sampleData';

const generateCSV = (campaign) => {
  const biz = SAMPLE_DATA.businesses.find(b => b.id === campaign.businessId);
  const rows = [
    ['Campaign Name', 'Business', 'Objective', 'Headline 1', 'Headline 2', 'Headline 3', 'Headline 4', 'Headline 5', 'Description 1', 'Description 2', 'Keywords'],
    [
      campaign.name,
      biz?.name || '',
      campaign.objective,
      ...(campaign.headlines || []).slice(0, 5).concat(Array(5).fill('')).slice(0, 5),
      ...(campaign.descriptions || []).slice(0, 2).concat(Array(2).fill('')).slice(0, 2),
      (campaign.keywords || []).map(k => k.phrase).join('; ')
    ]
  ];
  return rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
};

const downloadCSV = (campaign) => {
  const csv = generateCSV(campaign);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${campaign.name.replace(/\s+/g, '_')}_campaign.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const copyJSON = (campaign) => {
  const payload = {
    campaignName: campaign.name,
    objective: campaign.objective,
    headlines: campaign.headlines || [],
    descriptions: campaign.descriptions || [],
    keywords: (campaign.keywords || []).map(k => k.phrase),
    audience: campaign.audience || {}
  };
  navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
};

const generateGoogleAdsFormat = (campaign) => {
  const headlines = (campaign.headlines || []).map((h, i) => `  Headline ${i + 1}: ${h}`).join('\n');
  const descriptions = (campaign.descriptions || []).map((d, i) => `  Description ${i + 1}: ${d}`).join('\n');
  const keywords = (campaign.keywords || []).map(k => `  "${k.phrase}" [${k.intent?.toUpperCase() || 'BROAD'}]`).join('\n');
  return `CAMPAIGN: ${campaign.name}
Objective: ${campaign.objective}

--- AD COPY ---
${headlines}
${descriptions}

--- KEYWORDS ---
${keywords}`;
};

const ExportCenter = () => {
  const [selectedId, setSelectedId] = useState(SAMPLE_DATA.campaigns[0]?.id || '');
  const [previewFormat, setPreviewFormat] = useState('csv');
  const [copiedStates, setCopiedStates] = useState({});

  const campaign = SAMPLE_DATA.campaigns.find(c => c.id === selectedId);
  const biz = SAMPLE_DATA.businesses.find(b => b.id === campaign?.businessId);

  const markCopied = (key) => {
    setCopiedStates(s => ({ ...s, [key]: true }));
    setTimeout(() => setCopiedStates(s => ({ ...s, [key]: false })), 2000);
  };

  const previewContent = campaign
    ? (previewFormat === 'csv'
        ? generateCSV(campaign)
        : previewFormat === 'json'
        ? JSON.stringify({ campaignName: campaign.name, objective: campaign.objective, headlines: campaign.headlines, descriptions: campaign.descriptions, keywords: (campaign.keywords || []).map(k => k.phrase) }, null, 2)
        : generateGoogleAdsFormat(campaign))
    : '';

  return (
    <div className="ec-root fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Export Center</h1>
          <p className="page-subtitle">Download your campaign assets in the format that suits your workflow.</p>
        </div>
      </header>

      {/* Campaign Selector */}
      <Card className="ec-selector-card">
        <div className="ec-selector-inner">
          <div className="ec-select-group">
            <label>Select campaign to export</label>
            <div className="ec-select-wrap">
              <select value={selectedId} onChange={e => setSelectedId(e.target.value)}>
                {SAMPLE_DATA.campaigns.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <ChevronDown size={14} />
            </div>
          </div>
          {campaign && (
            <div className="ec-campaign-info">
              <span className="ec-info-tag">{biz?.name}</span>
              <span className="ec-info-tag">{campaign.objective}</span>
              <Badge variant="success">Ready to Export</Badge>
            </div>
          )}
        </div>
      </Card>

      {campaign && (
        <div className="ec-main-grid">
          {/* Export Options */}
          <div className="ec-options">
            <h2 className="ec-section-title">Export Formats</h2>

            <div className="ec-option-card" onClick={() => downloadCSV(campaign)}>
              <div className="ec-option-icon ec-icon-green"><Table size={22} /></div>
              <div className="ec-option-body">
                <h3>CSV Spreadsheet</h3>
                <p>Perfect for uploading to Google Ads Editor or sharing with your team.</p>
                <div className="ec-option-meta">
                  <span>Google Ads Editor compatible</span>
                  <span>·</span>
                  <span>Excel / Sheets</span>
                </div>
              </div>
              <button className="ec-action-btn" onClick={e => { e.stopPropagation(); downloadCSV(campaign); }}>
                <Download size={16} /> Download
              </button>
            </div>

            <div className="ec-option-card" onClick={() => { copyJSON(campaign); markCopied('json'); setPreviewFormat('json'); }}>
              <div className="ec-option-icon ec-icon-brand"><Code size={22} /></div>
              <div className="ec-option-body">
                <h3>JSON (API Format)</h3>
                <p>Copy structured data for use in integrations, scripts, or custom tools.</p>
                <div className="ec-option-meta">
                  <span>Developer-friendly</span>
                  <span>·</span>
                  <span>API-ready</span>
                </div>
              </div>
              <button className="ec-action-btn" onClick={e => { e.stopPropagation(); copyJSON(campaign); markCopied('json'); setPreviewFormat('json'); }}>
                {copiedStates['json'] ? <><CheckCircle2 size={15} /> Copied!</> : <><Copy size={15} /> Copy</>}
              </button>
            </div>

            <div className="ec-option-card" onClick={() => { navigator.clipboard.writeText(generateGoogleAdsFormat(campaign)); markCopied('gads'); setPreviewFormat('gads'); }}>
              <div className="ec-option-icon ec-icon-orange"><Sparkles size={22} /></div>
              <div className="ec-option-body">
                <h3>Google Ads Format</h3>
                <p>Formatted text ready to paste directly into your Google Ads account.</p>
                <div className="ec-option-meta">
                  <span>Human-readable</span>
                  <span>·</span>
                  <span>Paste-ready</span>
                </div>
              </div>
              <button className="ec-action-btn" onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(generateGoogleAdsFormat(campaign)); markCopied('gads'); setPreviewFormat('gads'); }}>
                {copiedStates['gads'] ? <><CheckCircle2 size={15} /> Copied!</> : <><Copy size={15} /> Copy</>}
              </button>
            </div>

            {/* Summary stats */}
            <Card className="ec-stats-card">
              <h3 className="ec-stats-title">Campaign Summary</h3>
              <div className="ec-stats-grid">
                <div className="ec-stat"><span className="ec-stat-val">{(campaign.headlines || []).length}</span><span className="ec-stat-label">Headlines</span></div>
                <div className="ec-stat"><span className="ec-stat-val">{(campaign.descriptions || []).length}</span><span className="ec-stat-label">Descriptions</span></div>
                <div className="ec-stat"><span className="ec-stat-val">{(campaign.keywords || []).length}</span><span className="ec-stat-label">Keywords</span></div>
                <div className="ec-stat"><span className="ec-stat-val">{campaign.adStrength || '—'}/10</span><span className="ec-stat-label">Ad Strength</span></div>
              </div>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="ec-preview-panel">
            <div className="ec-preview-header">
              <h2 className="ec-section-title" style={{ margin: 0 }}>Preview</h2>
              <div className="ec-fmt-tabs">
                {['csv', 'json', 'gads'].map(fmt => (
                  <button key={fmt} className={`ec-fmt-tab ${previewFormat === fmt ? 'active' : ''}`} onClick={() => setPreviewFormat(fmt)}>
                    {fmt === 'csv' ? 'CSV' : fmt === 'json' ? 'JSON' : 'Google Ads'}
                  </button>
                ))}
              </div>
            </div>
            <pre className="ec-preview-code">{previewContent}</pre>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .ec-root { animation: fadeIn 0.4s ease-out; }
        .page-header { margin-bottom: 2.5rem; }
        .page-title { font-size: 2.25rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.5rem; }
        .page-subtitle { color: var(--text-secondary); font-size: 1.125rem; }
        .ec-selector-card { margin-bottom: 2.5rem; }
        .ec-selector-inner { display: flex; align-items: flex-end; gap: 1.5rem; flex-wrap: wrap; }
        .ec-select-group { display: flex; flex-direction: column; gap: 0.375rem; }
        .ec-select-group label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); }
        .ec-select-wrap { position: relative; }
        .ec-select-wrap select { appearance: none; padding: 0.5rem 2.25rem 0.5rem 0.875rem; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: var(--radius-md); font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); outline: none; min-width: 220px; cursor: pointer; }
        .ec-select-wrap svg { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); pointer-events: none; }
        .ec-campaign-info { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .ec-info-tag { font-size: 0.8125rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--text-secondary); }
        .ec-main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .ec-section-title { font-size: 1.125rem; font-weight: 700; margin-bottom: 1.25rem; }
        .ec-options { display: flex; flex-direction: column; gap: 1rem; }
        .ec-option-card { display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem 1.5rem; background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius-lg); cursor: pointer; transition: var(--transition-fast); }
        .ec-option-card:hover { border-color: var(--brand); box-shadow: var(--shadow-md); transform: translateY(-1px); }
        .ec-option-icon { width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ec-icon-green { background: #dcfce7; color: #16a34a; }
        .ec-icon-brand { background: var(--brand-light); color: var(--brand); }
        .ec-icon-orange { background: #fff7ed; color: #c2410c; }
        .ec-option-body { flex: 1; }
        .ec-option-body h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.25rem; }
        .ec-option-body p { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 0.375rem; }
        .ec-option-meta { display: flex; gap: 0.5rem; font-size: 0.75rem; color: var(--text-tertiary); font-weight: 500; }
        .ec-action-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: var(--radius-md); font-size: 0.8125rem; font-weight: 600; color: var(--text-primary); cursor: pointer; transition: var(--transition-fast); white-space: nowrap; }
        .ec-action-btn:hover { background: var(--brand-light); border-color: var(--brand); color: var(--brand); }
        .ec-stats-card { margin-top: 0.5rem; }
        .ec-stats-title { font-size: 0.875rem; font-weight: 700; margin-bottom: 1rem; }
        .ec-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .ec-stat { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
        .ec-stat-val { font-size: 1.5rem; font-weight: 800; color: var(--brand); }
        .ec-stat-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); text-align: center; }
        .ec-preview-panel { }
        .ec-preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .ec-fmt-tabs { display: flex; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 8px; padding: 0.2rem; gap: 0.2rem; }
        .ec-fmt-tab { padding: 0.375rem 0.75rem; font-size: 0.8125rem; font-weight: 600; border-radius: 6px; color: var(--text-secondary); transition: var(--transition-fast); }
        .ec-fmt-tab.active { background: var(--bg-primary); color: var(--brand); box-shadow: var(--shadow-sm); }
        .ec-preview-code { background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.5rem; font-size: 0.8125rem; font-family: 'Courier New', monospace; color: var(--text-secondary); line-height: 1.6; overflow-x: auto; white-space: pre-wrap; max-height: 520px; overflow-y: auto; }
        @media (max-width: 1100px) { .ec-main-grid { grid-template-columns: 1fr; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
};

export default ExportCenter;
