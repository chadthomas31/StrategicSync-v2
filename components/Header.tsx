
import React from 'react';
import { StrategySection } from '../types';

interface HeaderProps {
  activeSection: StrategySection;
  onHelpClick?: () => void;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onHelpClick, onMenuClick }) => {
  const getTitle = () => {
    switch (activeSection) {
      case StrategySection.SITEMAP: return 'Strategic Sitemap & Architecture';
      case StrategySection.WIREFRAME: return 'Homepage Wireframe Narrative';
      case StrategySection.COPYWRITING: return 'High-Impact Conversion Copy';
      case StrategySection.VISUALS: return 'Visual Identity & UI Directive';
      case StrategySection.ROADMAP: return 'Project Implementation Roadmap';
      case StrategySection.ANALYTICS: return 'ROI & Efficiency Analytics';
      default: return 'Strategy Dashboard';
    }
  };

  const getSubtitle = () => {
    switch (activeSection) {
      case StrategySection.SITEMAP: return 'Optimizing the conversion funnel for B2B engagement.';
      case StrategySection.WIREFRAME: return 'Section-by-section breakdown of the user journey.';
      case StrategySection.COPYWRITING: return 'Persuasive messaging tailored for SMB decision makers.';
      case StrategySection.VISUALS: return 'Translating the Kinetic Convergence into a digital experience.';
      case StrategySection.ROADMAP: return 'The 30-day tactical plan from audit to automated scale.';
      case StrategySection.ANALYTICS: return 'Quantitative projections of operational gains and cost reduction.';
      default: return '';
    }
  };

  return (
    <header id="main-header" className="p-6 md:p-8 border-b border-slate-800 glass-panel flex justify-between items-center sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">{getTitle()}</h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1 hidden md:block">{getSubtitle()}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onHelpClick}
          className="p-2.5 rounded-full bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-700"
          title="Restart Tour"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button className="hidden md:block px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all spark-glow">
          Download PDF
        </button>
      </div>
    </header>
  );
};

export default Header;
