
import React, { useEffect, useRef, useState } from 'react';
import { Review } from '../types';
import { supabase } from '../services/supabaseClient';

interface ReviewPageProps {
  onNavigate: (view: any) => void;
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

const ReviewPage: React.FC<ReviewPageProps> = ({ onNavigate }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Default static reviews to show if DB is empty or still loading
  const staticReviews: Review[] = [
    {
      id: 'static-1',
      name: 'Rohan Mehta',
      role: 'Operations Director at StreamFlow',
      rating: 5,
      content: "The automation workflows Autonexgen built for our support team are incredible. We've managed to reclaim over 20 hours of manual work every week.",
      date: 'March 15, 2025',
      isVerified: true
    },
    {
      id: 'static-2',
      name: 'Sanjay Sharma',
      role: 'Founder of PropStream',
      rating: 5,
      content: "The AI real-estate agent integration was seamless. Our lead qualification velocity has improved 3x since deploying their agents.",
      date: 'April 02, 2025',
      isVerified: true
    }
  ];

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const formattedReviews: Review[] = data.map(r => ({
          id: r.id.toString(),
          name: r.name,
          role: r.role,
          content: r.content,
          rating: r.rating,
          date: new Date(r.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          isVerified: r.is_verified
        }));
        setReviews(formattedReviews);
      } else {
        setReviews(staticReviews);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviews(staticReviews);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a star rating.");
    
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const reviewData = {
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      content: formData.get('content') as string,
      rating: rating,
      is_verified: false
    };

    try {
      const { error } = await supabase
        .from('reviews')
        .insert([reviewData]);

      if (error) throw error;

      setStatus('success');
      setRating(0);
      fetchReviews(); // Refresh list
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <div className="relative pt-32 pb-20 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <Reveal>
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-mono uppercase tracking-widest mb-6 text-blue-400">
              Client Feedback
            </div>
            <h1 className="text-5xl md:text-7xl font-medium font-newsreader text-white mb-8 leading-tight">
              Voices of <span className="italic text-blue-400">Innovation.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
              We take pride in every workflow we architect and every agent we deploy. Here’s what our partners have to say about the Autonexgen experience.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40 items-start">
          {/* Form Side */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <div className="p-8 rounded-[2.5rem] border border-white/10 bg-[#0a0a0c] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100"></div>
                
                {status === 'success' ? (
                  <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
                      <iconify-icon icon="lucide:check" class="text-blue-400 text-4xl"></iconify-icon>
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-3">Thank you for your feedback!</h3>
                    <p className="text-slate-400 text-sm mb-8">Your review has been successfully submitted and stored in our database.</p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white text-xs font-mono uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      Write Another Review
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <h2 className="text-2xl font-serif text-white mb-2">Share your experience</h2>
                    <p className="text-slate-500 text-sm mb-8">Your insights help us build better automation systems.</p>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 ml-1">Overall Rating</label>
                      <div className="flex gap-2 text-2xl">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(star)}
                            className="transition-all duration-300 transform active:scale-90"
                          >
                            <iconify-icon 
                              icon={star <= (hoveredRating || rating) ? "ic:round-star" : "ic:round-star-border"} 
                              class={`${star <= (hoveredRating || rating) ? 'text-blue-400' : 'text-white/10'} transition-colors duration-300`}
                            ></iconify-icon>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          required 
                          placeholder="Your Name"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 ml-1">Title / Company</label>
                        <input 
                          type="text" 
                          name="role" 
                          required 
                          placeholder="e.g. CEO at TechCorp"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 ml-1">Your Review</label>
                        <textarea 
                          name="content" 
                          required 
                          rows={4}
                          placeholder="Tell us about the impact of our automation..."
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl shadow-lg shadow-blue-900/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                      {status === 'submitting' ? (
                        <iconify-icon icon="lucide:loader-2" class="animate-spin text-xl"></iconify-icon>
                      ) : (
                        <>
                          Submit Review
                          <iconify-icon icon="lucide:send" class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" width="18"></iconify-icon>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* List Side */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
              {isLoading ? (
                <div className="py-20 text-center">
                  <iconify-icon icon="lucide:loader-2" class="animate-spin text-4xl text-blue-500"></iconify-icon>
                  <p className="mt-4 text-slate-500 font-mono text-xs uppercase tracking-widest">Accessing Intelligence Feed...</p>
                </div>
              ) : (
                reviews.map((review, i) => (
                  <Reveal key={review.id} delay={i * 100}>
                    <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-blue-500/20 transition-all duration-500 group/review-card relative">
                      {review.isVerified && (
                        <div className="absolute top-8 right-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                          <iconify-icon icon="lucide:badge-check" class="text-blue-400 text-xs"></iconify-icon>
                          <span className="text-[9px] font-mono text-blue-300 uppercase tracking-widest">Verified Client</span>
                        </div>
                      )}
                      
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, idx) => (
                          <iconify-icon 
                            key={idx}
                            icon="ic:round-star" 
                            class={`${idx < review.rating ? 'text-blue-400' : 'text-white/10'} text-lg transition-transform group-hover/review-card:scale-110`}
                            style={{ transitionDelay: `${idx * 50}ms` }}
                          ></iconify-icon>
                        ))}
                      </div>

                      <p className="text-lg text-slate-300 font-light leading-relaxed mb-8 italic">
                        "{review.content}"
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-white/10 flex items-center justify-center text-blue-400 font-bold overflow-hidden">
                            {review.avatar ? (
                              <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xs uppercase">{review.name.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <div className="text-sm text-white font-medium">{review.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{review.role}</div>
                          </div>
                        </div>
                        <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                          {review.date}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))
              )}
            </div>
            
            <Reveal delay={400}>
              <div className="mt-16 p-12 rounded-[3rem] border border-blue-500/10 bg-blue-500/[0.02] text-center">
                 <h3 className="text-xl font-serif text-white mb-4">Are you ready to be our next success story?</h3>
                 <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">Join the ranks of enterprises operating with near-zero latency and high efficiency.</p>
                 <button 
                  onClick={() => onNavigate('contact')}
                  className="px-10 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-900/30 transition-all active:scale-[0.98]"
                 >
                   Book Free AI Audit
                 </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
