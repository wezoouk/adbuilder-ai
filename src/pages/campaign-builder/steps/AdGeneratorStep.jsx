import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Star, Info, AlertCircle, Layout, Smartphone, Monitor, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import GoogleAdPreview from '../../../components/ui/GoogleAdPreview';

const calculateAdScore = (headline, description, keywords = [], product = '') => {
  let score = 0;
  let feedback = [];

  // Headline checks
  if (headline.length >= 15 && headline.length <= 30) {
    score += 30;
  } else if (headline.length > 0) {
    feedback.push("Headline length is sub-optimal (aim for 15-30 chars).");
  }

  // Keyword inclusion
  const hasKeyword = keywords.some(k => headline.toLowerCase().includes(k.phrase.toLowerCase()));
  if (hasKeyword) {
    score += 20;
  } else if (headline.length > 0) {
    feedback.push("Include a target keyword in your headline for better relevance.");
  }

  // Description checks
  if (description.length >= 70 && description.length <= 90) {
    score += 30;
  } else if (description.length > 0) {
    feedback.push("Description is too short. Use all 90 characters to explain your value.");
  }

  // CTA/Offer checks
  const hasCTA = /book|call|get|start|save|now|today|free/i.test(description) || /book|call|get|start|save|now|today|free/i.test(headline);
  if (hasCTA) {
    score += 20;
  } else if (headline.length > 0 || description.length > 0) {
    feedback.push("Add a clear Call to Action (e.g., 'Book Now', 'Get a Quote').");
  }

  return { score: Math.min(score, 100), feedback };
};

const AdCard = ({ tag, content, limit = 30, onUpdate, isError }) => (
  <div className={`ad-editor-card ${isError ? 'error-border' : ''}`}>
    <div className="ad-card-header">
      <Badge variant={isError ? 'error' : 'brand'}>{tag}</Badge>
      <div className="char-count" style={{ color: content.length > limit ? 'var(--error)' : 'var(--text-tertiary)' }}>
        {content.length}/{limit}
      </div>
    </div>
    <div className="ad-input-group">
      <textarea 
        value={content} 
        onChange={(e) => onUpdate(e.target.value)} 
        spellCheck="false" 
      />
    </div>
    <div className="ad-card-actions">
      <button className="icon-action" title="Copy"><Copy size={16} /></button>
      <button className="icon-action" title="Regenerate"><RefreshCw size={16} /></button>
    </div>
  </div>
);

const AdGeneratorStep = ({ formData = {}, setFormData }) => {
  const safeFormData = {
    keywords: [], headlines: [], descriptions: [],
    audience: {}, offer: {}, objective: '', campaignName: '',
    ...formData
  };

  const [headlines, setHeadlines] = useState(safeFormData.headlines?.length > 0 ? safeFormData.headlines : [
    'Professional & Trusted Service',
    'Book Your Free Consultation',
    'Results You Can Count On',
    '5-Star Rated Locally',
    'Get Started Today'
  ]);

  const [descriptions, setDescriptions] = useState(safeFormData.descriptions?.length > 0 ? safeFormData.descriptions : [
    'Award-winning local service with transparent pricing and real results. Book your free consultation now.',
    'Trusted by hundreds of happy customers. Fast, reliable and professional. Call or book online today.'
  ]);

  const [previewMode, setPreviewMode] = useState('mobile');
  const [isGenerating, setIsGenerating] = useState(false);

  // ── AI Generation engine ────────────────────────────────────────────────
  const generateFromContext = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const aud = safeFormData.audience || {};
      const offer = safeFormData.offer || {};
      const kws = (safeFormData.keywords || []).map(k => k.phrase);
      const topKw = kws[0] || 'Professional Service';
      const kw2 = kws[1] || 'Trusted Experts';
      const mainOffer = offer.main || topKw;
      const price = offer.price ? `From ${offer.price}` : null;
      const incentive = offer.incentive || null;
      const urgency = offer.urgency || null;
      const guarantee = offer.guarantee || null;
      const objective = safeFormData.objective || 'Leads';

      const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
      const trim = (s, max) => s?.length > max ? s.slice(0, max - 1) : s;

      const ctaMap = { Leads: 'Get a Free Quote', Bookings: 'Book Now', Sales: 'Shop Now', Traffic: 'Find Out More', Awareness: 'Learn More' };
      const cta = ctaMap[objective] || 'Get in Touch';

      // Build 5 contextually aware headlines
      const hls = [
        trim(cap(topKw), 30),
        price ? trim(price, 30) : trim(`Award-Winning ${mainOffer}`, 30),
        incentive ? trim(cap(incentive), 30) : trim(`${cta} Today`, 30),
        guarantee ? trim(cap(guarantee), 30) : trim(kw2 ? cap(kw2) : '5-Star Rated Professionals', 30),
        urgency ? trim(cap(urgency), 30) : trim(`Trusted Local Experts`, 30),
      ].map(h => h || 'Professional Service');

      // Build 2 contextually aware descriptions
      const problem = aud.problem ? cap(aud.problem) : '';
      const result = aud.result ? cap(aud.result) : '';
      const d1Parts = [mainOffer, price, incentive].filter(Boolean);
      const d1 = trim(`${d1Parts.join('. ')}. ${cta}.`, 90);
      const d2Parts = [problem ? `Struggling with ${problem.toLowerCase()}?` : null, result ? result : null, guarantee ? cap(guarantee) : null].filter(Boolean);
      const d2 = trim(d2Parts.join(' ') + ` ${cta} today.`, 90);

      const newH = hls.slice(0, 5);
      const newD = [
        d1?.length > 10 ? d1 : `Professional ${mainOffer} service. Trusted by hundreds of satisfied customers. ${cta} today.`,
        d2?.length > 10 ? d2 : `Fast, reliable service with transparent pricing. No hidden fees. Call or book online. ${cta}.`
      ];

      setHeadlines(newH);
      setDescriptions(newD);
      if (setFormData) setFormData({ ...safeFormData, headlines: newH, descriptions: newD });
      setIsGenerating(false);
    }, 1400);
  };

  // Calculate scores safely
  const { score, feedback } = calculateAdScore(
    headlines[0] || '',
    descriptions[0] || '',
    safeFormData.keywords || [],
    safeFormData.product || ''
  );

  const updateHeadline = (idx, val) => {
    const newH = [...headlines]; newH[idx] = val; setHeadlines(newH);
    if (setFormData) setFormData({ ...safeFormData, headlines: newH });
  };

  const updateDescription = (idx, val) => {
    const newD = [...descriptions]; newD[idx] = val; setDescriptions(newD);
    if (setFormData) setFormData({ ...safeFormData, descriptions: newD });
  };

  return (
    <div className="generator-step fade-in">
      <div className="gen-layout">
        <div className="gen-editor">
          <div className="gen-header">
            <div>
              <h2>Step 7: Ad Generator & Scoring</h2>
              <p>Generate AI-suggested ad copy from your campaign details, or write your own. Quality score updates instantly.</p>
            </div>
            <button
              className={`gen-ai-btn ${isGenerating ? 'loading' : ''}`}
              onClick={generateFromContext}
              disabled={isGenerating}
            >
              {isGenerating
                ? <><span className="gen-spinner" /> Generating...</>
                : <><RefreshCw size={16} /> Generate with AI</>
              }
            </button>
          </div>

          <div className="gen-sections">
            <section className="gen-group">
              <div className="group-header">
                <h3>Headlines</h3>
                <Badge variant="neutral">Top 5 suggestions</Badge>
              </div>
              <div className="ad-grid">
                {headlines.map((h, i) => (
                  <AdCard 
                    key={i} 
                    tag={`Headline ${i+1}`} 
                    content={h} 
                    limit={30} 
                    isError={h.length > 30}
                    onUpdate={(val) => updateHeadline(i, val)} 
                  />
                ))}
              </div>
            </section>

            <section className="gen-group">
              <div className="group-header">
                <h3>Descriptions</h3>
                <Badge variant="neutral">Top 2 suggestions</Badge>
              </div>
              <div className="ad-grid-wide">
                 {descriptions.map((d, i) => (
                    <AdCard 
                      key={i} 
                      tag={`Desc ${i+1}`} 
                      content={d} 
                      limit={90} 
                      isError={d.length > 90}
                      onUpdate={(val) => updateDescription(i, val)} 
                    />
                ))}
              </div>
            </section>
          </div>
        </div>

        <aside className="gen-sidebar">
          <div className="sidebar-sticky">
            
            {/* Ad Scoring Widget */}
            <div className="score-widget">
               <div className="score-header">
                  <div className="score-circle">
                     <svg viewBox="0 0 36 36" className="circular-chart">
                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="circle" strokeDasharray={`${score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <text x="18" y="20.35" className="percentage">{score}</text>
                     </svg>
                  </div>
                  <div className="score-info">
                     <div className="score-label">Ad Quality Score</div>
                     <div className="score-status">{score >= 80 ? 'Excellent' : score >= 50 ? 'Good' : 'Needs Work'}</div>
                  </div>
               </div>
               
               <div className="feedback-list">
                  {feedback.length === 0 ? (
                    <div className="feedback-item success">
                      <CheckCircle2 size={14} />
                      <span>Best practices applied! Your ad is ready for high performance.</span>
                    </div>
                  ) : (
                    feedback.map((f, i) => (
                      <div key={i} className="feedback-item warning">
                        <AlertTriangle size={14} />
                        <span>{f}</span>
                      </div>
                    ))
                  )}
               </div>
            </div>

            <div className="preview-controls">
              <button 
                className={`control-btn ${previewMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setPreviewMode('mobile')}
              >
                <Smartphone size={16} /> Mobile
              </button>
              <button 
                className={`control-btn ${previewMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setPreviewMode('desktop')}
              >
                <Monitor size={16} /> Desktop
              </button>
            </div>
            
            <div className={`preview-wrapper ${previewMode}`}>
               <GoogleAdPreview 
                  headlines={headlines}
                  descriptions={descriptions}
                  url="www.davidwestphotography.co.uk"
               />
            </div>
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .generator-step { overflow: visible; }
        .gen-layout { display: grid; grid-template-columns: 1fr 360px; gap: 3rem; }
        
        .gen-header { margin-bottom: 2.5rem; }
        .gen-header p { color: var(--text-secondary); }

        .gen-sections { display: flex; flex-direction: column; gap: 3rem; }
        .group-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; }
        .group-header h3 { font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); }
        
        .ad-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; }
        .ad-grid-wide { display: grid; grid-template-columns: 1fr; gap: 1rem; }

        /* Ad Card Styles */
        .ad-editor-card { background-color: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; transition: var(--transition-fast); }
        .ad-editor-card:hover { border-color: var(--brand); box-shadow: var(--shadow-sm); }
        .ad-editor-card.error-border { border-color: var(--error); }
        .ad-card-header { display: flex; justify-content: space-between; align-items: center; }
        .char-count { font-size: 0.75rem; font-weight: 600; }
        .ad-input-group textarea { width: 100%; border: none; background: none; outline: none; font-size: 0.9375rem; font-weight: 500; color: var(--text-primary); resize: none; height: 48px; line-height: 1.4; }
        .ad-card-actions { display: flex; justify-content: flex-end; gap: 0.5rem; border-top: 1px solid var(--border); padding-top: 0.5rem; }
        .icon-action { color: var(--text-tertiary); padding: 0.25rem; border-radius: 4px; }
        .icon-action:hover { color: var(--brand); background-color: var(--brand-light); }

        /* Sidebar Styles */
        .sidebar-sticky { position: sticky; top: 100px; display: flex; flex-direction: column; gap: 1.5rem; }
        
        /* Scoring Styles */
        .score-widget { background-color: var(--bg-secondary); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; }
        .score-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; }
        .score-circle { width: 48px; height: 48px; }
        .circular-chart { display: block; max-height: 100%; }
        .circle-bg { fill: none; stroke: var(--border); stroke-width: 3; }
        .circle { fill: none; stroke-width: 3; stroke-linecap: round; stroke: var(--brand); transition: stroke-dasharray 0.3s ease; }
        .percentage { fill: var(--text-primary); font-size: 0.6rem; font-weight: 800; text-anchor: middle; dominant-baseline: middle; }
        
        .score-label { font-size: 0.75rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; }
        .score-status { font-size: 1rem; font-weight: 800; color: var(--text-primary); }
        
        .feedback-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .feedback-item { display: flex; gap: 0.75rem; font-size: 0.8125rem; line-height: 1.4; padding: 0.5rem; border-radius: 6px; }
        .feedback-item.warning { color: #854d0e; background-color: #fefce8; }
        .feedback-item.success { color: #166534; background-color: #f0fdf4; }
        .feedback-item svg { flex-shrink: 0; margin-top: 1px; }

        .preview-controls { display: flex; gap: 0.5rem; background-color: var(--bg-secondary); padding: 0.25rem; border-radius: 8px; border: 1px solid var(--border); width: fit-content; }
        .control-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.875rem; font-size: 0.8125rem; font-weight: 600; border-radius: 6px; color: var(--text-secondary); transition: var(--transition-fast); }
        .control-btn.active { background-color: var(--bg-primary); color: var(--brand); box-shadow: var(--shadow-sm); }
        
        .preview-wrapper.mobile { max-width: 360px; margin: 0 auto; }
        .preview-wrapper.desktop { max-width: 100%; }

        .gen-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 0.5rem; }
        .gen-ai-btn {
          display: flex; align-items: center; gap: 0.625rem; padding: 0.625rem 1.25rem;
          background: linear-gradient(135deg, var(--brand), #7c3aed); color: white;
          border-radius: var(--radius-md); font-size: 0.875rem; font-weight: 700;
          cursor: pointer; transition: var(--transition-fast); flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(99,102,241,0.3);
        }
        .gen-ai-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(99,102,241,0.4); }
        .gen-ai-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .gen-ai-btn.loading { background: var(--bg-secondary); color: var(--text-secondary); box-shadow: none; }
        .gen-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: genSpin 0.7s linear infinite; }
        @keyframes genSpin { to { transform: rotate(360deg); } }

        @media (max-width: 1200px) {
          .gen-layout { grid-template-columns: 1fr; }
          .gen-sidebar { order: -1; margin-bottom: 2rem; }
          .sidebar-sticky { position: static; }
        }
      `}} />
    </div>
  );
};

export default AdGeneratorStep;
