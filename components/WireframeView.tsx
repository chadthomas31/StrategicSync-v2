
import React from 'react';
import { WireframeSection } from '../types';

const WireframeView: React.FC = () => {
  const sections: WireframeSection[] = [
    {
      name: 'Hero Section',
      intent: 'Immediate Authority',
      content: ['H1 Value Prop', 'Dual CTA Buttons', 'Kinetic 3D Logo']
    },
    {
      name: 'Social Proof',
      intent: 'Trust Building',
      content: ['Client Logo Marquee', 'Key Metric Stats']
    },
    {
      name: 'Services Grid',
      intent: 'Education',
      content: ['3-Column Card Layout', 'Hover Effects', 'Iconography']
    },
    {
      name: 'Process Timeline',
      intent: 'Clarity',
      content: ['Step-by-Step Horizontal Flow', 'Descriptive Tooltips']
    },
    {
      name: 'Lead Capture',
      intent: 'Conversion',
      content: ['High-Contrast Form', 'Testimonial Adjunct']
    }
  ];

  return (
    <div className="animate-in slide-in-from-bottom duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Narrative List */}
        <div className="lg:col-span-1 space-y-6">
           <h3 className="text-xl font-bold text-white mb-6">Narrative Flow</h3>
           {sections.map((section, idx) => (
             <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all group">
                <div className="flex justify-between items-center mb-2">
                   <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{idx + 1}. {section.name}</h4>
                   <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider bg-slate-900 px-2 py-1 rounded">
                      {section.intent}
                   </span>
                </div>
                <ul className="pl-4 list-disc text-xs text-slate-400 space-y-1">
                   {section.content.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
             </div>
           ))}
        </div>

        {/* Visual Skeleton Preview */}
        <div className="lg:col-span-2">
           <div className="sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">Lo-Fi Wireframe</h3>
              <div className="bg-[#020305] rounded-3xl border border-slate-800 p-4 shadow-2xl overflow-hidden relative">
                 {/* Fake Browser Bar */}
                 <div className="flex gap-2 mb-6 px-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                 </div>

                 {/* Wireframe Content */}
                 <div className="space-y-8 opacity-50 hover:opacity-100 transition-opacity duration-500">
                    {/* Hero */}
                    <div className="flex flex-col items-center justify-center py-12 border-b border-dashed border-slate-800">
                       <div className="w-3/4 h-8 bg-slate-800 rounded-lg mb-4"></div>
                       <div className="w-1/2 h-4 bg-slate-800 rounded-lg mb-8"></div>
                       <div className="flex gap-4">
                          <div className="w-32 h-10 bg-blue-900/40 rounded-lg border border-blue-500/30"></div>
                          <div className="w-32 h-10 bg-slate-800 rounded-lg"></div>
                       </div>
                    </div>

                    {/* Logos */}
                    <div className="flex justify-between px-8 py-4 border-b border-dashed border-slate-800">
                       {[1,2,3,4].map(i => <div key={i} className="w-16 h-8 bg-slate-800 rounded"></div>)}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-3 gap-4 px-8 pb-12">
                       {[1,2,3].map(i => (
                          <div key={i} className="h-32 bg-slate-800/50 rounded-xl border border-dashed border-slate-700 p-4">
                             <div className="w-8 h-8 bg-slate-700 rounded mb-2"></div>
                             <div className="w-full h-4 bg-slate-700 rounded mb-2"></div>
                             <div className="w-2/3 h-2 bg-slate-700/50 rounded"></div>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* Annotation Overlay */}
                 <div className="absolute top-1/4 right-8 bg-blue-600/90 text-white text-xs p-3 rounded-lg shadow-lg max-w-[150px] animate-bounce">
                    Targeting "Above the Fold" conversion
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WireframeView;
