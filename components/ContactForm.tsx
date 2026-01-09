import React, { useState } from 'react';
import Logo from './Logo.tsx';
import { supabase } from '../services/supabaseClient.ts';

interface ContactFormProps {
  hideHeader?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ hideHeader = false }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const { error: supabaseError } = await supabase
        .from('inquiries')
        .insert([
          {
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
          }
        ]);

      if (supabaseError) {
        throw new Error(supabaseError.message || 'Database connection error.');
      }

      try {
        await fetch('https://innoinmedia.app.n8n.cloud/form/46bb1391-0172-4fbc-85d1-3266e762ec05', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          }
        });
      } catch (backupError) {
        console.warn('Backup workflow notification failed to trigger, but inquiry saved to DB.', backupError);
      }

      setStatus('success');
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'The system encountered an unexpected error.');
    }
  };

  return (
    <section id="contact" className={`relative ${hideHeader ? 'py-0' : 'py-24'} bg-transparent ${hideHeader ? '' : 'border-t border-white/5'} z-10`}>
      <div className={`${hideHeader ? 'max-w-none' : 'max-w-6xl mx-auto px-6'} relative`}>
        <div className={`relative rounded-3xl ${hideHeader ? 'border-0 bg-transparent' : 'border border-white/10 bg-[#0a0a0c]/80 backdrop-blur-2xl'} p-8 md:p-16 overflow-hidden shadow-2xl`}>
          {!hideHeader && <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>}
          
          <div className={`relative z-10 grid grid-cols-1 ${hideHeader ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-16 items-start`}>
            {!hideHeader && (
              <div>
                <div className="mb-10">
                  <Logo variant="full" />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-medium font-serif text-white mb-6 leading-tight">
                  Ready to <span className="text-blue-400 italic">automate</span> your growth?
                </h2>
                
                <p className="text-slate-400 text-lg mb-10 max-w-md leading-relaxed">
                  Enterprise-grade automation tailored to your unique business logic. Start your digital transformation journey with our experts today.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-blue-400 group-hover:border-blue-500/50 transition-colors">
                      <iconify-icon icon="lucide:map-pin" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-slate-500">Location</p>
                      <p className="text-white">Ahmedabad, Gujarat, India</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-blue-400 group-hover:border-blue-500/50 transition-colors">
                      <iconify-icon icon="lucide:mail" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-slate-500">Email</p>
                      <a href="mailto:contact@autonexgen.com" className="text-white hover:text-blue-400 transition-colors">contact@autonexgen.com</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={`${hideHeader ? 'p-0 bg-transparent border-0' : 'bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-md'} relative overflow-hidden min-h-[400px]`}>
              {status === 'success' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(37,99,235,0.2)] animate-pulse">
                    <iconify-icon icon="lucide:shield-check" class="text-blue-400 text-4xl"></iconify-icon>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3">Strategic Blueprint Initialized</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                    Your inquiry has been successfully synchronized. Our architects are currently reviewing your workflow requirements to build a custom roadmap. An expert will reach out within 24 hours.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-[10px] font-mono uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-all border border-blue-500/20 px-4 py-2 rounded-full bg-blue-500/5"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {hideHeader && <h3 className="text-xl font-medium text-white mb-6">Connect with our engineering team</h3>}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                      <input type="text" name="name" placeholder="e.g. Rahul Sharma" required disabled={status === 'loading'} className="w-full border rounded-xl px-4 py-3.5 text-sm focus:border-blue-500/50 focus:outline-none transition-all bg-black/40 border-white/10 text-white placeholder:text-slate-700 disabled:opacity-50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
                      <input type="email" name="email" placeholder="rahul@enterprise.com" required disabled={status === 'loading'} className="w-full border rounded-xl px-4 py-3.5 text-sm focus:border-blue-500/50 focus:outline-none transition-all bg-black/40 border-white/10 text-white placeholder:text-slate-700 disabled:opacity-50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                    <input type="tel" name="phone" placeholder="+91 00000 00000" required disabled={status === 'loading'} className="w-full border rounded-xl px-4 py-3.5 text-sm focus:border-blue-500/50 focus:outline-none transition-all bg-black/40 border-white/10 text-white placeholder:text-slate-700 disabled:opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 ml-1">Project Details</label>
                    <textarea name="message" placeholder="What complex tasks or bottlenecks can we automate for you?" rows={4} required disabled={status === 'loading'} className="w-full border rounded-xl px-4 py-3.5 text-sm focus:border-blue-500/50 focus:outline-none transition-all bg-black/40 border-white/10 text-white placeholder:text-slate-700 resize-none disabled:opacity-50"></textarea>
                  </div>
                  
                  {status === 'error' && (
                    <div className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-2 rounded-lg flex items-center gap-2">
                      <iconify-icon icon="lucide:alert-triangle"></iconify-icon>
                      {errorMessage}
                    </div>
                  )}

                  <button type="submit" disabled={status === 'loading'} className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-900/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group">
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2"><iconify-icon icon="lucide:loader-2" class="animate-spin"></iconify-icon> Initializing Sync...</span>
                    ) : (
                      <>Deploy Inquiry <iconify-icon icon="lucide:arrow-right" class="group-hover:translate-x-1 transition-transform" width="18"></iconify-icon></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;