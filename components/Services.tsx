
import React, { useState } from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);

  // Rich content for each sub-category within the AI Agents card
  const tagDetails: Record<string, { description: string, icon: string, color: string, imageIcon: string }> = {
    'Voice Agents': {
      description: 'Human-like voice AI with < 500ms latency. Handles outbound cold calls and inbound support with natural prosody.',
      icon: 'lucide:phone-forwarded',
      color: 'blue',
      imageIcon: 'lucide:waves'
    },
    'WhatsApp Bots': {
      description: 'Deploy intelligent agents on WhatsApp. Automate orders, appointment scheduling, and lead qualification via the world\'s most popular app.',
      icon: 'logos:whatsapp-icon',
      color: 'green',
      imageIcon: 'lucide:message-square'
    },
    'Lead Gen': {
      description: 'Autonomous agents that scavenge, qualify, and book meetings. Turn your traffic into high-intent pipeline without human intervention.',
      icon: 'lucide:user-plus',
      color: 'indigo',
      imageIcon: 'lucide:trending-up'
    },
    'Support Desks': {
      description: '24/7 resolution agents trained on your documentation. Achieve 90%+ deflection rates while maintaining high CSAT scores.',
      icon: 'lucide:headphones',
      color: 'blue',
      imageIcon: 'lucide:shield-check'
    }
  };

  // N8N Workflow Visual Component
  const WorkflowVisual = () => (
    <div className="relative w-full h-48 bg-black/40 rounded-xl border border-white/5 overflow-hidden p-4 mt-6 animate-in fade-in zoom-in duration-700">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
      
      <div className="relative z-10 flex items-center justify-between h-full gap-2">
        {/* Trigger Node */}
        <div className="flex flex-col items-center gap-1 group/node">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center relative">
            <iconify-icon icon="lucide:form-input" width="20" class="text-blue-400"></iconify-icon>
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]"></div>
          </div>
          <span className="text-[8px] font-mono text-slate-500 uppercase">Trigger</span>
        </div>

        {/* Path Line */}
        <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-indigo-500/50 relative">
          <div className="absolute top-1/2 left-0 w-2 h-2 -translate-y-1/2 bg-blue-400 rounded-full animate-[ping_2s_infinite]"></div>
        </div>

        {/* AI Agent Node */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-14 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <iconify-icon icon="lucide:brain-circuit" width="24" class="text-indigo-400"></iconify-icon>
            <div className="flex gap-0.5 mt-1">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
            </div>
          </div>
          <span className="text-[8px] font-mono text-white font-bold">AI AGENT</span>
        </div>

        {/* Path Line Branch */}
        <div className="flex-1 flex flex-col items-center justify-center relative h-full">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0 50 Q 50 50 50 20 L 100 20" fill="none" stroke="rgba(99,102,241,0.3)" strokeWidth="1" />
                <path d="M 0 50 Q 50 50 50 80 L 100 80" fill="none" stroke="rgba(99,102,241,0.3)" strokeWidth="1" />
            </svg>
        </div>

        {/* End Nodes */}
        <div className="flex flex-col gap-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <iconify-icon icon="logos:slack-icon" width="16"></iconify-icon>
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                <iconify-icon icon="logos:hubspot" width="16"></iconify-icon>
            </div>
        </div>
      </div>
      
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[7px] font-mono text-slate-600 tracking-tighter whitespace-nowrap">
        n8n.io / Workflow Engine v4.2
      </div>
    </div>
  );

  return (
    <section id="services" className="relative py-32 border-t border-white/5 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6 font-serif text-white transition-opacity duration-500">
            End-to-end 
            <span className="font-serif text-blue-400 italic ml-2">digital transformation.</span>
          </h2>
          <p className="text-lg leading-relaxed font-light text-slate-400">
            We combine high-efficiency LLMs with robust automation workflows to deliver measurable growth for forward-thinking enterprises.
          </p>
        </div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000"
          onMouseLeave={() => {
            setHoveredServiceId(null);
            setHoveredTag(null);
          }}
        >
          {SERVICES.map((service, idx) => {
            const isServiceHovered = hoveredServiceId === service.id;
            const isOtherServiceHovered = hoveredServiceId !== null && hoveredServiceId !== service.id;
            const isWorkflows = service.id === 'workflows';

            return (
              <div 
                key={service.id} 
                onMouseEnter={() => setHoveredServiceId(service.id)}
                onMouseLeave={() => {
                  setHoveredServiceId(null);
                  setHoveredTag(null);
                }}
                className={`group relative overflow-hidden rounded-3xl border bg-[#050505]/80 p-8 transition-all duration-500 ease-out shadow-lg backdrop-blur-sm
                  ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                  ${isServiceHovered ? 'z-30 scale-[1.03] border-blue-500/40 shadow-2xl shadow-blue-500/10 opacity-100 translate-y-[-8px]' : 
                    isOtherServiceHovered ? 'scale-[0.96] opacity-20 grayscale border-white/5' : 
                    'border-white/10 opacity-100'}
                `}
              >
                {/* Dynamic Background Glow */}
                <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] transition-opacity duration-1000 ${
                  isServiceHovered ? 'opacity-30' : 'opacity-0'
                } ${
                  service.accent === 'blue' ? 'bg-blue-600' : 'bg-indigo-600'
                }`}></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6">
                    <div className={`inline-flex p-3.5 rounded-xl mb-6 border transition-all duration-500 ${
                      isServiceHovered ? 'scale-110 shadow-[0_0_20px_rgba(37,99,235,0.2)]' : ''
                    } ${
                      service.accent === 'blue' ? 'bg-blue-500/5 border-blue-500/20 text-blue-400' : 
                      service.accent === 'indigo' ? 'bg-indigo-500/5 border-indigo-500/20 text-indigo-400' :
                      'bg-purple-500/5 border-purple-500/20 text-purple-400'
                    }`}>
                      <iconify-icon icon={service.icon} width="32"></iconify-icon>
                    </div>
                    
                    <h3 className="text-2xl font-medium tracking-tight text-white mb-4 transition-colors group-hover:text-blue-300">
                      {service.title}
                    </h3>
                    
                    <p className={`text-base leading-relaxed text-slate-400 transition-all duration-500 ${
                      isServiceHovered ? 'text-slate-200' : ''
                    }`}>
                      {service.description}
                    </p>

                    {/* Expanded Workflow Detail */}
                    {isWorkflows && isServiceHovered && (
                        <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
                            <p className="text-sm text-blue-300/80 font-mono mb-4 leading-relaxed">
                                &gt; Integrating Make.com, n8n, and custom Python scripts to eliminate 40+ hours of manual data entry per week.
                            </p>
                            <WorkflowVisual />
                            <div className="grid grid-cols-2 gap-3 mt-6">
                                {['API First', 'Error Handling', 'Real-time Sync', 'Data Security'].map(feature => (
                                    <div key={feature} className="flex items-center gap-2 text-[10px] text-slate-400 bg-white/5 border border-white/5 px-2 py-1.5 rounded-lg">
                                        <iconify-icon icon="lucide:check" class="text-blue-500" width="10"></iconify-icon>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Expanded Custom Solution Detail */}
                    {service.id === 'custom' && isServiceHovered && (
                        <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent border border-white/5">
                                <div className="flex items-center gap-3 mb-3">
                                    <iconify-icon icon="lucide:terminal" class="text-blue-400" width="16"></iconify-icon>
                                    <span className="text-xs font-mono text-white">PROPRIETARY_ENGINE.JS</span>
                                </div>
                                <div className="space-y-1 font-mono text-[10px] text-slate-500">
                                    <p className="text-blue-400/60">const model = await loadCustomEngine();</p>
                                    <p>await model.train(businessData);</p>
                                    <p className="text-indigo-400/60">return model.predictROI();</p>
                                </div>
                            </div>
                        </div>
                    )}
                  </div>
                  
                  {service.tags && (
                    <div className={`flex flex-col gap-4 mt-6 transition-all duration-500 ${idx === 0 ? 'flex-1' : 'hidden md:flex'}`}>
                      {service.tags.map(tag => {
                        const isHovered = hoveredTag === tag;
                        const isOthersHovered = hoveredTag !== null && hoveredTag !== tag;
                        const details = tagDetails[tag];

                        return (
                          <div 
                            key={tag} 
                            onMouseEnter={() => {
                              if (idx === 0) setHoveredTag(tag);
                            }}
                            onMouseLeave={() => {
                              if (idx === 0) setHoveredTag(null);
                            }}
                            className={`flex flex-col border rounded-2xl transition-all duration-500 ease-out cursor-pointer relative overflow-hidden
                              ${idx === 0 ? (isHovered ? 'scale-[1.03] z-20 bg-blue-500/10 border-blue-500/40 shadow-[0_0_30px_rgba(37,99,235,0.15)] p-8' : 
                                isOthersHovered ? 'scale-95 opacity-30 border-white/5 bg-white/[0.01] p-6' : 
                                'bg-white/[0.03] border-white/5 p-6 hover:bg-white/5 hover:border-white/20') : 'p-4'}
                            `}
                          >
                            <div className="flex items-center gap-5">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 shrink-0
                                ${isHovered ? 'bg-blue-500/20 border-blue-500/30 scale-110' : 'bg-blue-500/5 border-blue-500/10'}
                              `}>
                                <iconify-icon icon={details?.icon || 'lucide:check-circle'} width="24" className="text-blue-400"></iconify-icon>
                              </div>
                              <div className="flex-1">
                                <span className={`font-mono uppercase tracking-widest transition-all duration-500 ${isHovered ? 'text-blue-300 text-base font-bold' : 'text-sm font-semibold text-slate-300'}`}>
                                  {tag}
                                </span>
                                
                                <div className={`grid transition-all duration-500 ease-in-out ${isHovered ? 'grid-rows-[1fr] mt-4 opacity-100' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}>
                                  <div className="overflow-hidden flex flex-col md:flex-row gap-6 items-center">
                                    <div className="flex-1">
                                      <p className="text-sm text-slate-300 leading-relaxed font-light">
                                        {details?.description}
                                      </p>
                                    </div>
                                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center relative shrink-0">
                                      <div className="absolute inset-0 bg-blue-400/10 blur-xl animate-pulse"></div>
                                      <iconify-icon icon={details?.imageIcon || 'lucide:cpu'} width="40" className="text-blue-300 relative z-10"></iconify-icon>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  <div className="mt-auto pt-8">
                    {service.link && (
                      <a href={service.link} className="inline-flex items-center gap-2 text-sm font-medium transition-all text-blue-400 hover:text-blue-300 group/link">
                        Start a project 
                        <iconify-icon icon="lucide:arrow-right" width="16" className="group-hover/link:translate-x-1 transition-transform"></iconify-icon>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
