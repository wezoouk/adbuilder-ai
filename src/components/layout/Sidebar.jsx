import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  PlusCircle, 
  Search, 
  Eye, 
  Sparkles, 
  Activity, 
  Layout, 
  Download, 
  FolderHeart, 
  Library, 
  Settings 
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </NavLink>
);

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">A</div>
        <span className="brand-name">AdBuilder AI</span>
      </div>
      
      <nav className="sidebar-nav">
        <SidebarItem to="/" icon={BarChart3} label="Dashboard" />
        <SidebarItem to="/profiles" icon={Users} label="Business Profiles" />
        <SidebarItem to="/builder" icon={PlusCircle} label="Campaign Builder" />
        <SidebarItem to="/keywords" icon={Search} label="Keyword Research" />
        <SidebarItem to="/competitors" icon={Eye} label="Competitor Insights" />
        <SidebarItem to="/generator" icon={Sparkles} label="Ad Generator" />
        <SidebarItem to="/strength" icon={Activity} label="Ad Strength" />
        <SidebarItem to="/analyzer" icon={Layout} label="Landing Page" />
        <SidebarItem to="/export" icon={Download} label="Export Center" />
        <SidebarItem to="/saved" icon={FolderHeart} label="Saved Campaigns" />
        <SidebarItem to="/templates" icon={Library} label="Templates" />
        <SidebarItem to="/settings" icon={Settings} label="Settings" />
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <span className="user-name">Ad Strategist</span>
            <span className="user-status">Professional Plan</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar {
          width: 280px;
          background-color: var(--bg-primary);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .sidebar-brand {
          padding: 2rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .brand-icon {
          width: 32px;
          height: 32px;
          background-color: var(--brand);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 1.25rem;
        }

        .brand-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.025em;
        }

        .sidebar-nav {
          flex: 1;
          padding: 0 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-weight: 500;
          transition: var(--transition-fast);
        }

        .sidebar-link:hover {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .sidebar-link.active {
          background-color: var(--brand-light);
          color: var(--brand);
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .user-status {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        @media (max-width: 1024px) {
          .sidebar {
            width: 80px;
          }
          .brand-name, .sidebar-link span, .user-info {
            display: none;
          }
          .sidebar-brand, .sidebar-link {
            justify-content: center;
            padding: 1rem;
          }
        }
      `}} />
    </aside>
  );
};

export default Sidebar;
