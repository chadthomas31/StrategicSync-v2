
import React, { useState, useEffect } from 'react';
import { StrategySection, User } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SitemapView from './components/SitemapView';
import WireframeView from './components/WireframeView';
import CopywritingView from './components/CopywritingView';
import VisualDirectiveView from './components/VisualDirectiveView';
import RoadmapView from './components/RoadmapView';
import AnalyticsView from './components/AnalyticsView';
import AuthSystem from './components/Auth/AuthSystem';
import OnboardingTutorial from './components/Onboarding/OnboardingTutorial';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'strategy'>('landing');
  const [activeSection, setActiveSection] = useState<StrategySection>(StrategySection.SITEMAP);
  const [user, setUser] = useState<User | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('strategic_sync_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User, isSignup: boolean) => {
    setUser(userData);
    localStorage.setItem('strategic_sync_user', JSON.stringify(userData));
    setShowAuth(false);
    setView('strategy');
    if (isSignup) {
      setShowTutorial(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('strategic_sync_user');
    setShowTutorial(false);
    setView('landing');
  };

  const handleAccessStrategy = () => {
    if (user) {
      setView('strategy');
    } else {
      setShowAuth(true);
    }
  };

  const renderStrategyContent = () => {
    switch (activeSection) {
      case StrategySection.SITEMAP: return <SitemapView />;
      case StrategySection.WIREFRAME: return <WireframeView />;
      case StrategySection.COPYWRITING: return <CopywritingView />;
      case StrategySection.VISUALS: return <VisualDirectiveView />;
      case StrategySection.ROADMAP: return <RoadmapView />;
      case StrategySection.ANALYTICS: return <AnalyticsView />;
      default: return <SitemapView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-slate-200 selection:bg-cyan-500/30 font-sans">
      {/* Background Ambience */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none z-0" />

      {showAuth ? (
        <AuthSystem onAuthSuccess={handleLogin} onBack={() => setShowAuth(false)} />
      ) : view === 'landing' ? (
        <div className="relative z-10">
          <LandingPage onSwitchToStrategy={handleAccessStrategy} />
        </div>
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar 
            activeSection={activeSection} 
            setActiveSection={(section) => {
              setActiveSection(section);
              setIsSidebarOpen(false);
            }} 
            onLogout={handleLogout}
            user={user!}
            onBackToLanding={() => setView('landing')}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <main className="flex-1 flex flex-col overflow-hidden relative z-10">
            <Header 
              activeSection={activeSection} 
              onHelpClick={() => setShowTutorial(true)} 
              onMenuClick={() => setIsSidebarOpen(true)}
            />
            <div className="flex-1 overflow-y-auto p-6 md:p-12 scroll-smooth">
              <div className="max-w-6xl mx-auto">
                {renderStrategyContent()}
              </div>
            </div>
          </main>
        </div>
      )}

      {showTutorial && (
        <OnboardingTutorial 
          onClose={() => setShowTutorial(false)} 
          setActiveSection={(section) => {
            setView('strategy');
            setActiveSection(section);
          }}
        />
      )}
    </div>
  );
};

export default App;
