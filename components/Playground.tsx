import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService.ts';
import { Message } from '../types.ts';

const Playground: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', content: "Hello! I am Autonexgen's virtual assistant. How can I help you automate your business today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "What services do you offer?",
    "How does pricing work?",
    "Can you automate my CRM?",
    "Where is Autonexgen based?"
  ];

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior
      });
    }
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      scrollToBottom('auto');
      return;
    }
    scrollToBottom('smooth');
  }, [messages, isTyping]);

  const handleSendMessage = async (text?: string) => {
    const messageToSend = text || inputValue;
    if (!messageToSend.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: messageToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await getGeminiResponse(messageToSend);
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', content: response };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { id: 'err', role: 'bot', content: "Something went wrong. Please check your connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="demo" className="relative py-24 bg-transparent border-t border-white/5 z-10">
      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Interactive Demo</span>
          <h2 className="text-3xl font-serif mt-4 mb-4 text-white">Experience Autonexgen's AI</h2>
          <p className="font-light text-slate-400">Try our AI agent. Ask about "Services", "Pricing", or see how we handle custom queries.</p>
        </div>

        <div className="relative rounded-xl border bg-[#08080a] shadow-2xl overflow-hidden max-w-2xl mx-auto border-white/10">
          <div className="flex border-white/5 border-b py-3 px-4 items-center justify-between bg-black/40">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500/40"></div>
            </div>
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">Autonexgen_Agent_v4.2</div>
            <div className="w-10"></div>
          </div>
          
          <div 
            ref={chatContainerRef}
            className="h-[400px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-black/50 to-black/80 font-mono scroll-smooth scrollbar-thin scrollbar-thumb-white/10"
          >
            {messages.map(msg => msg && (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                {msg.role === 'bot' && (
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_10px_rgba(37,99,235,0.1)]">
                    <iconify-icon icon="lucide:bot" class="text-blue-400" width="16"></iconify-icon>
                  </div>
                )}
                <div className={`text-[11px] md:text-xs px-4 py-3 rounded-2xl max-w-[85%] border shadow-xl leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600/90 text-white border-blue-400/30 rounded-tr-none' 
                    : 'bg-[#0f0f11]/80 text-slate-300 border-white/10 rounded-tl-none backdrop-blur-md'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <iconify-icon icon="lucide:bot" class="text-blue-400" width="16"></iconify-icon>
                </div>
                <div className="flex gap-1.5 bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none border border-white/5">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full typing-dot"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full typing-dot [animation-delay:-0.32s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full typing-dot [animation-delay:-0.16s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="border-white/5 border-t p-4 bg-black/60">
            {messages.length < 3 && !isTyping && (
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestions.map((text) => (
                  <button
                    key={text}
                    onClick={() => handleSendMessage(text)}
                    className="text-[10px] font-mono py-1.5 px-3 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all active:scale-95"
                  >
                    {text}
                  </button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask our AI agent anything..." 
                className="flex-1 focus:outline-none focus:border-blue-500/40 transition-colors placeholder:text-slate-700 text-xs text-white bg-black/40 border-white/10 border rounded-xl px-4 py-3"
              />
              <button 
                onClick={() => handleSendMessage()}
                disabled={isTyping || !inputValue.trim()}
                className="hover:bg-blue-500 transition-all active:scale-95 text-white bg-blue-600 rounded-xl px-4 py-3 disabled:opacity-30 disabled:grayscale"
              >
                <iconify-icon icon="lucide:send" width="18"></iconify-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playground;