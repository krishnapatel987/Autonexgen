import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="w-full max-w-[1000px] z-20 mt-16 mx-auto px-4 sm:px-6 lg:px-8 relative [perspective:2000px]">
      <div className="relative w-full rounded-xl border bg-[#0a0a0c]/80 backdrop-blur-xl overflow-hidden shadow-2xl border-white/10 transition-transform duration-700 [transform:rotateX(15deg)_scale(0.85)] sm:[transform:rotateX(20deg)_scale(0.95)] lg:[transform:rotateX(20deg)_scale(0.98)] hover:[transform:rotateX(5deg)_scale(0.9)] sm:hover:[transform:rotateX(5deg)_scale(1)] lg:hover:[transform:rotateX(5deg)_scale(1.02)]">
        {/* Scanline */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-500/5 to-transparent -translate-y-full animate-scan pointer-events-none z-30"></div>
        
        {/* Header */}
        <div className="h-10 border-b bg-white/[0.02] flex items-center px-4 justify-between select-none border-white/5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5 opacity-50">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500/20 border border-blue-500/50"></div>
            </div>
            <div className="h-4 w-px mx-1 bg-white/10"></div>
            <div className="flex items-center gap-2 text-[10px] px-2 py-0.5 rounded border bg-black/40 border-white/5 text-slate-400">
              <iconify-icon icon="lucide:workflow" width="10"></iconify-icon>
              <span className="font-mono">autonexgen-workflow-v2</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              SYSTEM ONLINE
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex h-[320px] sm:h-[450px]">
          {/* Sidebar */}
          <div className="w-12 md:w-56 border-r bg-white/[0.01] flex flex-col justify-between py-4 border-white/5">
            <div className="space-y-1 px-2">
              <div className="flex items-center gap-3 px-3 py-2 rounded-md border text-xs cursor-pointer bg-blue-500/10 border-blue-500/20 text-blue-300">
                <iconify-icon icon="lucide:activity" width="14"></iconify-icon>
                <span className="hidden md:inline font-medium">Analytics</span>
              </div>
              {['Active Agents', 'CRM Sync', 'Logs'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 px-3 py-2 text-slate-500 rounded-md transition-all text-xs cursor-pointer hover:text-slate-300 hover:bg-white/5">
                  <iconify-icon icon={idx === 0 ? "lucide:bot" : idx === 1 ? "lucide:users" : "lucide:terminal"} width="14"></iconify-icon>
                  <span className="hidden md:inline">{item}</span>
                </div>
              ))}
            </div>
            <div className="px-4 hidden md:block">
              <div className="text-[10px] uppercase tracking-widest mb-2 font-semibold text-slate-600">Leads Captured</div>
              <div className="w-full h-1 rounded-full overflow-hidden mb-1 bg-white/5">
                <div className="bg-blue-500 w-[85%] h-full rounded-full shadow-[0_0_10px_#2563eb]"></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Monthly Goal</span>
                <span className="text-white">85%</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-8 lg:p-10 overflow-hidden flex flex-col gap-4 sm:gap-6 lg:gap-8">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
              {[
                { label: 'Msgs Processed', val: '124k', delta: '+12%', color: 'blue' },
                { label: 'Lead Velocity', val: '₹14.2', delta: '-30%', color: 'blue' },
                { label: 'Uptime', val: '99.9%', delta: 'Stable', color: 'slate' }
              ].map((stat, i) => (
                <div key={i} className="p-3 sm:p-4 lg:p-6 rounded-lg border bg-gradient-to-br from-white/[0.03] to-transparent border-white/5">
                  <div className="text-[8px] sm:text-[10px] lg:text-[11px] text-slate-500 uppercase tracking-wide mb-1 truncate">{stat.label}</div>
                  <div className="text-sm sm:text-lg lg:text-xl font-medium font-mono text-white">{stat.val}</div>
                  <div className={`text-[8px] sm:text-[10px] lg:text-[11px] mt-1 flex items-center gap-1 ${stat.color === 'blue' ? 'text-blue-400' : 'text-slate-500'}`}>
                    {stat.delta !== 'Stable' && <iconify-icon icon={stat.delta.startsWith('+') ? "lucide:arrow-up-right" : "lucide:arrow-down-right"} width="10"></iconify-icon>}
                    {stat.delta}
                  </div>
                </div>
              ))}
            </div>

            {/* Workflow Visualization */}
            <div className="flex-1 overflow-hidden flex bg-[#050505] border-white/5 border rounded-lg p-4 sm:p-6 lg:p-8 relative items-center justify-center">
              <div className="opacity-10 absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
              
              {/* Node Graph Mockup - Responsive Scaling */}
              <div className="flex items-center gap-6 sm:gap-12 lg:gap-16 z-10 scale-[0.8] sm:scale-100 lg:scale-[1.02]">
                <div className="bg-[#1c1c1f] border border-white/10 rounded-lg p-3 sm:p-4 w-24 sm:w-32 lg:w-36 shadow-xl animate-in slide-in-from-left duration-1000">
                  <div className="flex items-center gap-2 mb-2">
                    <iconify-icon icon="logos:whatsapp-icon" width="14"></iconify-icon>
                    <span className="text-[8px] sm:text-[10px] text-white">Lead In</span>
                  </div>
                  <div className="h-1.5 bg-blue-500/30 rounded"></div>
                </div>
                
                <iconify-icon icon="lucide:arrow-right" class="text-slate-700 text-sm sm:text-lg animate-pulse"></iconify-icon>
                
                <div className="bg-[#1c1c1f] border border-blue-500/30 rounded-lg p-3 sm:p-4 w-28 sm:w-36 lg:w-40 shadow-[0_0_30px_rgba(37,99,235,0.15)] animate-in zoom-in duration-700">
                  <div className="flex items-center gap-2 mb-2">
                    <iconify-icon icon="lucide:brain" class="text-blue-400" width="14"></iconify-icon>
                    <span className="text-[8px] sm:text-[10px] text-white">AI Agent</span>
                  </div>
                  <div className="text-[7px] sm:text-[9px] text-slate-500 mb-1">Processing context...</div>
                  <div className="flex gap-1">
                    <div className="h-1 w-full bg-blue-500/40 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <iconify-icon icon="lucide:arrow-right" class="text-slate-700 text-sm sm:text-lg animate-pulse"></iconify-icon>
                
                <div className="bg-[#1c1c1f] border border-white/10 rounded-lg p-3 sm:p-4 w-24 sm:w-32 lg:w-36 shadow-xl animate-in slide-in-from-right duration-1000">
                  <div className="flex items-center gap-2 mb-2">
                    <iconify-icon icon="logos:hubspot" width="14"></iconify-icon>
                    <span className="text-[8px] sm:text-[10px] text-white">CRM</span>
                  </div>
                  <div className="h-1.5 bg-orange-500/30 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;