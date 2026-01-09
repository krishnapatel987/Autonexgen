
import React, { useEffect, useRef, useState } from 'react';

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  imageIcon: string;
  content: React.ReactNode;
}

interface BlogPageProps {
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

const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All Posts');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedArticle, activeCategory]);

  const categories = ['All Posts', 'AI Research', 'Automation', 'Strategy', 'Tech Stack'];

  const articles: Article[] = [
    {
      id: 'ai-agents-2025',
      title: 'The Rise of Autonomous AI Agents in Enterprise Support',
      category: 'AI RESEARCH',
      date: 'May 12, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
      imageIcon: 'lucide:brain-circuit',
      excerpt: 'How large language models are transitioning from simple chatbots to fully autonomous agents capable of complex reasoning and tool use.',
      content: (
        <div className="space-y-6">
          <p className="text-xl text-slate-300 leading-relaxed font-newsreader italic">"The era of the simple text-response bot is over. We are entering the decade of the Autonomous Orchestrator."</p>
          <p>The landscape of enterprise customer support is undergoing a seismic shift. In 2025, the distinction between a "chatbot" and an "AI Agent" has become definitive. While chatbots follow scripts, AI Agents possess agency—the ability to reason, select tools, and execute workflows without constant human oversight.</p>
          <h3 className="text-2xl font-serif text-white pt-4">Beyond the Chat Window</h3>
          <p>Modern agents are now integrated directly into the infrastructure. When a customer asks about a delayed shipment, the agent doesn't just provide a tracking link. It queries the logistics database, identifies the bottleneck in the warehouse API, and initiates a priority rerouting—all within seconds.</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li>Reasoning Engines (Chain-of-Thought)</li>
            <li>Dynamic Tool Selection</li>
            <li>Long-term Context Retention</li>
            <li>Autonomous Conflict Resolution</li>
          </ul>
          <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 my-8">
            <h4 className="text-blue-300 font-mono text-sm uppercase mb-2">Technical Insight</h4>
            <p className="text-sm text-slate-400">By implementing Function Calling via advanced LLMs, we've seen a 400% increase in resolution accuracy compared to standard retrieval-based systems.</p>
          </div>
        </div>
      )
    },
    {
      id: 'workflow-advantage',
      title: 'Workflow Automation: The Invisible Competitive Advantage',
      category: 'AUTOMATION',
      date: 'May 08, 2025',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
      imageIcon: 'lucide:workflow',
      excerpt: 'Why the most successful companies in 2025 are focusing on "Invisible Workflows" to eliminate manual data silos and speed up operations.',
      content: (
        <div className="space-y-6">
          <p>Efficiency isn't about working faster; it's about removing the work that shouldn't exist. "Invisible Workflows" are the silent engines of the world's most profitable tech companies.</p>
          <h3 className="text-2xl font-serif text-white pt-4">The Cost of Manual Entry</h3>
          <p>Every time an employee copies data from a CRM into an invoice, or from a lead form into a spreadsheet, a company loses velocity. These micro-friction points accumulate into thousands of lost hours annually.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-blue-400 font-bold block mb-1">90%</span>
              <span className="text-xs text-slate-500">Reduction in human error</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-indigo-400 font-bold block mb-1">2.5 Weeks</span>
              <span className="text-xs text-slate-500">Saved per employee per year</span>
            </div>
          </div>
          <p>At Autonexgen, we specialize in identifying these friction points and bridging them with n8n and custom middleware. Our goal is a "Zero-Touch" data environment where intelligence flows automatically between departments.</p>
        </div>
      )
    },
    {
      id: 'rag-beyond-hype',
      title: 'Implementing RAG: Beyond the Hype',
      category: 'TECH STACK',
      date: 'April 28, 2025',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
      imageIcon: 'lucide:database',
      excerpt: 'A deep dive into Retrieval-Augmented Generation architectures and how to handle enterprise data security at scale.',
      content: (
        <div className="space-y-6">
          <p>Retrieval-Augmented Generation (RAG) has become the gold standard for enterprise AI. It solves the hallucination problem by grounding the model in factual, company-specific documentation.</p>
          <h3 className="text-2xl font-serif text-white pt-4">The Architecture of Truth</h3>
          <p>A successful RAG pipeline isn't just about connecting a vector database. It requires sophisticated chunking strategies, semantic reranking, and metadata filtering to ensure the model retrieves the *correct* information for every query.</p>
          <ul className="list-decimal pl-6 space-y-4 text-slate-400">
            <li><strong className="text-white">Ingestion:</strong> Processing PDFs, wikis, and databases into semantic vectors.</li>
            <li><strong className="text-white">Retrieval:</strong> Finding the most relevant context using hybrid search (Vector + Keyword).</li>
            <li><strong className="text-white">Generation:</strong> Synthesizing an answer that is technically accurate and safe.</li>
          </ul>
          <p>Security is the final, most critical layer. Enterprise RAG must respect role-based access control (RBAC), ensuring that the AI never reveals sensitive HR data to an unauthorized user during a routine query.</p>
        </div>
      )
    },
    {
      id: 'ai-cmo-strategy',
      title: 'AI Strategy for the Modern CMO',
      category: 'STRATEGY',
      date: 'April 15, 2025',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      imageIcon: 'lucide:trending-up',
      excerpt: 'How marketing leaders are using predictive AI to personalize customer journeys without sacrificing data privacy.',
      content: (
        <div className="space-y-6">
          <p>For the Chief Marketing Officer, AI is no longer a futuristic novelty—it is a survival tool. Predictive analytics are now allowing brands to anticipate customer needs before the customer even articulates them.</p>
          <h3 className="text-2xl font-serif text-white pt-4">Hyper-Personalization at Scale</h3>
          <p>The challenge has always been: how do you speak to a million customers individually? Generative AI provides the answer. By dynamically generating ad copy, email content, and landing pages based on real-time behavior, conversion rates are seeing triple-digit growth.</p>
          <p>However, with great power comes great responsibility. The modern CMO must balance these capabilities with stringent privacy standards, using on-device processing and anonymized data sets to build trust rather than just drive clicks.</p>
        </div>
      )
    }
  ];

  const featuredArticle: Article = {
    id: 'human-ai-collaboration',
    title: 'The Future of Human-AI Collaboration: 2025 and Beyond',
    category: 'FEATURED INSIGHT',
    date: 'May 15, 2025',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1600',
    imageIcon: 'lucide:sparkles',
    excerpt: 'As autonomous systems become more integrated into daily operations, the role of the human operator is shifting from "doer" to "orchestrator". We explore the ethical and practical implications of this shift.',
    content: (
      <div className="space-y-6">
        <p className="text-xl text-slate-300 leading-relaxed font-newsreader italic">"AI will not replace humans. But humans using AI will replace humans who don't."</p>
        <p>We are currently witnessing the Great Re-Skilling. As machines take over the tasks that can be modeled mathematically or linguistically, the value of uniquely human traits—empathy, strategic vision, and complex ethics—is skyrocketing.</p>
        <h3 className="text-2xl font-serif text-white pt-4">The Orchestrator Mindset</h3>
        <p>In the near future, your job will not be to write the report, but to guide the agent that writes the report. You will be the conductor of an orchestra of intelligent agents, each specializing in a different domain of your business.</p>
        <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 my-10">
          <h4 className="text-lg font-serif text-white mb-2">Key Trends for 2026:</h4>
          <ul className="space-y-3 text-slate-400">
            <li className="flex gap-3"><iconify-icon icon="lucide:check" class="text-blue-500 mt-1"></iconify-icon> Multi-modal reasoning (Sight, Sound, Text)</li>
            <li className="flex gap-3"><iconify-icon icon="lucide:check" class="text-blue-500 mt-1"></iconify-icon> Decentralized, on-device AI</li>
            <li className="flex gap-3"><iconify-icon icon="lucide:check" class="text-blue-500 mt-1"></iconify-icon> Ethical guardrails as a built-in feature</li>
          </ul>
        </div>
        <p>The companies that thrive in this era will be those that embrace AI not as a cost-cutting measure, but as a capability multiplier. It is time to stop fearing the automation and start mastering the orchestration.</p>
      </div>
    )
  };

  const filteredArticles = activeCategory === 'All Posts' 
    ? articles 
    : articles.filter(article => article.category.toLowerCase() === activeCategory.toLowerCase());

  // Article Reader View
  if (selectedArticle) {
    return (
      <div className="relative pt-32 pb-20 z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="max-w-4xl mx-auto px-6">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="group flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 font-mono text-xs uppercase tracking-widest"
          >
            <iconify-icon icon="lucide:arrow-left" class="group-hover:-translate-x-1 transition-transform"></iconify-icon>
            Back to Journal
          </button>

          <div className="space-y-8 mb-16">
            <div className="flex items-center gap-4 text-[10px] font-mono text-blue-400 uppercase tracking-widest">
              <span>{selectedArticle.category}</span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <span className="text-slate-500">{selectedArticle.date}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-medium font-serif text-white leading-tight">
              {selectedArticle.title}
            </h1>
            <div className="flex items-center gap-4 pt-4">
              <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden border border-white/10">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Krishna" alt="Author" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">Krishna Patel</p>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Founder, Autonexgen</p>
              </div>
              <div className="ml-auto text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                {selectedArticle.readTime}
              </div>
            </div>
          </div>

          <div className="w-full aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 mb-16 shadow-2xl bg-[#0a0a0c]">
            <img 
              src={selectedArticle.image} 
              alt={selectedArticle.title} 
              loading="lazy"
              className="w-full h-full block object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-1000"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200';
              }}
            />
          </div>

          <div className="prose prose-invert max-w-none text-slate-400 text-lg leading-relaxed font-light article-content">
            {selectedArticle.content}
          </div>

          <div className="mt-32 pt-16 border-t border-white/5 text-center">
             <h3 className="text-2xl font-serif text-white mb-8">Share this insight</h3>
             <div className="flex justify-center gap-4">
               {['x', 'linkedin', 'link'].map(s => (
                 <button key={s} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/30 text-slate-500 hover:text-white transition-all">
                   <iconify-icon icon={`lucide:${s}`} width="20"></iconify-icon>
                 </button>
               ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  // Article Feed View
  return (
    <div className="relative pt-32 pb-20 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <Reveal>
          <div className="mb-24 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-mono uppercase tracking-widest mb-6 text-blue-400">
              The Autonomous Journal
            </div>
            <h1 className="text-5xl md:text-7xl font-medium font-newsreader text-white mb-8 leading-tight">
              Insights on <span className="italic text-blue-400">Intelligence.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
              Explorations into autonomous systems, enterprise automation, and the future of intelligent work.
            </p>
          </div>
        </Reveal>

        {/* Featured Post - Only show when "All Posts" is selected */}
        {activeCategory === 'All Posts' && (
          <Reveal delay={100}>
            <div className="mb-32">
              <div 
                onClick={() => setSelectedArticle(featuredArticle)}
                className="group relative p-1 rounded-[2.5rem] bg-gradient-to-br from-blue-500/20 via-transparent to-indigo-500/20 overflow-hidden cursor-pointer transition-transform duration-700 hover:scale-[1.01]"
              >
                <div className="bg-[#0a0a0c] rounded-[2.3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-12 items-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none"></div>
                  
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4 text-[10px] font-mono text-blue-400 uppercase tracking-widest">
                      <span>{featuredArticle.category}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                      <span className="text-slate-500">{featuredArticle.date}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-medium font-serif text-white leading-tight group-hover:text-blue-300 transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed font-light line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-6 pt-4">
                      <span className="text-xs text-slate-500 font-mono">{featuredArticle.readTime}</span>
                      <button className="flex items-center gap-2 text-sm text-white font-medium group/btn">
                        Read Article 
                        <iconify-icon icon="lucide:arrow-right" class="group-hover/btn:translate-x-1 transition-transform" width="16"></iconify-icon>
                      </button>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/3 aspect-[4/5] rounded-3xl overflow-hidden border border-white/5 relative group-hover:border-blue-500/20 transition-all bg-[#0a0a0c]">
                    <img 
                      src={featuredArticle.image} 
                      alt={featuredArticle.title} 
                      loading="lazy"
                      className="w-full h-full block object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Categories Bar */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full border text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                    : 'border-white/10 text-slate-500 hover:border-white/30 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-40 group/grid">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, i) => (
              <Reveal key={article.id} delay={i * 100} className="h-full">
                <div 
                  onClick={() => setSelectedArticle(article)}
                  className="group/card p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] flex flex-col h-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/grid:opacity-40 group-hover/grid:scale-[0.98] hover:!opacity-100 hover:!scale-105 hover:!border-blue-500/20 hover:bg-white/[0.03] hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.1)] cursor-pointer overflow-hidden"
                >
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-white/5 bg-[#0a0a0c]">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      loading="lazy"
                      className="w-full h-full block object-cover grayscale-[15%] group-hover/card:grayscale-0 group-hover/card:scale-110 transition-all duration-1000"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200';
                      }}
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                      <iconify-icon icon={article.imageIcon} class="text-blue-400 text-xl"></iconify-icon>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">{article.category}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{article.date}</span>
                  </div>
                  
                  <h3 className="text-2xl font-medium text-white mb-4 group-hover/card:text-blue-300 transition-colors leading-tight">{article.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3 font-light">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <span className="text-[10px] text-slate-600 font-mono">{article.readTime}</span>
                    <iconify-icon icon="lucide:arrow-up-right" class="text-slate-500 group-hover/card:text-white group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-all" width="18"></iconify-icon>
                  </div>
                </div>
              </Reveal>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-500 font-newsreader italic text-xl">No articles found in this category yet. Check back soon.</p>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <Reveal>
          <div className="p-16 rounded-[3rem] border border-white/5 bg-gradient-to-br from-indigo-600/5 to-transparent relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_70%)] pointer-events-none"></div>
            
            <div className="max-w-2xl mx-auto relative z-10">
              <h2 className="text-3xl font-serif text-white mb-6">Stay ahead of the curve.</h2>
              <p className="text-slate-400 mb-10 leading-relaxed font-light">
                Subscribe to our newsletter for bi-weekly insights on autonomous systems and AI strategy, delivered straight to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your work email" 
                  className="flex-1 bg-black/40 border border-white/10 rounded-full px-6 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <button className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-blue-500 hover:text-white transition-all active:scale-[0.98]">
                  Subscribe
                </button>
              </div>
              <p className="text-[10px] text-slate-600 mt-6 font-mono uppercase tracking-widest">No spam. Only high-signal insights.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default BlogPage;
