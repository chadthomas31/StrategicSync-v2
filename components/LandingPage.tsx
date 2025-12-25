
import React, { useState, useEffect, useRef } from 'react';

interface LandingPageProps {
  onSwitchToStrategy: () => void;
}

const KineticLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 500 250" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ribbonGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0a2a8c" />
        <stop offset="50%" stopColor="#2e7dff" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <linearGradient id="ribbonGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="50%" stopColor="#00f5ff" />
        <stop offset="100%" stopColor="#2e7dff" />
      </linearGradient>
      <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <path 
      d="M150 125C150 170 190 200 250 125C310 50 350 80 350 125C350 170 310 200 250 125C190 50 150 80 150 125Z" 
      stroke="#000" 
      strokeWidth="32" 
      strokeOpacity="0.3"
      transform="translate(4, 4)"
    />
    <path 
      d="M250 125C190 50 150 80 150 125C150 170 190 200 250 125" 
      stroke="url(#ribbonGrad1)" 
      strokeWidth="30" 
      strokeLinecap="round" 
    />
    <path 
      d="M250 125C310 50 350 80 350 125C350 170 310 200 250 125" 
      stroke="url(#ribbonGrad2)" 
      strokeWidth="30" 
      strokeLinecap="round" 
    />
    <circle cx="250" cy="125" r="10" fill="white" filter="url(#logoGlow)">
      <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const LandingPage: React.FC<LandingPageProps> = ({ onSwitchToStrategy }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const reveals = document.querySelectorAll('.scroll-reveal');
      reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1500);
  };

  const navLinks = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'The Proof', href: '#proof' },
    { name: 'Process', href: '#process' },
    { name: 'Team', href: '#team' },
  ];

  const faqs = [
    { q: "Is AI actually safe for small business data?", a: "Absolutely. We specialize in 'Private Sync' deployments where your data never leaves your secure cloud environment. We don't use public LLMs for proprietary data." },
    { q: "Will this replace my existing team members?", a: "Our goal is augmentation, not replacement. We reclaim the 20% of their day spent on 'grunt work' so they can focus on high-value strategy and customer relationships." },
    { q: "How long does a typical implementation take?", a: "Most 'Core Sync' projects go from audit to live in 21-30 days. We focus on lean, high-impact wins that show ROI within the first month." },
    { q: "Do we need a massive budget to start?", a: "No. We scale with you. Many of our SMB clients start with a single automated workflow and expand as the reclaimed hours pay for the next phase." }
  ];

  return (
    <div className="relative overflow-x-hidden scroll-smooth">
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col h-full p-10">
          <div className="flex justify-between items-center mb-16">
            <span className="text-2xl font-black text-white tracking-tighter">STRATEGIC SYNC</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-3 bg-slate-900 rounded-full text-white">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex flex-col gap-8">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-black text-white tracking-tighter hover:text-blue-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => { setMobileMenuOpen(false); onSwitchToStrategy(); }}
              className="text-4xl font-black text-blue-400 tracking-tighter text-left"
            >
              Partner Strategy
            </button>
          </div>
          <div className="mt-auto">
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-6 rounded-2xl kinetic-gradient text-white font-black text-2xl spark-glow">
              Book Call
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-4 ${
        isScrolled ? 'glass-panel border-b border-white/5 bg-slate-950/80 shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 kinetic-gradient rounded-full flex items-center justify-center spark-glow shadow-blue-500/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white">STRATEGIC SYNC</span>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-sm font-semibold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">{link.name}</a>
            ))}
            <button 
              onClick={onSwitchToStrategy}
              className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 group uppercase tracking-widest"
            >
              Partner Strategy
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <a href="#contact" className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all spark-glow shadow-blue-600/20">
              Book Call
            </a>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-300">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
              Pioneering SMB Business Intelligence
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1] mb-8 tracking-tighter">
              Automate. <br/>
              <span className="text-transparent bg-clip-text kinetic-gradient">Sync.</span> <br/>
              Scaling.
            </h1>
            <p className="text-2xl text-slate-400 leading-relaxed mb-12 max-w-xl font-light">
              We help SMBs bridge the gap between AI hype and real-world ROI. Reclaim your time and scale your vision with <span className="text-white font-semibold italic">Kinetic Intelligence.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="#contact" className="px-12 py-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xl transition-all spark-glow text-center">
                Get Your AI Roadmap
              </a>
              <a href="#proof" className="px-12 py-6 rounded-2xl bg-slate-900 border border-slate-800 text-white font-black text-xl hover:bg-slate-800 transition-all text-center">
                See The Proof
              </a>
            </div>
          </div>

          <div className="relative animate-in fade-in zoom-in duration-1000 delay-300 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-blue-500/20 blur-[120px] animate-pulse rounded-full" />
              <KineticLogo className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Marquee */}
      <div className="py-12 border-y border-white/5 bg-slate-950 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="flex items-center gap-20 mx-10 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
              <span className="text-3xl font-black text-white tracking-tighter italic">GLOBAL LOGISTICS</span>
              <span className="text-3xl font-black text-white tracking-tighter italic">ELITE LAW</span>
              <span className="text-3xl font-black text-white tracking-tighter italic">PRIME RETAIL</span>
              <span className="text-3xl font-black text-white tracking-tighter italic">BIO-TECH SYS</span>
              <span className="text-3xl font-black text-white tracking-tighter italic">FINANCE FLOW</span>
            </div>
          ))}
        </div>
      </div>

      {/* Proof/Case Studies Section */}
      <section id="proof" className="py-32 px-6 bg-slate-900/10 relative scroll-reveal">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Real SMB <span className="text-blue-500 italic">Transformations.</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl">Numbers don't lie. See how we've helped businesses like yours recapture their competitive edge.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                client: "Midwest Logistics Group",
                outcome: "84% Reduction in Manual Triage",
                details: "Replaced 40 hours of weekly manual email sorting with an autonomous routing engine.",
                impact: "$120k Annual Savings"
              },
              {
                client: "Prime Retail Partners",
                outcome: "3.5x Customer Support Velocity",
                details: "Implemented custom agents that handle 70% of routine inquiries with 98% accuracy.",
                impact: "0s Wait Time"
              }
            ].map((study, i) => (
              <div key={i} className="glass-panel p-12 rounded-[40px] border border-white/5 group hover:border-blue-500/20 transition-all">
                <p className="text-xs font-black text-blue-500 uppercase tracking-widest mb-4">{study.client}</p>
                <h3 className="text-3xl font-black text-white mb-6 leading-tight">{study.outcome}</h3>
                <p className="text-slate-400 text-lg mb-8">{study.details}</p>
                <div className="flex items-center gap-4 text-white font-bold text-xl">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  {study.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section id="solutions" className="py-32 px-6 scroll-reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
             <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Outcome-Focused Solutions.</h2>
             <p className="text-xl text-slate-400 max-w-2xl mx-auto">We sync your existing business DNA with high-efficiency automation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Revenue Flow Ops', desc: 'Autonomous sales machines that never sleep and never miss a follow-up.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', accent: 'blue' },
              { title: 'Process Convergence', desc: 'Connecting legacy software into a single, kinetic ecosystem governed by AI.', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', accent: 'purple' },
              { title: 'Executive Intelligence', desc: 'Real-time data synthesis and predictive forecasting that drives the bottom line.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', accent: 'cyan' }
            ].map((sol, idx) => (
              <div key={idx} className="glass-panel p-12 rounded-[40px] border border-white/5 hover:border-blue-500/30 transition-all group cursor-default">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 ${
                  sol.accent === 'blue' ? 'bg-blue-600/20 text-blue-400' :
                  sol.accent === 'purple' ? 'bg-purple-600/20 text-purple-400' : 'bg-cyan-600/20 text-cyan-400'
                } group-hover:kinetic-gradient group-hover:text-white transition-all`}>
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sol.icon} /></svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 leading-tight">{sol.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg mb-8">{sol.desc}</p>
                <div className="h-1 w-12 bg-slate-800 rounded-full group-hover:w-full group-hover:bg-blue-500 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Kinetic Lifecycle (Process) */}
      <section id="process" className="py-32 bg-[#080A10] scroll-reveal">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">The Sync <span className="text-blue-500 italic">Lifecycle.</span></h2>
              <p className="text-xl text-slate-400">Predictable scaling, zero disruption.</p>
           </div>
           
           <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-900 hidden lg:block -translate-y-1/2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {[
                   { t: 'Phase 01: Audit', d: 'We dig deep into your manual bottlenecks and hidden friction points.', label: 'Discovery' },
                   { t: 'Phase 02: Design', d: 'Architecting a custom roadmap that aligns AI with your specific business DNA.', label: 'Strategy' },
                   { t: 'Phase 03: Sync', d: 'Deploying high-impact automation with native tool integration.', label: 'Launch' },
                   { t: 'Phase 04: Evolve', d: 'Continuous optimization loops to ensure the system scales with your growth.', label: 'Scale' }
                 ].map((step, i) => (
                   <div key={i} className="glass-panel p-10 rounded-3xl border border-white/5 relative z-10 group hover:border-blue-500/20 transition-all">
                      <span className="inline-block px-3 py-1 bg-blue-600/10 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                         {step.label}
                      </span>
                      <h4 className="text-2xl font-bold text-white mb-4 leading-tight">{step.t}</h4>
                      <p className="text-slate-500 leading-relaxed">{step.d}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 px-6 scroll-reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">The Human <br/>Behind the <span className="text-cyan-400">Intelligence.</span></h2>
                <p className="text-xl text-slate-400 mb-10 leading-relaxed font-light">
                   AI is a powerful engine, but it requires a master architect to steer it toward ROI. Our team bridges the gap between technical data science and pragmatic business leadership.
                </p>
                <div className="space-y-6">
                   <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-blue-400 shrink-0">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      </div>
                      <div>
                         <h4 className="text-white font-bold text-lg mb-2">Strategy-First Ethos</h4>
                         <p className="text-slate-500">We don't solve tech problems; we solve business problems using tech.</p>
                      </div>
                   </div>
                   <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-purple-400 shrink-0">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      </div>
                      <div>
                         <h4 className="text-white font-bold text-lg mb-2">Partner Approach</h4>
                         <p className="text-slate-500">We embed with your team to understand your DNA before touching code.</p>
                      </div>
                   </div>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-6">
                {[
                  { name: 'Alex Rivera', role: 'Chief Strategist', img: '1' },
                  { name: 'Sarah Chen', role: 'Head of AI Ops', img: '2' },
                  { name: 'Marcus Bell', role: 'Success Director', img: '3' },
                  { name: 'Elena Voss', role: 'Data Architect', img: '4' }
                ].map((member, i) => (
                  <div key={i} className="glass-panel p-6 rounded-3xl border border-white/5 text-center group">
                     <div className="w-24 h-24 rounded-full bg-slate-800 mx-auto mb-6 overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-all">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} alt={member.name} />
                     </div>
                     <h5 className="text-white font-bold">{member.name}</h5>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{member.role}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-[#080A10] scroll-reveal">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16 tracking-tighter text-center">Questions & <span className="text-cyan-400 italic">Clarification.</span></h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-panel rounded-3xl border border-white/5 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-8 flex items-center justify-between text-left group"
                >
                  <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{faq.q}</span>
                  <svg className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeFaq === i && (
                  <div className="px-8 pb-8 text-slate-400 leading-relaxed text-lg animate-in fade-in slide-in-from-top-4 duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-32 px-6 scroll-reveal">
        <div className="max-w-4xl mx-auto glass-panel p-16 rounded-[40px] border border-blue-500/20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 kinetic-gradient opacity-30" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">Your Competitors Are <br/>Already Automating.</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto font-light leading-relaxed">Book a 15-minute Discovery Call to see how Strategic Sync can reclaim your bandwidth and scale your vision.</p>
          
          {formStatus === 'sent' ? (
            <div className="animate-in fade-in slide-in-from-bottom duration-500">
               <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
               </div>
               <p className="text-2xl font-bold text-white">Call Scheduled. Check your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="max-w-md mx-auto space-y-4">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Work Email" 
                  required 
                  className="w-full px-6 py-5 rounded-2xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-600" 
                />
                <div className="absolute inset-0 rounded-2xl border border-blue-500/0 group-focus-within:border-blue-500/50 pointer-events-none transition-all" />
              </div>
              <button className="w-full py-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xl transition-all spark-glow shadow-blue-600/30">
                {formStatus === 'sending' ? 'Initiating Sync...' : 'Get My Free AI Roadmap'}
              </button>
            </form>
          )}
          <p className="mt-8 text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">Limited Availability for Q4 Partnership Audits</p>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="pt-24 pb-12 border-t border-white/5 bg-[#05070A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
             <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 kinetic-gradient rounded-full" />
                  <span className="text-2xl font-black text-white tracking-tighter">STRATEGIC SYNC</span>
                </div>
                <p className="text-slate-500 max-w-sm mb-10 leading-relaxed">
                   Architecting high-ROI intelligence systems for the next generation of business leaders. We bridge the gap between technical AI potential and pragmatic growth.
                </p>
                <div className="flex gap-4">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center hover:border-blue-500 transition-all cursor-pointer group">
                        <div className="w-2 h-2 bg-slate-700 group-hover:bg-blue-500 rounded-full transition-colors" />
                     </div>
                   ))}
                </div>
             </div>
             <div>
                <h6 className="text-white font-black text-xs uppercase tracking-widest mb-8">Navigation</h6>
                <ul className="space-y-4 text-sm font-bold text-slate-500">
                   <li><a href="#solutions" className="hover:text-blue-500 transition-colors">Solutions</a></li>
                   <li><a href="#proof" className="hover:text-blue-500 transition-colors">Case Studies</a></li>
                   <li><a href="#process" className="hover:text-blue-500 transition-colors">The Process</a></li>
                   <li><button onClick={onSwitchToStrategy} className="hover:text-blue-500 transition-colors">Partner Strategy</button></li>
                </ul>
             </div>
             <div>
                <h6 className="text-white font-black text-xs uppercase tracking-widest mb-8">Company</h6>
                <ul className="space-y-4 text-sm font-bold text-slate-500">
                   <li><a href="#" className="hover:text-blue-500 transition-colors">About Us</a></li>
                   <li><a href="#" className="hover:text-blue-500 transition-colors">Insights</a></li>
                   <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy</a></li>
                   <li><a href="#" className="hover:text-blue-500 transition-colors">Terms</a></li>
                </ul>
             </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
             <p className="text-slate-700 text-xs font-bold uppercase tracking-widest">© 2024 Strategic Sync Consulting Group. All Rights Reserved.</p>
             <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-slate-700 text-xs font-bold uppercase tracking-widest">Global Systems Operational</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
