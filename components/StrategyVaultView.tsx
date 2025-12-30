
import React from 'react';
import { VaultEntry } from '../types';

interface StrategyVaultViewProps {
  vault: VaultEntry[];
  onRemove: (id: string) => void;
}

const StrategyVaultView: React.FC<StrategyVaultViewProps> = ({ vault, onRemove }) => {
  if (vault.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-700">
         <div className="w-24 h-24 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-700 mb-8">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
         </div>
         <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-2">Vault is Empty</h3>
         <p className="text-slate-500 max-w-sm text-center font-medium">Use the AI Strategy Advisor to capture and commit high-value insights to your permanent memory vault.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 space-y-10 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {vault.map((entry) => (
          <div key={entry.id} className="glass-panel p-8 rounded-[40px] border border-white/5 relative group hover:border-blue-500/20 transition-all flex flex-col">
            <div className="flex justify-between items-start mb-6">
               <div>
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">{entry.category}</span>
                  <h4 className="text-xl font-black text-white tracking-tight">{entry.title}</h4>
               </div>
               <button 
                 onClick={() => onRemove(entry.id)}
                 className="p-2 text-slate-700 hover:text-red-400 transition-colors"
                 title="Remove from memory"
               >
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
               </button>
            </div>

            <div className="flex-1 text-sm text-slate-400 font-mono leading-relaxed whitespace-pre-wrap bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 mb-6 max-h-64 overflow-y-auto">
               {entry.content}
            </div>

            <div className="flex justify-between items-center">
               <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Captured {new Date(entry.timestamp).toLocaleDateString()}</span>
               <button className="text-[10px] font-black text-blue-400 hover:text-white uppercase tracking-widest transition-colors">Copy to Clipboard</button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-10 border border-slate-800 rounded-[40px] bg-slate-900/10 flex items-center justify-between">
         <div>
            <h4 className="text-white font-black text-xl tracking-tighter uppercase mb-1">Backup & Retention</h4>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Your vault is currently synchronized with local browser storage.</p>
         </div>
         <div className="flex gap-4">
            <button className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-black text-[10px] uppercase tracking-widest transition-all">Clear Memory</button>
            <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest transition-all spark-glow">Export JSON</button>
         </div>
      </div>
    </div>
  );
};

export default StrategyVaultView;
