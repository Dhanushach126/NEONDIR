import React from 'react';
import { Filter, X, Heart } from 'lucide-react';
import { Category, Pricing, SortOption } from '../types';

interface FilterSidebarProps {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  selectedPricing: Pricing;
  setSelectedPricing: (pricing: Pricing) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
  className?: string;
}

const categories: Category[] = ['All', 'Chat', 'Image', 'Video', 'Coding', 'Audio', 'Writing', 'Other'];
const pricings: Pricing[] = ['All', 'Free', 'Freemium', 'Paid'];

export function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedPricing,
  setSelectedPricing,
  sortBy,
  setSortBy,
  showFavoritesOnly,
  setShowFavoritesOnly,
  className = ''
}: FilterSidebarProps) {
  return (
    <div className={`w-64 flex-shrink-0 h-full ${className}`}>
      <div className="sticky top-24 space-y-8 glass-panel p-6 rounded-2xl">
        
        {/* Favorites Toggle */}
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all border ${
            showFavoritesOnly
              ? 'bg-[#ff0055]/20 border-[#ff0055]/50 text-[#ff0055] shadow-[0_0_15px_rgba(255,0,85,0.2)]'
              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2">
            <Heart className={`h-4 w-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            Favorites Only
          </span>
        </button>

        {/* Sort Options */}
        <div>
          <h3 className="text-xs font-bold text-[#00d2ff] uppercase tracking-[0.2em] mb-4 font-[Syncopate]">
            Sort By
          </h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full rounded-xl border border-white/10 bg-black/50 py-3 pl-4 pr-10 text-sm text-white focus:border-[#00d2ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d2ff]/50 transition-all appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
          >
            <option value="newest" className="bg-[#0a0510]">Newest Added</option>
            <option value="oldest" className="bg-[#0a0510]">Oldest Added</option>
            <option value="alphabetical" className="bg-[#0a0510]">Name (A-Z)</option>
            <option value="reverse-alphabetical" className="bg-[#0a0510]">Name (Z-A)</option>
          </select>
        </div>

        <div>
          <h3 className="text-xs font-bold text-[#00d2ff] uppercase tracking-[0.2em] mb-4 font-[Syncopate]">
            Category
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/30 shadow-[0_0_10px_rgba(0,210,255,0.15)]'
                    : 'text-gray-400 border border-transparent hover:bg-white/5 hover:text-white hover:border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-[#00d2ff] uppercase tracking-[0.2em] mb-4 font-[Syncopate]">
            Pricing
          </h3>
          <div className="space-y-2">
            {pricings.map((pricing) => (
              <button
                key={pricing}
                onClick={() => setSelectedPricing(pricing)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  selectedPricing === pricing
                    ? 'bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/30 shadow-[0_0_10px_rgba(0,210,255,0.15)]'
                    : 'text-gray-400 border border-transparent hover:bg-white/5 hover:text-white hover:border-white/10'
                }`}
              >
                {pricing}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
