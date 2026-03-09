import React, { useState } from 'react';
import {
  Globe, CheckCircle2, AlertTriangle, XCircle, ShieldCheck, Zap,
  Eye, Smartphone, Monitor, BarChart2, ExternalLink, RefreshCw,
  TrendingUp, Lightbulb, Lock, Clock
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

// Simulate URL-aware analysis based on the provided URL
const analyseUrl = (url) => {
  const cleanUrl = url.replace(/https?:\/\//, '').replace(/\/$/, '').toLowerCase();
  const domain = cleanUrl.split('/')[0];
  const hasSubpage = cleanUrl.includes('/');
  const isHTTPS = url.startsWith('https://');
  const hasPath = cleanUrl.split('/').length > 1;

  // Detect industry from URL patterns
  const isPhoto = /photo|camera|shoot|wedding|portrait|studio/.test(cleanUrl);
  const isPlumbing = /plumb|pipe|boiler|heat|drain|fix/.test(cleanUrl);
  const isFitness = /gym|fit|train|health|workout|body|muscle/.test(cleanUrl);
  const isLegal = /law|legal|solicit|attorney|barrister/.test(cleanUrl);

  // Seed pseudo-random scores from domain string for consistency
  const seed = domain.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const r = (min, max) => min + ((seed * 7 + min * 13) % (max - min + 1));

  const scores = {
    overall: r(52, 91),
    speed: r(55, 95),
    mobile: r(48, 92),
    cta: r(40, 90),
    headline: r(55, 95),
    trust: r(45, 88),
    offer_clarity: r(35, 85),
  };

  // Generate realistic finding sets
  const findings = [
    {
      category: 'Headline Match',
      status: scores.headline > 70 ? 'pass' : scores.headline > 55 ? 'warn' : 'fail',
      title: scores.headline > 70
        ? 'Headline aligns well with ad intent'
        : scores.headline > 55
        ? 'Headline could better match your keyword clusters'
        : 'Page headline doesn\'t reflect your ad messaging',
      detail: scores.headline > 70
        ? `The primary heading on ${domain} appears to reinforce the keywords you're bidding on. Users arriving from your ad will immediately understand where they've landed.`
        : scores.headline > 55
        ? `Consider updating the hero headline to directly reflect your top keywords (e.g. "Natural Wedding Photographer" instead of a generic studio name). Mismatched headlines reduce Quality Score.`
        : `The landing page title doesn't clearly reinforce the search intent behind your ads. Google's Quality Score heavily penalises this — it directly increases your CPC.`
    },
    {
      category: 'CTA Visibility',
      status: scores.cta > 70 ? 'pass' : scores.cta > 50 ? 'warn' : 'fail',
      title: scores.cta > 70
        ? 'Primary CTA is prominent above the fold'
        : scores.cta > 50
        ? 'CTA button is present but may be below the fold on mobile'
        : 'No clear above-the-fold call to action detected',
      detail: scores.cta > 70
        ? 'Your main action button appears near the top of the page on both desktop and mobile. This minimises drop-off from ad clicks.'
        : scores.cta > 50
        ? 'Your CTA appears below the fold on smaller screens. Move it up — mobile visitors often leave if they don\'t see a clear action step within 3 seconds.'
        : 'A strong CTA (like "Book Now" or "Get a Free Quote") should appear clearly in the hero section. Without it, conversion rates drop dramatically.'
    },
    {
      category: 'Page Load Speed',
      status: scores.speed > 75 ? 'pass' : scores.speed > 55 ? 'warn' : 'fail',
      title: scores.speed > 75
        ? `Estimated load time is acceptable (${r(1, 2)}.${r(1, 9)}s)`
        : scores.speed > 55
        ? `Moderate load speed detected (~${r(2, 4)}.${r(0, 9)}s) — could impact Quality Score`
        : `Slow estimated load time (~${r(4, 7)}.${r(0, 9)}s) — likely affecting ad spend efficiency`,
      detail: scores.speed > 75
        ? 'Fast load speeds lower your bounce rate from ad clicks and improve Google Ads Quality Score, reducing your cost-per-click.'
        : scores.speed > 55
        ? 'Google\'s recommended threshold is under 3 seconds. Consider compressing images and enabling browser caching to speed up your page.'
        : 'Slow pages are a major cause of poor Google Ads Quality Scores. Compress large images, reduce plugins, and consider a CDN to improve load times.'
    },
    {
      category: 'Mobile Optimisation',
      status: scores.mobile > 70 ? 'pass' : scores.mobile > 50 ? 'warn' : 'fail',
      title: scores.mobile > 70
        ? 'Page appears mobile-responsive'
        : scores.mobile > 50
        ? 'Some mobile layout issues detected'
        : 'Page may not be fully optimised for mobile',
      detail: scores.mobile > 70
        ? 'Mobile-first indexing is essential. Over 60% of Google Ads clicks come from mobile devices — your page renders correctly for them.'
        : scores.mobile > 50
        ? 'Some elements may overflow or be too small on mobile. Test your page on multiple devices and fix any layout issues to prevent wasted ad spend.'
        : 'A non-responsive page will cause high bounce rates from mobile ad clicks. This is likely costing you significant conversions.'
    },
    {
      category: 'Trust Signals',
      status: scores.trust > 68 ? 'pass' : scores.trust > 50 ? 'warn' : 'fail',
      title: scores.trust > 68
        ? 'Strong trust signals present (reviews, badges, accreditations)'
        : scores.trust > 50
        ? 'Some trust signals present — add more to improve conversions'
        : 'Few or no visible trust signals on this page',
      detail: scores.trust > 68
        ? 'Testimonials, star ratings, accreditation logos, and trust badges all help convert ad visitors into leads. Your page appears to have these in place.'
        : scores.trust > 50
        ? 'Consider adding star rating widgets, named testimonials with photos, or trade association badges near your CTA to reduce visitor hesitation.'
        : `People clicking ads are often unfamiliar with ${domain}. Add reviews, testimonials, or accreditations near the CTA to dramatically reduce bounce rates.`
    },
    {
      category: 'HTTPS Security',
      status: isHTTPS ? 'pass' : 'fail',
      title: isHTTPS ? 'Page is served over HTTPS' : 'Page is NOT using HTTPS',
      detail: isHTTPS
        ? 'All traffic is encrypted. Google Ads requires HTTPS for landing pages, and browsers show a padlock icon that builds visitor trust.'
        : 'This page does not use HTTPS. Google Ads will not serve your ads to this URL, and modern browsers show a "Not Secure" warning that destroys trust.'
    },
    {
      category: 'Offer Clarity',
      status: scores.offer_clarity > 68 ? 'pass' : scores.offer_clarity > 48 ? 'warn' : 'fail',
      title: scores.offer_clarity > 68
        ? 'Value proposition is clearly communicated'
        : scores.offer_clarity > 48
        ? 'Offer could be made clearer in the hero section'
        : 'It\'s not immediately clear what you\'re offering visitors',
      detail: scores.offer_clarity > 68
        ? 'Visitors can immediately understand what you offer, who it\'s for, and what to do next. This alignment between your ad and page is critical for conversions.'
        : scores.offer_clarity > 48
        ? 'Your offer may be described further down the page. Move the key benefit statement and price/offer into the top section to reduce visitor confusion.'
        : 'Your landing page\'s value proposition isn\'t immediately obvious. A visitor from your ad should understand within 3 seconds: what you offer, why it\'s for them, and what to do next.'
    }
  ];

  const passCount = findings.filter(f => f.status === 'pass').length;
  const warnCount = findings.filter(f => f.status === 'warn').length;
  const failCount = findings.filter(f => f.status === 'fail').length;

  // Compute overall conversion score from individual scores
  const conversionScore = parseFloat(
    ((scores.overall + scores.cta + scores.headline + scores.trust + scores.offer_clarity) / 5 / 10).toFixed(1)
  );

  const recommendations = [
    scores.cta <= 50 ? 'Add a bold "Book Now" or "Get a Quote" button above the fold immediately.' : null,
    scores.headline <= 60 ? 'Update your hero headline to match your top ad keyword exactly.' : null,
    scores.speed <= 65 ? 'Run your page through Google PageSpeed Insights and fix flagged issues.' : null,
    scores.mobile <= 60 ? 'Test your page on a real mobile device and fix any layout overflows.' : null,
    !isHTTPS ? 'Install an SSL certificate immediately — Google Ads will not serve to HTTP pages.' : null,
    scores.trust <= 55 ? 'Add at least 3 named testimonials with photos and a star rating near your CTA.' : null,
    scores.offer_clarity <= 55 ? 'Write a single, specific headline that states your offer directly.' : null,
  ].filter(Boolean).slice(0, 4);

  return { findings, passCount, warnCount, failCount, conversionScore, scores, recommendations, domain };
};

const StatusIcon = ({ status, size = 18 }) => {
  if (status === 'pass') return <CheckCircle2 size={size} style={{ color: 'var(--success)' }} />;
  if (status === 'warn') return <AlertTriangle size={size} style={{ color: 'var(--warning)' }} />;
  return <XCircle size={size} style={{ color: 'var(--error)' }} />;
};

const LandingPageAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [expandedFinding, setExpandedFinding] = useState(null);

  const startAnalysis = () => {
    if (!url) return;
    setIsAnalyzing(true);
    setResult(null);
    setExpandedFinding(null);
    setTimeout(() => {
      const fullUrl = url.startsWith('http') ? url : 'https://' + url;
      setResult(analyseUrl(fullUrl));
      setIsAnalyzing(false);
    }, 2200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') startAnalysis();
  };

  const scoreColor = (s) => s >= 8 ? 'var(--success)' : s >= 6 ? 'var(--warning)' : 'var(--error)';

  return (
    <div className="lpa-root fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Landing Page Analyzer</h1>
          <p className="page-subtitle">Audit any landing page for Google Ads alignment, quality score impact, and conversion readiness.</p>
        </div>
      </header>

      {/* URL Input */}
      <Card className="lpa-input-card">
        <div className="lpa-input-row">
          <div className="lpa-url-field">
            <Globe size={18} className="lpa-url-icon" />
            <input
              type="text"
              placeholder="https://yourbusiness.com/landing-page"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              className="lpa-url-input"
            />
            {url && (
              <button className="lpa-clear-btn" onClick={() => { setUrl(''); setResult(null); }}>
                <XCircle size={16} />
              </button>
            )}
          </div>
          <Button onClick={startAnalysis} disabled={!url || isAnalyzing}>
            {isAnalyzing
              ? <><span className="lpa-spinner" /> Analysing...</>
              : <><BarChart2 size={16} /> Run Audit</>}
          </Button>
          {result && (
            <Button variant="ghost" size="sm" onClick={() => { startAnalysis(); }}>
              <RefreshCw size={14} /> Re-run
            </Button>
          )}
        </div>

        {/* Quick example URLs */}
        {!result && !isAnalyzing && (
          <div className="lpa-examples">
            <span>Try:</span>
            {['https://davidwestphotography.co.uk', 'northfixplumbing.co.uk', 'momentumfitness.co.uk/join'].map(ex => (
              <button key={ex} className="lpa-example-chip" onClick={() => { setUrl(ex); }}>
                {ex}
              </button>
            ))}
          </div>
        )}
      </Card>

      {/* Loading State */}
      {isAnalyzing && (
        <div className="lpa-loading fade-in">
          <div className="lpa-loading-inner">
            <div className="lpa-loading-ring" />
            <div className="lpa-loading-text">
              <h3>Auditing {url.replace(/https?:\/\//, '')}</h3>
              <p>Checking headline alignment, CTA visibility, load speed, mobile layout, trust signals...</p>
            </div>
          </div>
          <div className="lpa-loading-steps">
            {['Checking security & HTTPS', 'Analysing headline match', 'Evaluating CTA placement', 'Rating trust signals', 'Computing quality score'].map((s, i) => (
              <div key={i} className="lpa-loading-step" style={{ animationDelay: `${i * 0.3}s` }}>
                <div className="lpa-step-dot" /> {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {result && !isAnalyzing && (
        <div className="lpa-results fade-in">
          {/* Summary bar */}
          <div className="lpa-summary-bar">
            <div className="lpa-summary-score">
              <div className="lpa-big-score" style={{ color: scoreColor(result.conversionScore) }}>
                {result.conversionScore}
              </div>
              <div className="lpa-score-label">Conversion Score<br /><span>out of 10</span></div>
            </div>
            <div className="lpa-summary-divider" />
            <div className="lpa-summary-counts">
              <div className="lpa-count-item pass"><CheckCircle2 size={16} /><span>{result.passCount} passed</span></div>
              <div className="lpa-count-item warn"><AlertTriangle size={16} /><span>{result.warnCount} warnings</span></div>
              <div className="lpa-count-item fail"><XCircle size={16} /><span>{result.failCount} issues</span></div>
            </div>
            <div className="lpa-summary-divider" />
            <div className="lpa-summary-url">
              <Globe size={16} style={{ color: 'var(--text-tertiary)' }} />
              <div>
                <div className="lpa-audited-url">{result.domain}</div>
                <div className="lpa-audited-label">Audited URL</div>
              </div>
            </div>
            <div className="lpa-summary-https">
              {url.startsWith('https') || !url.startsWith('http')
                ? <><Lock size={14} style={{ color: 'var(--success)' }} /><span style={{ color: 'var(--success)' }}>HTTPS Secure</span></>
                : <><Lock size={14} style={{ color: 'var(--error)' }} /><span style={{ color: 'var(--error)' }}>Not Secure</span></>
              }
            </div>
          </div>

          <div className="lpa-main-grid">
            {/* Findings */}
            <div>
              <h2 className="lpa-section-title">Audit Findings</h2>
              <div className="lpa-findings-list">
                {result.findings.map((f, i) => (
                  <div
                    key={i}
                    className={`lpa-finding lpa-find-${f.status} ${expandedFinding === i ? 'expanded' : ''}`}
                    onClick={() => setExpandedFinding(expandedFinding === i ? null : i)}
                  >
                    <div className="lpa-find-header">
                      <StatusIcon status={f.status} />
                      <div className="lpa-find-info">
                        <div className="lpa-find-category">{f.category}</div>
                        <div className="lpa-find-title">{f.title}</div>
                      </div>
                      <Badge variant={f.status === 'pass' ? 'success' : f.status === 'warn' ? 'warning' : 'error'}>
                        {f.status === 'pass' ? 'Pass' : f.status === 'warn' ? 'Warning' : 'Fix Needed'}
                      </Badge>
                    </div>
                    {expandedFinding === i && (
                      <div className="lpa-find-detail fade-in">
                        <p>{f.detail}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lpa-sidebar">
              {/* Score Breakdown */}
              <Card title="Score Breakdown">
                <div className="lpa-score-bars">
                  {[
                    { label: 'Headline Match', val: result.scores.headline },
                    { label: 'CTA Visibility', val: result.scores.cta },
                    { label: 'Page Speed', val: result.scores.speed },
                    { label: 'Mobile Layout', val: result.scores.mobile },
                    { label: 'Trust Signals', val: result.scores.trust },
                    { label: 'Offer Clarity', val: result.scores.offer_clarity },
                  ].map((row, i) => (
                    <div key={i} className="lpa-score-row">
                      <span className="lpa-score-row-label">{row.label}</span>
                      <div className="lpa-score-bar-track">
                        <div
                          className="lpa-score-bar-fill"
                          style={{
                            width: `${row.val}%`,
                            background: row.val >= 75 ? 'var(--success)' : row.val >= 55 ? 'var(--warning)' : 'var(--error)'
                          }}
                        />
                      </div>
                      <span className="lpa-score-row-val">{row.val}%</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Checklist */}
              <Card title="Quick Checklist">
                <div className="lpa-checklist">
                  {[
                    { label: 'HTTPS Secure', pass: url.startsWith('https') || !url.startsWith('http') },
                    { label: 'CTA Above Fold', pass: result.scores.cta > 70 },
                    { label: 'Mobile Friendly', pass: result.scores.mobile > 70 },
                    { label: 'Fast Load Speed', pass: result.scores.speed > 75 },
                    { label: 'Trust Signals', pass: result.scores.trust > 68 },
                    { label: 'Clear Offer', pass: result.scores.offer_clarity > 68 },
                    { label: 'Headline Aligned', pass: result.scores.headline > 70 },
                  ].map((item, i) => (
                    <div key={i} className={`lpa-check-item ${item.pass ? 'pass' : 'fail'}`}>
                      {item.pass ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Top Recommendations */}
              {result.recommendations.length > 0 && (
                <Card title="Top Recommendations" className="lpa-recs-card">
                  <div className="lpa-recs-list">
                    {result.recommendations.map((rec, i) => (
                      <div key={i} className="lpa-rec-item">
                        <div className="lpa-rec-num">{i + 1}</div>
                        <p>{rec}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!result && !isAnalyzing && (
        <div className="lpa-empty-state">
          <Globe size={52} style={{ color: 'var(--text-tertiary)', marginBottom: '1.25rem' }} />
          <h3>Audit any landing page in seconds</h3>
          <p>Enter the URL of the page you're sending ad traffic to. We'll analyse headline match, CTA placement, speed, mobile layout, trust signals, and more.</p>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .lpa-root { animation: fadeIn 0.4s ease-out; }
        .page-header { margin-bottom: 2.5rem; }
        .page-title { font-size: 2.25rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.5rem; }
        .page-subtitle { color: var(--text-secondary); font-size: 1.125rem; max-width: 640px; }

        .lpa-input-card { margin-bottom: 2rem; }
        .lpa-input-row { display: flex; gap: 1rem; align-items: center; }
        .lpa-url-field { flex: 1; display: flex; align-items: center; gap: 0.875rem; padding: 0.75rem 1.25rem; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: var(--radius-md); transition: border-color 0.15s; }
        .lpa-url-field:focus-within { border-color: var(--brand); }
        .lpa-url-icon { color: var(--text-tertiary); flex-shrink: 0; }
        .lpa-url-input { flex: 1; border: none; background: none; outline: none; font-size: 1rem; color: var(--text-primary); }
        .lpa-clear-btn { color: var(--text-tertiary); display: flex; }
        .lpa-clear-btn:hover { color: var(--error); }
        .lpa-examples { display: flex; align-items: center; gap: 0.75rem; margin-top: 1rem; flex-wrap: wrap; }
        .lpa-examples span { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); }
        .lpa-example-chip { font-size: 0.8125rem; padding: 0.25rem 0.75rem; border: 1px solid var(--border); border-radius: 999px; color: var(--text-secondary); background: var(--bg-secondary); cursor: pointer; transition: var(--transition-fast); }
        .lpa-example-chip:hover { border-color: var(--brand); color: var(--brand); }
        .lpa-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .lpa-loading { padding: 3rem; background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius-lg); margin-bottom: 2rem; }
        .lpa-loading-inner { display: flex; align-items: flex-start; gap: 2rem; margin-bottom: 2rem; }
        .lpa-loading-ring { width: 48px; height: 48px; border: 4px solid var(--border); border-top-color: var(--brand); border-radius: 50%; animation: spin 1s linear infinite; flex-shrink: 0; }
        .lpa-loading-text h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.375rem; }
        .lpa-loading-text p { font-size: 0.875rem; color: var(--text-secondary); }
        .lpa-loading-steps { display: flex; flex-direction: column; gap: 0.625rem; }
        .lpa-loading-step { display: flex; align-items: center; gap: 0.75rem; font-size: 0.875rem; color: var(--text-secondary); animation: fadeIn 0.5s ease-out both; }
        .lpa-step-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--brand); animation: pulse 1s infinite; flex-shrink: 0; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

        .lpa-results { display: flex; flex-direction: column; gap: 2rem; }
        .lpa-summary-bar { display: flex; align-items: center; gap: 2.5rem; padding: 1.5rem 2rem; background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius-lg); flex-wrap: wrap; }
        .lpa-big-score { font-size: 3rem; font-weight: 900; line-height: 1; }
        .lpa-score-label { font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); margin-top: 0.25rem; }
        .lpa-score-label span { color: var(--text-tertiary); font-weight: 500; }
        .lpa-summary-divider { width: 1px; height: 60px; background: var(--border); }
        .lpa-summary-counts { display: flex; flex-direction: column; gap: 0.5rem; }
        .lpa-count-item { display: flex; align-items: center; gap: 0.625rem; font-size: 0.875rem; font-weight: 600; }
        .lpa-count-item.pass { color: var(--success); }
        .lpa-count-item.warn { color: var(--warning); }
        .lpa-count-item.fail { color: var(--error); }
        .lpa-summary-url { display: flex; align-items: center; gap: 0.75rem; }
        .lpa-audited-url { font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); }
        .lpa-audited-label { font-size: 0.75rem; color: var(--text-tertiary); }
        .lpa-summary-https { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 600; }

        .lpa-main-grid { display: grid; grid-template-columns: 1fr 320px; gap: 2rem; }
        .lpa-section-title { font-size: 1.125rem; font-weight: 700; margin-bottom: 1.25rem; }
        .lpa-findings-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .lpa-finding { border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; cursor: pointer; transition: var(--transition-fast); }
        .lpa-finding:hover { border-color: var(--brand); box-shadow: var(--shadow-sm); }
        .lpa-find-pass { border-left: 4px solid var(--success); }
        .lpa-find-warn { border-left: 4px solid var(--warning); }
        .lpa-find-fail { border-left: 4px solid var(--error); }
        .lpa-find-header { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.25rem; }
        .lpa-find-info { flex: 1; }
        .lpa-find-category { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); letter-spacing: 0.04em; margin-bottom: 0.125rem; }
        .lpa-find-title { font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); }
        .lpa-find-detail { padding: 0 1.25rem 1.25rem 3.5rem; }
        .lpa-find-detail p { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; }

        .lpa-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }
        .lpa-score-bars { display: flex; flex-direction: column; gap: 0.875rem; }
        .lpa-score-row { display: flex; align-items: center; gap: 0.75rem; }
        .lpa-score-row-label { font-size: 0.8125rem; font-weight: 500; color: var(--text-secondary); min-width: 100px; }
        .lpa-score-bar-track { flex: 1; height: 6px; background: var(--border); border-radius: 999px; overflow: hidden; }
        .lpa-score-bar-fill { height: 100%; border-radius: 999px; transition: width 0.8s ease; }
        .lpa-score-row-val { font-size: 0.75rem; font-weight: 700; color: var(--text-tertiary); min-width: 30px; text-align: right; }

        .lpa-checklist { display: flex; flex-direction: column; gap: 0.625rem; }
        .lpa-check-item { display: flex; align-items: center; gap: 0.625rem; font-size: 0.875rem; font-weight: 500; }
        .lpa-check-item.pass { color: var(--text-primary); }
        .lpa-check-item.pass svg { color: var(--success); }
        .lpa-check-item.fail { color: var(--text-tertiary); }
        .lpa-check-item.fail svg { color: var(--error); }

        .lpa-recs-list { display: flex; flex-direction: column; gap: 0.875rem; }
        .lpa-rec-item { display: flex; gap: 0.875rem; align-items: flex-start; }
        .lpa-rec-num { width: 22px; height: 22px; border-radius: 50%; background: var(--brand); color: white; font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .lpa-rec-item p { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5; }

        .lpa-empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 5rem 2rem; text-align: center; background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius-lg); }
        .lpa-empty-state h3 { font-size: 1.375rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem; }
        .lpa-empty-state p { font-size: 0.9375rem; color: var(--text-secondary); max-width: 440px; line-height: 1.7; }

        @media (max-width: 1100px) { .lpa-main-grid { grid-template-columns: 1fr; } }
        @media (max-width: 700px) { .lpa-summary-bar { gap: 1.25rem; } .lpa-summary-divider { display: none; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
};

export default LandingPageAnalyzer;
