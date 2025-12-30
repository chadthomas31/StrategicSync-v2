
import React, { useState } from 'react';
import { supabase } from '../../supabase';

interface AuthSystemProps {
  onAuthSuccess: () => void;
  onBack?: () => void;
}

const AuthSystem: React.FC<AuthSystemProps> = ({ onAuthSuccess, onBack }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      if (mode === 'signup') {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              company_name: company
            }
          }
        });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Registration successful! Please check your email for confirmation.' });
      } else if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        onAuthSuccess();
      } else if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        setMessage({ type: 'success', text: 'Reset link sent to your email.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070A] p-6 relative overflow-hidden">
      {onBack && (
        <button onClick={onBack} className="absolute top-10 left-10 flex items-center gap-3 text-slate-400 hover:text-white transition-colors group z-20">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-black text-xs uppercase tracking-widest">Return to Home</span>
        </button>
      )}

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 kinetic-gradient rounded-full mx-auto mb-4 flex items-center justify-center spark-glow shadow-blue-500/20">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter mb-2">STRATEGIC SYNC CLOUD</h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Powered by Vercel Intelligence</p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company Name</label>
                  <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Acme Strategy" required />
                </div>
              </>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@acme.com" required />
            </div>
            {mode !== 'reset' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="••••••••" required />
              </div>
            )}

            {message && (
              <div className={`p-4 rounded-xl text-xs font-bold uppercase tracking-widest ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {message.text}
              </div>
            )}

            <button type="submit" disabled={isLoading} className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all spark-glow">
              {isLoading ? 'SYNCING...' : mode === 'login' ? 'Initiate Blueprint' : mode === 'signup' ? 'Create Cloud Account' : 'Request Reset'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center flex flex-col gap-3">
             <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
               {mode === 'login' ? "Don't have an account? Sign Up" : "Already registered? Sign In"}
             </button>
             {mode === 'login' && (
               <button onClick={() => setMode('reset')} className="text-[10px] font-bold text-blue-500/60 hover:text-blue-400 transition-colors uppercase tracking-[0.2em]">
                 Forgot Password?
               </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSystem;
