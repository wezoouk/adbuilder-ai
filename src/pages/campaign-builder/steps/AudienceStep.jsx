import React, { useState } from 'react';
import { Sparkles, Loader2, Users, Target, Lightbulb, Shield, ChevronDown } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { SAMPLE_DATA } from '../../../data/sampleData';

const INDUSTRY_SUGGESTIONS = {
  photography: {
    customers: 'Engaged couples aged 25–35 planning a relaxed, natural wedding in the North East',
    searchingFor: 'A candid wedding photographer who captures real moments without awkward posing',
    problem: 'Previous photographers made them feel rushed and used too many clichéd poses',
    result: 'Beautiful, stress-free wedding photos they\'ll treasure for a lifetime',
    hesitation: 'Worried about cost and not being able to relax in front of the camera',
    usp: 'Natural candid style, 24-hour sneak peeks, and transparent flat-fee pricing',
  },
  plumbing: {
    customers: 'Homeowners and landlords in need of urgent or planned plumbing work',
    searchingFor: 'A certified local plumber who arrives on time and charges honestly',
    problem: 'Struggling with a leak, blocked drain, or no hot water and can\'t find a reliable plumber',
    result: 'Problem resolved same day, with no hidden fees and a 12-month guarantee',
    hesitation: 'Fear of being overcharged or getting an uncertified tradesman who makes it worse',
    usp: '24/7 emergency response, Gas Safe registered, no call-out charge, 12-month guarantee',
  },
  fitness: {
    customers: 'Adults aged 25–45 who want to lose weight or build strength but struggle with motivation',
    searchingFor: 'A local personal trainer who creates a realistic plan and holds them accountable',
    problem: 'Tried gym memberships before but gave up without a structured programme or support',
    result: 'Visible results in 90 days through a proven, personalised training plan',
    hesitation: 'Not sure if they\'re fit enough to start, and worried about the cost',
    usp: 'Free first session, no contract required, proven 90-day transformation programme',
  },
  default: {
    customers: 'Local adults and business owners searching for a reliable professional service',
    searchingFor: 'A trusted, fairly priced specialist who communicates clearly',
    problem: 'Difficulty finding a reliable provider without endless research',
    result: 'Problem solved quickly with professional results and no stress',
    hesitation: 'Unsure about pricing and whether the provider is genuinely trustworthy',
    usp: 'Transparent pricing, fast turnaround, and a satisfaction guarantee',
  }
};

const FIELDS = [
  { key: 'idealCustomer', label: 'Ideal Customer Profile', icon: Users, placeholder: 'Who are they? Age, location, mindset...', hint: 'The more specific, the better. E.g. "Engaged couples aged 25–35 in the North East"' },
  { key: 'searchingFor', label: 'What Are They Searching For?', icon: Target, placeholder: 'What solution are they typing into Google?', hint: 'This directly shapes your ad headline. Think like your customer.' },
  { key: 'problem', label: 'Primary Pain Point', icon: Lightbulb, placeholder: 'What problem do they have right now?', hint: 'Ads that name the pain get far higher CTR than generic ones.' },
  { key: 'result', label: 'Desired Outcome', icon: Target, placeholder: 'What result do they ultimately want?', hint: 'Your description should promise this result clearly.' },
  { key: 'usp', label: 'Why Choose You? (USP)', icon: Shield, placeholder: 'What makes you genuinely different?', hint: 'This is your hook — the thing that stops the scroll and earns the click.', wide: true },
  { key: 'hesitation', label: 'What Stops Them Buying?', icon: Lightbulb, placeholder: 'What objection or fear do they have?', hint: 'Knowing this lets you pre-answer it in your ad copy.', wide: true },
];

const AudienceStep = ({ formData, setFormData }) => {
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [expandedTip, setExpandedTip] = useState(null);

  const audience = formData.audience || {};
  const activeBiz = SAMPLE_DATA.businesses.find(b => b.id === formData.profileId) || {};
  const industryKey = activeBiz.industry?.toLowerCase().includes('photo') ? 'photography'
    : activeBiz.industry?.toLowerCase().includes('plumb') ? 'plumbing'
    : activeBiz.industry?.toLowerCase().includes('fit') ? 'fitness'
    : 'default';

  const suggestions = INDUSTRY_SUGGESTIONS[industryKey];

  const update = (key, val) => {
    setFormData({ ...formData, audience: { ...audience, [key]: val } });
  };

  const autoFill = () => {
    setIsDiscovering(true);
    setTimeout(() => {
      setFormData({
        ...formData,
        audience: {
          idealCustomer: suggestions.customers,
          searchingFor: suggestions.searchingFor,
          problem: suggestions.problem,
          result: suggestions.result,
          hesitation: suggestions.hesitation,
          usp: suggestions.usp,
        }
      });
      setIsDiscovering(false);
    }, 1200);
  };

  const filled = FIELDS.filter(f => audience[f.key]?.trim()).length;

  return (
    <div className="aud-root fade-in">
      <div className="aud-header">
        <div>
          <h2>Step 3: Target Audience</h2>
          <p>Define exactly who you want to reach and what makes you the right choice for them.</p>
        </div>
        <div className="aud-header-actions">
          <div className="aud-progress-badge">
            {filled}/{FIELDS.length} completed
          </div>
          <Button variant="outline" onClick={autoFill} disabled={isDiscovering}>
            {isDiscovering ? <><span className="aud-spinner" /> Filling...</> : <><Sparkles size={15} /> Auto-Fill from Industry</>}
          </Button>
        </div>
      </div>

      <div className="aud-grid">
        {FIELDS.map(field => {
          const val = audience[field.key] || '';
          const Icon = field.icon;
          const isFilled = val.trim().length > 0;
          return (
            <div key={field.key} className={`aud-field ${field.wide ? 'aud-field--wide' : ''}`}>
              <div className="aud-field-label">
                <Icon size={14} />
                <label>{field.label}</label>
                {isFilled && <span className="aud-check">✓</span>}
              </div>
              <textarea
                className={`aud-textarea ${isFilled ? 'aud-textarea--filled' : ''}`}
                placeholder={field.placeholder}
                value={val}
                onChange={e => update(field.key, e.target.value)}
                rows={field.wide ? 3 : 2}
              />
              <div className="aud-hint">{field.hint}</div>
            </div>
          );
        })}
      </div>

      {/* Live persona preview */}
      {filled >= 2 && (
        <div className="aud-preview fade-in">
          <div className="aud-preview-title"><Users size={14} /> Audience Persona Preview</div>
          <div className="aud-persona-row">
            {audience.idealCustomer && <div className="aud-persona-chip"><strong>Who:</strong> {audience.idealCustomer}</div>}
            {audience.searchingFor && <div className="aud-persona-chip"><strong>Wants:</strong> {audience.searchingFor}</div>}
            {audience.usp && <div className="aud-persona-chip"><strong>Hook:</strong> {audience.usp}</div>}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .aud-root { animation: fadeIn 0.4s ease-out; }
        .aud-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; gap: 1rem; flex-wrap: wrap; }
        .aud-header h2 { font-size: 1.375rem; font-weight: 800; margin-bottom: 0.25rem; }
        .aud-header p { color: var(--text-secondary); font-size: 0.9375rem; }
        .aud-header-actions { display: flex; align-items: center; gap: 1rem; flex-shrink: 0; }
        .aud-progress-badge { padding: 0.25rem 0.75rem; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 999px; font-size: 0.8125rem; font-weight: 600; color: var(--text-tertiary); }
        .aud-spinner { display: inline-block; width: 13px; height: 13px; border: 2px solid var(--border); border-top-color: var(--brand); border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .aud-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
        .aud-field--wide { grid-column: 1 / -1; }

        .aud-field-label { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
        .aud-field-label svg { color: var(--brand); }
        .aud-field-label label { font-size: 0.8125rem; font-weight: 700; color: var(--text-primary); }
        .aud-check { margin-left: auto; font-size: 0.75rem; font-weight: 700; color: var(--success); }

        .aud-textarea {
          width: 100%; padding: 0.75rem 1rem; background: var(--bg-primary);
          border: 1px solid var(--border); border-radius: var(--radius-md);
          font-size: 0.9375rem; color: var(--text-primary); outline: none;
          font-family: inherit; resize: vertical; line-height: 1.5;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .aud-textarea:focus { border-color: var(--brand); box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
        .aud-textarea--filled { border-color: var(--success-light, #86efac); background: #f0fdf4; }
        .aud-hint { font-size: 0.75rem; color: var(--text-tertiary); margin-top: 0.375rem; line-height: 1.4; }

        .aud-preview { padding: 1.25rem 1.5rem; background: var(--brand-light); border: 1px solid var(--brand); border-radius: var(--radius-lg); }
        .aud-preview-title { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--brand); margin-bottom: 0.875rem; }
        .aud-persona-row { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .aud-persona-chip { font-size: 0.8125rem; color: var(--text-primary); background: white; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 0.375rem 0.875rem; max-width: 100%; }
        .aud-persona-chip strong { color: var(--brand); margin-right: 0.375rem; }

        @media (max-width: 768px) { .aud-grid { grid-template-columns: 1fr; } .aud-field--wide { grid-column: 1 / -1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
};

export default AudienceStep;
