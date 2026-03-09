import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Tag, 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SAMPLE_DATA } from '../data/sampleData';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';

const BusinessProfiles = () => {
  const [profiles, setProfiles] = useLocalStorage('adbuilder_profiles', SAMPLE_DATA.businesses);
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this profile?')) {
      setProfiles(profiles.filter(p => p.id !== id));
    }
  };

  const ProfilePreview = ({ profile }) => (
    <Card className="profile-card">
      <div className="profile-card-header">
        <div className="biz-icon">
          <Building2 size={24} />
        </div>
        <div className="biz-title-area">
          <h3>{profile.name}</h3>
          <Badge variant={profile.isDefault ? 'brand' : 'neutral'}>
            {profile.isDefault ? 'Default Profile' : 'Secondary'}
          </Badge>
        </div>
        <div className="biz-actions">
          <button onClick={() => setEditingProfile(profile)} className="icon-btn"><Edit3 size={18} /></button>
          <button onClick={() => handleDelete(profile.id)} className="icon-btn danger"><Trash2 size={18} /></button>
        </div>
      </div>
      
      <div className="profile-details-grid">
        <div className="detail-item">
          <MapPin size={16} />
          <span>{profile.location}</span>
        </div>
        <div className="detail-item">
          <Globe size={16} />
          <span>{profile.url}</span>
        </div>
        <div className="detail-item">
          <Briefcase size={16} />
          <span>{profile.industry}</span>
        </div>
        <div className="detail-item">
          <Tag size={16} />
          <span>{profile.type}</span>
        </div>
      </div>

      <div className="profile-summary">
        <h4>Preview Summary</h4>
        <div className="summary-pill">
          <CheckCircle2 size={14} />
          <span><strong>Offer:</strong> {profile.mainOffer}</span>
        </div>
        <div className="summary-pill">
          <CheckCircle2 size={14} />
          <span><strong>Audience:</strong> {profile.targetCustomer}</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .profile-card {
          padding-bottom: 0.5rem;
          transition: var(--transition-normal);
        }
        .profile-card:hover {
          transform: translateY(-4px);
        }
        .profile-card-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .biz-icon {
          width: 48px;
          height: 48px;
          background-color: var(--brand-light);
          color: var(--brand);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
        }
        .biz-title-area {
          flex: 1;
        }
        .biz-title-area h3 {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .biz-actions {
          display: flex;
          gap: 0.5rem;
        }
        .icon-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          color: var(--text-tertiary);
          transition: var(--transition-fast);
        }
        .icon-btn:hover {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .icon-btn.danger:hover {
          color: var(--error);
          background-color: #fee2e2;
        }
        .profile-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
        }
        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }
        .profile-summary h4 {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.75rem;
        }
        .summary-pill {
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem;
          background-color: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 4px;
          font-size: 0.8125rem;
          margin-bottom: 0.5rem;
        }
        .summary-pill svg {
          color: var(--success);
          flex-shrink: 0;
          margin-top: 2px;
        }
      `}} />
    </Card>
  );

  return (
    <div className="profiles-root">
      <header className="page-header">
        <div>
          <h1 className="page-title">Business Profiles</h1>
          <p className="page-subtitle">Manage multiple businesses and their ad strategy details.</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Add Business Profile
        </Button>
      </header>

      <div className="profiles-grid">
        {profiles.map(p => (
          <ProfilePreview key={p.id} profile={p} />
        ))}
        <button className="add-profile-placeholder" onClick={() => setShowForm(true)}>
          <div className="placeholder-content">
            <Plus size={32} />
            <span>Add New Profile</span>
          </div>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .profiles-root {
          animation: fadeIn 0.4s ease-out;
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2.5rem;
        }
        .page-title {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 0.5rem;
        }
        .page-subtitle {
          color: var(--text-secondary);
        }
        .profiles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 2rem;
        }
        .add-profile-placeholder {
          background-color: transparent;
          border: 2px dashed var(--border);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 200px;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .add-profile-placeholder:hover {
          border-color: var(--brand);
          background-color: var(--brand-light);
        }
        .placeholder-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-tertiary);
        }
        .add-profile-placeholder:hover .placeholder-content {
          color: var(--brand);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default BusinessProfiles;
