import React from 'react';
import { Bell, Search, Sun } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { SAMPLE_DATA } from '../../data/sampleData';

const Header = () => {
  const [profiles] = useLocalStorage('adbuilder_profiles', SAMPLE_DATA.businesses);
  const activeProfile = profiles.find(p => p.isDefault) || profiles[0];

  return (
    <header className="header">
      <div className="header-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search for campaigns, keywords, profiles..." />
      </div>
      
      <div className="header-actions">
        <button className="action-btn" title="Toggle theme">
          <Sun size={20} />
        </button>
        <button className="action-btn" title="Notifications">
          <Bell size={20} />
        </button>
        <div className="profile-pill">
          <span className="active-biz">{activeProfile?.name || 'Select Profile'}</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .header {
          height: 72px;
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border);
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 5;
        }

        .header-search {
          display: flex;
          align-items: center;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 0.5rem 1rem;
          width: 400px;
          gap: 0.75rem;
          transition: var(--transition-fast);
        }

        .header-search:focus-within {
          border-color: var(--brand);
          background-color: var(--bg-primary);
          box-shadow: 0 0 0 3px var(--brand-light);
        }

        .header-search input {
          border: none;
          background: none;
          outline: none;
          width: 100%;
          color: var(--text-primary);
          font-size: 0.875rem;
        }

        .search-icon {
          color: var(--text-tertiary);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .action-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .action-btn:hover {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .profile-pill {
          background-color: var(--bg-tertiary);
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .active-biz {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .header-search {
            width: auto;
          }
          .header-search input {
            display: none;
          }
          .profile-pill {
            display: none;
          }
        }
      `}} />
    </header>
  );
};

export default Header;
