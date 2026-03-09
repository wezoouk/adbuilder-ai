import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import BusinessProfiles from './pages/BusinessProfiles';
import CampaignWizard from './pages/campaign-builder/CampaignWizard';
import KeywordResearch from './pages/KeywordResearch';
import CompetitorInsights from './pages/CompetitorInsights';
import AdGenerator from './pages/AdGenerator';
import AdStrengthChecker from './pages/AdStrengthChecker';
import LandingPageAnalyzer from './pages/LandingPageAnalyzer';
import ExportCenter from './pages/ExportCenter';
import SavedCampaigns from './pages/SavedCampaigns';
import TemplatesLibrary from './pages/TemplatesLibrary';
import Settings from './pages/Settings';

import './index.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header />
          <main style={{ padding: '2rem', flex: 1 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profiles" element={<BusinessProfiles />} />
              <Route path="/builder" element={<CampaignWizard />} />
              <Route path="/keywords" element={<KeywordResearch />} />
              <Route path="/competitors" element={<CompetitorInsights />} />
              <Route path="/generator" element={<AdGenerator />} />
              <Route path="/strength" element={<AdStrengthChecker />} />
              <Route path="/analyzer" element={<LandingPageAnalyzer />} />
              <Route path="/export" element={<ExportCenter />} />
              <Route path="/saved" element={<SavedCampaigns />} />
              <Route path="/templates" element={<TemplatesLibrary />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
