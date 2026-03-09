import React, { useState, useEffect } from 'react';
import { Plus, X, Search, Filter, TrendingUp, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import { SAMPLE_DATA } from '../../../data/sampleData';

const KEYWORD_DATABASE = {
  'photography': [
    { phrase: 'wedding photographer', volume: '40.5K', intent: 'High' },
    { phrase: 'wedding photography packages', volume: '18.2K', intent: 'High' },
    { phrase: 'affordable wedding photographer', volume: '12.1K', intent: 'Medium' },
    { phrase: 'best wedding photographers near me', volume: '22.4K', intent: 'High' },
    { phrase: 'professional bridal photos', volume: '5.6K', intent: 'Medium' }
  ],
  'plumbing': [
    { phrase: 'plumber near me', volume: '150K', intent: 'High' },
    { phrase: 'emergency plumber', volume: '90K', intent: 'High' },
    { phrase: 'blocked drain repair', volume: '15K', intent: 'High' },
    { phrase: 'local plumbing services', volume: '25K', intent: 'Medium' },
    { phrase: 'boiler repair cost', volume: '12K', intent: 'Medium' }
  ],
  'general': [
    { phrase: 'services near me', volume: 'Variable', intent: 'High' },
    { phrase: 'best rated [service]', volume: 'High', intent: 'High' },
    { phrase: 'affordable [service] provider', volume: 'Medium', intent: 'Medium' },
    { phrase: 'professional [service]', volume: 'Medium', intent: 'Medium' }
  ]
};

const KeywordStep = ({ formData, setFormData }) => {
  const [newKeyword, setNewKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Auto-find logic based on profile
  const autoFindKeywords = () => {
    setIsSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      const biz = SAMPLE_DATA.businesses.find(b => b.id === formData.profileId) || { industry: 'general' };
      const industryKey = biz.industry.toLowerCase().includes('photography') ? 'photography' : 
                          biz.industry.toLowerCase().includes('plumb') ? 'plumbing' : 'general';
      
      const results = KEYWORD_DATABASE[industryKey].map(kw => ({
        ...kw,
        phrase: kw.phrase.replace('[service]', biz.industry || 'service'),
        score: Math.floor(Math.random() * 20) + 80
      }));
      
      setSuggestions(results);
      setIsSearching(false);
    }, 1500);
  };

  const addKeyword = (kwObj) => {
    const phrase = typeof kwObj === 'string' ? kwObj.trim().toLowerCase() : kwObj.phrase;
    if (!phrase || formData.keywords.find(k => k.phrase === phrase)) return;
    
    const kw = typeof kwObj === 'string' ? {
      phrase: phrase,
      intent: 'High',
      volume: 'N/A',
      score: 85
    } : kwObj;

    setFormData({
      ...formData,
      keywords: [...formData.keywords, kw]
    });
    setNewKeyword('');
  };

  const removeKeyword = (phrase) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter(k => k.phrase !== phrase)
    });
  };

  return (
    <div className="keyword-step fade-in">
      <div className="step-header-row">
        <div>
          <h2>Step 5: Keyword Discovery</h2>
          <p>Find the high-traffic terms that your potential customers are actually searching for.</p>
        </div>
        <Button variant="outline" onClick={autoFindKeywords} disabled={isSearching}>
          {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
          Auto-Find High Traffic Keywords
        </Button>
      </div>
      
      <div className="keyword-input-area">
        <div style={{ flex: 1 }}>
          <Input 
            label="Add Manual Keyword" 
            placeholder="e.g., natural wedding photography"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addKeyword(newKeyword)}
          />
        </div>
        <Button onClick={() => addKeyword(newKeyword)} style={{ marginTop: '1.25rem' }}>Add</Button>
      </div>

      <div className="keyword-layout">
        <div className="keyword-list">
          <div className="list-title">
            <h3>Selected Keywords</h3>
            <Badge variant="brand">{formData.keywords.length}</Badge>
          </div>
          <div className="keyword-tags">
            {formData.keywords.length === 0 ? (
              <div className="empty-state">
                <Search size={32} />
                <p>No keywords selected. Use "Auto-Find" or add them manually.</p>
              </div>
            ) : (
              formData.keywords.map((kw) => (
                <div key={kw.phrase} className="keyword-pill">
                  <div className="pill-main">
                    <span className="p-phrase">{kw.phrase}</span>
                    <span className="p-vol">{kw.volume || 'N/A'}</span>
                  </div>
                  <button onClick={() => removeKeyword(kw.phrase)} className="remove-btn"><X size={14} /></button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="keyword-suggestions">
          <div className="list-title">
            <h3>Smart Suggestions</h3>
            {isSearching && <Loader2 className="animate-spin" size={14} />}
          </div>
          <div className="suggestions-container">
            {suggestions.length === 0 && !isSearching ? (
              <div className="suggestion-hint">
                <TrendingUp size={16} />
                <p>Click "Auto-Find" to see high-traffic keywords for your industry.</p>
              </div>
            ) : (
              suggestions.map((s, idx) => {
                const isAdded = formData.keywords.some(k => k.phrase === s.phrase);
                return (
                  <div key={idx} className={`suggestion-card ${isAdded ? 'added' : ''}`} onClick={() => !isAdded && addKeyword(s)}>
                    <div className="s-info">
                      <span className="s-phrase">{s.phrase}</span>
                      <div className="s-meta">
                        <Badge size="sm" variant={s.intent === 'High' ? 'brand' : 'neutral'}>{s.intent} Intent</Badge>
                        <span className="s-vol">{s.volume} searches</span>
                      </div>
                    </div>
                    {!isAdded && <Plus size={16} className="s-plus" />}
                    {isAdded && <div className="s-check">Added</div>}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .keyword-step h2 { margin-bottom: 0.25rem; }
        .keyword-step p { color: var(--text-secondary); margin-bottom: 2rem; font-size: 0.9375rem; }
        .step-header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
        
        .keyword-input-area {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 2.5rem;
          padding: 1.5rem;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-lg);
        }

        .keyword-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2.5rem;
        }

        .list-title { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
        .list-title h3 { font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); letter-spacing: 0.05em; }

        .keyword-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding: 1.5rem;
          background-color: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          min-height: 200px;
          align-content: flex-start;
        }

        .empty-state { width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-tertiary); gap: 1rem; height: 160px; }
        .empty-state p { font-size: 0.875rem; }

        .keyword-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.875rem;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 999px;
          transition: var(--transition-fast);
        }
        .keyword-pill:hover { border-color: var(--brand); box-shadow: var(--shadow-sm); }
        .pill-main { display: flex; flex-direction: column; }
        .p-phrase { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); }
        .p-vol { font-size: 0.6875rem; color: var(--text-tertiary); }
        .remove-btn { color: var(--text-tertiary); cursor: pointer; }
        .remove-btn:hover { color: var(--error); }

        .suggestions-container { display: flex; flex-direction: column; gap: 0.75rem; }
        .suggestion-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background-color: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .suggestion-card:hover { border-color: var(--brand); transform: translateX(4px); }
        .suggestion-card.added { opacity: 0.6; cursor: default; border-color: var(--success-light); background-color: var(--bg-secondary); transform: none; }
        
        .s-phrase { display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; }
        .s-meta { display: flex; align-items: center; gap: 0.5rem; }
        .s-vol { font-size: 0.75rem; color: var(--text-tertiary); }
        .s-plus { color: var(--brand); }
        .s-check { font-size: 0.6875rem; font-weight: 700; color: var(--success); text-transform: uppercase; }

        .suggestion-hint { padding: 2rem; text-align: center; color: var(--text-tertiary); border: 1px dashed var(--border); border-radius: var(--radius-md); }
        .suggestion-hint p { font-size: 0.8125rem; margin-top: 0.50rem; }

        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

export default KeywordStep;
