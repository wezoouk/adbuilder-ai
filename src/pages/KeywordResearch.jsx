import React, { useState } from 'react';
import {
  Plus, X, Search, TrendingUp, AlertTriangle, Download, Database, History, Lightbulb, ChevronRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

// Large keyword database seeded by query terms
const KEYWORD_POOL = {
  wedding: [
    { phrase: 'wedding photographer', volume: '40.5K', difficulty: 'High', intent: 'Commercial' },
    { phrase: 'wedding photography near me', volume: '22.4K', difficulty: 'High', intent: 'Local' },
    { phrase: 'affordable wedding photographer', volume: '12.1K', difficulty: 'Medium', intent: 'Commercial' },
    { phrase: 'wedding photography packages', volume: '18.2K', difficulty: 'Medium', intent: 'Commercial' },
    { phrase: 'best wedding photographers 2024', volume: '9.8K', difficulty: 'Medium', intent: 'Commercial' },
    { phrase: 'relaxed wedding photography', volume: '5.2K', difficulty: 'Low', intent: 'Commercial' },
    { phrase: 'candid wedding photographer', volume: '7.6K', difficulty: 'Low', intent: 'Commercial' },
    { phrase: 'documentary wedding photography', volume: '8.3K', difficulty: 'Medium', intent: 'Commercial' },
    { phrase: 'wedding photos prices', volume: '5.4K', difficulty: 'Low', intent: 'Informational' },
    { phrase: 'natural wedding photography', volume: '6.1K', difficulty: 'Low', intent: 'Commercial' },
    { phrase: 'wedding photographer north east', volume: '3.2K', difficulty: 'Low', intent: 'Local' },
    { phrase: 'engagement photo session', volume: '11K', difficulty: 'Medium', intent: 'Commercial' },
    { phrase: 'wedding portrait photographer', volume: '4.7K', difficulty: 'Low', intent: 'Commercial' },
    { phrase: 'outdoor wedding photography', volume: '9.1K', difficulty: 'Medium', intent: 'Commercial' },
    { phrase: 'wedding photographer cost uk', volume: '14.2K', difficulty: 'High', intent: 'Informational' },
  ],
  plumb: [
    { phrase: 'plumber near me', volume: '150K', difficulty: 'High', intent: 'Local' },
    { phrase: 'emergency plumber', volume: '90K', difficulty: 'High', intent: 'Urgent' },
    { phrase: 'boiler repair', volume: '60K', difficulty: 'High', intent: 'Commercial' },
    { phrase: 'blocked drain repair', volume: '15K', difficulty: 'Medium', intent: 'Commercial' },
    { phrase: 'local plumbing services', volume: '25K', difficulty: 'Medium', intent: 'Local' },
    { phrase: 'boiler repair cost', volume: '12K', difficulty: 'Medium', intent: 'Informational' },
    { phrase: '24 hour plumber', volume: '35K', difficulty: 'High', intent: 'Urgent' },
    { phrase: 'gas safe plumber', volume: '18K', difficulty: 'Medium', intent: 'Commercial' },
    { phrase: 'burst pipe repair', volume: '22K', difficulty: 'High', intent: 'Urgent' },
    { phrase: 'no call out charge plumber', volume: '8K', difficulty: 'Low', intent: 'Commercial' },
    { phrase: 'central heating engineer', volume: '20K', difficulty: 'Medium', intent: 'Commercial' },
    { phrase: 'hot water cylinder repair', volume: '5K', difficulty: 'Low', intent: 'Commercial' },
    { phrase: 'leaking pipe repair', volume: '16K', difficulty: 'Medium', intent: 'Urgent' },
    { phrase: 'bathroom installation plumber', volume: '9K', difficulty: 'Medium', intent: 'Commercial' },
  ],
  fitness: [
    { phrase: 'personal trainer near me', volume: '55K', difficulty: 'High', intent: 'Local' },
    { phrase: 'personal training', volume: '90K', difficulty: 'High', intent: 'Commercial' },
    { phrase: 'fitness coach', volume: '30K', difficulty: 'Medium', intent: 'Commercial' },
    { phrase: 'weight loss personal trainer', volume: '18K', difficulty: 'Medium', intent: 'Commercial' },
    { phrase: 'gym near me', volume: '200K', difficulty: 'High', intent: 'Local' },
    { phrase: 'online personal trainer', volume: '40K', difficulty: 'High', intent: 'Commercial' },
    { phrase: 'strength training coach', volume: '12K', difficulty: 'Medium', intent: 'Commercial' },
    { phrase: '1 to 1 personal training', volume: '8K', difficulty: 'Low', intent: 'Commercial' },
    { phrase: 'fat loss coach uk', volume: '5K', difficulty: 'Low', intent: 'Commercial' },
    { phrase: 'bootcamp classes near me', volume: '14K', difficulty: 'Medium', intent: 'Local' },
    { phrase: 'personal trainer prices', volume: '25K', difficulty: 'Medium', intent: 'Informational' },
    { phrase: 'fitness transformation programme', volume: '7K', difficulty: 'Low', intent: 'Commercial' },
    { phrase: 'nutrition coach uk', volume: '9K', difficulty: 'Medium', intent: 'Commercial' },
  ],
  legal: [
    { phrase: 'solicitor near me', volume: '40K', difficulty: 'High', intent: 'Local' },
    { phrase: 'family law solicitor', volume: '28K', difficulty: 'High', intent: 'Commercial' },
    { phrase: 'employment law advice', volume: '22K', difficulty: 'Medium', intent: 'Informational' },
    { phrase: 'no win no fee solicitor', volume: '18K', difficulty: 'High', intent: 'Commercial' },
    { phrase: 'divorce solicitor cost', volume: '15K', difficulty: 'Medium', intent: 'Informational' },
    { phrase: 'conveyancing solicitor', volume: '35K', difficulty: 'High', intent: 'Commercial' },
    { phrase: 'personal injury solicitor', volume: '45K', difficulty: 'High', intent: 'Commercial' },
    { phrase: 'free legal advice uk', volume: '30K', difficulty: 'High', intent: 'Informational' },
    { phrase: 'immigration solicitor', volume: '25K', difficulty: 'High', intent: 'Commercial' },
    { phrase: 'wills and probate solicitor', volume: '20K', difficulty: 'Medium', intent: 'Commercial' },
  ],
  restaurant: [
    { phrase: 'restaurants near me', volume: '500K', difficulty: 'High', intent: 'Local' },
    { phrase: 'book a table', volume: '60K', difficulty: 'High', intent: 'Commercial' },
    { phrase: 'best restaurants in [city]', volume: '40K', difficulty: 'High', intent: 'Commercial' },
    { phrase: 'fine dining near me', volume: '35K', difficulty: 'High', intent: 'Local' },
    { phrase: 'sunday roast near me', volume: '28K', difficulty: 'Medium', intent: 'Local' },
    { phrase: 'family restaurant near me', volume: '45K', difficulty: 'High', intent: 'Local' },
    { phrase: 'romantic restaurant for two', volume: '18K', difficulty: 'Medium', intent: 'Commercial' },
    { phrase: 'restaurant delivery near me', volume: '120K', difficulty: 'High', intent: 'Local' },
    { phrase: 'vegan restaurant near me', volume: '30K', difficulty: 'Medium', intent: 'Local' },
    { phrase: 'private dining room hire', volume: '8K', difficulty: 'Low', intent: 'Commercial' },
  ],
  // Generic fallback uses the search query itself
  _generic: (q) => [
    { phrase: q, volume: 'Variable', difficulty: 'Medium', intent: 'Commercial' },
    { phrase: `${q} near me`, volume: 'High', difficulty: 'High', intent: 'Local' },
    { phrase: `affordable ${q}`, volume: 'Medium', difficulty: 'Low', intent: 'Commercial' },
    { phrase: `best ${q}`, volume: 'High', difficulty: 'High', intent: 'Commercial' },
    { phrase: `${q} prices`, volume: 'Medium', difficulty: 'Medium', intent: 'Informational' },
    { phrase: `local ${q} service`, volume: 'Medium', difficulty: 'Low', intent: 'Local' },
    { phrase: `professional ${q}`, volume: 'Medium', difficulty: 'Medium', intent: 'Commercial' },
    { phrase: `${q} reviews`, volume: 'Low', difficulty: 'Low', intent: 'Informational' },
    { phrase: `${q} specialist`, volume: 'Low', difficulty: 'Low', intent: 'Commercial' },
    { phrase: `free ${q} consultation`, volume: 'Low', difficulty: 'Low', intent: 'Commercial' },
  ]
};

const getKeywords = (query) => {
  const q = query.toLowerCase();
  for (const [key, data] of Object.entries(KEYWORD_POOL)) {
    if (key === '_generic') continue;
    if (q.includes(key) || key.includes(q.split(' ')[0])) {
      // Filter to those containing the query term where possible
      const filtered = data.filter(k => k.phrase.includes(q) || q.split(' ').some(w => k.phrase.includes(w)));
      return filtered.length >= 5 ? filtered : data;
    }
  }
  return KEYWORD_POOL._generic(query);
};

const INTENT_COLORS = {
  Commercial: 'brand',
  Local: 'success',
  Urgent: 'error',
  Informational: 'neutral',
};

const KeywordResearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [savedKeywords, setSavedKeywords] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedIntents, setSelectedIntents] = useState([]);

  const doSearch = (q) => {
    const term = q || query;
    if (!term) return;
    setIsSearching(true);
    setSearchHistory(h => [term, ...h.filter(x => x !== term)].slice(0, 5));
    setTimeout(() => {
      setResults(getKeywords(term));
      setIsSearching(false);
    }, 900);
  };

  const saveKeyword = (kw) => {
    if (!savedKeywords.find(k => k.phrase === kw.phrase)) {
      setSavedKeywords(s => [...s, kw]);
    }
  };

  const removeKeyword = (phrase) => setSavedKeywords(s => s.filter(k => k.phrase !== phrase));

  const filteredResults = selectedIntents.length > 0
    ? results.filter(r => selectedIntents.includes(r.intent))
    : results;

  const toggleIntent = (intent) => {
    setSelectedIntents(s => s.includes(intent) ? s.filter(x => x !== intent) : [...s, intent]);
  };

  const intents = [...new Set(results.map(r => r.intent))];

  const exportCSV = () => {
    const rows = [['Keyword', 'Volume', 'Difficulty', 'Intent'], ...savedKeywords.map(k => [k.phrase, k.volume, k.difficulty, k.intent])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'keywords.csv'; a.click();
  };

  return (
    <div className="kw-root fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Keyword Explorer</h1>
          <p className="page-subtitle">Discover high-performing search terms for your Google Ads campaigns.</p>
        </div>
        {savedKeywords.length > 0 && (
          <button className="kw-export-btn" onClick={exportCSV}>
            <Download size={15} /> Export {savedKeywords.length} Keywords
          </button>
        )}
      </header>

      <div className="kw-search-row">
        <div className="kw-input-wrap">
          <Search size={17} className="kw-icon" />
          <input
            type="text"
            placeholder="Search any industry, service or location (e.g. emergency plumber, wedding photographer)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doSearch()}
            className="kw-input"
          />
        </div>
        <Button onClick={() => doSearch()} disabled={!query || isSearching}>
          {isSearching ? <><span className="kw-spinner" /> Searching...</> : <><Search size={15} /> Search</>}
        </Button>
      </div>

      {/* Search history */}
      {searchHistory.length > 0 && (
        <div className="kw-history-row">
          <History size={13} />
          {searchHistory.map((h, i) => (
            <button key={i} className="kw-history-chip" onClick={() => { setQuery(h); doSearch(h); }}>{h}</button>
          ))}
        </div>
      )}

      <div className="kw-main-grid">
        {/* Results panel */}
        <div className="kw-results-panel">
          <div className="kw-results-header">
            <div className="kw-results-meta">
              <strong>{filteredResults.length} keywords</strong>
              {results.length > 0 && <span>for "{query}"</span>}
            </div>
            {intents.length > 0 && (
              <div className="kw-intent-filters">
                {intents.map(intent => (
                  <button
                    key={intent}
                    className={`kw-intent-chip ${selectedIntents.includes(intent) ? 'active' : ''}`}
                    onClick={() => toggleIntent(intent)}
                  >
                    {intent}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="kw-table">
            <div className="kw-table-header">
              <span>Keyword Phrase</span>
              <span>Volume</span>
              <span>Difficulty</span>
              <span>Intent</span>
              <span></span>
            </div>

            {filteredResults.length === 0 && !isSearching ? (
              <div className="kw-empty">
                <Database size={36} />
                <p>Enter a service or product above to discover keyword opportunities.</p>
              </div>
            ) : (
              filteredResults.map((kw, i) => {
                const saved = savedKeywords.find(k => k.phrase === kw.phrase);
                return (
                  <div key={i} className={`kw-row ${saved ? 'saved' : ''}`}>
                    <span className="kw-phrase">{kw.phrase}</span>
                    <span className="kw-vol">{kw.volume}</span>
                    <span>
                      <Badge variant={kw.difficulty === 'High' ? 'error' : kw.difficulty === 'Medium' ? 'warning' : 'success'} size="sm">
                        {kw.difficulty}
                      </Badge>
                    </span>
                    <span>
                      <Badge variant={INTENT_COLORS[kw.intent] || 'neutral'} size="sm">{kw.intent}</Badge>
                    </span>
                    <span>
                      {saved ? (
                        <button className="kw-remove-btn" onClick={() => removeKeyword(kw.phrase)} title="Remove">
                          <X size={14} />
                        </button>
                      ) : (
                        <button className="kw-add-btn" onClick={() => saveKeyword(kw)} title="Save keyword">
                          <Plus size={14} />
                        </button>
                      )}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="kw-sidebar">
          {/* Saved keywords */}
          <Card title={`Saved Keywords (${savedKeywords.length})`}>
            {savedKeywords.length === 0 ? (
              <div className="kw-saved-empty">
                <p>Click <Plus size={12} style={{display:'inline', verticalAlign:'middle'}} /> next to any keyword to save it here.</p>
              </div>
            ) : (
              <div className="kw-saved-list">
                {savedKeywords.map((kw, i) => (
                  <div key={i} className="kw-saved-item">
                    <div>
                      <div className="kw-saved-phrase">{kw.phrase}</div>
                      <div className="kw-saved-meta">{kw.volume} · {kw.intent}</div>
                    </div>
                    <button className="kw-remove-btn" onClick={() => removeKeyword(kw.phrase)}><X size={13} /></button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Tips */}
          <Card title="Tips">
            <div className="kw-tips">
              <div className="kw-tip"><Lightbulb size={16} style={{ color: '#f59e0b', flexShrink: 0 }} /><p><strong>Commercial intent</strong> keywords convert best for Google Ads.</p></div>
              <div className="kw-tip"><TrendingUp size={16} style={{ color: 'var(--success)', flexShrink: 0 }} /><p><strong>Lower difficulty</strong> keywords are easier and cheaper to rank for.</p></div>
              <div className="kw-tip"><AlertTriangle size={16} style={{ color: 'var(--warning)', flexShrink: 0 }} /><p>Include <strong>location</strong> in keywords for local service businesses.</p></div>
            </div>
          </Card>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .kw-root { animation: fadeIn 0.4s ease-out; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem; }
        .page-title { font-size: 2.25rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.5rem; }
        .page-subtitle { color: var(--text-secondary); font-size: 1.125rem; }
        .kw-export-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--brand-light); border: 1px solid var(--brand); color: var(--brand); border-radius: var(--radius-md); font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: var(--transition-fast); }
        .kw-export-btn:hover { background: var(--brand); color: white; }

        .kw-search-row { display: flex; gap: 1rem; margin-bottom: 1rem; }
        .kw-input-wrap { flex: 1; display: flex; align-items: center; gap: 0.875rem; padding: 0.75rem 1.25rem; background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius-md); }
        .kw-input-wrap:focus-within { border-color: var(--brand); }
        .kw-icon { color: var(--text-tertiary); flex-shrink: 0; }
        .kw-input { flex: 1; border: none; background: none; outline: none; font-size: 1rem; color: var(--text-primary); }
        .kw-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .kw-history-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem; flex-wrap: wrap; color: var(--text-tertiary); }
        .kw-history-chip { font-size: 0.8125rem; padding: 0.2rem 0.625rem; border: 1px solid var(--border); border-radius: 999px; background: var(--bg-secondary); color: var(--text-secondary); cursor: pointer; }
        .kw-history-chip:hover { border-color: var(--brand); color: var(--brand); }

        .kw-main-grid { display: grid; grid-template-columns: 1fr 280px; gap: 2rem; }
        .kw-results-panel { display: flex; flex-direction: column; gap: 1rem; }
        .kw-results-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; }
        .kw-results-meta { font-size: 0.9375rem; color: var(--text-secondary); }
        .kw-results-meta strong { color: var(--text-primary); }
        .kw-intent-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .kw-intent-chip { padding: 0.25rem 0.625rem; border: 1px solid var(--border); border-radius: 999px; font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: var(--transition-fast); }
        .kw-intent-chip.active { background: var(--brand-light); border-color: var(--brand); color: var(--brand); }

        .kw-table { background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
        .kw-table-header { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 48px; padding: 0.875rem 1.25rem; background: var(--bg-secondary); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); letter-spacing: 0.05em; }
        .kw-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 48px; padding: 0.875rem 1.25rem; border-top: 1px solid var(--border); align-items: center; font-size: 0.875rem; transition: var(--transition-fast); }
        .kw-row:hover { background: var(--bg-secondary); }
        .kw-row.saved { background: #f0fdf4; }
        .kw-phrase { font-weight: 700; color: var(--text-primary); }
        .kw-vol { font-weight: 600; color: var(--text-secondary); }
        .kw-add-btn { width: 30px; height: 30px; border-radius: 50%; color: var(--brand); border: 1px solid var(--brand); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: var(--transition-fast); }
        .kw-add-btn:hover { background: var(--brand); color: white; }
        .kw-remove-btn { width: 30px; height: 30px; border-radius: 50%; color: var(--error); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .kw-remove-btn:hover { background: #fee2e2; border-color: var(--error); }
        .kw-empty { padding: 4rem; text-align: center; color: var(--text-tertiary); display: flex; flex-direction: column; align-items: center; gap: 1rem; }
        .kw-empty p { font-size: 0.9375rem; max-width: 300px; line-height: 1.5; }

        .kw-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }
        .kw-saved-empty { padding: 1rem 0; font-size: 0.875rem; color: var(--text-tertiary); text-align: center; line-height: 1.5; }
        .kw-saved-list { display: flex; flex-direction: column; gap: 0.625rem; }
        .kw-saved-item { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; }
        .kw-saved-phrase { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
        .kw-saved-meta { font-size: 0.75rem; color: var(--text-tertiary); }
        .kw-tips { display: flex; flex-direction: column; gap: 1rem; }
        .kw-tip { display: flex; gap: 0.75rem; }
        .kw-tip p { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.4; }

        @media (max-width: 1024px) { .kw-main-grid { grid-template-columns: 1fr; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
};

export default KeywordResearch;
