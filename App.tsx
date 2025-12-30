
import React, { useState, useEffect } from 'react';
import { StrategySection, User, VaultEntry } from './types';
import { supabase, isSupabaseConfigured } from './supabase';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SitemapView from './components/SitemapView';
import WireframeView from './components/WireframeView';
import CopywritingView from './components/CopywritingView';
import VisualDirectiveView from './components/VisualDirectiveView';
import RoadmapView from './components/RoadmapView';
import AnalyticsView from './components/AnalyticsView';
import MarketAnalysisView from './components/MarketAnalysisView';
import AdvisorView from './components/AdvisorView';
import StrategyVaultView from './components/StrategyVaultView';
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
  const [isExporting, setIsExporting] = useState(false);
  const [vault, setVault] = useState<VaultEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!configured) {
      setIsLoading(false);
      // Optional: Initialize mock user for demo if not configured
      return;
    }

    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        syncUser(session.user);
      } else {
        setUser(null);
        setView('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, [configured]);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await syncUser(session.user);
      }
    } catch (e) {
      console.warn("Supabase auth check failed", e);
    } finally {
      setIsLoading(false);
    }
  };

  const syncUser = async (supabaseUser: any) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      const userData: User = {
        id: supabaseUser.id,
        email: supabaseUser.email!,
        name: profile?.full_name || supabaseUser.user_metadata?.full_name || supabaseUser.email!.split('@')[0],
        companyName: profile?.company_name || 'Partner',
        industry: profile?.industry || 'B2B'
      };

      setUser(userData);
      fetchVault(supabaseUser.id);
    } catch (e) {
      console.error("User sync failed", e);
    }
  };

  const fetchVault = async (userId: string) => {
    if (!configured) return;
    const { data } = await supabase
      .from('vault_entries')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false });

    if (data) setVault(data);
  };

  const saveToVault = async (entry: Omit<VaultEntry, 'id' | 'timestamp'>) => {
    if (!user || !configured) return;
    
    const newEntry = {
      user_id: user.id,
      category: entry.category,
      title: entry.title,
      content: entry.content,
      timestamp: Date.now()
    };

    const { data } = await supabase
      .from('vault_entries')
      .insert([newEntry])
      .select()
      .single();

    if (data) {
      setVault([data, ...vault]);
    }
  };

  const removeFromVault = async (id: string) => {
    if (!configured) return;
    const { error } = await supabase
      .from('vault_entries')
      .delete()
      .eq('id', id);

    if (!error) {
      setVault(vault.filter(v => v.id !== id));
    }
  };

  const handleLogout = async () => {
    if (configured) {
      await supabase.auth.signOut();
    }
    setUser(null);
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
      case StrategySection.MARKET: return <MarketAnalysisView />;
      case StrategySection.ADVISOR: return <AdvisorView user={user} onSaveToVault={saveToVault} />;
      case StrategySection.VAULT: return <StrategyVaultView vault={vault} onRemove={removeFromVault} />;
      default: return <SitemapView />;
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-[#05070A] flex items-center justify-center">
        <div className="w-16 h-16 kinetic-gradient rounded-full animate-ping opacity-20" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070A] text-slate-200 selection:bg-cyan-500/30 font-sans">
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none z-0" />

      {/* Configuration Alert for Developers */}
      {!configured && view === 'strategy' && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xl px-6">
          <div className="glass-panel p-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 flex items-center gap-4 animate-in slide-in-from-top-4 duration-500">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-yellow-500 uppercase tracking-widest">Supabase Integration Required</p>
              <p className="text-[10px] text-slate-400 font-medium">Please set <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>ANON_KEY</code> in Vercel to enable cloud sync.</p>
            </div>
            <button onClick={() => window.open('https://vercel.com/docs/storage/supabase', '_blank')} className="px-3 py-1.5 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase transition-all">Docs</button>
          </div>
        </div>
      )}

      {isExporting && (
        <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300">
           <div className="w-20 h-20 kinetic-gradient rounded-full flex items-center justify-center animate-bounce spark-glow mb-6">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" />
              </svg>
           </div>
           <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Compiling Intelligence</h3>
           <div className="mt-8 w-64 h-1 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full kinetic-gradient animate-[marquee_2s_linear_infinite]" style={{ width: '40%' }}></div>
           </div>
        </div>
      )}

      {showAuth ? (
        <AuthSystem onAuthSuccess={() => { setView('strategy'); setShowAuth(false); }} onBack={() => setShowAuth(false)} />
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
            user={user || { id: 'demo', email: 'demo@strategic.sync', name: 'Strategic Partner' }}
            onBackToLanding={() => setView('landing')}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <main className="flex-1 flex flex-col overflow-hidden relative z-10">
            <Header 
              activeSection={activeSection} 
              onHelpClick={() => setShowTutorial(true)} 
              onMenuClick={() => setIsSidebarOpen(true)}
              onExport={() => setIsExporting(true)}
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
