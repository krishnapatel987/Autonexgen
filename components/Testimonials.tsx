import React from 'react';

const testimonials = [
  {
    logo: 'logos:hulu',
    rating: '4.9',
    name: 'Rohan Mehta',
    quote: "The automation workflows Autonexgen built for our support team are incredible. Motivating to see how much time we save weekly.",
    color: 'text-[#1ce783]'
  },
  {
    logo: 'logos:hbo',
    rating: '4.7',
    name: 'Amit Patel',
    quote: "Integrating our streaming metrics into a real-time AI dashboard was seamless. The progress tracking is truly fantastic.",
    color: 'text-white'
  },
  {
    logo: 'logos:disney-plus',
    rating: '4.9',
    name: 'Sanjay Sharma',
    quote: "Our lead qualification velocity has improved 3x since deploying their agents. The app has a great mix of features.",
    color: 'text-[#0063e5]'
  },
  {
    logo: 'simple-icons:starz',
    rating: '4.6',
    name: 'Kunal Verma',
    quote: "Highly efficient team. They took our complex scheduling logic and turned it into an autonomous system that just works.",
    color: 'text-white'
  },
  {
    logo: 'simple-icons:vix',
    rating: '4.9',
    name: 'Priya Desai',
    quote: "The AI strategy audit revealed bottlenecks we didn't even know we had. Professional engineering at its finest.",
    color: 'text-[#f57e20]'
  },
  {
    logo: 'logos:amazon-prime-video',
    rating: '4.8',
    name: 'Fatima Mohamed',
    quote: "Reliable, scalable, and intelligent. Their custom AI solutions have become a core part of our daily operations.",
    color: 'text-[#00a8e1]'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 border-t border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-medium font-serif text-white mb-6">
            Our trusted <span className="bg-blue-600 px-4 py-1 rounded-lg italic">Clients</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Our mission is to drive progress and enhance the lives of our customers by delivering superior products and services that exceed expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {testimonials.map((t, i) => (
            <div 
              key={i}
              className="group relative p-8 rounded-3xl border bg-white/[0.02] border-white/5 transition-all duration-500 ease-out hover:bg-white/[0.04] hover:border-blue-500/40 hover:-translate-y-2 hover:scale-[1.05] hover:[transform:rotateX(1deg)_rotateY(-1deg)] shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-8">
                <div className={`text-2xl font-bold transition-transform duration-500 group-hover:scale-110 ${t.color}`}>
                  <iconify-icon icon={t.logo} height="28"></iconify-icon>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-300">
                  <span>{t.rating}</span>
                  <iconify-icon icon="lucide:star" class="text-emerald-400" width="12"></iconify-icon>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-10 font-light group-hover:text-white transition-colors">
                "{t.quote}"
              </p>

              <div className="mt-auto">
                <div className="text-white font-medium text-base mb-0.5">{t.name}</div>
                <div className="text-[10px] font-mono text-blue-400/60 uppercase tracking-widest font-bold">Verified Partner</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;