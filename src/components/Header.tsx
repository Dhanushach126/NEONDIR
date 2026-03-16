import React from 'react';
import { Search, Settings, Plus } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  onSurpriseMe: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

export function Header({ onOpenSettings, onSurpriseMe, searchQuery, setSearchQuery, searchInputRef }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-[#0a0510]/80 backdrop-blur-xl transition-colors duration-200">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-widest text-white font-[Syncopate]">
            NEON<span className="text-[#ff0055] neon-text">DIR</span>
          </span>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#ff0055] transition-colors" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              className="block w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm placeholder-gray-500 text-white focus:border-[#ff0055]/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-[#ff0055]/50 transition-all"
              placeholder="Explore tools... (Press '/')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSurpriseMe}
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Explore Random
          </button>

          <button 
            onClick={onOpenSettings}
            className="flex items-center justify-center rounded-full border border-[#ff0055] px-6 py-2 text-sm font-medium text-white hover:bg-[#ff0055]/10 transition-all neon-border"
          >
            Settings
          </button>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative w-full group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#ff0055] transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm placeholder-gray-500 text-white focus:border-[#ff0055]/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-[#ff0055]/50 transition-all"
              placeholder="Explore tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
      </div>
    </header>
  );
}
