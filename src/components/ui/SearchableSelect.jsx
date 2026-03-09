import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Plus, Check } from 'lucide-react';

const SearchableSelect = ({ label, placeholder, options = [], value, onChange, hint }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (opt) => {
    onChange(opt);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleCustomAdd = () => {
    if (searchTerm && !options.includes(searchTerm)) {
      handleSelect(searchTerm);
    }
  };

  return (
    <div className="searchable-select-container" ref={containerRef}>
      {label && <label className="select-label">{label}</label>}
      
      <div className={`select-trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span className={value ? 'value' : 'placeholder'}>
          {value || placeholder}
        </span>
        <ChevronDown size={18} className={`chevron ${isOpen ? 'rotate' : ''}`} />
      </div>

      {isOpen && (
        <div className="select-dropdown">
          <div className="search-box">
            <Search size={14} />
            <input 
              type="text" 
              placeholder="Search or type custom..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
          
          <div className="options-list">
            {searchTerm && !options.some(opt => opt.toLowerCase() === searchTerm.toLowerCase()) && (
              <div className="option-item custom" onClick={handleCustomAdd}>
                <Plus size={14} /> Use: "{searchTerm}"
              </div>
            )}
            
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => (
                <div 
                  key={idx} 
                  className={`option-item ${value === opt ? 'selected' : ''}`}
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                  {value === opt && <Check size={14} />}
                </div>
              ))
            ) : !searchTerm && options.length === 0 ? (
              <div className="no-options">No options available</div>
            ) : null}
          </div>
        </div>
      )}

      {hint && <p className="select-hint">{hint}</p>}

      <style dangerouslySetInnerHTML={{ __html: `
        .searchable-select-container { display: flex; flex-direction: column; gap: 0.5rem; position: relative; width: 100%; }
        .select-label { font-size: 0.8125rem; font-weight: 700; color: var(--text-primary); margin-left: 2px; }
        
        .select-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background-color: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition-fast);
          min-height: 46px;
        }
        .select-trigger:hover { border-color: var(--brand); }
        .select-trigger.active { border-color: var(--brand); box-shadow: 0 0 0 3px var(--brand-light); }
        
        .placeholder { color: var(--text-tertiary); font-size: 0.875rem; }
        .value { color: var(--text-primary); font-size: 0.875rem; font-weight: 500; }
        .chevron { color: var(--text-tertiary); transition: var(--transition-fast); }
        .chevron.rotate { transform: rotate(180deg); }
        
        .select-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background-color: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          z-index: 50;
          overflow: hidden;
          animation: slideDown 0.2s ease-out;
        }
        
        .search-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-bottom: 1px solid var(--border);
          background-color: var(--bg-secondary);
        }
        .search-box input {
          border: none;
          background: none;
          outline: none;
          font-size: 0.875rem;
          color: var(--text-primary);
          width: 100%;
        }
        .search-box svg { color: var(--text-tertiary); }
        
        .options-list { max-height: 200px; overflow-y: auto; }
        .option-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .option-item:hover { background-color: var(--bg-secondary); color: var(--text-primary); }
        .option-item.selected { background-color: var(--brand-light); color: var(--brand); font-weight: 600; }
        .option-item.custom { color: var(--brand); font-weight: 500; }
        
        .no-options { padding: 1rem; text-align: center; color: var(--text-tertiary); font-size: 0.8125rem; }
        .select-hint { font-size: 0.75rem; color: var(--text-tertiary); margin-left: 2px; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default SearchableSelect;
