
import React from 'react';

const AnalyticsView: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 space-y-12">
      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Projected Monthly ROI', value: '340%', trend: '+22%', sub: 'vs manual operations' },
          { label: 'Annual Hours Reclaimed', value: '1,240', trend: 'Static', sub: 'Targeted capacity increase' },
          { label: 'System Velocity', value: '4.2x', trend: '+1.5x', sub: 'Request handling speed' }
        ].map((metric, i) => (
          <div key={i} className="glass-panel p-8 rounded-3xl border border-white/5 relative group hover:border-blue-500/30 transition-all">
             <div className="absolute top-0 right-0 p-4">
                <div className={`text-[10px] font-black px-2 py-0.5 rounded ${metric.trend.includes('+') ? 'bg-green-500/10 text-green-400' : 'bg-slate-800 text-slate-500'}`}>
                   {metric.trend}
                </div>
             </div>
             <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">{metric.label}</p>
             <h4 className="text-4xl font-black text-white mb-2 tracking-tighter">{metric.value}</h4>
             <p className="text-xs text-slate-500">{metric.sub}</p>
          </div>
        ))}
      </div>

      {/* Visual Chart Placeholder */}
      <div className="glass-panel p-10 rounded-[40px] border border-white/5">
         <div className="flex justify-between items-end mb-12">
            <div>
               <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Efficiency Divergence</h3>
               <p className="text-slate-500 text-sm">Manual vs Kinetic Operations over 12 months.</p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-800" />
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Manual</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-xs text-blue-500 font-bold uppercase tracking-widest">Kinetic</span>
               </div>
            </div>
         </div>
         
         <div className="h-64 w-full flex items-end gap-2 md:gap-4 px-4">
            {[20, 35, 30, 45, 60, 55, 75, 90, 85, 95, 100, 110].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                 <div className="w-full bg-slate-800/30 rounded-t-lg transition-all" style={{ height: `${val * 0.4}%` }} />
                 <div className="w-full bg-blue-500 rounded-t-lg transition-all group-hover:bg-cyan-400" style={{ height: `${val * 0.8}%` }} />
                 <span className="text-[10px] text-slate-700 font-black mt-2">M{i+1}</span>
              </div>
            ))}
         </div>
      </div>

      {/* Breakout Data Points */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="p-8 border border-slate-800 rounded-3xl bg-slate-900/30">
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
               <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               Capacity Reclaim Focus
            </h4>
            <div className="space-y-4">
               {[
                 { item: 'Customer Triage', gain: '24h / week' },
                 { item: 'Lead Enrichment', gain: '12h / week' },
                 { item: 'Data Migration', gain: '8h / week' },
               ].map((x, i) => (
                 <div key={i} className="flex justify-between items-center p-4 bg-slate-950/50 border border-slate-800/50 rounded-xl">
                    <span className="text-slate-400 text-sm">{x.item}</span>
                    <span className="text-white font-bold text-sm">{x.gain}</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="p-8 border border-slate-800 rounded-3xl bg-slate-900/30">
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
               <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
               Growth Trajectory
            </h4>
            <div className="p-6 bg-slate-950/80 rounded-2xl border border-blue-500/10">
               <p className="text-slate-400 text-sm leading-relaxed">
                  By reclaiming <strong className="text-white">44 hours weekly</strong>, your core team can pivot to direct client engagement, representing a potential <strong className="text-blue-400">$18,500 monthly revenue lift</strong> based on average client value.
               </p>
               <button className="mt-6 w-full py-3 bg-slate-900 border border-slate-800 hover:border-blue-500 text-slate-400 hover:text-white transition-all rounded-xl text-xs font-black uppercase tracking-widest">
                  View Data Sources
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
