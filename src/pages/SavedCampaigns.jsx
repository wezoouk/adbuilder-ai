import React from 'react';
import { 
  FileText, 
  Search, 
  Calendar, 
  ChevronRight, 
  MoreHorizontal, 
  Download, 
  Trash2, 
  Edit 
} from 'lucide-react';
import { SAMPLE_DATA } from '../data/sampleData';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const SavedCampaigns = () => {
  return (
    <div className="saved-root fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Saved Campaigns</h1>
          <p className="page-subtitle">Your library of structured Google Ads campaign assets.</p>
        </div>
      </header>

      <div className="filters-bar">
        <div className="search-wrap">
          <Search size={18} />
          <input type="text" placeholder="Search campaigns..." />
        </div>
        <div className="filter-chips">
          <Badge variant="brand">All</Badge>
          <Badge>Draft</Badge>
          <Badge>Ready</Badge>
          <Badge>Active</Badge>
        </div>
      </div>

      <div className="campaigns-list">
        {SAMPLE_DATA.campaigns.map((camp) => (
          <Card key={camp.id} className="campaign-row-card">
            <div className="campaign-row">
              <div className="camp-icon">
                <FileText size={20} />
              </div>
              <div className="camp-info">
                <h3>{camp.name}</h3>
                <div className="camp-meta">
                  <Calendar size={14} />
                  <span>Last edited 2 days ago</span>
                  <span className="dot">•</span>
                  <span>{camp.objective}</span>
                </div>
              </div>
              <div className="camp-status">
                <Badge variant="success">Ready to Export</Badge>
              </div>
              <div className="camp-actions">
                <Button variant="secondary" size="sm"><Download size={14} /> Export</Button>
                <button className="icon-btn"><Edit size={16} /></button>
                <button className="icon-btn danger"><Trash2 size={16} /></button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .saved-root { animation: fadeIn 0.4s ease-out; }
        .page-header { margin-bottom: 2.5rem; }
        .page-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.5rem; }
        .page-subtitle { color: var(--text-secondary); }
        
        .filters-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; gap: 1rem; }
        .search-wrap { flex: 1; max-width: 400px; position: relative; }
        .search-wrap svg { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); }
        .search-wrap input { width: 100%; padding: 0.625rem 1rem 0.625rem 2.75rem; background-color: var(--bg-secondary); border: 1px solid var(--border); border-radius: var(--radius-md); outline: none; }
        .filter-chips { display: flex; gap: 0.5rem; }

        .campaigns-list { display: flex; flex-direction: column; gap: 1rem; }
        .campaign-row-card { padding: 0; }
        .campaign-row { display: flex; align-items: center; padding: 1.25rem 1.5rem; gap: 1.5rem; }
        .camp-icon { width: 40px; height: 40px; background-color: var(--bg-tertiary); color: var(--text-secondary); display: flex; align-items: center; justify-content: center; border-radius: 8px; flex-shrink: 0; }
        .camp-info { flex: 1; }
        .camp-info h3 { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; }
        .camp-meta { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: var(--text-tertiary); }
        .camp-actions { display: flex; align-items: center; gap: 0.75rem; }
        
        .icon-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); border-radius: 4px; }
        .icon-btn:hover { background-color: var(--bg-tertiary); color: var(--text-primary); }
        .icon-btn.danger:hover { background-color: #fee2e2; color: var(--error); }

        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
};

export default SavedCampaigns;
