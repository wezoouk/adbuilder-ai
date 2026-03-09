import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Target, 
  Users as UsersIcon, 
  Megaphone, 
  Search, 
  Sparkles,
  Download,
  Building2,
  Rocket,
  Plus,
  X
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { SAMPLE_DATA } from '../../data/sampleData';

import GoalStep from './steps/GoalStep';
import AudienceStep from './steps/AudienceStep';
import OfferStep from './steps/OfferStep';
import KeywordStep from './steps/KeywordStep';
import CompetitorStep from './steps/CompetitorStep';
import AdGeneratorStep from './steps/AdGeneratorStep';
import ReviewStep from './steps/ReviewStep';
import ExportStep from './steps/ExportStep';

const STEPS = [
  { id: 1, title: 'Select Profile', icon: Building2 },
  { id: 2, title: 'Campaign Goal', icon: Target },
  { id: 3, title: 'Target Audience', icon: UsersIcon },
  { id: 4, title: 'Defining Offer', icon: Megaphone },
  { id: 5, title: 'Keywords', icon: Search },
  { id: 6, title: 'Competitors', icon: Rocket },
  { id: 7, title: 'Generate Ads', icon: Sparkles },
  { id: 8, title: 'Review', icon: Check },
  { id: 9, title: 'Export', icon: Download }
];

const CampaignWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [businesses, setBusinesses] = useState(SAMPLE_DATA.businesses);
  const [showAddProfile, setShowAddProfile] = useState(false);
  const [newProfile, setNewProfile] = useState({ name: '', url: '', industry: '' });
  const [formData, setFormData] = useState({
    profileId: SAMPLE_DATA.businesses[0].id,
    campaignName: '',
    objective: 'Leads',
    audience: {
      idealCustomer: '',
      searchingFor: '',
      problem: '',
      result: '',
      hesitation: '',
      choice: ''
    },
    offer: {
      main: '',
      price: '',
      incentive: '',
      guarantee: '',
      urgency: ''
    },
    keywords: [],
  });

  const addNewProfile = () => {
    if (!newProfile.name.trim()) return;
    const biz = {
      id: 'biz_new_' + Date.now(),
      name: newProfile.name,
      url: newProfile.url || '',
      industry: newProfile.industry || 'General',
      type: 'Business',
      location: '',
      targetRegion: '',
      mainProduct: '',
      isDefault: false
    };
    setBusinesses(prev => [...prev, biz]);
    setFormData(f => ({ ...f, profileId: biz.id }));
    setNewProfile({ name: '', url: '', industry: '' });
    setShowAddProfile(false);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="wizard-root">
      <header className="page-header">
        <div>
          <h1 className="page-title">Campaign Builder</h1>
          <p className="page-subtitle">Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}</p>
        </div>
        <div className="wizard-actions">
          <Button variant="ghost" onClick={prevStep} disabled={currentStep === 1}>
            <ChevronLeft size={18} /> Back
          </Button>
          <Button 
            onClick={currentStep === STEPS.length ? () => {} : nextStep}
          >
            {currentStep === STEPS.length ? 'New Campaign' : (currentStep === STEPS.length - 1 ? 'Finish & Review' : 'Next Step')} <ChevronRight size={18} />
          </Button>
        </div>
      </header>

      <div className="wizard-layout">
        {/* Progress Sidebar */}
        <aside className="progress-nav">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;
            
            return (
              <div 
                key={step.id} 
                className={`step-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                onClick={() => isCompleted && setCurrentStep(step.id)}
              >
                <div className="step-number">
                  {isCompleted ? <Check size={16} /> : step.id}
                </div>
                <div className="step-info">
                  <span className="step-icon"><Icon size={14} /></span>
                  <span className="step-label">{step.title}</span>
                </div>
              </div>
            );
          })}
        </aside>

        {/* Form Content */}
        <main className="wizard-main">
          <Card className="wizard-card">
            <div className="wizard-step-content">
              {currentStep === 1 && (
                <div className="step-1 fade-in">
                  <h2>Select Business Profile</h2>
                  <p>Which business are we building this campaign for?</p>

                  <div className="profile-selector-grid">
                    {businesses.map(biz => (
                      <div
                        key={biz.id}
                        className={`profile-option ${formData.profileId === biz.id ? 'active' : ''}`}
                        onClick={() => setFormData({...formData, profileId: biz.id})}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="profile-option-icon"><Building2 size={22} /></div>
                        <div className="option-text">
                          <h4>{biz.name}</h4>
                          <span>{biz.industry || 'General'}</span>
                        </div>
                        {formData.profileId === biz.id && <Check size={20} className="check" />}
                      </div>
                    ))}
                  </div>

                  {/* Add new profile */}
                  {!showAddProfile ? (
                    <button
                      type="button"
                      className="add-profile-btn"
                      onClick={() => setShowAddProfile(true)}
                    >
                      <Plus size={20} />
                      <span>Add New Business Profile</span>
                    </button>
                  ) : (
                    <div className="new-profile-form">
                      <div className="npf-header">
                        <strong>New Business Profile</strong>
                        <button type="button" className="npf-close" onClick={() => setShowAddProfile(false)}>
                          <X size={16} />
                        </button>
                      </div>
                      <div className="npf-fields">
                        <div className="npf-field">
                          <label>Business Name *</label>
                          <input
                            type="text"
                            className="npf-input"
                            placeholder="e.g. NorthFix Plumbing"
                            value={newProfile.name}
                            onChange={e => setNewProfile(p => ({...p, name: e.target.value}))}
                          />
                        </div>
                        <div className="npf-field">
                          <label>Industry</label>
                          <input
                            type="text"
                            className="npf-input"
                            placeholder="e.g. Plumbing, Photography, Legal"
                            value={newProfile.industry}
                            onChange={e => setNewProfile(p => ({...p, industry: e.target.value}))}
                          />
                        </div>
                        <div className="npf-field npf-field--wide">
                          <label>Website URL (optional)</label>
                          <input
                            type="text"
                            className="npf-input"
                            placeholder="https://yourbusiness.co.uk"
                            value={newProfile.url}
                            onChange={e => setNewProfile(p => ({...p, url: e.target.value}))}
                          />
                        </div>
                      </div>
                      <div className="npf-actions">
                        <button type="button" className="npf-cancel-btn" onClick={() => setShowAddProfile(false)}>
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="npf-save-btn"
                          onClick={addNewProfile}
                          disabled={!newProfile.name.trim()}
                        >
                          <Check size={15} /> Save Profile
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 2 && <GoalStep formData={formData} setFormData={setFormData} />}
              {currentStep === 3 && <AudienceStep formData={formData} setFormData={setFormData} />}
              {currentStep === 4 && <OfferStep formData={formData} setFormData={setFormData} />}
              {currentStep === 5 && <KeywordStep formData={formData} setFormData={setFormData} businesses={businesses} />}
              {currentStep === 6 && <CompetitorStep formData={formData} setFormData={setFormData} />}
              {currentStep === 7 && <AdGeneratorStep formData={formData} setFormData={setFormData} />}
              {currentStep === 8 && <ReviewStep formData={formData} />}
              {currentStep === 9 && <ExportStep formData={formData} />}
            </div>
          </Card>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .wizard-root {
          animation: fadeIn 0.4s ease-out;
          height: calc(100vh - 120px);
          display: flex;
          flex-direction: column;
        }
        .page-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 2rem;
        }
        .wizard-actions {
          display: flex;
          gap: 0.75rem;
        }
        .wizard-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 2.5rem;
          flex: 1;
          overflow: hidden;
        }
        .progress-nav {
          display: flex;
          flex-direction: column;
          gap: 0.50rem;
        }
        .step-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition-fast);
          color: var(--text-tertiary);
        }
        .step-item.active {
          background-color: var(--brand-light);
          color: var(--brand);
        }
        .step-item.completed {
          color: var(--text-primary);
        }
        .step-number {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .step-item.active .step-number {
          border-color: var(--brand);
          background-color: var(--brand);
          color: white;
        }
        .step-item.completed .step-number {
          border-color: var(--success);
          background-color: var(--success);
          color: white;
        }
        .step-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .step-label {
          font-size: 0.875rem;
          font-weight: 600;
        }
        .wizard-main {
          height: 100%;
          overflow-y: auto;
          padding-bottom: 2rem;
        }
        .wizard-card {
          min-height: 500px;
        }
        .step-1 h2 { margin-bottom: 0.5rem; }
        .step-1 p { color: var(--text-secondary); margin-bottom: 2rem; }
        .profile-selector-grid {
          display: grid;
          gap: 1rem;
        }
        .profile-option {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: var(--transition-fast);
          position: relative;
        }
        .profile-option:hover {
          border-color: var(--brand);
          background-color: var(--bg-secondary);
        }
        .profile-option.active {
          border-color: var(--brand);
          background-color: var(--brand-light);
        }
        .option-text h4 { font-weight: 700; margin-bottom: 0.125rem; }
        .option-text span { font-size: 0.75rem; color: var(--text-secondary); }
        .check { margin-left: auto; color: var(--brand); }
        .profile-option-icon { width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--bg-secondary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .profile-option.active .profile-option-icon { background: rgba(99,102,241,0.15); color: var(--brand); }

        .add-profile-btn {
          display: flex; align-items: center; gap: 0.875rem; margin-top: 1rem;
          padding: 1rem 1.25rem; border: 2px dashed var(--border); border-radius: var(--radius-lg);
          color: var(--text-tertiary); font-size: 0.9375rem; font-weight: 600;
          transition: var(--transition-fast); cursor: pointer; width: 100%; background: none;
        }
        .add-profile-btn:hover { border-color: var(--brand); color: var(--brand); background: var(--brand-light); }

        .new-profile-form {
          margin-top: 1.25rem; padding: 1.5rem;
          border: 2px solid var(--brand); border-radius: var(--radius-lg);
          background: var(--brand-light);
        }
        .npf-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
        .npf-header strong { font-size: 1rem; font-weight: 700; color: var(--text-primary); }
        .npf-close { color: var(--text-tertiary); display: flex; padding: 0.25rem; border-radius: 4px; cursor: pointer; background: none; }
        .npf-close:hover { color: var(--error); background: #fee2e2; }

        .npf-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem; }
        .npf-field--wide { grid-column: 1 / -1; }
        .npf-field { display: flex; flex-direction: column; gap: 0.375rem; }
        .npf-field label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); letter-spacing: 0.04em; }
        .npf-input {
          width: 100%; padding: 0.625rem 0.875rem; background: var(--bg-primary);
          border: 1px solid var(--border); border-radius: var(--radius-md);
          font-size: 0.9375rem; color: var(--text-primary); outline: none; font-family: inherit;
        }
        .npf-input:focus { border-color: var(--brand); box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }

        .npf-actions { display: flex; gap: 0.75rem; justify-content: flex-end; }
        .npf-cancel-btn {
          padding: 0.5rem 1.125rem; border: 1px solid var(--border); border-radius: var(--radius-md);
          font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); background: var(--bg-primary);
          cursor: pointer; transition: var(--transition-fast);
        }
        .npf-cancel-btn:hover { border-color: var(--error); color: var(--error); }
        .npf-save-btn {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 1.25rem; border-radius: var(--radius-md);
          font-size: 0.875rem; font-weight: 700; color: white;
          background: var(--brand); cursor: pointer; transition: var(--transition-fast);
          border: none;
        }
        .npf-save-btn:hover { background: #4f46e5; }
        .npf-save-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default CampaignWizard;
