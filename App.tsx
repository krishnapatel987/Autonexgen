import React, { useState, useEffect, useRef } from 'react';
import Background from './components/Background.tsx';
import Navbar from './components/Navbar.tsx';
import Dashboard from './components/Dashboard.tsx';
import Services from './components/Services.tsx';
import Playground from './components/Playground.tsx';
import ContactForm from './components/ContactForm.tsx';
import Testimonials from './components/Testimonials.tsx';
import Footer from './components/Footer.tsx';
import ServicesPage from './components/ServicesPage.tsx';
import AboutPage from './components/AboutPage.tsx';
import ContactPage from './components/ContactPage.tsx';
import CareersPage from './components/CareersPage.tsx';
import BlogPage from './components/BlogPage.tsx';
import PrivacyPolicyPage from './components/PrivacyPolicyPage.tsx';
import TermsAndConditionsPage from './components/TermsAndConditionsPage.tsx';
import ResultsPage from './components/ResultsPage.tsx';
import ReviewPage from './components/ReviewPage.tsx';
import { PROCESS_STEPS, FAQS } from './constants.ts';

type AppView = 'home' | 'services' | 'about' | 'contact' | 'careers' | 'blog' | 'privacy' | 'terms' | 'results' | 'reviews';

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

const App: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [view, setView] = useState<AppView>('home');

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleNavigate = (targetView: AppView, sectionId?: string) => {
    setView(targetView);
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const getStepColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          border: 'border-blue-500/10', bg: 'bg-blue-500/5', text: 'text-blue-400/80', shadow: 'rgba(37,99,235,0.03)',
          hoverBorder: 'hover:border-blue-500/30', hoverBg: 'hover:bg-blue-500/[0.03]', hoverShadow: 'rgba(37,99,235,0.1)', textHover: 'group-hover/box:text-blue-300'
        };
      case 'indigo':
        return {
          border: 'border-indigo-500/10', bg: 'bg-indigo-500/5', text: 'text-indigo-400/80', shadow: 'rgba(99,102,241,0.03)',
          hoverBorder: 'hover:border-indigo-500/30', hoverBg: 'hover:bg-indigo-500/[0.03]', hoverShadow: 'rgba(99,102,241,0.1)', textHover: 'group-hover/box:text-indigo-300'
        };
      case 'purple':
        return {
          border: 'border-purple-500/10', bg: 'bg-purple-500/5', text: 'text-purple-400/80', shadow: 'rgba(168,85,247,0.03)',
          hoverBorder: 'hover:border-purple-500/30', hoverBg: 'hover:bg-purple-500/[0.03]', hoverShadow: 'rgba(168,85,247,0.1)', textHover: 'group-hover/box:text-purple-300'
        };
      case 'emerald':
        return {
          border: 'border-emerald-500/10', bg: 'bg-emerald-500/5', text: 'text-emerald-400/80', shadow: 'rgba(16,185,129,0.03)',
          hoverBorder: 'hover:border-emerald-500/30', hoverBg: 'hover:bg-emerald-500/[0.03]', hoverShadow: 'rgba(16,185,129,0.1)', textHover: 'group-hover/box:text-emerald-300'
        };
      default:
        return {
          border: 'border-blue-500/10', bg: 'bg-blue-500/5', text: 'text-blue-400/80', shadow: 'rgba(37,99,235,0.03)',
          hoverBorder: 'hover:border-blue-500/30', hoverBg: 'hover:bg-blue-500/[0.03]', hoverShadow: 'rgba(37,99,235,0.1)', textHover: 'group-hover/box:text-blue-300'
        };
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020204]">
      <Background />
      <Navbar onNavigate={handleNavigate as any} currentView={view as any} />

      {view === 'home' && (
        <>
          <main id="home" className="relative pt-32 pb-20 flex flex-col items-center z-10">
            <Reveal>
              <div className="text-center max-w-5xl mx-auto px-6 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[11px] font-medium mb-8 shadow-[0_0_20px_rgba(37,99,235,0.1)] text-blue-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-blue-400"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span>Next-Gen Intelligent Automation</span>
                </div>
                
                <h1 className="md:text-8xl text-5xl font-medium tracking-tight font-newsreader mb-8 text-white leading-[0.95]">
                  Autonomous Systems,<br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-blue-300">Intelligent Growth.</span>
                </h1>
                
                <p className="leading-relaxed text-base font-light text-slate-400 max-w-2xl mx-auto mb-10">
                  Autonexgen engineers bespoke <span className="text-white font-medium">AI Agents</span>, <span className="text-white font-medium">Chatbots</span>, and <span className="text-white font-medium">Workflow Automations</span> for high-scale organizations. Based in Ahmedabad, deploying worldwide.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                  <div className="relative p-px rounded-lg overflow-hidden group cursor-pointer w-full md:w-auto animate-rotate-glow bg-white/5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]">
                    <button 
                      onClick={() => handleNavigate('services')}
                      className="relative z-10 w-full md:w-auto px-8 py-3.5 bg-[#0a0a0c] text-sm font-semibold rounded-md transition-all hover:bg-[#121215] text-white"
                    >
                      Explore Solutions
                    </button>
                  </div>

                  <button 
                    onClick={() => handleNavigate('home', 'demo')}
                    className="group flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all text-slate-400 hover:text-white"
                  >
                    <iconify-icon icon="lucide:play-circle" class="text-slate-500 group-hover:text-blue-400 transition-colors" width="18"></iconify-icon>
                    <span className="border-b border-transparent group-hover:border-slate-500">Interactive Demo</span>
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <Dashboard />
            </Reveal>
          </main>

          <Reveal><Services /></Reveal>
          <Reveal><Playground /></Reveal>

          <section id="pricing" className="py-24 border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
              <Reveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-medium font-serif text-white mb-4">Deployment Roadmap</h2>
                  <p className="text-slate-400">From concept to production-grade deployment in 4 weeks.</p>
                </div>
              </Reveal>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 group/roadmap">
                {PROCESS_STEPS.map((step, idx) => {
                  const colors = getStepColorClasses(step.color);
                  return (
                    <Reveal key={step.id} delay={idx * 100} className="h-full">
                      <div className={`p-6 rounded-xl border bg-white/[0.01] backdrop-blur-sm relative transition-all duration-500 ease-out group/box group-hover/roadmap:opacity-30 group-hover/roadmap:scale-[0.96] hover:!opacity-100 hover:!scale-105 hover:z-20 border-white/10 h-full flex flex-col ${colors.hoverBorder} ${colors.hoverBg}`} style={{ boxShadow: `0 20px 50px -10px ${colors.hoverShadow}` }}>
                        <div className="absolute top-4 right-4 text-4xl font-bold opacity-5 group-hover/box:opacity-10 transition-opacity text-white select-none">{step.id}</div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-6 border ${colors.border} ${colors.bg} ${colors.text} transition-transform duration-500 group-hover/box:scale-110 shrink-0`} style={{ boxShadow: `0 0 10px ${colors.shadow}` }}>
                          <iconify-icon icon={step.icon} width="20"></iconify-icon>
                        </div>
                        <h3 className={`font-medium text-white mb-2 transition-colors duration-500 ${colors.textHover}`}>{step.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed transition-colors duration-500 group-hover/box:text-slate-400 flex-grow">{step.description}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-24 border-t border-white/5 relative z-10">
            <div className="max-w-3xl mx-auto px-6">
              <Reveal><h2 className="text-2xl font-medium mb-12 text-center text-white">Frequently Asked Questions</h2></Reveal>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <Reveal key={i} delay={i * 50}>
                    <div className={`group bg-[#0a0a0c]/90 border transition-all duration-300 overflow-hidden rounded-2xl ${activeFaq === i ? 'border-blue-500/40 bg-blue-500/[0.02]' : 'border-white/5'}`}>
                      <button onClick={() => toggleFaq(i)} className="w-full flex cursor-pointer p-5 items-center justify-between text-left transition-colors font-medium outline-none">
                        <span className={`${activeFaq === i ? 'text-white' : 'text-slate-300'} transition-colors`}>{faq.question}</span>
                        <iconify-icon icon="lucide:chevron-down" className={`transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-blue-400' : 'text-slate-500'}`}></iconify-icon>
                      </button>
                      <div className={`grid transition-all duration-300 ease-in-out ${activeFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden"><div className="px-5 pb-6 text-sm text-slate-500 leading-relaxed max-w-[95%]">{faq.answer}</div></div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {view === 'services' && <ServicesPage onNavigate={handleNavigate as any} />}
      {view === 'about' && <AboutPage onNavigate={handleNavigate as any} />}
      {view === 'contact' && <ContactPage onNavigate={handleNavigate as any} />}
      {view === 'careers' && <CareersPage onNavigate={handleNavigate as any} />}
      {view === 'blog' && <BlogPage onNavigate={handleNavigate as any} />}
      {view === 'privacy' && <PrivacyPolicyPage onNavigate={handleNavigate as any} />}
      {view === 'terms' && <TermsAndConditionsPage onNavigate={handleNavigate as any} />}
      {view === 'results' && <ResultsPage onNavigate={handleNavigate as any} />}
      {view === 'reviews' && <ReviewPage onNavigate={handleNavigate as any} />}

      {view !== 'contact' && view !== 'careers' && view !== 'blog' && view !== 'privacy' && view !== 'terms' && view !== 'results' && view !== 'reviews' && (
        <>
          {view === 'home' && <Reveal><Testimonials /></Reveal>}
          <Reveal><ContactForm /></Reveal>
        </>
      )}
      <Footer onNavigate={handleNavigate as any} />
    </div>
  );
};

export default App;