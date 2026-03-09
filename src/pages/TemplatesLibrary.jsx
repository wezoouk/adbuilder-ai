import React, { useState } from 'react';
import { Library, Search, Zap, Target, Copy, Layout, CheckCircle2, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_DATA } from '../data/sampleData';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const CATEGORY_COLORS = {
  'Home Services': '#0ea5e9',
  'Photography': '#8b5cf6',
  'Health & Fitness': '#10b981',
  'Food & Drink': '#f59e0b',
  'Legal Services': '#6366f1',
};

const TemplatesLibrary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [usedTemplate, setUsedTemplate] = useState(null);

  const categories = ['All', ...new Set(SAMPLE_DATA.templates.map(t => t.category))];
  const filtered = SAMPLE_DATA.templates.filter(t => {
    const matchSearch = searchQuery === '' || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'All' || t.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleUseTemplate = (tpl) => {
    setUsedTemplate(tpl.id);
    setTimeout(() => navigate('/builder'), 1200);
  };

  return (
    <div className="tl-root fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Templates Library</h1>
          <p className="page-subtitle">Proven campaign structures. Pick one and start building in seconds.</p>
        </div>
      </header>

      <div className="tl-controls">
        <div className="tl-search-wrap">
          <Search size={16} className="tl-search-icon" />
          <input
            type="text"
            placeholder="Search by industry or name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="tl-category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`tl-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="tl-grid">
        {filtered.map(tpl => {
          const color = CATEGORY_COLORS[tpl.category] || 'var(--brand)';
          const isUsed = usedTemplate === tpl.id;
          return (
            <Card key={tpl.id} className="tl-card">
              <div className="tl-card-header">
                <div className="tl-icon-box" style={{ background: color + '1a', color }}>
                  <Layout size={22} />
                </div>
                <Badge variant="brand">{tpl.category}</Badge>
              </div>

              <div className="tl-card-body">
                <h3>{tpl.name}</h3>
                <p>{tpl.audience}</p>
              </div>

              <div className="tl-card-stats">
                <div className="tl-stat">
                  <Target size={13} style={{ color }} />
                  <span>{tpl.commonKeywords.length} Keywords</span>
                </div>
                <div className="tl-stat">
                  <Zap size={13} style={{ color }} />
                  <span>{(tpl.headlines || tpl.adAngles || []).length} Headlines</span>
                </div>
              </div>

              <div className="tl-headlines-preview">
                {(tpl.headlines || []).slice(0, 2).map((h, i) => (
                  <div key={i} className="tl-headline-chip">"{h}"</div>
                ))}
              </div>

              <div className="tl-card-footer">
                <Button
                  size="sm"
                  className="tl-use-btn"
                  onClick={() => handleUseTemplate(tpl)}
                  variant={isUsed ? 'secondary' : 'primary'}
                >
                  {isUsed
                    ? <><CheckCircle2 size={15} /> Loading Campaign...</>
                    : <><Copy size={15} /> Use Template <ChevronRight size={14} /></>
                  }
                </Button>
              </div>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <div className="tl-empty">
            <Library size={40} style={{ color: 'var(--text-tertiary)' }} />
            <h3>No templates found</h3>
            <p>Try a different search or category filter.</p>
          </div>
        )}

        <Card className="tl-card tl-coming-soon">
          <div className="tl-card-header">
            <div className="tl-icon-box" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}>
              <Layout size={22} />
            </div>
            <Badge>Coming Soon</Badge>
          </div>
          <div className="tl-card-body">
            <h3>E-commerce Store</h3>
            <p>Optimised for Google Shopping and Search for high-volume online retailers.</p>
          </div>
        </Card>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .tl-root { animation: fadeIn 0.4s ease-out; }
        .page-header { margin-bottom: 2.5rem; }
        .page-title { font-size: 2.25rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.5rem; }
        .page-subtitle { color: var(--text-secondary); font-size: 1.125rem; }
        .tl-controls { display: flex; gap: 1.5rem; align-items: center; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .tl-search-wrap { position: relative; flex: 1; max-width: 380px; }
        .tl-search-icon { position: absolute; left: 0.875rem; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); }
        .tl-search-wrap input { width: 100%; padding: 0.625rem 1rem 0.625rem 2.5rem; background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius-md); font-size: 0.9375rem; color: var(--text-primary); outline: none; }
        .tl-search-wrap input:focus { border-color: var(--brand); }
        .tl-category-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .tl-cat-btn { padding: 0.375rem 0.875rem; font-size: 0.8125rem; font-weight: 600; border-radius: 999px; border: 1px solid var(--border); color: var(--text-secondary); background: var(--bg-primary); transition: var(--transition-fast); cursor: pointer; }
        .tl-cat-btn:hover { border-color: var(--brand); color: var(--brand); }
        .tl-cat-btn.active { background: var(--brand-light); border-color: var(--brand); color: var(--brand); }
        .tl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.75rem; }
        .tl-card { display: flex; flex-direction: column; }
        .tl-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
        .tl-icon-box { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .tl-card-body { flex: 1; margin-bottom: 1.25rem; }
        .tl-card-body h3 { font-size: 1.125rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.375rem; }
        .tl-card-body p { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; }
        .tl-card-stats { display: flex; gap: 1.5rem; margin-bottom: 1rem; }
        .tl-stat { display: flex; align-items: center; gap: 0.375rem; font-size: 0.8125rem; font-weight: 600; color: var(--text-tertiary); }
        .tl-headlines-preview { display: flex; flex-direction: column; gap: 0.375rem; margin-bottom: 1.25rem; }
        .tl-headline-chip { font-size: 0.8125rem; color: var(--text-secondary); padding: 0.375rem 0.625rem; background: var(--bg-secondary); border-radius: 6px; font-style: italic; }
        .tl-card-footer { margin-top: auto; }
        .tl-use-btn { width: 100%; justify-content: center; }
        .tl-coming-soon { opacity: 0.6; border-style: dashed; pointer-events: none; }
        .tl-empty { grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; padding: 4rem; text-align: center; }
        .tl-empty h3 { font-size: 1.25rem; font-weight: 700; margin: 1rem 0 0.5rem; }
        .tl-empty p { color: var(--text-secondary); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
};

export default TemplatesLibrary;
