import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, BarChart2, Lightbulb, RefreshCw } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const CRITERIA = [
  {
    id: 'headline_length',
    label: 'Headline Length',
    description: 'Aim for 15–30 characters for best display on all devices.',
    check: (h) => h.length >= 15 && h.length <= 30,
    tip: 'Shorter headlines get truncated; longer ones often achieve higher CTR when under 30 chars.'
  },
  {
    id: 'cta',
    label: 'Call to Action',
    description: 'Include an action word (Book, Call, Get, Start, Save, Try, Discover, Claim).',
    check: (h, d) => /book|call|get|start|save|try|discover|claim|now|today|free/i.test(h + ' ' + d),
    tip: 'CTAs create urgency and tell the user exactly what to do next.'
  },
  {
    id: 'desc_length',
    label: 'Description Length',
    description: 'Use 70–90 characters in your description to fill available space.',
    check: (h, d) => d.length >= 70 && d.length <= 90,
    tip: 'Google truncates descriptions at 90 chars. Use the full space to communicate value.'
  },
  {
    id: 'specificity',
    label: 'Specificity',
    description: 'Include a number, location, or specific detail (price, stat, timeframe).',
    check: (h, d) => /\d+|north east|newcastle|uk|£|\$|%|same day|24\/?7|free|guarantee/i.test(h + ' ' + d),
    tip: 'Specific claims ("From £995", "Same Day Service") dramatically outperform vague claims.'
  },
  {
    id: 'unique',
    label: 'Unique Selling Point',
    description: 'Mention something competitors cannot claim (award, guarantee, niche).',
    check: (h, d) => /award|guarantee|certified|rated|trusted|specialist|expert|only|unique|exclusive/i.test(h + ' ' + d),
    tip: 'What makes you the only logical choice? Put that front and centre.'
  },
  {
    id: 'no_exclamation',
    label: 'No Overuse of Symbols',
    description: 'Avoid excessive exclamation marks which reduce ad quality scores.',
    check: (h, d) => (h.match(/!/g) || []).length <= 1 && (d.match(/!/g) || []).length <= 1,
    tip: 'Google penalises over-punctuation. One "!" maximum across headline and description.'
  }
];

const EXAMPLES = [
  { headline: 'Relaxed Wedding Photographer NE', description: 'Natural, candid wedding photos from £995. Book your 2024 date before they\'re gone. Free consultation.' },
  { headline: '24/7 Emergency Plumber Newcastle', description: 'No call-out charge, Gas Safe certified. Boilers, leaks, burst pipes. 30-min response. Call Now.' },
  { headline: 'Personal Training From £40/Month', description: 'Certified personal trainer. Lose weight, build strength in 28 days. Free first session. Book today.' }
];

const AdStrengthChecker = () => {
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const results = CRITERIA.map(c => ({
    ...c,
    passed: c.check(headline, description)
  }));

  const passCount = results.filter(r => r.passed).length;
  const score = Math.round((passCount / CRITERIA.length) * 100);
  const scoreLabel = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Average' : 'Needs Work';
  const scoreColor = score >= 80 ? 'var(--success)' : score >= 60 ? 'var(--warning)' : 'var(--error)';

  const loadExample = (ex) => {
    setHeadline(ex.headline);
    setDescription(ex.description);
    setAnalyzed(true);
  };

  const handleCheck = () => setAnalyzed(true);
  const handleReset = () => { setHeadline(''); setDescription(''); setAnalyzed(false); };

  const hasInput = headline.length > 0 || description.length > 0;

  return (
    <div className="asc-root fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Ad Strength Checker</h1>
          <p className="page-subtitle">Get instant, actionable feedback on any Google Ad before you run it.</p>
        </div>
      </header>

      <div className="asc-layout">
        <div className="asc-input-panel">
          <Card title="Your Ad Copy">
            <div className="asc-field">
              <div className="asc-field-header">
                <label>Headline</label>
                <span className="asc-char" style={{ color: headline.length > 30 ? 'var(--error)' : 'var(--text-tertiary)' }}>
                  {headline.length}/30
                </span>
              </div>
              <input
                className={`asc-input ${headline.length > 30 ? 'asc-input--error' : ''}`}
                type="text"
                placeholder="e.g. Relaxed Wedding Photographer NE"
                value={headline}
                onChange={e => { setHeadline(e.target.value); setAnalyzed(true); }}
                maxLength={35}
              />
              {headline.length > 30 && <span className="asc-error-msg">Headline exceeds 30 character limit</span>}
            </div>

            <div className="asc-field">
              <div className="asc-field-header">
                <label>Description</label>
                <span className="asc-char" style={{ color: description.length > 90 ? 'var(--error)' : 'var(--text-tertiary)' }}>
                  {description.length}/90
                </span>
              </div>
              <textarea
                className={`asc-textarea ${description.length > 90 ? 'asc-input--error' : ''}`}
                placeholder="e.g. Natural, candid wedding photos from £995. Book your 2024 date before they're gone. Free consultation."
                value={description}
                onChange={e => { setDescription(e.target.value); setAnalyzed(true); }}
                rows={3}
                maxLength={95}
              />
              {description.length > 90 && <span className="asc-error-msg">Description exceeds 90 character limit</span>}
            </div>

            <div className="asc-btn-row">
              <Button onClick={handleCheck} disabled={!hasInput}>
                <BarChart2 size={16} /> Analyse Ad
              </Button>
              {hasInput && (
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RefreshCw size={14} /> Reset
                </Button>
              )}
            </div>
          </Card>

          <Card title="Load an Example" className="asc-examples-card">
            <p className="asc-examples-intro">See how a strong ad looks across different industries.</p>
            <div className="asc-examples-list">
              {EXAMPLES.map((ex, i) => (
                <button key={i} className="asc-example-btn" onClick={() => loadExample(ex)}>
                  <div className="asc-ex-headline">"{ex.headline}"</div>
                  <div className="asc-ex-desc">{ex.description.substring(0, 55)}...</div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="asc-results-panel">
          {analyzed && hasInput ? (
            <>
              {/* Score */}
              <Card className="asc-score-card">
                <div className="asc-score-top">
                  <div className="asc-score-circle" style={{ '--sc': scoreColor }}>
                    <svg viewBox="0 0 36 36">
                      <path className="asc-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path
                        className="asc-ring-fill"
                        style={{ stroke: scoreColor }}
                        strokeDasharray={`${score}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text x="18" y="20.5" className="asc-ring-text">{score}</text>
                    </svg>
                  </div>
                  <div>
                    <div className="asc-score-big" style={{ color: scoreColor }}>{scoreLabel}</div>
                    <div className="asc-score-sub">{passCount} of {CRITERIA.length} criteria met</div>
                  </div>
                </div>
              </Card>

              {/* Criteria breakdown */}
              <Card title="Criteria Breakdown">
                <div className="asc-criteria-list">
                  {results.map((r) => (
                    <div key={r.id} className={`asc-criterion ${r.passed ? 'asc-criterion--pass' : 'asc-criterion--fail'}`}>
                      <div className="asc-cri-icon">
                        {r.passed
                          ? <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                          : <XCircle size={16} style={{ color: 'var(--error)' }} />
                        }
                      </div>
                      <div className="asc-cri-body">
                        <div className="asc-cri-label">{r.label}</div>
                        <div className="asc-cri-desc">{r.description}</div>
                        {!r.passed && (
                          <div className="asc-cri-tip">
                            <Lightbulb size={12} />
                            <span>{r.tip}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          ) : (
            <div className="asc-empty-state">
              <BarChart2 size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '1rem' }} />
              <h3>Enter your ad copy to get instant feedback</h3>
              <p>Your score and actionable suggestions will appear here as you type, or load one of the examples on the left.</p>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .asc-root { animation: fadeIn 0.4s ease-out; }
        .page-header { margin-bottom: 2.5rem; }
        .page-title { font-size: 2.25rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.5rem; }
        .page-subtitle { color: var(--text-secondary); font-size: 1.125rem; }
        .asc-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .asc-input-panel { display: flex; flex-direction: column; gap: 1.5rem; }
        .asc-field { margin-bottom: 1.25rem; }
        .asc-field:last-of-type { margin-bottom: 0; }
        .asc-field-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .asc-field-header label { font-size: 0.8125rem; font-weight: 700; color: var(--text-primary); }
        .asc-char { font-size: 0.75rem; font-weight: 600; }
        .asc-input { width: 100%; padding: 0.625rem 0.875rem; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: var(--radius-md); font-size: 1rem; color: var(--text-primary); outline: none; transition: border-color 0.15s; font-family: inherit; }
        .asc-input:focus { border-color: var(--brand); }
        .asc-input--error { border-color: var(--error) !important; }
        .asc-textarea { width: 100%; padding: 0.625rem 0.875rem; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: var(--radius-md); font-size: 1rem; color: var(--text-primary); outline: none; resize: vertical; font-family: inherit; line-height: 1.5; }
        .asc-textarea:focus { border-color: var(--brand); }
        .asc-error-msg { display: block; font-size: 0.75rem; color: var(--error); margin-top: 0.375rem; font-weight: 500; }
        .asc-btn-row { display: flex; gap: 0.75rem; margin-top: 1.5rem; align-items: center; }
        .asc-examples-card {}
        .asc-examples-intro { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem; }
        .asc-examples-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .asc-example-btn { text-align: left; padding: 0.875rem 1rem; border: 1px solid var(--border); border-radius: var(--radius-md); background: var(--bg-secondary); transition: var(--transition-fast); cursor: pointer; }
        .asc-example-btn:hover { border-color: var(--brand); background: var(--brand-light); }
        .asc-ex-headline { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; }
        .asc-ex-desc { font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; }
        .asc-results-panel { display: flex; flex-direction: column; gap: 1.5rem; }
        .asc-score-card {}
        .asc-score-top { display: flex; align-items: center; gap: 1.5rem; padding: 0.5rem 0; }
        .asc-score-circle { width: 72px; height: 72px; flex-shrink: 0; }
        .asc-score-circle svg { width: 100%; height: 100%; }
        .asc-ring-bg { fill: none; stroke: var(--border); stroke-width: 3; }
        .asc-ring-fill { fill: none; stroke-width: 3; stroke-linecap: round; transition: stroke-dasharray 0.5s ease; }
        .asc-ring-text { fill: var(--text-primary); font-size: 0.55rem; font-weight: 800; text-anchor: middle; dominant-baseline: middle; }
        .asc-score-big { font-size: 1.5rem; font-weight: 800; }
        .asc-score-sub { font-size: 0.875rem; color: var(--text-secondary); }
        .asc-criteria-list { display: flex; flex-direction: column; gap: 1rem; }
        .asc-criterion { display: flex; gap: 1rem; padding: 0.875rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border); }
        .asc-criterion--pass { background: #f0fdf4; border-color: #bbf7d0; }
        .asc-criterion--fail { background: var(--bg-secondary); }
        .asc-cri-icon { flex-shrink: 0; margin-top: 2px; }
        .asc-cri-label { font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; }
        .asc-cri-desc { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.4; }
        .asc-cri-tip { display: flex; align-items: flex-start; gap: 0.5rem; margin-top: 0.625rem; font-size: 0.75rem; color: #92400e; background: #fef3c7; padding: 0.5rem 0.75rem; border-radius: 6px; line-height: 1.4; }
        .asc-cri-tip svg { flex-shrink: 0; margin-top: 1px; }
        .asc-empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 5rem 2rem; text-align: center; background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius-lg); }
        .asc-empty-state h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-primary); }
        .asc-empty-state p { font-size: 0.9375rem; color: var(--text-secondary); max-width: 360px; line-height: 1.6; }
        @media (max-width: 1000px) { .asc-layout { grid-template-columns: 1fr; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
};

export default AdStrengthChecker;
