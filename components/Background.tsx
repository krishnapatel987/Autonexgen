
import React, { useEffect } from 'react';

const Background: React.FC = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020204]">
      {/* Tech Grid */}
      <div className="tech-grid opacity-20"></div>
      
      {/* Spotlight */}
      <div className="spotlight-bg"></div>
      
      {/* Nebula Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[80px] animate-nebula opacity-30"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[80px] animate-nebula opacity-30 [animation-delay:2s]"></div>
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[80px] animate-nebula opacity-30"></div>
      </div>

      {/* Matrix Lines */}
      <div className="fixed inset-0 overflow-hidden opacity-50">
        {[15, 35, 55, 80].map((left, idx) => (
          <div 
            key={idx}
            className="absolute top-[-150px] w-px h-[300px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent falling-line"
            style={{ 
              left: `${left}%`, 
              animationDuration: `${4 + idx}s`, 
              animationDelay: `${idx * 0.5}s` 
            }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-10 bg-white/80 blur-[2px] shadow-[0_0_15px_rgba(37,99,235,0.6)]"></div>
          </div>
        ))}
      </div>

      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
    </div>
  );
};

export default Background;
