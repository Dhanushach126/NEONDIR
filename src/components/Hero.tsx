import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenSubmit: () => void;
}

export function Hero({ onOpenSubmit }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden py-12 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-[0.2em] text-[#00d2ff] uppercase mb-4 font-[Syncopate]">
              Directory For
            </h2>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 font-[Syncopate] leading-tight">
              CREA<span className="text-[#ff0055] neon-text">TORS</span>
            </h1>
            <p className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
              The ultimate directory bringing together artists, developers, and creators on a single platform to explore top AI tools.
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <button 
                onClick={() => document.querySelector('input')?.focus()}
                className="rounded-full border border-[#ff0055] bg-[#ff0055]/10 px-8 py-3 text-sm font-bold text-[#ff0055] hover:bg-[#ff0055]/20 hover:shadow-[0_0_20px_rgba(255,0,85,0.4)] transition-all"
              >
                Explore Tools
              </button>
              <button 
                onClick={onOpenSubmit}
                className="flex items-center gap-2 text-sm font-bold text-white hover:text-[#00d2ff] transition-colors group"
              >
                Submit Tool <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Content / Image Area */}
          <div className="relative h-[500px] w-full hidden lg:block">
            {/* Main Image Placeholder */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,210,255,0.15)]">
              <img 
                src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1000&auto=format&fit=crop" 
                alt="Futuristic AI" 
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0510] via-[#0a0510]/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0a0510]"></div>
            </div>

            {/* Floating Glass Panels */}
            <div className="absolute top-12 right-12 glass-panel px-6 py-3 shadow-[0_0_15px_rgba(0,210,255,0.2)] border-[#00d2ff]/30">
              <span className="text-sm font-bold text-white tracking-wide">100% Authenticity</span>
            </div>

            <div className="absolute bottom-32 left-0 glass-panel px-6 py-3 shadow-[0_0_15px_rgba(255,0,85,0.2)] border-[#ff0055]/30">
              <span className="text-sm font-bold text-white tracking-wide">50000+ Creators</span>
            </div>

            <div className="absolute bottom-12 right-8 glass-panel px-6 py-3 shadow-[0_0_15px_rgba(0,255,204,0.2)] border-[#00ffcc]/30">
              <span className="text-sm font-bold text-white tracking-wide">5k+ Tools Stored</span>
            </div>

            {/* Timer / Stats row at bottom */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
               <div className="glass-panel px-4 py-3 text-center min-w-[80px] border-white/10">
                  <div className="text-xl font-bold text-white font-[Syncopate]">12</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mt-1">Days</div>
               </div>
               <div className="glass-panel px-4 py-3 text-center min-w-[80px] border-[#00d2ff]/50 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                  <div className="text-xl font-bold text-[#00d2ff] font-[Syncopate]">03</div>
                  <div className="text-[10px] text-[#00d2ff] uppercase tracking-wider font-bold mt-1">Hours</div>
               </div>
               <div className="glass-panel px-4 py-3 text-center min-w-[80px] border-white/10">
                  <div className="text-xl font-bold text-white font-[Syncopate]">11</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mt-1">Minutes</div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
