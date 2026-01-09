
import React, { useEffect, useRef, useState } from 'react';

interface PrivacyPolicyPageProps {
  onNavigate: (view: 'home' | 'services' | 'about' | 'contact' | 'careers' | 'blog' | 'privacy', sectionId?: string) => void;
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

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Introduction",
      content: "At Autonexgen, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you."
    },
    {
      title: "2. Data We Collect",
      content: "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data (name, username), Contact Data (email address, telephone numbers), Technical Data (IP address, browser type), and Usage Data (information about how you use our website)."
    },
    {
      title: "3. How We Use AI & Data",
      content: "Autonexgen utilizes advanced Artificial Intelligence and Large Language Models. We process data strictly to provide the requested automation services. We do not use client-specific proprietary data to train generalized public models. All AI-driven processing is performed within secure, isolated environments."
    },
    {
      title: "4. Data Security",
      content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know."
    },
    {
      title: "5. Your Legal Rights",
      content: "Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, or restriction of your personal data."
    }
  ];

  return (
    <div className="relative pt-32 pb-20 z-10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Hero Section */}
        <Reveal>
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-mono uppercase tracking-widest mb-6 text-blue-400">
              Legal Documentation
            </div>
            <h1 className="text-5xl md:text-6xl font-medium font-newsreader text-white mb-6">
              Privacy <span className="italic text-blue-400">Policy</span>
            </h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Last Updated: May 20, 2025 • Effective Immediately
            </p>
          </div>
        </Reveal>

        {/* Content Body */}
        <div className="space-y-12">
          {sections.map((section, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="p-8 md:p-10 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors group">
                <h2 className="text-2xl font-serif text-white mb-6 group-hover:text-blue-300 transition-colors">
                  {section.title}
                </h2>
                <div className="text-slate-400 leading-relaxed font-light text-base md:text-lg">
                  {section.content}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Contact info for privacy concerns */}
        <Reveal delay={600}>
          <div className="mt-20 p-12 rounded-[2.5rem] border border-blue-500/10 bg-gradient-to-br from-blue-600/5 to-transparent text-center">
            <iconify-icon icon="lucide:shield-check" class="text-blue-500 text-4xl mb-6"></iconify-icon>
            <h3 className="text-xl font-serif text-white mb-4">Privacy Concerns?</h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
              If you have any questions about this privacy policy or our privacy practices, please contact our data protection officer.
            </p>
            <a 
              href="mailto:privacy@autonexgen.com" 
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white text-sm font-medium hover:bg-blue-600 transition-all active:scale-95 inline-block"
            >
              privacy@autonexgen.com
            </a>
          </div>
        </Reveal>

        {/* Back Link */}
        <Reveal delay={800}>
          <div className="mt-16 text-center">
            <button 
              onClick={() => onNavigate('home')}
              className="text-slate-500 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest flex items-center gap-2 mx-auto"
            >
              <iconify-icon icon="lucide:arrow-left" width="14"></iconify-icon>
              Return to Homepage
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
