import React, { useState } from 'react';
import {
  Sparkles, Copy, RefreshCw, Monitor, Smartphone, CheckCircle2,
  AlertTriangle, Eye, RotateCcw, ChevronDown
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import GoogleAdPreview from '../components/ui/GoogleAdPreview';
import { SAMPLE_DATA } from '../data/sampleData';

const calculateScore = (headlines, descriptions) => {
  let score = 0;
  const feedback = [];
  const checks = [];

  const h1 = headlines[0] || '';
  const d1 = descriptions[0] || '';

  // Length checks
  const headlineLengthOk = headlines.filter(h => h.length >= 10 && h.length <= 30).length >= 3;
  checks.push({ label: 'Headlines 10–30 chars', ok: headlineLengthOk });
  if (headlineLengthOk) score += 25; else feedback.push('Keep headlines between 10–30 characters for best display.');

  const descLengthOk = descriptions.some(d => d.length >= 60 && d.length <= 90);
  checks.push({ label: 'Description length (60–90)', ok: descLengthOk });
  if (descLengthOk) score += 25; else feedback.push('Use 60–90 characters in at least one description.');

  // CTA check
  const hasCTA = /book|call|get|start|save|now|today|free|try|discover|claim/i.test(d1 + ' ' + h1);
  checks.push({ label: 'Clear call-to-action', ok: hasCTA });
  if (hasCTA) score += 25; else feedback.push("Add a CTA like 'Book Now', 'Get Started', or 'Call Today'.");

  // Uniqueness
  const allUnique = new Set(headlines.map(h => h.trim().toLowerCase())).size === headlines.filter(h => h.length > 0).length;
  checks.push({ label: 'All headlines are unique', ok: allUnique });
  if (allUnique) score += 25; else feedback.push('Each headline should be unique — avoid duplicating phrases.');

  return { score: Math.min(score, 100), feedback, checks };
};

const AdCard = ({ tag, content, limit, onUpdate, onCopy }) => {
  const isOver = content.length > limit;
  return (
    <div className={`adg-card ${isOver ? 'adg-card--error' : ''}`}>
      <div className="adg-card-top">
        <Badge variant={isOver ? 'error' : 'brand'}>{tag}</Badge>
        <span className="adg-char" style={{ color: isOver ? 'var(--error)' : 'var(--text-tertiary)' }}>
          {content.length}/{limit}
        </span>
      </div>
      <textarea
        className="adg-textarea"
        value={content}
        onChange={e => onUpdate(e.target.value)}
        rows={tag.startsWith('Desc') ? 3 : 2}
        spellCheck={false}
      />
      <div className="adg-card-actions">
        <button className="adg-icon-btn" title="Copy" onClick={() => { navigator.clipboard.writeText(content); }}>
          <Copy size={14} />
        </button>
        <button className="adg-icon-btn" title="Regenerate" onClick={onCopy}>
          <RefreshCw size={14} />
        </button>
      </div>
    </div>
  );
};

// Build contextual copy from a business profile
const generateFromBusiness = (biz) => {
  const trim = (s, max) => s && s.length > max ? s.slice(0, max) : (s || '');
  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  const ctaMap = { 'Local Service': 'Get a Free Quote', 'Local Business': 'Book Now' };
  const cta = ctaMap[biz?.type] || 'Get in Touch';
  const mainKw = biz?.mainProduct || biz?.industry || 'Professional Service';
  const usp = biz?.usp || '';
  const offer = biz?.mainOffer || '';
  const price = biz?.priceRange ? `From ${biz.priceRange.split('–')[0].trim()}` : null;
  const location = biz?.location ? biz.location.split(',')[0].trim() : '';
  const name = biz?.name || 'Us';

  const headlines = [
    trim(cap(mainKw) + (location ? ` ${location}` : ''), 30),
    trim(price || `Expert ${mainKw}`, 30),
    trim(usp.split(',')[0] || `5-Star Rated ${mainKw}`, 30),
    trim(`${cta} Today`, 30),
    trim(name, 30),
  ].map((h, i) => h || ['Trusted Professionals', 'Book Online Today', 'Award Winning', 'Free Consultation', 'Get in Touch'][i]);

  const d1 = trim(`${offer || mainKw}. ${price ? price + '.' : ''} ${cta} today.`, 90);
  const d2 = trim(`Perfect for ${(biz?.targetCustomer || 'you').toLowerCase()}. ${usp.split(',')[0] || 'Trusted service'}. ${cta}.`, 90);

  const headlinePool = [
    trim(cap(mainKw), 30), trim(`Award-Winning ${mainKw}`, 30), trim(`Trusted ${mainKw}`, 30),
    price ? trim(price, 30) : trim('Free Consultation', 30),
    trim(`${cta} Today`, 30), trim(`${mainKw} Specialists`, 30),
    location ? trim(`${mainKw} in ${location}`, 30) : trim('5-Star Rated', 30),
    trim(`Book ${name} Now`, 30), trim(usp.split(',')[0] || 'Experts You Can Trust', 30),
    trim(`No.1 ${biz?.industry || mainKw}`, 30),
  ].filter(h => h && h.length > 3);

  const descPool = [
    d1, d2,
    trim(`${cap(usp.split(',')[0] || 'Professional service')}. ${price ? price + '. ' : ''}${cta} today.`, 90),
    trim(`Serving ${location || 'the local area'} with expert ${mainKw.toLowerCase()}. ${cta} now.`, 90),
    trim(`Rated 5 stars by happy customers. ${offer || mainKw}. ${cta}.`, 90),
  ].filter(d => d && d.length > 15);

  return { headlines, descriptions: [d1?.length > 10 ? d1 : `Professional ${mainKw}. ${cta} today.`, d2?.length > 10 ? d2 : `Trusted local ${mainKw}. Transparent pricing. ${cta} now.`], headlinePool, descPool };
};

const AdGenerator = () => {
  const [selectedBizId, setSelectedBizId] = useState(SAMPLE_DATA.businesses[0].id);
  const [selectedCampId, setSelectedCampId] = useState('');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [isGenerating, setIsGenerating] = useState(false);

  const business = SAMPLE_DATA.businesses.find(b => b.id === selectedBizId);
  const campaigns = SAMPLE_DATA.campaigns.filter(c => c.businessId === selectedBizId);

  const init = generateFromBusiness(business);
  const [headlines, setHeadlines] = useState(init.headlines);
  const [descriptions, setDescriptions] = useState(init.descriptions);
  const [headlinePool, setHeadlinePool] = useState(init.headlinePool);
  const [descPool, setDescPool] = useState(init.descPool);

  const switchBusiness = (bizId) => {
    setSelectedBizId(bizId);
    setSelectedCampId('');
    const biz = SAMPLE_DATA.businesses.find(b => b.id === bizId);
    const gen = generateFromBusiness(biz);
    setHeadlines(gen.headlines);
    setDescriptions(gen.descriptions);
    setHeadlinePool(gen.headlinePool);
    setDescPool(gen.descPool);
  };

  const regenerateAll = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const gen = generateFromBusiness(business);
      setHeadlines([...gen.headlinePool].sort(() => Math.random() - 0.5).slice(0, 5));
      setDescriptions([...gen.descPool].sort(() => Math.random() - 0.5).slice(0, 2));
      setIsGenerating(false);
    }, 700);
  };

  const loadFromCampaign = (campId) => {
    const camp = SAMPLE_DATA.campaigns.find(c => c.id === campId);
    if (camp) {
      if (camp.headlines?.length) setHeadlines([...camp.headlines]);
      if (camp.descriptions?.length) setDescriptions([...camp.descriptions]);
      setSelectedCampId(campId);
    }
  };

  const regenerateHeadline = (idx) => {
    const used = new Set(headlines);
    const fresh = headlinePool.filter(h => !used.has(h));
    const pool = fresh.length > 0 ? fresh : headlinePool;
    const pick = pool[Math.floor(Math.random() * pool.length)] || headlines[idx];
    const next = [...headlines]; next[idx] = pick; setHeadlines(next);
  };

  const regenerateDesc = (idx) => {
    const used = new Set(descriptions);
    const fresh = descPool.filter(d => !used.has(d));
    const pool = fresh.length > 0 ? fresh : descPool;
    const pick = pool[Math.floor(Math.random() * pool.length)] || descriptions[idx];
    const next = [...descriptions]; next[idx] = pick; setDescriptions(next);
  };

  const { score, feedback, checks } = calculateScore(headlines, descriptions);
  const scoreColor = score >= 80 ? 'var(--success)' : score >= 50 ? 'var(--warning)' : 'var(--error)';
  const scoreLabel = score >= 80 ? 'Excellent' : score >= 50 ? 'Good' : 'Needs Work';

  return (
    <div className="adg-root fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Ad Generator</h1>
          <p className="page-subtitle">Create, refine, and preview your Google Ads copy in real time.</p>
        </div>
      </header>

      {/* Controls bar */}
      <div className="adg-controls-bar">
        <div className="adg-select-group">
          <label>Business</label>
          <div className="adg-select-wrap">
            <select value={selectedBizId} onChange={e => switchBusiness(e.target.value)}>
              {SAMPLE_DATA.businesses.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
            <ChevronDown size={14} />
          </div>
        </div>
        {campaigns.length > 0 && (
          <div className="adg-select-group">
            <label>Load from Campaign</label>
            <div className="adg-select-wrap">
              <select value={selectedCampId} onChange={e => loadFromCampaign(e.target.value)}>
                <option value="">— Start fresh —</option>
                {campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <ChevronDown size={14} />
            </div>
          </div>
        )}
        <div className="adg-controls-right">
          <button
            type="button"
            className={`adg-ai-btn ${isGenerating ? 'adg-ai-btn--loading' : ''}`}
            onClick={regenerateAll}
            disabled={isGenerating}
          >
            {isGenerating
              ? <><span className="adg-spinner" /> Generating...</>
              : <><Sparkles size={15} /> Generate with AI</>
            }
          </button>
          <button type="button" className="adg-reset-btn" onClick={() => { setHeadlines(['','','','','']); setDescriptions(['','']); }}>
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <div className="adg-layout">
        {/* Editor */}
        <div className="adg-editor">
          <div className="adg-section">
            <div className="adg-section-header">
              <h3>Headlines <span>(up to 5 · max 30 chars each)</span></h3>
              <Badge variant="neutral">{headlines.filter(h => h.length > 0).length} / 5</Badge>
            </div>
            <div className="adg-grid">
              {headlines.map((h, i) => (
                <AdCard
                  key={i}
                  tag={`Headline ${i + 1}`}
                  content={h}
                  limit={30}
                  onUpdate={val => { const n = [...headlines]; n[i] = val; setHeadlines(n); }}
                  onCopy={() => regenerateHeadline(i)}
                />
              ))}
            </div>
          </div>

          <div className="adg-section">
            <div className="adg-section-header">
              <h3>Descriptions <span>(up to 2 · max 90 chars each)</span></h3>
              <Badge variant="neutral">{descriptions.filter(d => d.length > 0).length} / 2</Badge>
            </div>
            <div className="adg-grid-wide">
              {descriptions.map((d, i) => (
                <AdCard
                  key={i}
                  tag={`Description ${i + 1}`}
                  content={d}
                  limit={90}
                  onUpdate={val => { const n = [...descriptions]; n[i] = val; setDescriptions(n); }}
                  onCopy={() => regenerateDesc(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="adg-sidebar">
          <div className="adg-sidebar-sticky">
            {/* Score Widget */}
            <Card className="adg-score-card">
              <div className="adg-score-top">
                <div className="adg-score-ring" style={{ '--score-color': scoreColor }}>
                  <svg viewBox="0 0 36 36">
                    <path className="adg-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path
                      className="adg-ring-fill"
                      style={{ stroke: scoreColor }}
                      strokeDasharray={`${score}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.5" className="adg-ring-text">{score}</text>
                  </svg>
                </div>
                <div>
                  <div className="adg-score-label">Ad Quality Score</div>
                  <div className="adg-score-status" style={{ color: scoreColor }}>{scoreLabel}</div>
                </div>
              </div>
              <div className="adg-checks">
                {checks.map((c, i) => (
                  <div key={i} className={`adg-check-item ${c.ok ? 'ok' : 'fail'}`}>
                    {c.ok ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
              {feedback.length > 0 && (
                <div className="adg-feedback">
                  {feedback.map((f, i) => (
                    <div key={i} className="adg-feedback-item">
                      <AlertTriangle size={12} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Preview Controls */}
            <div className="adg-preview-controls">
              <button className={`adg-ctrl-btn ${previewMode === 'desktop' ? 'active' : ''}`} onClick={() => setPreviewMode('desktop')}>
                <Monitor size={14} /> Desktop
              </button>
              <button className={`adg-ctrl-btn ${previewMode === 'mobile' ? 'active' : ''}`} onClick={() => setPreviewMode('mobile')}>
                <Smartphone size={14} /> Mobile
              </button>
            </div>

            <div className={`adg-preview-wrap ${previewMode}`}>
              <GoogleAdPreview
                headlines={headlines}
                descriptions={descriptions}
                url={business?.url?.replace('https://', '') || 'yourbusiness.co.uk'}
              />
            </div>
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .adg-root { animation: fadeIn 0.4s ease-out; }
        .page-header { margin-bottom: 2rem; }
        .page-title { font-size: 2.25rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.5rem; }
        .page-subtitle { color: var(--text-secondary); font-size: 1.125rem; }

        .adg-controls-bar {
          display: flex; align-items: flex-end; gap: 1.5rem; margin-bottom: 2.5rem;
          padding: 1.25rem 1.5rem; background: var(--bg-primary); border: 1px solid var(--border);
          border-radius: var(--radius-lg); flex-wrap: wrap;
        }
        .adg-select-group { display: flex; flex-direction: column; gap: 0.375rem; }
        .adg-select-group label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); letter-spacing: 0.05em; }
        .adg-select-wrap { position: relative; }
        .adg-select-wrap select { appearance: none; padding: 0.5rem 2.25rem 0.5rem 0.875rem; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: var(--radius-md); font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); outline: none; min-width: 180px; cursor: pointer; }
        .adg-select-wrap svg { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); pointer-events: none; }

        .adg-layout { display: grid; grid-template-columns: 1fr 360px; gap: 2.5rem; }
        .adg-editor { display: flex; flex-direction: column; gap: 3rem; }
        .adg-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
        .adg-section-header h3 { font-size: 1rem; font-weight: 700; color: var(--text-primary); }
        .adg-section-header h3 span { font-size: 0.75rem; font-weight: 500; color: var(--text-tertiary); margin-left: 0.5rem; }
        .adg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
        .adg-grid-wide { display: flex; flex-direction: column; gap: 1rem; }

        .adg-card { background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; transition: var(--transition-fast); }
        .adg-card:hover { border-color: var(--brand); box-shadow: var(--shadow-sm); }
        .adg-card--error { border-color: var(--error); }
        .adg-card-top { display: flex; justify-content: space-between; align-items: center; }
        .adg-char { font-size: 0.75rem; font-weight: 600; }
        .adg-textarea { width: 100%; border: none; background: none; outline: none; font-size: 0.9375rem; font-weight: 500; color: var(--text-primary); resize: none; line-height: 1.5; font-family: inherit; }
        .adg-card-actions { display: flex; justify-content: flex-end; gap: 0.5rem; border-top: 1px solid var(--border); padding-top: 0.625rem; }
        .adg-icon-btn { color: var(--text-tertiary); padding: 0.25rem; border-radius: 4px; display: flex; }
        .adg-icon-btn:hover { color: var(--brand); background: var(--brand-light); }

        .adg-sidebar-sticky { position: sticky; top: 80px; display: flex; flex-direction: column; gap: 1.25rem; }
        .adg-score-card { padding: 1.25rem; }
        .adg-score-top { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; }
        .adg-score-ring { width: 52px; height: 52px; flex-shrink: 0; }
        .adg-score-ring svg { width: 100%; height: 100%; }
        .adg-ring-bg { fill: none; stroke: var(--border); stroke-width: 3; }
        .adg-ring-fill { fill: none; stroke-width: 3; stroke-linecap: round; transition: stroke-dasharray 0.4s ease; }
        .adg-ring-text { fill: var(--text-primary); font-size: 0.6rem; font-weight: 800; text-anchor: middle; dominant-baseline: middle; }
        .adg-score-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); letter-spacing: 0.05em; }
        .adg-score-status { font-size: 1.125rem; font-weight: 800; }

        .adg-checks { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
        .adg-check-item { display: flex; align-items: center; gap: 0.625rem; font-size: 0.8125rem; font-weight: 500; }
        .adg-check-item.ok { color: var(--success); }
        .adg-check-item.fail { color: var(--text-tertiary); }
        .adg-feedback { display: flex; flex-direction: column; gap: 0.5rem; padding: 0.75rem; background: #fefce8; border-radius: var(--radius-md); }
        .adg-feedback-item { display: flex; gap: 0.5rem; font-size: 0.75rem; line-height: 1.4; color: #854d0e; }
        .adg-feedback-item svg { flex-shrink: 0; margin-top: 2px; }

        .adg-preview-controls { display: flex; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 8px; padding: 0.25rem; width: fit-content; gap: 0.25rem; }
        .adg-ctrl-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.375rem 0.75rem; font-size: 0.8125rem; font-weight: 600; border-radius: 6px; color: var(--text-secondary); transition: var(--transition-fast); }
        .adg-ctrl-btn.active { background: var(--bg-primary); color: var(--brand); box-shadow: var(--shadow-sm); }
        .adg-preview-wrap.mobile { max-width: 340px; }

        .adg-controls-right { display: flex; align-items: center; gap: 0.75rem; margin-left: auto; }
        .adg-ai-btn {
          display: flex; align-items: center; gap: 0.625rem; padding: 0.625rem 1.25rem;
          background: linear-gradient(135deg, var(--brand) 0%, #7c3aed 100%); color: white;
          border-radius: var(--radius-md); font-size: 0.9375rem; font-weight: 700;
          cursor: pointer; border: none; transition: all 0.2s ease;
          box-shadow: 0 2px 10px rgba(99,102,241,0.35);
        }
        .adg-ai-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 18px rgba(99,102,241,0.45); }
        .adg-ai-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .adg-ai-btn--loading { background: var(--bg-secondary); color: var(--text-secondary); box-shadow: none; }
        .adg-reset-btn { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-tertiary); cursor: pointer; transition: var(--transition-fast); }
        .adg-reset-btn:hover { border-color: var(--error); color: var(--error); background: #fff1f2; }
        .adg-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(99,102,241,0.3); border-top-color: var(--brand); border-radius: 50%; animation: adgSpin 0.7s linear infinite; }
        @keyframes adgSpin { to { transform: rotate(360deg); } }

        @media (max-width: 1200px) { .adg-layout { grid-template-columns: 1fr; } .adg-sidebar-sticky { position: static; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
};

export default AdGenerator;
