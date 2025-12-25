
import React from 'react';
import { HeadlineOption } from '../types';

const CopywritingView: React.FC = () => {
  const headlines: HeadlineOption[] = [
    {
      type: 'Option A: Direct & Benefit-Driven',
      h1: 'Automate Your Inefficiencies. Multiply Your Output.',
      h2: 'Stop bleeding overhead on manual workflows. We integrate seamless AI automation that saves your team 10+ hours per week, guaranteed.'
    },
    {
      type: 'Option B: Provocative / Challenger',
      h1: 'The AI Revolution Won’t Wait for Your Roadmap.',
      h2: 'SMBs that ignore automation today will be obsolete tomorrow. We provide the roadmap to ensure you aren’t just surviving the AI shift—you’re leading it.'
    },
    {
      type: 'Option C: Visionary',
      h1: 'The Future of Business, Perfectly Synced.',
      h2: 'Imagine a business that learns, adapts, and scales itself. Strategic Sync bridges the gap between raw AI potential and real-world business growth.'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
      <section>
        <h3 className="text-xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4 uppercase tracking-widest text-sm">Homepage Headlines</h3>
        <div className="grid grid-cols-1 gap-6">
          {headlines.map((item, idx) => (
            <div key={idx} className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 hover:bg-slate-900/60 transition-all group">
              <span className="text-xs font-black text-blue-500 uppercase tracking-widest mb-4 block">
                {item.type}
              </span>
              <h4 className="text-3xl font-extrabold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                "{item.h1}"
              </h4>
              <p className="text-slate-400 text-lg leading-relaxed italic">
                {item.h2}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-8 border-l-4 border-purple-500 pl-4 uppercase tracking-widest text-sm">The "Elevator Pitch" (About Section)</h3>
        <div className="glass-panel p-10 rounded-3xl border border-slate-800 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017C11.4647 12 11.017 11.5523 11.017 11V6C11.017 4.89543 11.9124 4 13.017 4H19.017C21.2261 4 23.017 5.79086 23.017 8V15C23.017 17.2091 21.2261 19 19.017 19H17.017C16.4647 19 16.017 19.4477 16.017 20V21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V11C3.017 11.5523 2.56928 12 2.017 12H1.017C0.464722 12 0.017 11.5523 0.017 11V6C0.017 4.89543 0.912429 4 2.017 4H8.017C10.2261 4 12.017 5.79086 12.017 8V15C12.017 17.2091 10.2261 19 8.017 19H6.017C5.46472 19 5.017 19.4477 5.017 20V21H3.017Z"/></svg>
          </div>
          <p className="text-2xl text-slate-200 leading-relaxed font-light">
            Strategic Sync isn’t a tech agency; we are <span className="text-blue-400 font-bold">Business Architects</span> who happen to use AI as our primary tool. Unlike generic IT consulting that focuses on software installs, we focus on the <span className="text-purple-400 font-bold italic underline decoration-2 underline-offset-4">convergence</span> of your existing workflows with autonomous intelligence. Our mission is to take the complex, noisy AI landscape and distill it into a pragmatic, high-ROI roadmap that drives down costs while exponentially scaling your human potential. We don’t just implement technology—we sync your business for the next era of growth.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CopywritingView;
