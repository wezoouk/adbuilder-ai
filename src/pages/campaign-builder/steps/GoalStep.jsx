import React from 'react';
import { Target, MousePointer2, Calendar, Phone, ShoppingCart, MapPin, MessageSquare, FileText } from 'lucide-react';

const OBJECTIVES = [
  { id: 'Leads', icon: Target, label: 'Leads', desc: 'Get more contacts and inquiries' },
  { id: 'Website Traffic', icon: MousePointer2, label: 'Website Traffic', desc: 'Drive users to your site' },
  { id: 'Bookings', icon: Calendar, label: 'Bookings', desc: 'Increase appointment reservations' },
  { id: 'Phone Calls', icon: Phone, label: 'Phone Calls', desc: 'Encourage direct calls to your business' },
  { id: 'Online Sales', icon: ShoppingCart, label: 'Online Sales', desc: 'Drive purchases on your store' },
  { id: 'Store Visits', icon: MapPin, label: 'Store Visits', desc: 'Get customers into your physical location' },
  { id: 'Local Enquiries', icon: MessageSquare, label: 'Local Enquiries', desc: 'Boost local market inquiries' },
  { id: 'Quote Requests', icon: FileText, label: 'Quote Requests', desc: 'Help users ask for pricing details' }
];

const GoalStep = ({ formData, setFormData }) => {
  return (
    <div className="goal-step fade-in">
      <h2>Campaign Objective</h2>
      <p>What is the primary result you want from this campaign?</p>
      
      <div className="objective-grid">
        {OBJECTIVES.map((obj) => {
          const Icon = obj.icon;
          const isActive = formData.objective === obj.id;
          
          return (
            <button 
              key={obj.id} 
              className={`objective-card ${isActive ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, objective: obj.id })}
            >
              <div className="obj-icon">
                <Icon size={24} />
              </div>
              <div className="obj-text">
                <h3>{obj.label}</h3>
                <p>{obj.desc}</p>
              </div>
              {isActive && <div className="active-dot" />}
            </button>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .goal-step h2 { margin-bottom: 0.5rem; }
        .goal-step p { color: var(--text-secondary); margin-bottom: 2rem; }
        .objective-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        .objective-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background-color: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          text-align: left;
          transition: var(--transition-fast);
          position: relative;
        }
        .objective-card:hover {
          border-color: var(--brand);
          background-color: var(--bg-secondary);
        }
        .objective-card.active {
          border-color: var(--brand);
          background-color: var(--brand-light);
        }
        .obj-icon {
          width: 44px;
          height: 44px;
          background-color: var(--bg-tertiary);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
        }
        .active .obj-icon {
          background-color: var(--brand);
          color: white;
        }
        .obj-text h3 {
          font-size: 0.9375rem;
          font-weight: 700;
          margin-bottom: 0.125rem;
        }
        .obj-text p {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-bottom: 0;
        }
        .active-dot {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          width: 8px;
          height: 8px;
          background-color: var(--brand);
          border-radius: 50%;
        }
      `}} />
    </div>
  );
};

export default GoalStep;
