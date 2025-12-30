
import React, { useState } from 'react';

const RoadmapView: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set(['Legacy System Mapping']));

  const toggleTask = (task: string) => {
    const newSet = new Set(completedTasks);
    if (newSet.has(task)) newSet.delete(task);
    else newSet.add(task);
    setCompletedTasks(newSet);
  };

  const steps = [
    { week: 'Week 1', title: 'Deep Sync Audit', status: 'completed', tasks: ['Legacy System Mapping', 'Friction Point Audit', 'Stakeholder Interviews'] },
    { week: 'Week 2', title: 'Architecture Design', status: 'current', tasks: ['Workflow Logic Maps', 'Tool Stack Selection', 'Privacy Compliance Check'] },
    { week: 'Week 3', title: 'Core Deployment', status: 'upcoming', tasks: ['Database Normalization', 'First-Pass Automation', 'Team Training'] },
    { week: 'Week 4', title: 'Optimization Loop', status: 'upcoming', tasks: ['ROI Benchmarking', 'UI/UX Polish', 'Full Systems Sync'] }
  ];

  return (
    <div className="animate-in fade-in duration-700 space-y-12 pb-20">
      <div className="glass-panel p-10 rounded-[40px] border border-blue-500/20 bg-blue-900/10">
        <h3 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">The Sync Tactical Timeline</h3>
        <p className="text-slate-300 font-light italic">"Precision at every pivot. We move from raw insight to production-ready implementation in 30 days."</p>
      </div>

      <div className="relative pl-10 border-l-2 border-slate-800 space-y-20">
        {steps.map((step, idx) => (
          <div key={idx} className="relative">
            {/* Timeline Indicator */}
            <div className={`absolute -left-[54px] top-0 w-10 h-10 rounded-full border-4 border-[#05070A] z-10 flex items-center justify-center transition-all duration-500 ${
              step.status === 'completed' ? 'bg-green-500' :
              step.status === 'current' ? 'bg-blue-500 animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.5)]' :
              'bg-slate-800'
            }`}>
              {step.status === 'completed' ? (
                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              ) : (
                <span className="text-[10px] font-black text-white">{idx + 1}</span>
              )}
            </div>

            <div className={`p-10 rounded-[40px] border transition-all duration-700 ${
              step.status === 'current' ? 'bg-slate-900/60 border-blue-500/30 shadow-2xl' : 'bg-slate-900/20 border-slate-800'
            }`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">{step.week}</span>
                  <h4 className="text-3xl font-black text-white mt-1 tracking-tight">{step.title}</h4>
                </div>
                <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  step.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                  step.status === 'current' ? 'bg-blue-500/10 text-blue-400' :
                  'bg-slate-800 text-slate-500'
                }`}>
                  {step.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {step.tasks.map((task, i) => (
                  <button 
                    key={i} 
                    onClick={() => toggleTask(task)}
                    className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left group ${
                      completedTasks.has(task) 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-slate-950/50 border-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      completedTasks.has(task) ? 'bg-green-500 border-green-500' : 'border-slate-800'
                    }`}>
                      {completedTasks.has(task) && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className={`text-sm font-bold tracking-tight transition-colors ${completedTasks.has(task) ? 'text-green-400 line-through opacity-50' : 'text-slate-400 group-hover:text-slate-200'}`}>{task}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-10 border border-slate-800 rounded-[40px] bg-slate-900/30 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
           <h4 className="text-white font-black text-2xl tracking-tighter uppercase mb-2">Kickoff Ready?</h4>
           <p className="text-slate-500 text-sm font-medium">Initial Audit session is locked for Tuesday at 10:00 AM EST. Please ensure stakeholder availability.</p>
        </div>
        <button className="px-10 py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest transition-all spark-glow shadow-blue-600/30">
          Confirm Strategy Session
        </button>
      </div>
    </div>
  );
};

export default RoadmapView;
