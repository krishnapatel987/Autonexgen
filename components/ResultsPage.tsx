
import React, { useEffect, useRef, useState } from 'react';

interface ResultsPageProps {
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

const LeadQualificationSimulation: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'agent', text: string, type?: 'text' | 'card' | 'success' }[]>([]);
  const [status, setStatus] = useState<'idle' | 'typing'>('idle');

  const conversation = [
    { role: 'user', text: "Hey, is the 3BHK at Skyview Residences still available?", type: 'text' },
    { role: 'agent', text: "Searching inventory... Yes! We have 2 units left on the 14th floor. Here's the configuration:", type: 'card' },
    { role: 'user', text: "Looks great. Can I visit the site this Saturday?", type: 'text' },
    { role: 'agent', text: "Confirmed! I've scheduled your site visit for Sat, 11:00 AM. See you there!", type: 'success' }
  ];

  useEffect(() => {
    let currentIdx = 0;
    let timer: any;

    const runSim = () => {
      if (currentIdx < conversation.length) {
        const step = conversation[currentIdx];
        if (step.role === 'user') {
          timer = setTimeout(() => {
            setMessages(prev => [...prev, step as any]);
            currentIdx++;
            runSim();
          }, 1500);
        } else {
          setStatus('typing');
          timer = setTimeout(() => {
            setStatus('idle');
            setMessages(prev => [...prev, step as any]);
            currentIdx++;
            runSim();
          }, 2000);
        }
      } else {
        timer = setTimeout(() => {
          setMessages([]);
          currentIdx = 0;
          runSim();
        }, 5000);
      }
    };

    runSim();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-[#0a0a0c] p-6 flex flex-col relative overflow-hidden font-sans border border-blue-500/10">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl pointer-events-none"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <iconify-icon icon="logos:whatsapp-icon" width="16"></iconify-icon>
          </div>
          <div>
            <div className="text-[10px] font-mono text-white uppercase tracking-widest font-bold">PropStream AI</div>
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[8px] font-mono text-slate-500 uppercase">Lead Qualification Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
            {m.type === 'card' ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 w-[90%] space-y-3">
                <div className="text-[10px] text-blue-400 font-mono uppercase mb-1">Found Matching Unit</div>
                <div className="aspect-video w-full rounded-lg bg-slate-800 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400" 
                    className="w-full h-full object-cover opacity-60" 
                    alt="Property" 
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[9px] text-white">Skyview 1402</div>
                </div>
                <div className="text-[11px] text-slate-300 leading-tight">3BHK • 1850 sq.ft • ₹2.4 Cr</div>
                <div className="h-px bg-white/5 w-full"></div>
                <div className="text-[10px] text-slate-400">{m.text}</div>
              </div>
            ) : m.type === 'success' ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 w-[90%] flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <iconify-icon icon="lucide:calendar-check" class="text-emerald-400" width="16"></iconify-icon>
                </div>
                <div>
                   <div className="text-[11px] text-emerald-300 font-bold mb-1">Meeting Confirmed</div>
                   <div className="text-[10px] text-slate-300 leading-relaxed">{m.text}</div>
                </div>
              </div>
            ) : (
              <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white/5 text-slate-300 border border-white/10 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            )}
          </div>
        ))}
        {status === 'typing' && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10 flex gap-1">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Simulation Footer Overlay */}
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <iconify-icon icon="lucide:database" class="text-blue-500 text-xs"></iconify-icon>
            <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Connected to RAG Inventory</span>
         </div>
         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
      </div>
    </div>
  );
};

const CallVerificationSimulation: React.FC = () => {
  const [status, setStatus] = useState<'dialing' | 'connected' | 'verifying' | 'completed'>('dialing');
  const [transcript, setTranscript] = useState<{ role: 'ai' | 'customer', text: string }[]>([]);
  const [progress, setProgress] = useState(0);

  // Explicitly type the conversation array to fix inference errors in setTranscript
  const conversation: { role: 'ai' | 'customer', text: string }[] = [
    { role: 'ai', text: "Hello! This is Veda Satvaa's automated verification. Am I speaking with Rahul?" },
    { role: 'customer', text: "Yes, this is Rahul." },
    { role: 'ai', text: "Great. I see a COD order for the Ayurveda Hair Kit. Do you wish to confirm?" },
    { role: 'customer', text: "Yes, please confirm the order." },
    { role: 'ai', text: "Perfect. Order confirmed. It will reach you in 3-5 days. Thank you!" }
  ];

  useEffect(() => {
    let currentIdx = -1;
    let timer: any;

    const runSim = () => {
      if (currentIdx === -1) {
        setStatus('dialing');
        timer = setTimeout(() => {
          setStatus('connected');
          currentIdx = 0;
          runSim();
        }, 2000);
      } else if (currentIdx < conversation.length) {
        timer = setTimeout(() => {
          const step = conversation[currentIdx];
          if (!step) return;
          setTranscript(prev => [...prev, step]);
          setProgress(((currentIdx + 1) / conversation.length) * 100);
          currentIdx++;
          if (currentIdx === 3) setStatus('verifying');
          if (currentIdx === conversation.length) setStatus('completed');
          runSim();
        }, 1800);
      } else {
        timer = setTimeout(() => {
          setTranscript([]);
          setProgress(0);
          currentIdx = -1;
          runSim();
        }, 4000);
      }
    };

    runSim();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-[#08080a] p-6 flex flex-col relative overflow-hidden font-sans">
      {/* Simulation Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'}`}></div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            {status.toUpperCase()}...
          </span>
        </div>
        <div className="text-[9px] font-mono text-slate-600">ID: #ORD-9921</div>
      </div>

      {/* Main Visual: Waveform & Status */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="relative mb-8">
          {/* Pulsing Circles */}
          <div className={`absolute inset-0 rounded-full bg-blue-500/10 animate-ping duration-[3s] ${status === 'dialing' ? 'opacity-100' : 'opacity-0'}`}></div>
          <div className="w-20 h-20 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center relative z-10">
            <iconify-icon 
              icon={status === 'completed' ? "lucide:check-circle" : status === 'dialing' ? "lucide:phone-outgoing" : "lucide:mic"} 
              class={`${status === 'completed' ? 'text-emerald-400' : 'text-blue-400'} text-3xl`}
            ></iconify-icon>
          </div>
        </div>

        {/* Dynamic Waveform */}
        <div className="flex items-end gap-1 h-8 mb-8">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1 rounded-full transition-all duration-300 ${status === 'connected' || status === 'verifying' ? 'bg-blue-400/60 animate-[wave_1s_ease-in-out_infinite]' : 'bg-slate-800 h-1'}`}
              style={{ 
                height: status === 'connected' ? `${20 + Math.random() * 80}%` : '4px',
                animationDelay: `${i * 0.1}s`
              }}
            ></div>
          ))}
        </div>

        {/* Scrolling Transcript */}
        <div className="w-full space-y-3 max-h-32 overflow-hidden">
          {transcript.slice(-2).map((line, i) => line && (
            <div key={i} className={`flex ${line.role === 'ai' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2`}>
              <div className={`text-[10px] px-3 py-2 rounded-xl max-w-[80%] ${line.role === 'ai' ? 'bg-white/5 text-blue-300 border border-white/5' : 'bg-blue-600 text-white'}`}>
                {line.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Footer */}
      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex justify-between text-[9px] font-mono text-slate-500 uppercase mb-2">
          <span>Verification Integrity</span>
          <span>{status === 'completed' ? '100%' : `${Math.floor(progress)}%`}</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { height: 10%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
};

const ResultsPage: React.FC<ResultsPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const studies = [
    {
      id: 'veda-satvaa',
      client: 'Veda Satvaa',
      tagline: 'D2C Order Verification System',
      description: 'We built a custom Voice AI Agent that automatically triggers a phone call to customers immediately after a Cash on Delivery (COD) order is placed.',
      challenge: 'High RTO (Return to Origin) rates due to fake orders, impulsive purchases, and wrong contact details were bleeding the logistics budget.',
      solution: 'An autonomous outbound calling system using natural language processing to verify intent, confirm address details, and update the CRM in real-time.',
      impact: 'Reduced RTO orders by 55%, reclaiming significant logistics costs and improving inventory turnover velocity.',
      stats: [
        { label: 'RTO Reduction', value: '50-60%', icon: 'lucide:trending-down' },
        { label: 'Call Latency', value: '< 2 mins', icon: 'lucide:timer' },
        { label: 'Accuracy', value: '98.5%', icon: 'lucide:shield-check' }
      ],
      accent: 'emerald',
      imageIcon: 'lucide:phone-call',
      imageUrl: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'real-estate-bot',
      client: 'PropStream Global',
      tagline: '24/7 Lead Qualification Agent',
      description: 'Implementing an omni-channel AI agent across WhatsApp and Web to filter high-intent property buyers.',
      challenge: 'Sales teams were wasting 70% of their time on "window shoppers" and unqualified leads.',
      solution: 'A deep-RAG integration that answers property-specific questions and books site visits directly on the calendar.',
      impact: 'Increased lead-to-meeting conversion rate by 340% while reducing manual screening time by 90%.',
      stats: [
        { label: 'Conversion Lift', value: '3.4x', icon: 'lucide:zap' },
        { label: 'Manual Work Cut', value: '90%', icon: 'lucide:scissors' },
        { label: 'Meetings Booked', value: '1.2k+', icon: 'lucide:calendar' }
      ],
      accent: 'blue',
      imageIcon: 'lucide:calendar-check',
      imageUrl: 'https://images.unsplash.com/photo-1633211248426-537443bb7a99?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  return (
    <div className="relative pt-32 pb-20 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <Reveal>
          <div className="mb-24 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-mono uppercase tracking-widest mb-6 text-blue-400">
              Performance Metrics
            </div>
            <h1 className="text-5xl md:text-7xl font-medium font-newsreader text-white mb-8 leading-tight">
              Real Impact. <br />
              <span className="italic text-blue-400">Quantifiable</span> Success.
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
              Explore how we've helped leading organizations eliminate bottlenecks and drive exponential growth through intelligent automation.
            </p>
          </div>
        </Reveal>

        {/* Case Study Grid */}
        <div className="space-y-40">
          {studies.map((study, idx) => (
            <div key={study.id} className="relative group/case-study">
              <Reveal>
                <div className={`flex flex-col lg:flex-row gap-16 items-start ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Left Content Side */}
                  <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-blue-400 uppercase tracking-widest">
                          {study.client}
                        </span>
                        <div className="h-px flex-1 bg-white/5"></div>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-medium font-serif text-white">
                        {study.tagline}
                      </h2>
                    </div>

                    <p className="text-slate-400 text-lg leading-relaxed font-light">
                      {study.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono text-white uppercase tracking-widest flex items-center gap-2">
                          <iconify-icon icon="lucide:alert-circle" class="text-red-400"></iconify-icon>
                          The Challenge
                        </h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{study.challenge}</p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono text-white uppercase tracking-widest flex items-center gap-2">
                          <iconify-icon icon="lucide:check-circle" class="text-blue-400"></iconify-icon>
                          The Solution
                        </h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{study.solution}</p>
                      </div>
                    </div>

                    <div className="p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <iconify-icon icon="lucide:trophy" width="60"></iconify-icon>
                      </div>
                      <h4 className="text-sm font-mono text-blue-300 uppercase tracking-widest mb-4">The Impact</h4>
                      <p className="text-white text-lg font-serif italic mb-0 leading-relaxed">
                        "{study.impact}"
                      </p>
                    </div>
                  </div>

                  {/* Right Stats Side */}
                  <div className="w-full lg:w-96 space-y-6">
                    {study.stats.map((stat, i) => (
                      <div key={i} className="group/stat p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover/stat:scale-110 transition-transform">
                            <iconify-icon icon={stat.icon} width="20"></iconify-icon>
                          </div>
                          <span className="text-sm text-slate-500">{stat.label}</span>
                        </div>
                        <span className="text-2xl font-mono text-white font-medium">{stat.value}</span>
                      </div>
                    ))}
                    
                    <div className="aspect-square rounded-3xl border border-white/5 bg-[#0a0a0c] relative overflow-hidden shadow-2xl group-hover/case-study:border-blue-500/20 transition-all duration-700">
                       {study.id === 'veda-satvaa' ? (
                         <CallVerificationSimulation />
                       ) : study.id === 'real-estate-bot' ? (
                         <LeadQualificationSimulation />
                       ) : (
                         <>
                           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent_70%)] z-10 pointer-events-none"></div>
                           <img 
                              src={study.imageUrl} 
                              alt={study.client}
                              loading="lazy"
                              className="w-full h-full object-cover grayscale-[20%] group-hover/case-study:grayscale-0 group-hover/case-study:scale-110 transition-all duration-1000 bg-blue-500/5"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000';
                              }}
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                           <div className="absolute bottom-6 left-6 z-20">
                              <div className="w-12 h-12 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                <iconify-icon icon={study.imageIcon} class="text-blue-400" width="24"></iconify-icon>
                              </div>
                           </div>
                         </>
                       )}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Global Stats Banner */}
        <Reveal>
          <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8 py-20 border-y border-white/5">
            {[
              { val: '250k+', label: 'Conversations Handled' },
              { val: '₹4.5Cr+', label: 'Estimated Revenue Protected' },
              { val: '22,000+', label: 'Hours Reclaimed' }
            ].map((s, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="text-5xl font-newsreader text-white">{s.val}</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="mt-40 p-16 rounded-[3rem] border border-blue-500/20 bg-blue-500/[0.02] text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_70%)] pointer-events-none"></div>
             <h2 className="text-4xl font-serif text-white mb-6">Want results like these?</h2>
             <p className="text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
               Every business has hidden inefficiencies. Let's find yours and build the system that solves them once and for all.
             </p>
             <button 
               onClick={() => onNavigate('contact')}
               className="px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-900/30 transition-all active:scale-[0.98] relative z-10"
             >
               Book Your Free AI Audit
             </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default ResultsPage;
