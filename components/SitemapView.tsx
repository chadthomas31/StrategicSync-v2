
import React from 'react';

const SitemapView: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-12 glass-panel p-8 rounded-3xl border border-blue-500/20 bg-blue-900/10">
        <h3 className="text-xl font-bold text-white mb-2">Architectural Logic</h3>
        <p className="text-slate-300">
          The goal is to move the user from <span className="text-blue-400 font-bold">Curiosity</span> (Homepage) to <span className="text-blue-400 font-bold">Certainty</span> (Process/Proof), and finally to <span className="text-green-400 font-bold">Action</span> (Booking). The structure is deliberately flat to reduce click-depth.
        </p>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Root Node */}
        <div className="relative z-10 w-64 p-6 bg-slate-900 border-2 border-white rounded-2xl text-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <span className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Entry Point</span>
          <h4 className="text-xl font-black text-white">Homepage</h4>
          <p className="text-xs text-slate-400 mt-2">Authority Anchor</p>
        </div>

        {/* Vertical Connector */}
        <div className="w-0.5 h-16 bg-slate-700"></div>

        {/* Horizontal Branch Connector */}
        <div className="relative w-full max-w-4xl h-0.5 bg-slate-700 mb-8">
           <div className="absolute left-0 top-0 w-0.5 h-8 bg-slate-700"></div>
           <div className="absolute left-1/4 top-0 w-0.5 h-8 bg-slate-700"></div>
           <div className="absolute left-1/2 top-0 w-0.5 h-8 bg-slate-700"></div>
           <div className="absolute right-1/4 top-0 w-0.5 h-8 bg-slate-700"></div>
           <div className="absolute right-0 top-0 w-0.5 h-8 bg-slate-700"></div>
        </div>

        {/* Level 2 Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full max-w-6xl">
           {[
             { title: "Solutions", desc: "ROI Categories", color: "blue" },
             { title: "The Process", desc: "Trust & Safety", color: "blue" },
             { title: "Case Studies", desc: "Social Proof", color: "blue" },
             { title: "About Team", desc: "Human Bridge", color: "blue" },
             { title: "Book Call", desc: "Conversion", color: "green", cta: true }
           ].map((node, i) => (
             <div key={i} className={`relative flex flex-col items-center group`}>
                {/* Mobile Connector (Hidden on Desktop via grid logic usually, but here we just stack) */}
                <div className="md:hidden w-0.5 h-8 bg-slate-700 -mt-8 mb-4"></div>
                
                <div className={`w-full p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  node.cta 
                    ? 'bg-green-900/20 border-green-500/50 hover:border-green-400' 
                    : 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50'
                }`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-3 ${
                     node.cta ? 'bg-green-500 text-black' : 'bg-slate-700 text-white'
                   }`}>
                      0{i + 2}
                   </div>
                   <h5 className={`font-bold text-lg mb-1 ${node.cta ? 'text-green-400' : 'text-white'}`}>{node.title}</h5>
                   <p className="text-xs text-slate-400">{node.desc}</p>
                </div>
                
                {/* Dotted Line Down (Visual hint of depth) */}
                <div className="hidden md:block w-0.5 h-8 border-l-2 border-dashed border-slate-800 mt-2 opacity-50"></div>
             </div>
           ))}
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="p-6 border border-slate-800 rounded-2xl bg-slate-900/50">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
               <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
               Navigation Strategy
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
               <li>• <strong>No Dropdowns:</strong> Forces focus on the core narrative.</li>
               <li>• <strong>Sticky CTA:</strong> "Book Call" is omnipresent in the nav.</li>
               <li>• <strong>Anchor Links:</strong> Used for single-page flow on mobile to reduce load times.</li>
            </ul>
         </div>
         <div className="p-6 border border-slate-800 rounded-2xl bg-slate-900/50">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full"></span>
               Conversion Path
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
               <li>• Users enter via <strong>Home</strong> (Problem Aware).</li>
               <li>• Educated via <strong>Proof</strong> (Solution Aware).</li>
               <li>• Convert via <strong>Booking</strong> (Product Aware).</li>
            </ul>
         </div>
      </div>
    </div>
  );
};

export default SitemapView;
