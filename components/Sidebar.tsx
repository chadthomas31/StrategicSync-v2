
import React from 'react';
import { StrategySection, User } from '../types';

interface SidebarProps {
  activeSection: StrategySection;
  setActiveSection: (section: StrategySection) => void;
  onLogout: () => void;
  user: User;
  onBackToLanding: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, onLogout, user, onBackToLanding, isOpen, onClose }) => {
  const navItems = [
    { id: StrategySection.SITEMAP, label: '1. Strategic Sitemap', icon: 'M4 6h16M4 12h16M4 18h16' },
    { id: StrategySection.WIREFRAME, label: '2. Homepage Narrative', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2' },
    { id: StrategySection.COPYWRITING, label: '3. Key Copywriting', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { id: StrategySection.VISUALS, label: '4. Visual Directive', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: StrategySection.ROADMAP, label: '5. Project Roadmap', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: StrategySection.ANALYTICS, label: '6. ROI Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-8">
        <button 
          onClick={onBackToLanding}
          className="flex items-center gap-3 mb-6 group text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-widest">Back to Site</span>
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 kinetic-gradient rounded-full flex items-center justify-center spark-glow">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-extrabold tracking-tighter text-white">STRATEGIC SYNC</h1>
        </div>
        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Strategy Blueprint v1.0</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            id={`sidebar-${item.id}`}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 ${
              activeSection === item.id
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{user.name}</p>
            <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
        >
          <span className="font-bold text-xs uppercase tracking-widest">Sign Out</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-[#080A10] border-r border-slate-800 flex flex-col shadow-2xl transition-transform duration-300 lg:translate-x-0 lg:static lg:bg-slate-900/40 lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
