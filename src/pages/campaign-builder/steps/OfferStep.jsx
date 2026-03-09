import React, { useState } from 'react';
import { Sparkles, Loader2, Gift, ShieldCheck, Zap } from 'lucide-react';
import SearchableSelect from '../../../components/ui/SearchableSelect';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { SAMPLE_DATA } from '../../../data/sampleData';

const OFFER_SUGGESTIONS = {
  'photography': {
    products: ['Full Day Wedding Package', 'Micro Wedding Coverage', 'Destination elopement', 'Engagement Shoot', 'Portrait Session', 'Event Photography'],
    incentives: ['Free 20-page Album', 'Second Photographer Included', '£100 Off Early Booking', 'Complimentary Sneak Peeks', 'Free Engagement Session', '10% Off Weekday Weddings'],
    guarantees: ['Money-back satisfaction', 'Backup equipment on-site', 'Full digital rights', 'Professional editing', 'No hidden costs']
  },
  'plumbing': {
    products: ['Boiler Full Service', 'Emergency Leak Repair', 'New Bathroom Install', 'Drain Unblocking', 'Tap Replacement', 'Radiator Flush'],
    incentives: ['10% Senior Discount', 'Fixed Price Guarantee', 'Free Annual Checkup', 'No Call-out Fee Today', 'Free Safety Inspection', '£50 Off First Service'],
    guarantees: ['12-month parts & labor', 'Certified Gas Safe', 'Clean home guarantee', '2-hour response window', 'Fixed quote promise']
  },
  'default': {
    products: ['Standard Subscription', 'Executive Package', 'One-time Consult', 'Premium Service'],
    incentives: ['Buy 1 Get 1 Free', '20% Off First Order', 'Free Shipping', 'No setup fees'],
    guarantees: ['30-day money back', 'Lifetime warranty', 'Safe & Secure', '24/7 Support']
  }
};

const OfferStep = ({ formData, setFormData }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const activeBiz = SAMPLE_DATA.businesses.find(b => b.id === formData.profileId) || { industry: 'default' };
  const industryKey = activeBiz.industry?.toLowerCase().includes('photography') ? 'photography' : 
                      activeBiz.industry?.toLowerCase().includes('plumb') ? 'plumbing' : 'default';
  
  const suggestions = OFFER_SUGGESTIONS[industryKey];

  const handleAIGeneration = () => {
    setIsGenerating(true);
    // Simulate AI offer generation
    setTimeout(() => {
      setFormData({
        ...formData,
        product: suggestions.products[0],
        incentive: suggestions.incentives[1],
        guarantee: suggestions.guarantees[0]
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="offer-step fade-in">
      <div className="step-header">
        <div>
          <h2>Step 4: The Core Offer</h2>
          <p>Create an irresistible reason for people to choose you over every other ad on the page.</p>
        </div>
        <Button variant="outline" onClick={handleAIGeneration} disabled={isGenerating}>
          {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
          AI Offer Builder
        </Button>
      </div>

      <div className="offer-grid">
        <div className="form-column">
          <SearchableSelect 
            label="What are you promoting?"
            placeholder="Product or Service Name"
            options={suggestions.products}
            value={formData.product}
            onChange={(val) => setFormData({...formData, product: val})}
            hint="Focus on your highest margin or most popular service."
          />

          <div className="price-row">
            <Input 
              label="Standard Price"
              placeholder="e.g. £1,200"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
            <div className="incentive-select">
              <SearchableSelect 
                label="Offer/Incentive"
                placeholder="Why act now?"
                options={suggestions.incentives}
                value={formData.incentive}
                onChange={(val) => setFormData({...formData, incentive: val})}
              />
            </div>
          </div>

          <SearchableSelect 
            label="Trust Signal / Guarantee"
            placeholder="e.g. 100% Satisfaction Guarantee"
            options={suggestions.guarantees}
            value={formData.guarantee}
            onChange={(val) => setFormData({...formData, guarantee: val})}
            hint="What removes the risk for the customer?"
          />
        </div>

        <aside className="offer-visual">
          <div className="offer-card-preview">
            <div className="badge-ribbon">{formData.incentive || 'Limited Offer'}</div>
            <div className="offer-content">
               <h4 className="off-prod">{formData.product || 'Your Service'}</h4>
               <p className="off-price">{formData.price || '£0.00'}</p>
               <div className="off-guarantee">
                  <ShieldCheck size={14} color="var(--success)" />
                  <span>{formData.guarantee || 'Quality Guaranteed'}</span>
               </div>
               <button className="preview-cta">Get Started <Zap size={14} /></button>
            </div>
          </div>
          
          <div className="offer-tip">
            <p><strong>Pro Tip:</strong> Ads with a clearly stated price or offer have a <strong>30% higher conversion rate</strong> than those without.</p>
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .offer-step h2 { margin-bottom: 0.25rem; }
        .offer-step p { color: var(--text-secondary); margin-bottom: 2.5rem; }
        
        .step-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
        
        .offer-grid { display: grid; grid-template-columns: 1fr 340px; gap: 3rem; }
        .form-column { display: flex; flex-direction: column; gap: 2rem; }

        .price-row { display: grid; grid-template-columns: 140px 1fr; gap: 1.5rem; }
        .incentive-select { flex: 1; }

        .offer-visual { display: flex; flex-direction: column; gap: 2rem; }
        
        .offer-card-preview {
          background-color: white;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-md);
          overflow: hidden;
          position: relative;
          padding: 2.5rem 1.5rem 1.5rem;
          text-align: center;
        }

        .badge-ribbon {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--brand);
          color: white;
          font-size: 0.6875rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 0.375rem 1rem;
          border-radius: 0 0 8px 8px;
          letter-spacing: 0.05em;
        }

        .off-prod { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem; }
        .off-price { font-size: 2rem; font-weight: 900; color: var(--brand); margin-bottom: 1rem; letter-spacing: -0.04em; }
        .off-guarantee { display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 1.5rem; background-color: var(--bg-secondary); padding: 0.5rem; border-radius: 6px; }
        
        .preview-cta { width: 100%; padding: 0.875rem; background-color: var(--text-primary); color: white; border-radius: var(--radius-md); font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: var(--transition-fast); }
        .preview-cta:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); }

        .offer-tip { background-color: var(--bg-secondary); padding: 1.25rem; border-radius: var(--radius-lg); border-left: 4px solid var(--brand); }
        .offer-tip p { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5; margin: 0; }

        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

export default OfferStep;
