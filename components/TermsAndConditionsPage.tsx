
import React, { useEffect, useRef, useState } from 'react';

interface TermsAndConditionsPageProps {
  onNavigate: (view: 'home' | 'services' | 'about' | 'contact' | 'careers' | 'blog' | 'privacy' | 'terms', sectionId?: string) => void;
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

const TermsAndConditionsPage: React.FC<TermsAndConditionsPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using the website of Autonexgen, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services."
    },
    {
      title: "2. Service Provision",
      content: "Autonexgen provides AI automation consulting, custom software development, and workflow optimization services. We reserve the right to modify, suspend, or discontinue any portion of our services at any time without prior notice."
    },
    {
      title: "3. Intellectual Property",
      content: "Unless otherwise stated, all original software, code, and documentation developed as part of our bespoke services remain the intellectual property of Autonexgen until final project delivery and full payment, at which point specified rights transfer to the client as per the individual service agreement."
    },
    {
      title: "4. User Conduct",
      content: "Users are prohibited from using our website or services for any unlawful purpose. You agree not to attempt to gain unauthorized access to any portion of our systems, or to use any automated device to scrape or monitor our content."
    },
    {
      title: "5. Limitation of Liability",
      content: "Autonexgen shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your use of our automation systems or AI models."
    },
    {
      title: "6. AI Performance Disclaimer",
      content: "While we strive for 100% accuracy in our AI agents, Large Language Models (LLMs) are probabilistic by nature. Autonexgen does not guarantee that AI responses will always be correct or error-free and is not responsible for 'hallucinations' or unintended outputs from generative models."
    },
    {
      title: "7. Governing Law",
      content: "These terms shall be governed by and construed in accordance with the laws of India, and any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Ahmedabad, Gujarat."
    }
  ];

  return (
    <div className="relative pt-32 pb-20 z-10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Hero Section */}
        <Reveal>
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-mono uppercase tracking-widest mb-6 text-blue-400">
              Service Agreement
            </div>
            <h1 className="text-5xl md:text-6xl font-medium font-newsreader text-white mb-6">
              Terms & <span className="italic text-blue-400">Conditions</span>
            </h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Last Revised: May 20, 2025 • Version 1.4
            </p>
          </div>
        </Reveal>

        {/* Content Body */}
        <div className="space-y-10">
          {sections.map((section, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all group relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/0 group-hover:bg-blue-500/40 transition-all duration-500"></div>
                <h2 className="text-2xl font-serif text-white mb-5 group-hover:text-blue-300 transition-colors">
                  {section.title}
                </h2>
                <div className="text-slate-400 leading-relaxed font-light text-base md:text-lg">
                  {section.content}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Legal Contact */}
        <Reveal delay={600}>
          <div className="mt-20 p-12 rounded-[2.5rem] border border-white/5 bg-gradient-to-tr from-blue-900/10 to-transparent flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
              <iconify-icon icon="lucide:file-text" class="text-blue-400 text-3xl"></iconify-icon>
            </div>
            <h3 className="text-xl font-serif text-white mb-4">Questions about these terms?</h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
              If you require further clarification regarding our service terms or legal compliance, please reach out to our legal department.
            </p>
            <a 
              href="mailto:legal@autonexgen.com" 
              className="px-10 py-3.5 bg-white/5 border border-white/10 rounded-full text-white text-sm font-semibold hover:bg-blue-600 hover:border-blue-600 transition-all active:scale-95 inline-flex items-center gap-3"
            >
              <iconify-icon icon="lucide:mail" width="18"></iconify-icon>
              legal@autonexgen.com
            </a>
          </div>
        </Reveal>

        {/* Navigation Footer */}
        <Reveal delay={800}>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8">
            <button 
              onClick={() => onNavigate('home')}
              className="text-slate-500 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest flex items-center gap-2 group"
            >
              <iconify-icon icon="lucide:arrow-left" width="14" class="group-hover:-translate-x-1 transition-transform"></iconify-icon>
              Return Home
            </button>
            <div className="w-1 h-1 rounded-full bg-slate-800 hidden sm:block"></div>
            <button 
              onClick={() => onNavigate('privacy')}
              className="text-slate-500 hover:text-blue-400 transition-colors text-xs font-mono uppercase tracking-widest"
            >
              View Privacy Policy
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
