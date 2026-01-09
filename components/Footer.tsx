
import React from 'react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (view: 'home' | 'services' | 'about' | 'contact' | 'careers' | 'blog' | 'privacy' | 'terms' | 'results', sectionId?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'linkedin', icon: 'lucide:linkedin', url: 'https://www.linkedin.com/company/autonexgen/' }
  ];

  // Clean link class with zoom/scale effect, updated text color to #CCCCCC
  const linkClass = "text-sm text-[#CCCCCC] hover:text-white px-3 py-1.5 -mx-3 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-white/5 active:scale-95 outline-none block w-fit";

  return (
    <footer className="relative pt-24 pb-12 border-t border-white/5 bg-[#020204] z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <button onClick={() => onNavigate('home')} className="flex items-center mb-8 group cursor-pointer text-left outline-none transition-transform hover:scale-105 active:scale-95">
              <Logo variant="full" />
            </button>
            <p className="text-sm text-[#CCCCCC] max-w-xs mb-4 leading-relaxed">
              The modern standard for enterprise-grade AI automation. Empowering global teams with autonomous systems and intelligent workflows.
            </p>
            <div className="mb-8">
              <a 
                href="mailto:contact@autonexgen.com" 
                className="inline-block text-xs text-blue-500 hover:text-blue-300 px-2 py-1 -mx-2 rounded-md hover:bg-blue-500/10 transition-all duration-300 hover:scale-110 font-mono"
              >
                contact@autonexgen.com
              </a>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#CCCCCC] hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 hover:scale-110 active:scale-90"
                >
                  <iconify-icon icon={social.icon} width="18"></iconify-icon>
                </a>
              ))}
            </div>
          </div>

          {/* Company Column */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('about')} className={linkClass}>About us</button></li>
              <li><button onClick={() => onNavigate('contact')} className={`${linkClass} text-left`}>Contact</button></li>
              <li><button onClick={() => onNavigate('careers')} className={`${linkClass} text-left`}>Careers</button></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('services', 'agents')} className={`${linkClass} text-left`}>AI Automation</button></li>
              <li><button onClick={() => onNavigate('services', 'strategy')} className={`${linkClass} text-left`}>AI Audits</button></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('results')} className={linkClass}>Case Studies</button></li>
              <li><button onClick={() => onNavigate('blog')} className={linkClass}>Blog</button></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('privacy')} className={linkClass}>Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms')} className={linkClass}>Terms & Conditions</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-[11.5px] font-mono text-blue-400 uppercase tracking-widest">
            <span>© {currentYear} Autonexgen. All rights reserved.</span>
            <span className="hidden md:inline">Ahmedabad, India</span>
          </div>
          <div className="flex items-center gap-6 text-[11.5px] font-mono uppercase tracking-widest">
            <div className="flex items-center gap-2 text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All systems normal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-[20vw] font-bold text-white/[0.02] pointer-events-none select-none uppercase tracking-tighter whitespace-nowrap">
        Autonexgen
      </div>
    </footer>
  );
};

export default Footer;
