
import React, { useEffect, useRef, useState } from 'react';

interface CareersPageProps {
  onNavigate: (view: 'home' | 'services' | 'about' | 'contact' | 'careers', sectionId?: string) => void;
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

const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const positions = [
    {
      title: 'Automation Workflow Engineer',
      type: 'Full-time',
      department: 'Operations',
      description: 'Building complex enterprise integrations using n8n, Make.com, and custom API middleware.',
      tags: ['Node.js', 'n8n', 'APIs']
    },
    {
      title: 'AI Sales Specialist',
      type: 'Commission + Base',
      department: 'Growth',
      description: 'Connecting global enterprises with our cutting-edge automation solutions and managing key accounts.',
      tags: ['Consultative Sales', 'AI Knowledge']
    }
  ];

  const benefits = [
    {
      title: 'Global Impact',
      description: 'Work with Fortune 500 companies and high-growth startups across the globe from our hub in India.',
      icon: 'lucide:globe'
    },
    {
      title: 'R&D Budget',
      description: 'Dedicated weekly hours and budget for exploring new LLMs, frameworks, and automation tools.',
      icon: 'lucide:flask-conical'
    },
    {
      title: 'Remote-First',
      description: 'While we have a beautiful hub in Ahmedabad, we believe high-performance work can happen anywhere.',
      icon: 'lucide:laptop'
    }
  ];

  return (
    <div className="relative pt-32 pb-20 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <Reveal>
          <div className="mb-32 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-mono uppercase tracking-widest mb-6 text-blue-400">
              Careers
            </div>
            <h1 className="text-5xl md:text-7xl font-medium font-newsreader text-white mb-8 leading-tight">
              Build the <span className="italic text-blue-400">Autonomous</span><br />
              Future with Us.
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
              We're looking for thinkers, builders, and visionaries who are obsessed with efficiency. Join a team where your code doesn't just run—it thinks.
            </p>
          </div>
        </Reveal>

        {/* Benefits Grid with Focused Hover Effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40 group/benefits-grid">
          {benefits.map((benefit, i) => (
            <Reveal key={i} delay={i * 150} className="h-full">
              <div className="p-10 rounded-3xl border border-white/5 bg-white/[0.01] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group/benefit-card group-hover/benefits-grid:opacity-30 group-hover/benefits-grid:scale-[0.96] group-hover/benefits-grid:blur-[0.5px] hover:!opacity-100 hover:!scale-105 hover:!blur-0 hover:z-20 hover:border-blue-500/30 hover:bg-white/[0.03] hover:shadow-[0_20px_50px_-10px_rgba(37,99,235,0.15)] h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 transition-transform duration-500 group-hover/benefit-card:scale-110">
                  <iconify-icon icon={benefit.icon} class="text-blue-400 text-2xl"></iconify-icon>
                </div>
                <h3 className="text-xl font-medium text-white mb-4 transition-colors group-hover/benefit-card:text-blue-300">{benefit.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed transition-colors group-hover/benefit-card:text-slate-400 flex-grow">{benefit.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Positions Section */}
        <div className="mb-40">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 border-b border-white/5 pb-12">
              <div>
                <h2 className="text-4xl font-serif text-white mb-4">Open Positions</h2>
                <p className="text-slate-400">Join our engineering and growth teams.</p>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                HIRING NOW
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4">
            {positions.map((pos, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-blue-400">{pos.department}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                      <span className="text-xs text-slate-500">{pos.type}</span>
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-blue-300 transition-colors">{pos.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">{pos.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {pos.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-200 font-mono font-medium shadow-[0_2px_10px_rgba(37,99,235,0.1)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => onNavigate('contact')}
                    className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-white hover:bg-blue-600 hover:border-blue-600 transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    Apply Now
                    <iconify-icon icon="lucide:chevron-right" width="16"></iconify-icon>
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Speculative Application */}
        <Reveal>
          <div className="p-16 rounded-[3rem] border border-white/5 bg-gradient-to-br from-blue-600/5 to-transparent text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_70%)] pointer-events-none"></div>
            <h2 className="text-3xl font-serif text-white mb-6 relative z-10">Don't see your role?</h2>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10 leading-relaxed">
              We are always looking for exceptional talent in AI research, sales, and automation engineering. Send us a speculative application.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-900/30 transition-all active:scale-[0.98] relative z-10"
            >
              Contact Recruiting
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default CareersPage;
