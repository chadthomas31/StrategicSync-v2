
import React from 'react';

const RoadmapView: React.FC = () => {
  const steps = [
    { week: 'Week 1', title: 'Deep Sync Audit', status: 'completed', tasks: ['Legacy System Mapping', 'Friction Point Audit', 'Stakeholder Interviews'] },
    { week: 'Week 2', title: 'Architecture Design', status: 'current', tasks: ['Workflow Logic Maps', 'Tool Stack Selection', 'Privacy Compliance Check'] },
    { week: 'Week 3', title: 'Core Deployment', status: 'upcoming', tasks: ['Database Normalization', 'First-Pass Automation', 'Team Training'] },
    { week: 'Week 4', title: 'Optimization Loop', status: 'upcoming', tasks: ['ROI Benchmarking', 'UI/UX Polish', 'Full Systems Sync'] }
  ];

  return (
    <div className="animate-in fade-in duration-700 space-y-12">
      <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 bg-blue-900/10">
        <h3 className="text-xl font-bold text-white mb-2">The Sync Implementation Flow</h3>
        <p className="text-slate-300 italic">"Precision at every pivot. We move from insight to implementation in 30 days."</p>
      </div>

      <div className="relative pl-8 border-l-2 border-slate-800 space-y-16">
        {steps.map((step, idx) => (
          <div key={idx} className="relative">
            {/* Timeline Indicator */}
            <div className={`absolute -left-12 top-0 w-8 h-8 rounded-full border-4 border-[#05070A] z-10 flex items-center justify-center ${
              step.status === 'completed' ? 'bg-green-500' :
              step.status === 'current' ? 'bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]' :
              'bg-slate-800'
            }`}>
              {step.status === 'completed' && <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>

            <div className={`p-8 rounded-[32px] border transition-all duration-500 ${
              step.status === 'current' ? 'bg-slate-900/60 border-blue-500/30' : 'bg-slate-900/20 border-slate-800'
            }`}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-xs font-black text-blue-500 uppercase tracking-widest">{step.week}</span>
                  <h4 className="text-2xl font-bold text-white mt-1">{step.title}</h4>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  step.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                  step.status === 'current' ? 'bg-blue-500/10 text-blue-400' :
                  'bg-slate-800 text-slate-500'
                }`}>
                  {step.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {step.tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                    <span className="text-sm text-slate-400">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 border border-slate-800 rounded-3xl bg-slate-900/30 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
           <h4 className="text-white font-bold text-lg mb-2">Ready for Phase 1?</h4>
           <p className="text-slate-500 text-sm">Initial Audit session is locked for Tuesday at 10:00 AM EST.</p>
        </div>
        <button className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all spark-glow">
          Confirm Audit Session
        </button>
      </div>
    </div>
  );
};

export default RoadmapView;
