import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, Star } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';

const ReviewItem = ({ status = 'success', label, feedback }) => {
  const Icon = status === 'success' ? CheckCircle2 : status === 'warning' ? AlertTriangle : XCircle;
  const color = status === 'success' ? 'var(--success)' : status === 'warning' ? 'var(--warning)' : 'var(--error)';
  
  return (
    <div className="review-item">
      <div className="review-status" style={{ color }}>
        <Icon size={18} />
      </div>
      <div className="review-text">
        <span className="review-label">{label}</span>
        <p className="review-feedback">{feedback}</p>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .review-item { display: flex; gap: 1rem; padding: 1rem; background-color: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius-md); }
        .review-status { flex-shrink: 0; }
        .review-label { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.125rem; display: block; }
        .review-feedback { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.4; }
      `}} />
    </div>
  );
};

const ReviewStep = () => {
  return (
    <div className="review-step fade-in">
      <div className="score-summary">
        <div className="score-widget">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="circle" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <text x="18" y="20.35" className="percentage">8.5</text>
          </svg>
          <div className="score-info">
            <h3>Ad Strength Score</h3>
            <p>Your campaign is nearly ready for launch.</p>
            <Badge variant="success">Great Potential</Badge>
          </div>
        </div>
      </div>

      <div className="review-grid">
        <div className="review-section">
          <h4>Health Check</h4>
          <div className="review-list">
            <ReviewItem 
              label="Location Relevance" 
              feedback="Good use of 'North East' in headlines. Helps filter local intent." 
            />
            <ReviewItem 
              label="Headline Variety" 
              status="warning"
              feedback="Some headlines are repetitive. Try to vary the 'Offer' and 'Trust' angles more." 
            />
            <ReviewItem 
              label="CTA Clarity" 
              feedback="Excellent use of specific CTAs like 'Check Availability'. Clearly defines the goal." 
            />
            <ReviewItem 
              label="Keyword Alignment" 
              feedback="Headlines match 90% of your primary keyword groups." 
            />
          </div>
        </div>

        <div className="review-sidebar">
          <Card title="Quick Suggestions">
            <div className="suggestion-pill">
              <Star size={14} />
              <span>Add a price anchor to Headline 5</span>
            </div>
            <div className="suggestion-pill">
              <Info size={14} />
              <span>Sitelink extensions are missing</span>
            </div>
          </Card>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .review-step h2 { margin-bottom: 2rem; }
        .score-summary { margin-bottom: 3rem; padding: 2rem; background-color: var(--brand-light); border-radius: var(--radius-lg); border: 1px solid var(--brand); }
        .score-widget { display: flex; align-items: center; gap: 2rem; }
        .score-info h3 { font-size: 1.5rem; font-weight: 800; color: var(--brand); margin-bottom: 0.25rem; }
        .score-info p { color: var(--text-secondary); margin-bottom: 0.75rem; }
        
        .circular-chart { display: block; margin: 0; max-width: 100px; max-height: 100px; }
        .circle-bg { fill: none; stroke: #eee; stroke-width: 3.8; }
        .circle { fill: none; stroke-width: 2.8; stroke-linecap: round; stroke: var(--brand); }
        .percentage { fill: var(--brand); font-family: sans-serif; font-size: 0.6em; text-anchor: middle; font-weight: 700; }

        .review-grid { display: grid; grid-template-columns: 1fr 300px; gap: 2rem; }
        .review-section h4 { font-size: 0.875rem; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 1rem; }
        .review-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .suggestion-pill { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background-color: var(--bg-secondary); border-radius: var(--radius-md); margin-bottom: 0.75rem; font-size: 0.8125rem; color: var(--text-secondary); }
      `}} />
    </div>
  );
};

export default ReviewStep;
