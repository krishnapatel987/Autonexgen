import React, { useState } from 'react';
import Logo from './Logo.tsx';

interface NavbarProps {
  onNavigate: (view: 'home' | 'services' | 'about' | 'contact' | 'careers' | 'blog' | 'privacy' | 'terms' | 'results' | 'reviews', sectionId?: string) => void;
  currentView: 'home' | 'services' | 'about' | 'contact' | 'careers' | 'blog' | 'privacy' | 'terms' | 'results' | 'reviews';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobileNav = (view: any, sectionId?: string) => {
    setIsMenuOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <>
      {/* Navigation Bar with Thinner Glassmorphism Profile */}
      <nav className="fixed top-0 left-0 w-full z-[60] flex items-center px-4 md:px-6 lg:px-8 py-2.5 md:py-3 border-b bg-white/[0.02] backdrop-blur-2xl border-white/[0.08] shadow-[0_4px_24px_0_rgba(0,0,0,0.6)]">
        {/* Left: Logo Section */}
        <div className="flex-none flex justify-start items-center gap-2 md:gap-3">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/5 text-white transition-all active:scale-90"
            aria-label="Toggle Menu"
          >
            <iconify-icon icon={isMenuOpen ? "lucide:x" : "lucide:menu"} width="18"></iconify-icon>
          </button>

          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="group flex items-center justify-center transition-all duration-300 active:scale-95 text-left"
            aria-label="Go to Home"
          >
            <Logo variant="full" />
          </button>
        </div>
        
        {/* Middle: Navigation Links - Centered between Logo and CTA */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <div className="flex items-center gap-0.5 lg:gap-1 p-0.5 rounded-full border backdrop-blur-md bg-white/5 border-white/10">
            {['home', 'services', 'results', 'reviews', 'about', 'contact'].map((viewName) => {
              const isActive = currentView === viewName;
              const isReviews = viewName === 'reviews';
              
              return (
                <button 
                  key={viewName}
                  onClick={() => onNavigate(viewName as any)}
                  className={`px-2.5 lg:px-4 py-1.5 text-[10.5px] lg:text-[11.5px] font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                    isActive ? 'text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  } ${isReviews ? 'hidden lg:block' : ''}`}
                >
                  {viewName === 'about' ? 'About us' : viewName.charAt(0).toUpperCase() + viewName.slice(1)}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right: CTA Group (Desktop/Tablet) */}
        <div className="flex-none flex justify-end items-center gap-2 md:gap-3 lg:gap-6">
          <a 
            href="https://wa.link/uglvus" 
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-2 text-[11px] font-medium transition-all duration-300 hover:scale-105 active:scale-95 text-blue-400 hover:text-blue-300"
          >
            <iconify-icon icon="logos:whatsapp-icon" width="14"></iconify-icon>
            <span className="whitespace-nowrap">9316093678</span>
          </a>
          <div className="h-4 w-px hidden xl:block bg-white/10"></div>
          
          {/* Main CTA for Desktop/Tablet - Slightly more compact */}
          <button 
            onClick={() => handleMobileNav('contact')}
            className="hidden md:block group transition-all duration-300 overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95 text-[10px] lg:text-[11px] font-semibold text-white bg-[#0a0a0c] border-white/10 border rounded-lg px-4 lg:px-5 py-1.5 lg:py-2 relative shrink-0"
          >
            <span className="relative flex flex-col h-3 lg:h-3.5 overflow-hidden">
              <span className="transition-transform duration-300 group-hover:-translate-y-3 lg:group-hover:-translate-y-3.5 whitespace-nowrap">Book AI Audit</span>
              <span className="absolute top-3 lg:top-3.5 left-0 transition-transform duration-300 group-hover:-translate-y-3 lg:group-hover:-translate-y-3.5 text-blue-300 whitespace-nowrap">Start Audit →</span>
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile-only Floating Bottom-Right Button: Compact, refined roundness (rounded-lg) */}
      <div className="md:hidden fixed bottom-4 right-4 z-[70] animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => handleMobileNav('contact')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-[0_8px_20px_rgba(37,99,235,0.25)] border border-blue-400/20 active:scale-90 transition-all hover:bg-blue-500"
        >
          <span className="text-[9px] uppercase tracking-wider whitespace-nowrap pl-0.5">Book AI Audit</span>
          <iconify-icon icon="lucide:arrow-right" width="12"></iconify-icon>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={`md:hidden fixed inset-0 z-50 bg-[#020204]/98 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full pt-32 px-6 pb-12 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {[
              { label: 'Home', view: 'home' },
              { label: 'Services', view: 'services' },
              { label: 'Results', view: 'results' },
              { label: 'Reviews', view: 'reviews' },
              { label: 'About us', view: 'about' },
              { label: 'Contact', view: 'contact' },
            ].map((item) => (
              <button 
                key={item.label}
                onClick={() => handleMobileNav(item.view as any)}
                className={`w-full text-left py-4 px-6 text-xl font-medium rounded-2xl border transition-all ${
                  currentView === item.view
                    ? 'text-white border-blue-500/20 bg-blue-500/5' 
                    : 'text-slate-400 border-white/5 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-auto pt-12">
            <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Direct Connection</p>
              <a 
                href="https://wa.link/uglvus" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white hover:text-blue-400 transition-colors mb-6"
              >
                <iconify-icon icon="logos:whatsapp-icon" width="20"></iconify-icon>
                <span className="text-lg">9316093678</span>
              </a>
              <button 
                onClick={() => handleMobileNav('contact')}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                Book AI Audit
                <iconify-icon icon="lucide:arrow-right" width="18"></iconify-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;