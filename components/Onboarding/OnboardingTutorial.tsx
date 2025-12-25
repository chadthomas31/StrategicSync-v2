
import React, { useState } from 'react';
import { StrategySection } from '../../types';

interface OnboardingTutorialProps {
  onClose: () => void;
  setActiveSection: (section: StrategySection) => void;
}

const steps = [
  {
    title: "Welcome to the Blueprint",
    content: "This dashboard contains the foundational strategy for Strategic Sync. Let's walk through the core features designed for your B2B success.",
    section: StrategySection.SITEMAP,
    target: "sidebar-SITEMAP"
  },
  {
    title: "Strategic Sitemap",
    content: "We've mapped out a lean, high-impact navigation. Every page is built with a specific conversion purpose in mind.",
    section: StrategySection.SITEMAP,
    target: "sidebar-SITEMAP"
  },
  {
    title: "Homepage Narrative",
    content: "Here you'll find the section-by-section breakdown of the homepage, focusing on empathy mapping and problem/solution alignment.",
    section: StrategySection.WIREFRAME,
    target: "sidebar-WIREFRAME"
  },
  {
    title: "Conversion Copy",
    content: "These are the key messaging elements. We offer three distinct headline angles to test with your SMB audience.",
    section: StrategySection.COPYWRITING,
    target: "sidebar-COPYWRITING"
  },
  {
    title: "Visual Directive",
    content: "Finally, see how we translate the 'Kinetic Convergence' logo into a full UI experience with specific colors and typography.",
    section: StrategySection.VISUALS,
    target: "sidebar-VISUALS"
  },
  {
    title: "You're All Set!",
    content: "Explore the sections at your own pace. Click 'Download PDF' in the header to export this strategy for your team.",
    section: StrategySection.SITEMAP,
    target: "main-header"
  }
];

const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ onClose, setActiveSection }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextIdx = currentStep + 1;
      setCurrentStep(nextIdx);
      setActiveSection(steps[nextIdx].section);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prevIdx = currentStep - 1;
      setCurrentStep(prevIdx);
      setActiveSection(steps[prevIdx].section);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pointer-events-none">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] pointer-events-auto" onClick={onClose} />
      
      <div className="relative w-full max-w-lg glass-panel p-8 rounded-3xl border border-blue-500/30 shadow-2xl pointer-events-auto animate-in zoom-in-95 fade-in duration-300">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 kinetic-gradient rounded-full flex items-center justify-center spark-glow">
              <span className="text-white text-xs font-black">{currentStep + 1}</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">{step.title}</h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-slate-300 text-lg leading-relaxed mb-10 font-light">
          {step.content}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          <div className="flex gap-1.5">
            {steps.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep ? 'w-8 bg-blue-500' : 'w-1.5 bg-slate-800'
                }`}
              />
            ))}
          </div>
          
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button 
                onClick={prevStep}
                className="px-6 py-2 rounded-xl text-slate-400 font-bold text-sm hover:text-slate-200 transition-colors"
              >
                Back
              </button>
            )}
            <button 
              onClick={nextStep}
              className="px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all spark-glow"
            >
              {currentStep === steps.length - 1 ? 'Finish Tour' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTutorial;
