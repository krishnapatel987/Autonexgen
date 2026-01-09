
import React, { useEffect, useRef, useState } from 'react';

interface AboutPageProps {
  onNavigate: (view: 'home' | 'services' | 'about' | 'contact' | 'careers' | 'blog' | 'privacy' | 'terms' | 'results', sectionId?: string) => void;
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

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { label: 'Automations Deployed', value: '150+' },
    { label: 'Hours Reclaimed', value: '8k+' },
    { label: 'Enterprise Clients', value: '25+' },
    { label: 'Global Partners', value: '10+' },
  ];

  const values = [
    {
      title: 'Precision Engineering',
      description: 'We don\'t believe in generic solutions. Every agent and workflow is custom-architected to fit your specific business logic.',
      icon: 'lucide:target'
    },
    {
      title: 'Scalability First',
      description: 'Our systems are built to grow with you. Whether you handle 100 or 1,000,000 requests, our infrastructure remains robust.',
      icon: 'lucide:layers'
    },
    {
      title: 'Ethical AI',
      description: 'We prioritize data security and transparency, ensuring that AI serves as a secure extension of your workforce.',
      icon: 'lucide:shield-check'
    }
  ];

  return (
    <div className="relative pt-32 pb-20 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <Reveal>
          <div className="mb-32 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-mono uppercase tracking-widest mb-6 text-blue-400">
              Our Story
            </div>
            <h1 className="text-5xl md:text-7xl font-medium font-newsreader text-white mb-8 leading-tight">
              Architecting the <span className="italic text-blue-400">Next Generation</span><br />
              of Intelligent Work.
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
              Founded in 2025, Autonexgen was born from a simple observation: most businesses are bogged down by repetitive tasks that stifle human creativity. We're here to change that by deploying autonomous systems that handle the mundane, so your team can focus on the extraordinary.
            </p>
          </div>
        </Reveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
          {stats.map((stat, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] text-center group hover:border-blue-500/20 transition-colors h-full">
                <div className="text-4xl font-medium font-newsreader text-white mb-2 group-hover:text-blue-400 transition-colors">{stat.value}</div>
                <div className="text-xs font-mono uppercase tracking-widest text-slate-500">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mission Section */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
            <div className="relative aspect-square rounded-[3rem] border border-white/10 bg-[#0a0a0c] overflow-hidden group/mission-img shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_70%)] z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" 
                alt="Autonexgen Mission"
                className="w-full h-full object-cover grayscale-[30%] group-hover/mission-img:grayscale-0 group-hover/mission-img:scale-110 transition-all duration-1000"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            
            <div>
              <h2 className="text-4xl font-medium font-serif text-white mb-8">Our Mission</h2>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed font-light">
                We believe that AI should be more than just a tool; it should be a partner. Our mission is to democratize access to enterprise-grade automation for businesses of all sizes, from startups in Ahmedabad to multinationals worldwide.
              </p>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
                By bridging the gap between cutting-edge Large Language Models and real-world business challenges, we empower organizations to operate at a velocity previously thought impossible.
              </p>
              <div className="flex flex-col gap-4">
                {['Human-Centric Design', 'API-First Architecture', 'Continuous Optimization'].map(item => (
                  <div key={item} className="flex items-center gap-3 text-white font-medium">
                    <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <iconify-icon icon="lucide:check" class="text-blue-400 text-xs"></iconify-icon>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Founder Section */}
        <Reveal>
          <div className="mb-40 py-20 border-y border-white/5 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 overflow-hidden shadow-2xl relative group">
                  {/* Founder Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000" 
                    alt="Krishna Patel"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Krishna';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-2xl font-medium text-white">Krishna Patel</h3>
                    <p className="text-blue-400 font-mono text-xs uppercase tracking-widest mt-1">Founder & Chief Architect</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-mono uppercase tracking-widest mb-6 text-blue-400">
                  Leadership
                </div>
                <h2 className="text-4xl font-medium font-serif text-white mb-8">The Visionary Behind <br/><span className="italic text-blue-400">Autonexgen</span></h2>
                <div className="space-y-6 text-slate-400 text-lg leading-relaxed font-light">
                  <p>
                    Krishna Patel established Autonexgen in 2025 with a singular, ambitious goal: to transition the modern business from being "AI-aware" to "AI-native". With deep expertise in systems architecture and a passion for cognitive automation, Krishna leads our engineering efforts from our hub in Ahmedabad.
                  </p>
                  <p>
                    "Automation isn't about replacing human workers," Krishna often notes. "It's about liberating them from the cognitive drudgery of repetitive tasks, allowing the human spirit to focus on strategy, creativity, and empathy."
                  </p>
                  <div className="pt-4 flex gap-4">
                    <a href="https://www.linkedin.com/in/krishnapatel987/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-slate-400 hover:text-white">
                      <iconify-icon icon="lucide:linkedin" width="20"></iconify-icon>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Core Philosophy Section with Enhanced Hover */}
        <div className="mb-40">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight">Our Core Philosophy</h2>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 group/philosophy-grid">
            {values.map((value, i) => (
              <Reveal key={i} delay={i * 150} className="h-full">
                <div className="p-10 rounded-3xl border border-white/5 bg-white/[0.01] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group/value-card group-hover/philosophy-grid:opacity-40 group-hover/philosophy-grid:scale-[0.98] group-hover/philosophy-grid:blur-[0.5px] hover:!opacity-100 hover:!scale-[1.03] hover:!blur-0 hover:z-20 hover:border-blue-500/30 hover:bg-white/[0.04] hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.15)] h-full flex flex-col relative overflow-hidden">
                  
                  {/* Subtle hover glow background */}
                  <div className="absolute -inset-20 bg-blue-500/0 group-hover/value-card:bg-blue-500/5 blur-[100px] transition-all duration-700 pointer-events-none"></div>

                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 border border-white/5 transition-all duration-500 group-hover/value-card:scale-110 group-hover/value-card:bg-blue-500/20 group-hover/value-card:border-blue-500/20 group-hover/value-card:shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                    <iconify-icon icon={value.icon} class="text-blue-400 text-3xl"></iconify-icon>
                  </div>

                  <h3 className="text-2xl font-medium text-white mb-4 transition-colors duration-500 group-hover/value-card:text-blue-300">
                    {value.title}
                  </h3>

                  <p className="text-slate-500 text-base leading-relaxed transition-colors duration-500 group-hover/value-card:text-slate-300 flex-grow font-light">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <Reveal>
          <div className="p-12 md:p-20 rounded-[3rem] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent relative overflow-hidden group/location">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none group-hover/location:scale-110 transition-transform duration-1000">
              <iconify-icon icon="lucide:map" class="text-[30rem] -mr-40 text-blue-500/20"></iconify-icon>
            </div>
            <div className="max-w-2xl relative z-10">
              <h2 className="text-4xl font-serif text-white mb-6">Born in India, Deploying Worldwide.</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
                Our engineering hub is located in the heart of Ahmedabad, Gujarat. This allows us to tap into world-class technical talent while maintaining a competitive edge in global markets.
              </p>
              <button 
                onClick={() => onNavigate('contact')}
                className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-900/30 transition-all active:scale-[0.98]"
              >
                Contact Our Hub
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default AboutPage;
