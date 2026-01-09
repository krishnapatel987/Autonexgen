
import React, { useEffect, useRef, useState } from 'react';
import { SERVICES } from '../constants';

interface ServicesPageProps {
  onNavigate: (view: 'home' | 'services' | 'about' | 'contact' | 'careers' | 'blog' | 'privacy' | 'terms' | 'results', sectionId?: string) => void;
}

// Internal Reveal helper for the page
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

const StrategySimulation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);

  const roadmapSteps = [
    { label: 'Discovery Audit', icon: 'lucide:search', status: 'Scanning Ops...' },
    { label: 'Feasibility Study', icon: 'lucide:file-check', status: 'Analyzing ROI...' },
    { label: 'Architecture Design', icon: 'lucide:drafting-compass', status: 'Mapping Flows...' },
    { label: 'Implementation', icon: 'lucide:rocket', status: 'Ready for Deploy' }
  ];

  const businessUnits = [
    { name: 'Customer Support', impact: '92%', color: 'bg-blue-500' },
    { name: 'Sales Pipeline', impact: '78%', color: 'bg-indigo-500' },
    { name: 'Data Management', impact: '64%', color: 'bg-purple-500' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % roadmapSteps.length);
      setScanProgress(0);
    }, 3000);

    const progressInterval = setInterval(() => {
      setScanProgress(p => (p < 100 ? p + 2 : 100));
    }, 40);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#0a0a0c] rounded-[22px] flex flex-col p-6 font-sans relative overflow-hidden group/strat-sim">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 blur-3xl pointer-events-none"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <iconify-icon icon="lucide:presentation" class="text-purple-400" width="16"></iconify-icon>
          </div>
          <div>
            <div className="text-[10px] font-mono text-white uppercase tracking-widest font-bold">Strategy Engine v1.2</div>
            <div className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">Current: {roadmapSteps[activeStep].status}</div>
          </div>
        </div>
        <div className="flex gap-1.5 items-center">
           <span className="text-[9px] font-mono text-emerald-400 font-bold tracking-tighter">EST. 35% OPEX SAVINGS</span>
        </div>
      </div>

      {/* Main Content: Impact Matrix */}
      <div className="flex-1 grid grid-cols-1 gap-6 relative">
        <div className="space-y-4">
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">High Impact Business Units</div>
          {businessUnits.map((unit, i) => (
            <div key={i} className="space-y-1.5 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex justify-between items-center text-[10px] text-white font-medium">
                <span>{unit.name}</span>
                <span className="text-slate-400 font-mono">{unit.impact}</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${unit.color} transition-all duration-1000 ease-out`} 
                  style={{ width: activeStep > 0 ? unit.impact : '5%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Strategy Roadmap Timeline */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-4">Implementation Timeline</div>
          <div className="flex justify-between px-2">
            {roadmapSteps.map((step, i) => (
              <div key={i} className={`flex flex-col items-center gap-2 transition-all duration-500 ${activeStep === i ? 'scale-110' : 'opacity-40 grayscale'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${activeStep === i ? 'bg-purple-500/20 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'bg-white/5 border-white/10'}`}>
                  <iconify-icon icon={step.icon} class={activeStep === i ? 'text-purple-300' : 'text-slate-500'} width="18"></iconify-icon>
                </div>
                <div className="text-[8px] font-mono text-center uppercase tracking-tighter max-w-[40px] leading-tight text-white">{step.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Audit Status */}
      <div className="mt-8 p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <iconify-icon icon="lucide:radar" class="text-purple-400 animate-spin text-sm" style={{ animationDuration: '3s' }}></iconify-icon>
           <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Scanning Enterprise Architecture...</span>
        </div>
        <div className="text-[8px] font-mono text-white">{scanProgress}%</div>
      </div>
    </div>
  );
};

const CustomAISimulation: React.FC = () => {
  const [phase, setPhase] = useState<'learning' | 'analyzing' | 'predicting'>('learning');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setPhase(prev => {
            if (prev === 'learning') return 'analyzing';
            if (prev === 'analyzing') return 'predicting';
            return 'learning';
          });
          return 0;
        }
        return p + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#0a0a0c] rounded-[22px] flex flex-col p-6 font-sans relative overflow-hidden group/custom-sim">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center">
            <iconify-icon icon="lucide:cpu" class="text-blue-400" width="16"></iconify-icon>
          </div>
          <div>
            <div className="text-[10px] font-mono text-white uppercase tracking-widest font-bold">Proprietary Core v3.0</div>
            <div className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">Status: {phase.toUpperCase()}...</div>
          </div>
        </div>
        <div className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] font-mono text-blue-400">99.8% ACCURACY</div>
      </div>

      {/* Main Visualization Center */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Central Neural Hub */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Rotating Rings */}
          <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute inset-2 border border-blue-500/10 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>
          <div className="absolute inset-4 border border-blue-500/5 rounded-full animate-[spin_15s_linear_infinite]"></div>
          
          {/* Core Core */}
          <div className={`w-16 h-16 rounded-full bg-blue-600/20 border border-blue-400/30 flex items-center justify-center relative z-20 shadow-[0_0_40px_rgba(37,99,235,0.2)] transition-transform duration-500 ${phase === 'predicting' ? 'scale-110' : 'scale-100'}`}>
             <iconify-icon icon={phase === 'predicting' ? 'lucide:sparkles' : 'lucide:brain'} class="text-white text-2xl animate-pulse"></iconify-icon>
          </div>

          {/* Pulse Waves */}
          <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping opacity-20"></div>
        </div>

        {/* Data Stream Simulation */}
        <div className="mt-8 w-full max-w-xs space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] font-mono text-slate-500 uppercase">
              <span>Model Convergence</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-100" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
               <div className="text-[8px] text-slate-600 uppercase mb-1">Inference Latency</div>
               <div className="text-sm font-mono text-blue-300">14ms</div>
            </div>
            <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
               <div className="text-[8px] text-slate-600 uppercase mb-1">Pattern Clusters</div>
               <div className="text-sm font-mono text-blue-300">1.2k</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Label */}
      <div className="mt-6 flex justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40">
           <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
           <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Neural Learning Mode Active</span>
        </div>
      </div>
    </div>
  );
};

const WorkflowSimulation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<string[]>(["[09:00:01] System Idle"]);
  
  const steps = [
    { label: 'Webhook Inbound', icon: 'lucide:zap', color: 'text-orange-400' },
    { label: 'AI Content Analysis', icon: 'lucide:brain-circuit', color: 'text-blue-400' },
    { label: 'Multi-App Sync', icon: 'lucide:layers', color: 'text-indigo-400' }
  ];

  const logEntries = [
    "Receiving lead data via Webhook...",
    "Analyzing intent with GPT-4o...",
    "Lead classified: High Intent",
    "Mapping fields to CRM...",
    "Sending Slack notification...",
    "Updating HubSpot deal pipeline...",
    "Workflow complete. Awaiting next trigger."
  ];

  useEffect(() => {
    let logIdx = 0;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
      
      // Simulate logging
      if (logIdx < logEntries.length) {
        setLogs(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ${logEntries[logIdx]}`]);
        logIdx++;
      } else {
        logIdx = 0;
        setLogs(["[09:00:01] Pipeline Resetting..."]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#0a0a0c] rounded-[22px] flex flex-col p-6 font-sans relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Pipeline: Autonomous_Lead_Sync</span>
        </div>
        <div className="text-[9px] font-mono text-slate-600">v2.4.0-STABLE</div>
      </div>

      {/* Visual Pipeline */}
      <div className="flex-1 flex items-center justify-between px-4 relative">
        {/* Connecting Lines with Data Pulse */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-emerald-500/50 -translate-y-1/2 overflow-hidden">
           <div className="h-full w-20 bg-white shadow-[0_0_15px_#fff] animate-[move_2s_linear_infinite]"></div>
        </div>

        {steps.map((step, i) => {
          const isActive = activeStep === i;
          return (
            <div key={i} className="relative z-10 flex flex-col items-center gap-3">
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 ${
                isActive 
                  ? 'bg-white/10 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] scale-110' 
                  : 'bg-[#0f0f11] border-white/10 text-slate-600'
              }`}>
                <iconify-icon icon={step.icon} class={`${isActive ? step.color : 'text-slate-600'} text-2xl transition-colors`}></iconify-icon>
              </div>
              <span className={`text-[9px] font-mono uppercase tracking-tighter text-center max-w-[60px] leading-tight ${isActive ? 'text-white' : 'text-slate-600'}`}>
                {step.label}
              </span>
            </div>
          );
        })}

        {/* End Node */}
        <div className="flex flex-col gap-2">
          <div className={`w-8 h-8 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center transition-opacity ${activeStep === 3 ? 'opacity-100' : 'opacity-40'}`}>
            <iconify-icon icon="logos:slack-icon" width="14"></iconify-icon>
          </div>
          <div className={`w-8 h-8 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center transition-opacity ${activeStep === 3 ? 'opacity-100' : 'opacity-40'}`}>
            <iconify-icon icon="logos:hubspot" width="14"></iconify-icon>
          </div>
        </div>
      </div>

      {/* Console Log */}
      <div className="mt-8 bg-black/50 rounded-xl border border-white/5 p-4 font-mono text-[9px] text-slate-500 h-28 overflow-hidden">
        {logs.map((log, i) => (
          <div key={i} className="mb-1 animate-in fade-in slide-in-from-left-2 duration-300">
            <span className="text-emerald-500/70 mr-2">&gt;</span>
            {log}
          </div>
        ))}
        {activeStep !== 0 && (
          <div className="flex gap-1 mt-1">
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-75"></div>
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-150"></div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes move {
          from { transform: translateX(-100%); }
          to { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
};

const AgentSimulation: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'agent', text: string }[]>([]);
  const [status, setStatus] = useState<'idle' | 'listening' | 'thinking' | 'responding'>('idle');
  
  // Define conversation with explicit roles to fix type inference issues in setMessages
  const conversation: { role: 'user' | 'agent', text: string }[] = [
    { role: 'user', text: "Hello, I'm looking to automate my lead follow-ups." },
    { role: 'agent', text: "I can help with that. Are you currently using a CRM like HubSpot or Salesforce?" },
    { role: 'user', text: "We use HubSpot, but the volume is too high for our team." },
    { role: 'agent', text: "Understood. I can deploy an agent to qualify leads 24/7 and sync details directly to HubSpot." }
  ];

  useEffect(() => {
    let currentIdx = 0;
    let timeout: any;

    const runLoop = () => {
      const step = conversation[currentIdx];
      if (!step) return;
      
      if (step.role === 'user') {
        setStatus('listening');
        timeout = setTimeout(() => {
          // Properly typed step ensures compatibility with messages state
          setMessages(prev => [...prev, step]);
          currentIdx++;
          timeout = setTimeout(runLoop, 1000);
        }, 1500);
      } else {
        setStatus('thinking');
        timeout = setTimeout(() => {
          setStatus('responding');
          // Properly typed step ensures compatibility with messages state
          setMessages(prev => [...prev, step]);
          currentIdx++;
          if (currentIdx < conversation.length) {
            timeout = setTimeout(runLoop, 2000);
          } else {
            timeout = setTimeout(() => {
              setMessages([]);
              currentIdx = 0;
              runLoop();
            }, 4000);
          }
        }, 1200);
      }
    };

    runLoop();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full h-full bg-[#0a0a0c] rounded-[22px] flex flex-col p-6 font-sans relative overflow-hidden group/sim">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl pointer-events-none"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <iconify-icon icon="lucide:bot" class="text-blue-400" width="16"></iconify-icon>
          </div>
          <div>
            <div className="text-[10px] font-mono text-white uppercase tracking-widest font-bold">Neural Agent v4</div>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${status !== 'idle' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></span>
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">
                {status === 'listening' ? 'User Typing...' : status === 'thinking' ? 'Reasoning...' : status === 'responding' ? 'Generating...' : 'Standby'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-slate-800"></div>)}
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 space-y-4 overflow-hidden mb-4 pr-1">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] {line-height: relaxed} ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none shadow-[0_4px_12px_rgba(37,99,235,0.2)]' 
                : 'bg-white/5 text-slate-300 border border-white/10 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {status === 'thinking' && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10 flex gap-1">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Voice Visualizer Section */}
      <div className="h-12 border-t border-white/5 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-end gap-[2px] h-4">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className={`w-[2px] bg-blue-500/40 rounded-full transition-all duration-300 ${
                  status !== 'idle' ? 'animate-[wave_1s_ease-in-out_infinite]' : 'h-1'
                }`}
                style={{ 
                  height: status !== 'idle' ? `${Math.random() * 100}%` : '4px',
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
          <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Voice Active</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <iconify-icon icon="lucide:mic" class="text-slate-500 text-xs"></iconify-icon>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
};

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    if (!window.location.hash.includes('#')) {
      window.scrollTo(0, 0);
    }
  }, []);

  const techStack = [
    { name: 'OpenAI', icon: 'simple-icons:openai', colorClass: 'text-white' },
    { name: 'Anthropic', icon: 'simple-icons:anthropic', colorClass: 'text-white' },
    { name: 'Zapier', icon: 'logos:zapier-icon' },
    { name: 'HubSpot', icon: 'logos:hubspot' },
    { name: 'Salesforce', icon: 'logos:salesforce' },
    { name: 'WhatsApp API', icon: 'logos:whatsapp-icon' },
    { name: 'Twilio', icon: 'logos:twilio-icon' },
    { name: 'Python', icon: 'logos:python' },
  ];

  return (
    <div className="relative pt-32 pb-20 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <Reveal>
          <div className="mb-24 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-mono uppercase tracking-widest mb-6 text-blue-400">
              Our Expertise
            </div>
            <h1 className="text-5xl md:text-7xl font-medium font-newsreader text-white mb-8 leading-tight">
              Advanced AI <span className="italic text-blue-400">Architectures</span><br />
              for the Modern Enterprise.
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
              We don't just build chatbots; we design autonomous ecosystems that learn, adapt, and drive measurable ROI across every department.
            </p>
          </div>
        </Reveal>

        {/* Detailed Services Grid */}
        <div className="space-y-32">
          {SERVICES.map((service, idx) => (
            <div key={service.id} id={service.id} className="scroll-mt-32">
              <Reveal>
                <div 
                  className={`flex flex-col lg:flex-row gap-16 items-center ${
                    idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-white/10 bg-white/5 text-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.1)]`}>
                      <iconify-icon icon={service.icon} width="32"></iconify-icon>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-medium font-serif text-white mb-6">
                      {service.title}
                    </h2>
                    <p className="text-lg text-slate-400 mb-8 leading-relaxed font-light">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                      {service.tags?.map(tag => (
                        <div key={tag} className="flex items-center gap-3 text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <span className="text-sm">{tag}</span>
                        </div>
                      )) || (
                        <>
                          <div className="flex items-center gap-3 text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            <span className="text-sm">Scalable Infrastructure</span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            <span className="text-sm">Custom API Connectivity</span>
                          </div>
                        </>
                      )}
                    </div>
                    <button 
                      onClick={() => onNavigate('home', 'contact')}
                      className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-white hover:bg-white/10 transition-all flex items-center gap-2 group"
                    >
                      Get Started
                      <iconify-icon icon="lucide:arrow-right" class="group-hover:translate-x-1 transition-transform" width="16"></iconify-icon>
                    </button>
                  </div>

                  <div className="flex-1 w-full aspect-video rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-1 shadow-2xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Simulation Switcher */}
                    {service.id === 'agents' ? (
                      <AgentSimulation />
                    ) : service.id === 'workflows' ? (
                      <WorkflowSimulation />
                    ) : service.id === 'custom' ? (
                      <CustomAISimulation />
                    ) : service.id === 'strategy' ? (
                      <StrategySimulation />
                    ) : (
                      <div className="w-full h-full bg-[#0a0a0c] rounded-[22px] flex items-center justify-center p-8">
                        <div className="text-center">
                          <iconify-icon icon={service.icon} class="text-blue-500/20 text-8xl mb-4"></iconify-icon>
                          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Interactive Component Simulation</div>
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-white/10"></div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Tech Stack Marquee */}
        <div className="mt-40 pt-24 border-t border-white/5">
          <Reveal>
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 tracking-tight">
                Our Technology Stack
              </h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                We leverage industry-leading tools and architectures to build high-performance, fault-tolerant solutions.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex w-max gap-32 py-10 animate-scroll items-center will-change-transform">
                {[...techStack, ...techStack].map((tech, i) => (
                  <div 
                    key={i} 
                    className="flex flex-col items-center gap-6 transition-all cursor-default min-w-[130px] group"
                  >
                    <div className="h-12 flex items-center justify-center">
                      <iconify-icon 
                        icon={tech.icon} 
                        width="42" 
                        class={`transition-transform duration-500 group-hover:scale-110 ${tech.colorClass || ''}`}
                      ></iconify-icon>
                    </div>
                    <span className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.2em] group-hover:text-slate-300 transition-colors duration-300">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Final CTA */}
        <Reveal>
          <div className="mt-40 p-16 rounded-[3rem] border border-blue-500/20 bg-blue-500/[0.02] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_70%)] pointer-events-none"></div>
            <h2 className="text-4xl font-serif text-white mb-6 relative z-10">Start your transformation today.</h2>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10 leading-relaxed">
              Ready to reclaim 40% of your team's bandwidth? Let's discuss how our automation frameworks can fit your business.
            </p>
            <button 
              onClick={() => onNavigate('home', 'contact')}
              className="px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] relative z-10"
            >
              Schedule Free Strategy Session
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default ServicesPage;
