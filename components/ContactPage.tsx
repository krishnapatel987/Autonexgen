
import React, { useEffect, useRef, useState } from 'react';
import ContactForm from './ContactForm';

interface ContactPageProps {
  onNavigate: (view: 'home' | 'services' | 'about' | 'contact', sectionId?: string) => void;
}

const Reveal: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => {
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
      }`}
    >
      {children}
    </div>
  );
};

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactMethods = [
    {
      title: 'Email Us',
      detail: 'contact@autonexgen.com',
      sub: 'Response within 24 hours',
      icon: 'lucide:mail',
      link: 'mailto:contact@autonexgen.com'
    },
    {
      title: 'Call Us',
      detail: '+91 93160 93678',
      sub: 'Mon-Fri, 10am-6pm IST',
      icon: 'lucide:phone',
      link: 'tel:+919316093678'
    },
    {
      title: 'Our Office',
      detail: 'Ahmedabad, Gujarat',
      sub: 'India HQ',
      icon: 'lucide:map-pin',
      link: 'https://maps.app.goo.gl/sf6LJSXtSbJX1WKu6'
    }
  ];

  return (
    <div className="relative pt-32 pb-20 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <Reveal>
          <div className="mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-mono uppercase tracking-widest mb-6 text-blue-400">
              Get In Touch
            </div>
            <h1 className="text-5xl md:text-7xl font-medium font-newsreader text-white mb-8 leading-tight">
              Let's build your <br />
              <span className="italic text-blue-400">Autonomous Future.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed font-light">
              Whether you're looking to automate a single workflow or architect an entire enterprise AI ecosystem, our team is ready to help you scale.
            </p>
          </div>
        </Reveal>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 gap-4">
              {contactMethods.map((method, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <a 
                    href={method.link}
                    target={method.link.startsWith('http') ? "_blank" : undefined}
                    rel={method.link.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/20 transition-all flex items-start gap-5 w-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <iconify-icon icon={method.icon} class="text-blue-400 text-2xl"></iconify-icon>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">{method.title}</h3>
                      <p className="text-slate-300 text-sm mb-1">{method.detail}</p>
                      <p className="text-slate-500 text-xs">{method.sub}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={400}>
              <div className="p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-blue-600/5 to-transparent">
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <iconify-icon icon="lucide:sparkles" class="text-blue-400"></iconify-icon>
                  Why consult with us?
                </h3>
                <ul className="space-y-4">
                  {[
                    'Custom Automation Roadmap',
                    'Technical Feasibility Audit',
                    'ROI & Implementation Estimate',
                    'Direct Expert Access'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                      <iconify-icon icon="lucide:check-circle-2" class="text-blue-500/50 text-base"></iconify-icon>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <Reveal delay={200}>
              <div className="bg-[#0a0a0c] rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none"></div>
                <div className="p-1">
                  <ContactForm hideHeader />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Global Hub Section */}
        <div className="text-center py-20 border-t border-white/5">
          <Reveal>
            <h2 className="text-3xl font-serif text-white mb-12">Visit Our Artificial Intelligence Hub</h2>
            <div 
              className="block relative aspect-[21/9] w-full rounded-[2rem] border border-white/10 bg-[#0a0a0c] overflow-hidden group transition-all hover:border-blue-500/30"
            >
               <iframe 
                 src="https://maps.google.com/maps?q=Ahmedabad,%20Gujarat,%20India&t=k&z=14&ie=UTF8&iwloc=&output=embed"
                 className="absolute inset-0 w-full h-full border-0 grayscale-[20%] contrast-[110%] brightness-[80%]"
                 loading="lazy"
                 allowFullScreen
               ></iframe>
               
               <div className="absolute inset-0 bg-blue-500/10 pointer-events-none mix-blend-overlay"></div>
               
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative">
                     <div className="w-16 h-16 rounded-full bg-blue-500/20 animate-ping absolute -inset-0"></div>
                     <div className="w-16 h-16 rounded-full bg-blue-500/40 flex items-center justify-center relative border border-blue-400/50">
                        <iconify-icon icon="lucide:map-pin" class="text-white text-2xl"></iconify-icon>
                     </div>
                  </div>
               </div>

               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
                 <a 
                   href="https://maps.app.goo.gl/sf6LJSXtSbJX1WKu6" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 text-slate-300 text-sm hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
                 >
                    <iconify-icon icon="lucide:external-link" width="14"></iconify-icon>
                    Open in Google Maps: Ahmedabad, Gujarat
                 </a>
               </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
