import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Globe, 
  Cpu, 
  Monitor,
  Moon,
  ChevronRight,
  Info
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const Settings = () => {
  return (
    <div className="settings-root fade-in">
      <header className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your preferences, data, and application settings.</p>
        </div>
      </header>

      <div className="settings-grid">
        <aside className="settings-nav">
          <div className="nav-item active"><User size={18} /> General</div>
          <div className="nav-item"><Bell size={18} /> Notifications</div>
          <div className="nav-item"><Shield size={18} /> Security</div>
          <div className="nav-item"><Database size={18} /> Data Management</div>
          <div className="nav-item"><Cpu size={18} /> AI Model Configuration</div>
        </aside>

        <main className="settings-content">
          <section className="settings-section">
            <h3>App Theme</h3>
            <Card>
              <div className="setting-row">
                <div className="setting-info">
                  <div className="setting-label">Appearance Mode</div>
                  <div className="setting-desc">Switch between light and dark mode.</div>
                </div>
                <div className="theme-toggle">
                  <button className="theme-btn active"><Monitor size={16} /> System</button>
                  <button className="theme-btn"><Moon size={16} /> Dark</button>
                </div>
              </div>
            </Card>
          </section>

          <section className="settings-section">
            <h3>User Preferences</h3>
            <Card>
              <div className="setting-row">
                <div className="setting-info">
                  <div className="setting-label">Default Currency</div>
                  <div className="setting-desc">Used for campaign budgets and estimates.</div>
                </div>
                <select className="setting-select">
                  <option>GBP (£)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                </select>
              </div>
              <div className="setting-row border-top">
                <div className="setting-info">
                  <div className="setting-label">AI Tone Preference</div>
                  <div className="setting-desc">The default personality for generated ad copy.</div>
                </div>
                <select className="setting-select">
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Urgent</option>
                  <option>Witty</option>
                </select>
              </div>
            </Card>
          </section>

          <section className="settings-section">
            <h3>Data Control</h3>
            <Card>
              <div className="setting-row">
                <div className="setting-info">
                  <div className="setting-label">Local Storage</div>
                  <div className="setting-desc">All your data is stored locally in this browser.</div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="setting-row border-top">
                <div className="setting-info">
                  <div className="setting-label">Export All Data</div>
                  <div className="setting-desc">Backup your profiles and campaigns to a JSON file.</div>
                </div>
                <Button variant="secondary" size="sm">Export JSON</Button>
              </div>
              <div className="setting-row border-top">
                <div className="setting-info">
                  <div className="setting-label">Reset Application</div>
                  <div className="setting-desc">Permanently delete all data and reset to defaults.</div>
                </div>
                <Button variant="danger" size="sm">Reset All</Button>
              </div>
            </Card>
          </section>

          <div className="app-info-footer">
            <Info size={14} />
            <span>AdBuilder AI v1.0.0 • Designed for Premium Performance</span>
          </div>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .settings-root { animation: fadeIn 0.4s ease-out; }
        .page-header { margin-bottom: 2.5rem; }
        .page-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.5rem; }
        .page-subtitle { color: var(--text-secondary); }

        .settings-grid { display: grid; grid-template-columns: 240px 1fr; gap: 3rem; }
        
        .settings-nav { display: flex; flex-direction: column; gap: 0.5rem; }
        .nav-item { display: flex; align-items: center; gap: 0.875rem; padding: 0.75rem 1rem; border-radius: var(--radius-md); color: var(--text-tertiary); font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: var(--transition-fast); }
        .nav-item:hover { background-color: var(--bg-secondary); color: var(--text-primary); }
        .nav-item.active { background-color: var(--brand-light); color: var(--brand); }

        .settings-section { margin-bottom: 2.5rem; }
        .settings-section h3 { font-size: 0.875rem; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); letter-spacing: 0.05em; margin-bottom: 1.25rem; }
        
        .setting-row { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 0; }
        .setting-row.border-top { border-top: 1px solid var(--border); }
        .setting-info { flex: 1; }
        .setting-label { font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.125rem; }
        .setting-desc { font-size: 0.8125rem; color: var(--text-secondary); }
        
        .theme-toggle { display: flex; background-color: var(--bg-secondary); padding: 0.25rem; border-radius: 8px; border: 1px solid var(--border); }
        .theme-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; font-size: 0.8125rem; font-weight: 600; border-radius: 6px; color: var(--text-secondary); }
        .theme-btn.active { background-color: var(--bg-primary); color: var(--brand); box-shadow: var(--shadow-sm); }
        
        .setting-select { padding: 0.5rem 2rem 0.5rem 1rem; background-color: var(--bg-secondary); border: 1px solid var(--border); border-radius: 6px; font-weight: 600; font-size: 0.875rem; color: var(--text-primary); outline: none; }
        
        .app-info-footer { display: flex; align-items: center; gap: 0.5rem; margin-top: 4rem; color: var(--text-tertiary); font-size: 0.75rem; font-weight: 500; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 900px) { .settings-grid { grid-template-columns: 1fr; } .settings-nav { display: none; } }
      `}} />
    </div>
  );
};

export default Settings;
