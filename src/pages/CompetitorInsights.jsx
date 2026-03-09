import React, { useState } from 'react';
import {
  Eye, Zap, MessageSquare, TrendingUp, AlertTriangle,
  CheckCircle2, Search, Target, ChevronDown, XCircle
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { SAMPLE_DATA } from '../data/sampleData';

const COMPETITOR_DATA = {
  'Wedding Photography': [
    { name: 'StudioLens Photography', url: 'studiolens.co.uk', score: 62, tone: 'Formal', cta: 'Book Now', headlines: ['Award Winning Wedding Photos', 'Professional Photography NE', 'Book Your Wedding Date'], strength: 'Brand authority', weakness: 'No price transparency, cold tone' },
    { name: 'Captured Moments NE', url: 'capturedmoments.co.uk', score: 54, tone: 'Romantic', cta: 'View Gallery', headlines: ['Beautiful Wedding Memories', 'Your Story Told Perfectly', 'Experienced Photographer NE'], strength: 'Emotional language', weakness: 'No USP, generic descriptions' },
  ],
  'Home Services': [
    { name: 'FastFix Plumbers', url: 'fastfixplumbers.co.uk', score: 71, tone: 'Urgent', cta: 'Call Now', headlines: ['Same Day Plumber', 'Emergency Repairs Fast', 'Local Plumber 24/7'], strength: 'Speed & urgency messaging', weakness: 'Price is hidden' },
    { name: 'City Plumbing Pro', url: 'cityplumbingpro.co.uk', score: 58, tone: 'Professional', cta: 'Get Quote', headlines: ['Certified Plumbing Experts', 'Boiler & Pipe Specialists', 'Free Estimate Available'], strength: 'Trust signals', weakness: 'No urgency or differentiation' }
  ],
  'Health & Fitness': [
    { name: 'IronBody Gym', url: 'ironbodygym.co.uk', score: 66, tone: 'Aggressive', cta: 'Join Now', headlines: ['Serious Training Starts Here', 'Get Ripped Fast', 'No Pain, No Gain'], strength: 'Strong emotion', weakness: 'Too aggressive, no empathy' },
    { name: 'FitLifeclub', url: 'fitlifeclub.co.uk', score: 55, tone: 'Friendly', cta: 'Try Free', headlines: ['Your Fitness Journey Starts Here', 'Personal Trainers Near You', 'Lose Weight, Feel Great'], strength: 'Accessible & friendly', weakness: 'Weak USPs, no results focus' }
  ]
};

const OPPORTUNITIES = {
  'Wedding Photography': [
    { title: 'Lead with "No awkward posing"', detail: 'Zero competitors mention this specific anxiety. It\'s your biggest differentiator.' },
    { title: 'Be price-transparent', detail: 'All competitors hide pricing. "From £995" in your headline will stand out dramatically.' },
    { title: 'Use warm, conversational tone', detail: 'Everyone else sounds formal or corporate. Your natural voice is a competitive edge.' }
  ],
  'Home Services': [
    { title: '"No Call-Out Charge" front and centre', detail: 'Most competitors bury this. Making it a headline outperforms generic "same day" claims.' },
    { title: 'Mention Gas Safe by name', detail: 'Customers search for this. Only 1 competitor mentions it at all.' },
    { title: 'Show social proof', detail: 'No competitor includes review counts. "500+ five-star reviews" converts better.' }
  ],
  'Health & Fitness': [
    { title: 'Results-focused language', detail: '"Lose X lbs in 28 days" outperforms generic "get fit" messaging significantly.' },
    { title: 'Emphasise accountability', detail: 'Coaching + accountability is your angle. Lone gym memberships are oversaturated.' },
    { title: 'Free trial CTA', detail: 'Low-risk offer converts best in this sector. Competitors mostly use "Join Now" which has friction.' }
  ]
};

const CompetitorInsights = () => {
  const [selectedBizId, setSelectedBizId] = useState(SAMPLE_DATA.businesses[0].id);
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);

  const business = SAMPLE_DATA.businesses.find(b => b.id === selectedBizId);
  const industryKey = Object.keys(COMPETITOR_DATA).find(k =>
    business?.industry?.toLowerCase().includes(k.toLowerCase().split(' ')[0])
  ) || 'Wedding Photography';
  const competitors = COMPETITOR_DATA[industryKey] || COMPETITOR_DATA['Wedding Photography'];
  const opportunities = OPPORTUNITIES[industryKey] || OPPORTUNITIES['Wedding Photography'];

  const runAnalysis = () => {
    setLoading(true); setAnalyzed(false);
    setTimeout(() => { setLoading(false); setAnalyzed(true); }, 1800);
  };

  return (
    <div className="ci-root fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Competitor Insights</h1>
          <p className="page-subtitle">Understand your market and find gaps your ads can exploit.</p>
        </div>
      </header>

      <Card className="ci-launch-card">
        <div className="ci-launch-inner">
          <div className="ci-select-group">
            <label>Analyse market for</label>
            <div className="ci-select-wrap">
              <select value={selectedBizId} onChange={e => { setSelectedBizId(e.target.value); setAnalyzed(false); }}>
                {SAMPLE_DATA.businesses.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="ci-biz-preview">
            <span className="ci-tag">{business?.industry}</span>
            <span className="ci-tag">{business?.location}</span>
          </div>
          <Button onClick={runAnalysis} disabled={loading}>
            {loading ? <><span className="ci-spinner" /> Analysing...</> : <><Search size={16} /> Run Analysis</>}
          </Button>
        </div>
      </Card>

      {analyzed && (
        <div className="ci-results fade-in">
          <div className="ci-summary-bar">
            <div className="ci-summary-item"><span className="ci-summary-value">{competitors.length}</span><span className="ci-summary-label">Competitors</span></div>
            <div className="ci-summary-item"><span className="ci-summary-value" style={{color:'var(--success)'}}>{opportunities.length}</span><span className="ci-summary-label">Opportunities</span></div>
            <div className="ci-summary-item"><span className="ci-summary-value">{Math.round(competitors.reduce((a,c)=>a+c.score,0)/competitors.length)}%</span><span className="ci-summary-label">Avg Ad Strength</span></div>
          </div>

          <div className="ci-main-grid">
            <div>
              <h2 className="ci-section-title">Top Competitors</h2>
              <div className="ci-comp-list">
                {competitors.map((comp, i) => (
                  <Card key={i} className="ci-comp-card">
                    <div className="ci-comp-header">
                      <div><h3>{comp.name}</h3><span className="ci-comp-url">{comp.url}</span></div>
                      <div className="ci-comp-score">
                        <div className="ci-score-track"><div className="ci-score-fill" style={{width:`${comp.score}%`, background: comp.score>65?'var(--error)':comp.score>50?'var(--warning)':'var(--success)'}}/></div>
                        <span className="ci-score-num">{comp.score}%</span>
                      </div>
                    </div>
                    <div className="ci-comp-meta">
                      <div className="ci-meta-row"><span className="ci-meta-label">Tone</span><Badge variant="neutral">{comp.tone}</Badge></div>
                      <div className="ci-meta-row"><span className="ci-meta-label">CTA</span><span className="ci-meta-val">"{comp.cta}"</span></div>
                    </div>
                    <div className="ci-comp-headlines">
                      <span className="ci-meta-label">Sample Headlines</span>
                      <ul>{comp.headlines.map((h,j)=><li key={j}>"{h}"</li>)}</ul>
                    </div>
                    <div className="ci-comp-swot">
                      <div className="ci-swot strength"><CheckCircle2 size={13}/><span>{comp.strength}</span></div>
                      <div className="ci-swot weakness"><XCircle size={13}/><span>{comp.weakness}</span></div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="ci-section-title">Your Opportunities</h2>
              <div className="ci-opps-list">
                {opportunities.map((opp,i)=>(
                  <div key={i} className="ci-opp-card">
                    <div className="ci-opp-num">{i+1}</div>
                    <div><h4>{opp.title}</h4><p>{opp.detail}</p></div>
                  </div>
                ))}
              </div>
              <Card title="Headline Patterns in Your Market">
                <div className="ci-pattern-list">
                  {[['Eye','Price-Led: "Affordable [Service] from £XX"'],['Zap','Speed-Led: "Fast & Reliable – Same Day"'],['MessageSquare','Trust-Led: "Award Winning [Service] in [City]"'],['Target','Result-Led: "Get [Outcome] in [Timeframe]"']].map(([,text],i)=>(
                    <div key={i} className="ci-pattern-item"><span className="ci-pattern-dot"/>{text}</div>
                  ))}
                </div>
                <div className="ci-rec">
                  <TrendingUp size={13}/>
                  <span>Combine <strong>Trust + Result</strong> framing — it's the least-used pattern in your market.</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .ci-root { animation: fadeIn 0.4s ease-out; }
        .page-header { margin-bottom: 2.5rem; }
        .page-title { font-size: 2.25rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.5rem; }
        .page-subtitle { color: var(--text-secondary); font-size: 1.125rem; }
        .ci-launch-card { margin-bottom: 2.5rem; }
        .ci-launch-inner { display: flex; align-items: flex-end; gap: 1.5rem; flex-wrap: wrap; }
        .ci-select-group { display: flex; flex-direction: column; gap: 0.375rem; }
        .ci-select-group label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); }
        .ci-select-wrap { position: relative; }
        .ci-select-wrap select { appearance: none; padding: 0.5rem 2.25rem 0.5rem 0.875rem; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: var(--radius-md); font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); outline: none; min-width: 200px; cursor: pointer; }
        .ci-select-wrap svg { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); pointer-events: none; }
        .ci-biz-preview { display: flex; gap: 0.5rem; }
        .ci-tag { font-size: 0.8125rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--text-secondary); }
        .ci-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.6s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .ci-results { display: flex; flex-direction: column; gap: 2.5rem; }
        .ci-summary-bar { display: flex; gap: 3rem; padding: 1.5rem 2rem; background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius-lg); }
        .ci-summary-item { display: flex; flex-direction: column; gap: 0.25rem; }
        .ci-summary-value { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); }
        .ci-summary-label { font-size: 0.75rem; font-weight: 600; color: var(--text-tertiary); text-transform: uppercase; }
        .ci-main-grid { display: grid; grid-template-columns: 1fr 360px; gap: 2rem; }
        .ci-section-title { font-size: 1.125rem; font-weight: 700; margin-bottom: 1.25rem; }
        .ci-comp-list { display: flex; flex-direction: column; gap: 1.25rem; }
        .ci-comp-card { padding: 1.25rem; }
        .ci-comp-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; }
        .ci-comp-header h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.125rem; }
        .ci-comp-url { font-size: 0.75rem; color: var(--text-tertiary); }
        .ci-comp-score { display: flex; align-items: center; gap: 0.75rem; }
        .ci-score-track { width: 90px; height: 6px; background: var(--border); border-radius: 999px; overflow: hidden; }
        .ci-score-fill { height: 100%; border-radius: 999px; }
        .ci-score-num { font-size: 0.875rem; font-weight: 700; }
        .ci-comp-meta { display: flex; gap: 2rem; margin-bottom: 0.875rem; }
        .ci-meta-row { display: flex; align-items: center; gap: 0.75rem; }
        .ci-meta-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); letter-spacing: 0.04em; }
        .ci-meta-val { font-size: 0.875rem; font-weight: 600; }
        .ci-comp-headlines { margin-bottom: 0.875rem; }
        .ci-comp-headlines ul { list-style: none; padding: 0; margin: 0.375rem 0 0; display: flex; flex-direction: column; gap: 0.25rem; }
        .ci-comp-headlines li { font-size: 0.8125rem; color: var(--text-secondary); }
        .ci-comp-swot { display: flex; flex-direction: column; gap: 0.5rem; padding-top: 0.75rem; border-top: 1px solid var(--border); }
        .ci-swot { display: flex; align-items: center; gap: 0.625rem; font-size: 0.8125rem; }
        .ci-swot.strength { color: var(--success); }
        .ci-swot.weakness { color: var(--error); }
        .ci-opps-list { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .ci-opp-card { display: flex; gap: 1.25rem; padding: 1.25rem; background: var(--brand-light); border: 1px solid var(--brand); border-left: 4px solid var(--brand); border-radius: var(--radius-lg); }
        .ci-opp-num { width: 28px; height: 28px; background: var(--brand); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8125rem; font-weight: 800; flex-shrink: 0; }
        .ci-opp-card h4 { font-size: 0.9375rem; font-weight: 700; margin-bottom: 0.25rem; }
        .ci-opp-card p { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5; }
        .ci-pattern-list { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem; }
        .ci-pattern-item { display: flex; align-items: center; gap: 0.75rem; font-size: 0.875rem; color: var(--text-secondary); }
        .ci-pattern-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--brand); flex-shrink: 0; }
        .ci-rec { display: flex; align-items: flex-start; gap: 0.625rem; padding: 0.75rem; background: #f0fdf4; border-radius: var(--radius-md); font-size: 0.8125rem; color: #166534; border: 1px solid #bbf7d0; }
        @media (max-width: 1200px) { .ci-main-grid { grid-template-columns: 1fr; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
};

export default CompetitorInsights;
