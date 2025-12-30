
import React, { useState } from 'react';

const AnalyticsView: React.FC = () => {
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const hourlyRate = 125;
  const monthlySavings = hoursPerWeek * 4 * hourlyRate;
  const annualSavings = monthlySavings * 12;

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

      {/* Scenario Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-1 p-10 glass-panel rounded-[40px] border border-blue-500/20 flex flex-col justify-center">
            <h3 className="text-xl font-black text-white tracking-tighter mb-8 flex items-center gap-2 uppercase">
               <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
               Scenario Builder
            </h3>
            
            <div className="space-y-8">
               <div>
                  <div className="flex justify-between items-center mb-4">
                     <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Reclaimed Hours / Wk</label>
                     <span className="text-blue-400 font-black text-xl">{hoursPerWeek}h</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="40" 
                    value={hoursPerWeek} 
                    onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
               </div>
               
               <div className="pt-6 border-t border-slate-800">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Estimated Annual Reclaim</p>
                  <h4 className="text-5xl font-black text-white tracking-tighter">${annualSavings.toLocaleString()}</h4>
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-2">Based on $125/hr internal overhead</p>
               </div>
            </div>
         </div>

         <div className="lg:col-span-2 glass-panel p-10 rounded-[40px] border border-white/5">
            <div className="flex justify-between items-end mb-12">
               <div>
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">Efficiency Divergence</h3>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Manual vs Kinetic Operations projection.</p>
               </div>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-slate-800" />
                     <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Manual</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                     <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest">Kinetic</span>
                  </div>
               </div>
            </div>
            
            <div className="h-64 w-full flex items-end gap-2 md:gap-4 px-4">
               {[20, 35, 30, 45, 60, 55, 75, 90, 85, 95, 100, 110].map((val, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full bg-slate-800/30 rounded-t-lg transition-all" style={{ height: `${val * 0.4}%` }} />
                  <div className="w-full bg-blue-500 rounded-t-lg transition-all group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]" style={{ height: `${val * (hoursPerWeek/15) * 0.8}%` }} />
                  <span className="text-[10px] text-slate-800 font-black mt-2">M{i+1}</span>
               </div>
               ))}
            </div>
         </div>
      </div>

      {/* Breakout Data Points */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="p-10 border border-slate-800 rounded-[40px] bg-slate-900/30">
            <h4 className="text-white font-black uppercase tracking-tighter text-lg mb-8 flex items-center gap-2">
               <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               Capacity Reclaim Focus
            </h4>
            <div className="space-y-4">
               {[
                 { item: 'Customer Triage', gain: `${Math.round(hoursPerWeek * 0.5)}h / week` },
                 { item: 'Lead Enrichment', gain: `${Math.round(hoursPerWeek * 0.3)}h / week` },
                 { item: 'Data Migration', gain: `${Math.round(hoursPerWeek * 0.2)}h / week` },
               ].map((x, i) => (
                 <div key={i} className="flex justify-between items-center p-5 bg-slate-950/50 border border-slate-800/50 rounded-2xl group hover:border-blue-500/30 transition-all">
                    <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">{x.item}</span>
                    <span className="text-white font-black text-sm">{x.gain}</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="p-10 border border-slate-800 rounded-[40px] bg-slate-900/30">
            <h4 className="text-white font-black uppercase tracking-tighter text-lg mb-8 flex items-center gap-2">
               <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
               Growth Trajectory
            </h4>
            <div className="p-8 bg-slate-950/80 rounded-3xl border border-blue-500/10">
               <p className="text-slate-400 text-lg leading-relaxed font-light">
                  By reclaiming <strong className="text-white font-bold">{hoursPerWeek * 4} hours monthly</strong>, your core team can pivot to direct client engagement, representing a potential <strong className="text-blue-400 font-black">${(hoursPerWeek * 1000).toLocaleString()} monthly revenue lift</strong> based on typical scaling benchmarks.
               </p>
               <button className="mt-8 w-full py-4 bg-slate-900 border border-slate-800 hover:border-blue-500 text-slate-500 hover:text-white transition-all rounded-2xl text-[10px] font-black uppercase tracking-[0.3em]">
                  Download Raw Analysis Data
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
