
import React from 'react';

const VisualDirectiveView: React.FC = () => {
  const colors = [
    { name: 'Midnight', hex: '#05070A', text: 'white', desc: 'Primary Background' },
    { name: 'Electric Blue', hex: '#2E7DFF', text: 'white', desc: 'Primary Brand' },
    { name: 'Cyan Spark', hex: '#00F5FF', text: 'black', desc: 'Action / Highlight' },
    { name: 'Deep Violet', hex: '#8B5CF6', text: 'white', desc: 'Secondary Gradient' },
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* Introduction */}
      <div className="flex flex-col md:flex-row gap-8 items-center border-b border-slate-800 pb-12">
         <div className="flex-1">
            <h3 className="text-3xl font-black text-white tracking-tighter mb-4">The Kinetic Design System</h3>
            <p className="text-slate-400 leading-relaxed">
               Our visual language mimics the flow of data: fluid, glowing, and always in motion. It combines the solidity of enterprise architecture (dark backgrounds, rigid grids) with the agility of AI (gradients, blurs, sparks).
            </p>
         </div>
         <div className="w-full md:w-1/3 h-32 kinetic-gradient rounded-3xl spark-glow flex items-center justify-center">
            <span className="text-white font-black text-2xl tracking-widest uppercase">Sync OS</span>
         </div>
      </div>

      {/* Live Component Sandbox */}
      <section>
         <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-3">
            <span className="w-6 h-px bg-slate-700"></span>
            Live Component Sandbox
            <span className="w-full h-px bg-slate-700"></span>
         </h4>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Buttons & Interactions */}
            <div className="space-y-8">
               <div className="p-8 border border-slate-800 rounded-3xl bg-slate-900/30">
                  <h5 className="text-white font-bold mb-6">Interactive Elements</h5>
                  <div className="flex flex-wrap gap-4 items-center">
                     <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all spark-glow">
                        Primary Action
                     </button>
                     <button className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-700">
                        Secondary
                     </button>
                     <button className="text-blue-400 font-bold hover:text-white transition-colors flex items-center gap-2">
                        Text Link 
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                     </button>
                  </div>
               </div>
               
               <div className="p-8 border border-slate-800 rounded-3xl bg-slate-900/30">
                  <h5 className="text-white font-bold mb-6">Form Inputs</h5>
                  <div className="space-y-4">
                     <input type="text" placeholder="Default Input Field" className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                     <div className="flex items-center gap-2 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                        <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <span className="text-sm text-blue-200">Active State / Focus Highlight</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Color Palette Cards */}
            <div className="grid grid-cols-2 gap-4">
               {colors.map((c, i) => (
                  <div key={i} className="group p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-white/20 transition-all">
                     <div className="h-20 w-full rounded-xl mb-4 shadow-lg" style={{ backgroundColor: c.hex }}></div>
                     <p className="font-bold text-white text-sm">{c.name}</p>
                     <p className="text-slate-500 text-xs font-mono uppercase mt-1">{c.hex}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Typography Scale */}
      <section>
         <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-3">
            <span className="w-6 h-px bg-slate-700"></span>
            Typography Scale
            <span className="w-full h-px bg-slate-700"></span>
         </h4>
         <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-baseline border-b border-slate-800 pb-8">
               <span className="text-slate-500 font-mono text-xs">Display XL</span>
               <h1 className="md:col-span-3 text-6xl font-black text-white tracking-tighter">Automate. Sync. Scale.</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-baseline border-b border-slate-800 pb-8">
               <span className="text-slate-500 font-mono text-xs">Heading H2</span>
               <h2 className="md:col-span-3 text-4xl font-bold text-white tracking-tight">Outcome-Focused Solutions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-baseline">
               <span className="text-slate-500 font-mono text-xs">Body Regular</span>
               <p className="md:col-span-3 text-slate-400 leading-relaxed text-lg">
                  Strategic Sync bridges the gap between raw AI potential and real-world business growth. We don't just implement technology—we sync your business for the next era.
               </p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default VisualDirectiveView;
