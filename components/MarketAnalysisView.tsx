
import React from 'react';

const MarketAnalysisView: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 space-y-16">
      <div className="flex flex-col md:flex-row gap-12 items-start">
         <div className="flex-1">
            <h3 className="text-4xl font-black text-white tracking-tighter mb-6">Competitive Positioning</h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
               Most competitors in the SMB automation space focus on "Tools First." Strategic Sync wins by focusing on "Human Capacity Second." We occupy the quadrant of <strong>High Integration + High Strategic Empathy.</strong>
            </p>
            
            <div className="space-y-4">
               {[
                 { label: 'Market Gap:', val: 'Agencies that understand SMB budget constraints while delivering enterprise-grade logic.' },
                 { label: 'Unfair Advantage:', val: 'Our proprietary Kinetic Sync framework that maps 12 core business nodes to autonomous agents.' }
               ].map((item, i) => (
                 <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                    <span className="text-xs font-black text-blue-500 uppercase tracking-widest block mb-2">{item.label}</span>
                    <p className="text-white font-bold">{item.val}</p>
                 </div>
               ))}
            </div>
         </div>
         
         {/* Visual Gap Matrix */}
         <div className="w-full md:w-[400px] h-[400px] glass-panel rounded-[40px] border border-white/5 relative p-10 flex flex-col justify-center items-center">
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-slate-800" />
            
            <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-500 uppercase tracking-widest">High Strategy</span>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-500 uppercase tracking-widest">Low Strategy</span>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-black text-slate-500 uppercase tracking-widest">Complex Implementation</span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[10px] font-black text-slate-500 uppercase tracking-widest">Simple Tooling</span>

            {/* Strategic Sync Dot */}
            <div className="absolute top-[20%] right-[20%] w-12 h-12 kinetic-gradient rounded-full spark-glow flex items-center justify-center border-2 border-white/20 animate-pulse">
               <span className="text-[10px] font-black text-white uppercase">US</span>
            </div>
            
            <div className="absolute bottom-[30%] left-[25%] w-3 h-3 bg-slate-700 rounded-full" title="Competitor A" />
            <div className="absolute top-[60%] right-[60%] w-3 h-3 bg-slate-700 rounded-full" title="Competitor B" />
         </div>
      </div>

      <section>
         <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-10 flex items-center gap-3">
            <span className="w-6 h-px bg-slate-700"></span>
            Target Persona Mapping
            <span className="w-full h-px bg-slate-700"></span>
         </h4>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'The Overwhelmed Founder',
                role: 'CEO / Owner (10-50 Employees)',
                friction: 'Spending 40% of their day on repetitive administrative triage instead of growth strategy.',
                goal: 'Reclaim 15 hours per week to focus on "High-Value" deals.'
              },
              {
                title: 'The Scaling COO',
                role: 'Operations Lead (High-Growth Tech)',
                friction: 'Legacy workflows are breaking as head-count doubles. Data silos preventing real-time forecasting.',
                goal: 'Create a unified, autonomous dashboard for global operations.'
              }
            ].map((p, i) => (
              <div key={i} className="glass-panel p-10 rounded-[40px] border border-white/5 hover:border-blue-500/20 transition-all group">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                       <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <div>
                       <h5 className="text-2xl font-black text-white tracking-tight">{p.title}</h5>
                       <p className="text-xs font-black text-slate-500 uppercase tracking-widest mt-1">{p.role}</p>
                    </div>
                 </div>
                 
                 <div className="space-y-6">
                    <div>
                       <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block mb-1">Core Friction</span>
                       <p className="text-slate-400 text-sm leading-relaxed">{p.friction}</p>
                    </div>
                    <div>
                       <span className="text-[10px] font-black text-green-400 uppercase tracking-widest block mb-1">Success Metric</span>
                       <p className="text-slate-400 text-sm leading-relaxed">{p.goal}</p>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default MarketAnalysisView;
