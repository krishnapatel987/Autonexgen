
import React from 'react';

interface LogoProps {
  variant?: 'icon' | 'full';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className = "" }) => {
  // Balanced size for the icon to avoid collisions on small screens
  // Tablet: w-11, Desktop: w-14
  const iconSize = 'w-9 h-9 md:w-11 md:h-11 lg:w-14 lg:h-14';

  return (
    <div className={`flex items-center gap-2 md:gap-3 lg:gap-4 ${className}`}>
      {/* Logo Image Container */}
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src="https://raw.githubusercontent.com/krishnapatel987/logo-98727/main/Logo%20png%20upload.png" 
          alt="Autonexgen Logo"
          className={`${iconSize} object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(37,99,235,0.5)]`}
          onError={(e) => {
            // Fallback to a placeholder icon if the external link fails
            (e.target as HTMLImageElement).src = 'https://api.iconify.design/lucide:rocket.svg?color=%233b82f6';
          }}
        />
        {/* Subtle background glow behind the PNG */}
        <div className="absolute inset-0 bg-blue-500/15 blur-2xl rounded-full -z-10 animate-pulse"></div>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col justify-center -space-y-0.5 md:-space-y-1">
          {/* Brand Name - Adjusted for mobile (18px), tablet (20px), and desktop (24px) */}
          <span className="text-[18px] md:text-[20px] lg:text-[24px] font-bold text-white tracking-tighter uppercase leading-none">
            AUTONEXGEN
          </span>
          {/* Tagline - Adjusted for mobile (8px), tablet (9px), and desktop (10.5px) */}
          <span className="text-[8px] md:text-[9px] lg:text-[10.5px] font-mono text-blue-300 uppercase tracking-[0.22em] whitespace-nowrap opacity-90">
            Next-Gen Intelligent Automation
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
