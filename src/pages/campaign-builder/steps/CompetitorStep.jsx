import React from 'react';
import { Eye, Zap, MessageSquare, ListChecks } from 'lucide-react';
import Card from '../../../components/ui/Card';

const CompetitorStep = () => {
  return (
    <div className="competitor-step fade-in">
      <h2>Competitor Insights</h2>
      <p>Analyze how other businesses in your industry are positioning themselves.</p>
      
      <div className="competitor-grid">
        <Card title="Common Headline Patterns" subtitle="What seems to work in this market">
          <div className="pattern-list">
            <div className="pattern-item">
              <Eye size={16} /> 
              <span><strong>Price-Led:</strong> "Affordable [Service] from £XX"</span>
            </div>
            <div className="pattern-item">
              <Zap size={16} /> 
              <span><strong>Speed-Led:</strong> "Fast & Reliable [Service] - Same Day"</span>
            </div>
            <div className="pattern-item">
              <MessageSquare size={16} /> 
              <span><strong>Trust-Led:</strong> "Award Winning [Service] in [City]"</span>
            </div>
          </div>
        </Card>

        <Card title="Market Opportunities" subtitle="Where you can stand out">
          <div className="opportunity-list">
            <div className="opp-item">
              <h4>Focus on "Relaxed" Positioning</h4>
              <p>Most competitors use formal language. Using a "warm and friendly" tone will differentiate you instantly.</p>
            </div>
            <div className="opp-item">
              <h4>Highlight Your Unique Guarantee</h4>
              <p>Few local photographers explicitly mention a satisfaction guarantee. This builds massive trust.</p>
            </div>
          </div>
        </Card>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .competitor-step h2 { margin-bottom: 0.5rem; }
        .competitor-step p { color: var(--text-secondary); margin-bottom: 2rem; }
        .competitor-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .pattern-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .pattern-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        .pattern-item strong { color: var(--text-primary); }
        .opp-item {
          margin-bottom: 1.25rem;
        }
        .opp-item h4 {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--brand);
          margin-bottom: 0.25rem;
        }
        .opp-item p {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        @media (max-width: 768px) {
          .competitor-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

export default CompetitorStep;
