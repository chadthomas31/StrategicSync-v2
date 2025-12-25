
import React, { useState } from 'react';
import { User } from '../../types';

interface AuthSystemProps {
  onAuthSuccess: (user: User, isSignup: boolean) => void;
  onBack?: () => void;
}

const AuthSystem: React.FC<AuthSystemProps> = ({ onAuthSuccess, onBack }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (mode === 'reset') {
      setMessage({ type: 'success', text: 'If an account exists for this email, you will receive a reset link shortly.' });
      setIsLoading(false);
      return;
    }

    if (mode === 'signup' && (!name || !email || !password)) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      setIsLoading(false);
      return;
    }

    if (mode === 'login' && (!email || !password)) {
      setMessage({ type: 'error', text: 'Please enter both email and password.' });
      setIsLoading(false);
      return;
    }

    onAuthSuccess({ email, name: name || email.split('@')[0] }, mode === 'signup');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070A] p-6 relative overflow-hidden">
      {/* Back button */}
      {onBack && (
        <button 
          onClick={onBack}
          className="absolute top-10 left-10 flex items-center gap-3 text-slate-400 hover:text-white transition-colors group z-20"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-black text-xs uppercase tracking-widest">Return to Home</span>
        </button>
      )}

      {/* Kinetic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] pointer-events-none rounded-full animate-pulse" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 kinetic-gradient rounded-full mx-auto mb-4 flex items-center justify-center spark-glow">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter mb-2">BLUEPRINT LOGIN</h1>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Partner-Only Strategy Access</p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="john@company.com"
                required
              />
            </div>
            {mode !== 'reset' && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                  {mode === 'login' && (
                    <button 
                      type="button" 
                      onClick={() => setMode('reset')}
                      className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            {message && (
              <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all spark-glow flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            {mode === 'login' ? (
              <p className="text-sm text-slate-500 font-medium">
                New Partner?{' '}
                <button onClick={() => setMode('signup')} className="text-blue-400 font-bold hover:text-blue-300 underline underline-offset-4">
                  Request Access
                </button>
              </p>
            ) : (
              <p className="text-sm text-slate-500 font-medium">
                Already registered?{' '}
                <button onClick={() => setMode('login')} className="text-blue-400 font-bold hover:text-blue-300 underline underline-offset-4">
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSystem;
