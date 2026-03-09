import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Users, 
  Search, 
  Sparkles, 
  Layout, 
  Download, 
  Activity,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { SAMPLE_DATA } from '../data/sampleData';

const QuickAction = ({ icon: Icon, label, description, onClick, color = 'var(--brand)' }) => (
  <button className="quick-action-card" onClick={onClick}>
    <div className="action-icon" style={{ backgroundColor: color }}>
      <Icon size={24} />
    </div>
    <div className="action-text">
      <h3>{label}</h3>
      <p>{description}</p>
    </div>
    <ArrowRight size={18} className="arrow" />
    <style dangerouslySetInnerHTML={{ __html: `
      .quick-action-card {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        padding: 1.25rem;
        background-color: var(--bg-primary);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        text-align: left;
        transition: var(--transition-normal);
        position: relative;
        overflow: hidden;
      }
      .quick-action-card:hover {
        border-color: var(--brand);
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
      }
      .action-icon {
        width: 48px;
        height: 48px;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }
      .action-text h3 {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 0.125rem;
        color: var(--text-primary);
      }
      .action-text p {
        font-size: 0.8125rem;
        color: var(--text-secondary);
      }
      .arrow {
        margin-left: auto;
        color: var(--text-tertiary);
        transition: var(--transition-fast);
      }
      .quick-action-card:hover .arrow {
        color: var(--brand);
        transform: translateX(4px);
      }
    `}} />
  </button>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const recentCampaign = SAMPLE_DATA.campaigns[0];

  return (
    <div className="dashboard-root">
      <header className="page-header">
        <div>
          <h1 className="page-title">Welcome to AdBuilder AI</h1>
          <p className="page-subtitle">Your guided Google Ads strategist is ready to build.</p>
        </div>
        <Button onClick={() => navigate('/builder')}>
          <PlusCircle size={18} />
          Create New Campaign
        </Button>
      </header>

      <div className="dashboard-grid">
        {/* Main Column */}
        <div className="main-col">
          <section className="dashboard-section">
            <h2 className="section-title">Quick Start Tools</h2>
            <div className="quick-actions-grid">
              <QuickAction 
                icon={PlusCircle} 
                label="New Campaign" 
                description="Follow our guided setup wizard"
                onClick={() => navigate('/builder')}
              />
              <QuickAction 
                icon={Users} 
                label="Saved Profiles" 
                description="Manage your business info"
                onClick={() => navigate('/profiles')}
                color="#8b5cf6"
              />
              <QuickAction 
                icon={Search} 
                label="Keyword Ideas" 
                description="Find high-intent phrases"
                onClick={() => navigate('/keywords')}
                color="#10b981"
              />
              <QuickAction 
                icon={Sparkles} 
                label="Generate Ads" 
                description="AI-powered ad copy creation"
                onClick={() => navigate('/generator')}
                color="#f59e0b"
              />
            </div>
          </section>

          <section className="dashboard-section">
            <h2 className="section-title">Recent Campaigns</h2>
            <Card className="campaign-preview-card">
              <div className="preview-header">
                <div className="preview-info">
                  <h3>{recentCampaign.name}</h3>
                  <div className="preview-meta">
                    <span>{SAMPLE_DATA.businesses[0].name}</span>
                    <span className="dot">•</span>
                    <span>{recentCampaign.objective}</span>
                  </div>
                </div>
                <Badge variant="success">Ready to Export</Badge>
              </div>
              
              <div className="preview-stats">
                <div className="stat-item">
                  <span className="stat-label">Ad Strength</span>
                  <div className="strength-bar-container">
                    <div className="strength-bar" style={{ width: `${recentCampaign.adStrength * 10}%` }}></div>
                    <span className="strength-value">{recentCampaign.adStrength}/10</span>
                  </div>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Target Reach</span>
                  <span className="stat-value">High Intent</span>
                </div>
              </div>

              <div className="preview-footer">
                <Button variant="secondary" size="sm" onClick={() => navigate('/saved')}>View All</Button>
                <Button variant="outline" size="sm" onClick={() => navigate('/builder')}>Continue Editing</Button>
              </div>
            </Card>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="side-col">
          <Card title="Marketing Tips" className="tips-card">
            <div className="tip-list">
              <div className="tip-item">
                <div className="tip-icon"><TrendingUp size={16} /></div>
                <p>Include location keywords for better local relevance.</p>
              </div>
              <div className="tip-item">
                <div className="tip-icon"><AlertCircle size={16} /></div>
                <p>Avoid generic headlines; use your unique offer instead.</p>
              </div>
              <div className="tip-item">
                <div className="tip-icon"><Layout size={16} /></div>
                <p>Ensure ad headlines match your landing page title.</p>
              </div>
              <div className="tip-item">
                <div className="tip-icon"><PlusCircle size={16} /></div>
                <p>Always include a clear call-to-action (e.g., "Book Now").</p>
              </div>
            </div>
          </Card>

          <Card title="Recommended Next Step" className="next-step-card">
            <div className="next-step-content">
              <div className="next-step-icon">
                <Lightbulb size={24} className="bulb" />
              </div>
              <p>You have <strong>3 keyword groups</strong> ready. Start generating ad copy for your <strong>Wedding Photography</strong> campaign.</p>
              <Button size="sm" className="w-full">Go to Ad Generator</Button>
            </div>
          </Card>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-root {
          animation: fadeIn 0.4s ease-out;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2.5rem;
        }

        .page-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.04em;
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          font-size: 1.125rem;
          color: var(--text-secondary);
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 2rem;
        }

        .dashboard-section {
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
        }

        .campaign-preview-card {
          border-left: 4px solid var(--success);
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .preview-info h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .preview-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-tertiary);
        }

        .preview-stats {
          display: flex;
          gap: 3rem;
          margin-bottom: 1.5rem;
          padding: 1.25rem;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-tertiary);
          letter-spacing: 0.05em;
        }

        .strength-bar-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .strength-bar {
          width: 120px;
          height: 8px;
          background-color: var(--border);
          border-radius: 999px;
          position: relative;
          overflow: hidden;
        }

        .strength-bar::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 80%; /* dynamic */
          background-color: var(--success);
          border-radius: 999px;
        }

        .strength-value {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--success);
        }

        .stat-value {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .preview-footer {
          display: flex;
          gap: 1rem;
        }

        .tip-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .tip-item {
          display: flex;
          gap: 1rem;
        }

        .tip-icon {
          width: 32px;
          height: 32px;
          background-color: var(--brand-light);
          color: var(--brand);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.5rem;
          flex-shrink: 0;
        }

        .tip-item p {
          font-size: 0.875rem;
          line-height: 1.4;
          color: var(--text-secondary);
        }

        .next-step-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .next-step-icon {
          width: 48px;
          height: 48px;
          background-color: #fef3c7;
          color: #d97706;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .bulb {
          animation: pulse 2s infinite;
        }

        .w-full { width: 100%; }

        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1200px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          .side-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .side-col {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </div>
  );
};

export default Dashboard;
