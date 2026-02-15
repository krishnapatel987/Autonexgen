import React, { useEffect, useRef, useState } from 'react';
import ContactForm from './ContactForm.tsx';

interface LandingPageProps {
  onNavigate: (view: 'home' | 'services' | 'about' | 'contact' | 'landing', sectionId?: string) => void;
}

const Reveal: React.FC<{ children: React.ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScrollToForm = () => {
    const form = document.getElementById('ad-contact-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Tech stack synchronized with ServicesPage
  const techStack = [
    { name: 'OpenAI', icon: 'simple-icons:openai', colorClass: 'text-white' },
    { name: 'Anthropic', icon: 'simple-icons:anthropic', colorClass: 'text-white' },
    { name: 'Zapier', icon: 'logos:zapier-icon' },
    { name: 'HubSpot', icon: 'logos:hubspot' },
    { name: 'Salesforce', icon: 'logos:salesforce' },
    { name: 'WhatsApp API', icon: 'logos:whatsapp-icon' },
    { name: 'Twilio', icon: 'logos:twilio-icon' },
    { name: 'Python', icon: 'logos:python' },
  ];

  return (
    <div className="relative pt-32 pb-20 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* HERO SECTION - AD OPTIMIZED */}
        <Reveal>
          <div className="text-center mb-12 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-mono uppercase tracking-widest mb-8 text-blue-400">
              Limited Time: Free AI Workflow Audit
            </div>
            
            <h1 className="text-5xl md:text-8xl font-medium font-newsreader text-white mb-8 leading-[0.9] tracking-tight">
              Stop Losing Sales to <br />
              <span className="italic text-blue-400">Manual Latency.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light mb-12">
              Autonexgen deploys <span className="text-white font-medium">Autonomous AI Agents</span> that work 24/7 to qualify leads, book meetings, and sync data. Scale your revenue without increasing your headcount.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <button 
                onClick={handleScrollToForm}
                className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                Claim My Free AI Audit
                <iconify-icon icon="lucide:arrow-right" width="20"></iconify-icon>
              </button>
              <div className="flex items-center gap-3">
                 <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                       <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020204] bg-slate-800 overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 123}`} alt="user" />
                       </div>
                    ))}
                 </div>
                 <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Joined by 50+ Enterprises
                 </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* TECH STACK MARQUEE - MATCHES SERVICE PAGE STYLE - GAP REMOVED BELOW */}
        <Reveal delay={100}>
          <div className="mt-12 mb-20 border-t border-white/5 pt-12">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-serif text-white mb-4 tracking-tight">Our Technology Stack</h3>
              <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] max-w-md mx-auto">Enterprise-grade tools for high-performance automation</p>
            </div>
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex w-max gap-32 py-10 animate-scroll items-center will-change-transform">
                {[...techStack, ...techStack].map((tech, i) => (
                  <div 
                    key={i} 
                    className="flex flex-col items-center gap-6 transition-all cursor-default min-w-[130px] group"
                  >
                    <div className="h-12 flex items-center justify-center">
                      <iconify-icon 
                        icon={tech.icon} 
                        width="42" 
                        class={`transition-transform duration-500 group-hover:scale-110 ${tech.colorClass || ''}`}
                      ></iconify-icon>
                    </div>
                    <span className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.2em] group-hover:text-slate-300 transition-colors duration-300">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* THE PAIN SECTION - BROUGHT CLOSER TO TECH STACK */}
        <div className="mb-40 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif text-white">The Silent Killers of Your Growth.</h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                Most business owners are trapped in the "Manual Loop"—hiring more people to handle more work, which only increases complexity and reduces profit margins.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  { icon: 'lucide:clock', text: 'Slow response times killing lead interest' },
                  { icon: 'lucide:database', text: 'Manual data entry errors in your CRM' },
                  { icon: 'lucide:alert-triangle', text: 'Missing follow-ups because your team is busy' }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                      <iconify-icon icon={item.icon} width="16"></iconify-icon>
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="relative aspect-video rounded-3xl border border-white/10 bg-[#0a0a0c] overflow-hidden shadow-2xl p-8">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent"></div>
               <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/40">
                           <iconify-icon icon="lucide:workflow" class="text-blue-400"></iconify-icon>
                        </div>
                        <span className="font-mono text-xs text-white">Efficiency Roadmap</span>
                     </div>
                     <span className="text-[10px] text-blue-400 animate-pulse">OPTIMIZING...</span>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 animate-[grow_3s_ease-in-out_infinite]" style={{width: '75%'}}></div>
                     </div>
                     <div className="flex justify-between text-[10px] font-mono text-slate-500">
                        <span>HUMAN CAPACITY</span>
                        <span>AI CAPACITY</span>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                     <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className="text-[8px] text-slate-500 mb-1">RECLAIMED TIME</div>
                        <div className="text-xl font-mono text-white">40h/wk</div>
                     </div>
                     <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <div className="text-[8px] text-blue-400 mb-1">ROI ESTIMATE</div>
                        <div className="text-xl font-mono text-white">320%</div>
                     </div>
                  </div>
               </div>
            </div>
          </Reveal>
        </div>

        {/* SOLUTIONS SECTION */}
        <div className="mb-40">
           <Reveal className="text-center mb-16">
              <h2 className="text-4xl font-serif text-white mb-6">How We Fix It.</h2>
              <p className="text-slate-400 max-w-xl mx-auto">We architect three core layers of intelligence for your enterprise.</p>
           </Reveal>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                 { title: 'AI Support Agents', icon: 'lucide:headphones', text: 'Handles 90% of support tickets instantly on WhatsApp or Web.' },
                 { title: 'Lead Qualification', icon: 'lucide:target', text: 'Automatically filters high-intent buyers and books site visits.' },
                 { title: 'Intelligent CRM Sync', icon: 'lucide:refresh-cw', text: 'Zero-manual entry. Data flows between apps with absolute precision.' }
              ].map((item, i) => (
                 <Reveal key={i} delay={i * 100} className="h-full">
                    <div className="p-10 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all h-full border-t-2 border-t-blue-500/20 group">
                       <iconify-icon icon={item.icon} class="text-3xl text-blue-400 mb-6 group-hover:scale-110 transition-transform"></iconify-icon>
                       <h3 className="text-xl font-medium text-white mb-4">{item.title}</h3>
                       <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                    </div>
                 </Reveal>
              ))}
           </div>
        </div>

        {/* CONVERSION FORM SECTION */}
        <div id="ad-contact-form" className="scroll-mt-32">
           <Reveal>
              <div className="bg-[#0a0a0c] rounded-[3rem] border border-blue-500/20 p-8 md:p-20 relative overflow-hidden shadow-[0_0_80px_rgba(37,99,235,0.1)]">
                 <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full -z-10"></div>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                       <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
                          Get Your <br />
                          <span className="italic text-blue-400">Custom AI Roadmap.</span>
                       </h2>
                       <p className="text-slate-400 text-lg font-light mb-12">
                          During this 20-minute audit, we will analyze your current bottlenecks and show you exactly how to automate them.
                       </p>
                       
                       <div className="space-y-6">
                          <div className="flex items-center gap-4">
                             <iconify-icon icon="lucide:check-circle" class="text-emerald-500 text-xl"></iconify-icon>
                             <span className="text-white">Expert review of your current tech stack</span>
                          </div>
                          <div className="flex items-center gap-4">
                             <iconify-icon icon="lucide:check-circle" class="text-emerald-500 text-xl"></iconify-icon>
                             <span className="text-white">ROI projection for automation deployment</span>
                          </div>
                          <div className="flex items-center gap-4">
                             <iconify-icon icon="lucide:check-circle" class="text-emerald-500 text-xl"></iconify-icon>
                             <span className="text-white">Custom blueprint for AI Agent integration</span>
                          </div>
                       </div>
                    </div>
                    
                    <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[2rem] backdrop-blur-xl">
                       <ContactForm hideHeader />
                    </div>
                 </div>
              </div>
           </Reveal>
        </div>
      </div>

      <style>{`
         @keyframes grow {
            0%, 100% { width: 65%; }
            50% { width: 90%; }
         }
      `}</style>
    </div>
  );
};

export default LandingPage;