import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterSidebar } from './components/FilterSidebar';
import { ToolCard } from './components/ToolCard';
import { SettingsModal } from './components/SettingsModal';
import { CompareModal } from './components/CompareModal';
import { AIConcierge } from './components/AIConcierge';
import { TagCloud } from './components/TagCloud';
import { NoteModal } from './components/NoteModal';
import { SubmitToolModal } from './components/SubmitToolModal';
import { Tool, Category, Pricing, SortOption } from './types';
import { toolService } from './services/toolService';
import { Loader2, AlertCircle, ArrowRightLeft } from 'lucide-react';

export default function App() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // URL Deep Linking State Initialization
  const getInitialState = <T,>(key: string, defaultValue: T): T => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const value = params.get(key);
      if (value) {
        if (value === 'true') return true as unknown as T;
        if (value === 'false') return false as unknown as T;
        return value as unknown as T;
      }
    }
    return defaultValue;
  };

  const [searchQuery, setSearchQuery] = useState(getInitialState('q', ''));
  const [selectedCategory, setSelectedCategory] = useState<Category>(getInitialState('category', 'All'));
  const [selectedPricing, setSelectedPricing] = useState<Pricing>(getInitialState('pricing', 'All'));
  const [sortBy, setSortBy] = useState<SortOption>(getInitialState('sort', 'newest'));
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(getInitialState('favorites', false));
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedToolForNotes, setSelectedToolForNotes] = useState<Tool | null>(null);
  const [compareList, setCompareList] = useState<number[]>([]);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // URL Deep Linking: Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (selectedPricing !== 'All') params.set('pricing', selectedPricing);
    if (sortBy !== 'newest') params.set('sort', sortBy);
    if (showFavoritesOnly) params.set('favorites', 'true');

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [searchQuery, selectedCategory, selectedPricing, sortBy, showFavoritesOnly]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on '/' or 'Cmd/Ctrl + K'
      if (e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
      }
      
      // Close modals on 'Escape'
      if (e.key === 'Escape') {
        setIsSettingsOpen(false);
        setIsCompareOpen(false);
        setIsNoteModalOpen(false);
        setIsSubmitModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: number) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(cid => cid !== id);
      if (prev.length >= 3) {
        alert('You can compare up to 3 tools at a time.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const fetchTools = async () => {
    try {
      setIsLoading(true);
      const data = await toolService.getTools();
      setTools(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const handleAddTool = async (toolData: any) => {
    try {
      const newTool = await toolService.addTool(toolData);
      setTools(prev => [newTool, ...prev]);
      alert("Tool added to your local session! Note: To save it to the Google Sheet permanently, you'll need to set up a Google Apps Script Web App.");
    } catch (error) {
      console.error("Failed to add tool", error);
      alert("Failed to add tool. Please try again.");
    }
  };

  const filteredTools = tools
    .filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (tool.tags && tool.tags.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesPricing = selectedPricing === 'All' || tool.pricing === selectedPricing;
      const matchesFavorites = !showFavoritesOnly || favorites.includes(tool.id);

      return matchesSearch && matchesCategory && matchesPricing && matchesFavorites;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'reverse-alphabetical':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const handleSurpriseMe = () => {
    if (filteredTools.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredTools.length);
    const randomTool = filteredTools[randomIndex];
    window.open(randomTool.url, '_blank', 'noopener,noreferrer');
  };

  const openNotes = (tool: Tool) => {
    setSelectedToolForNotes(tool);
    setIsNoteModalOpen(true);
  };

  return (
    <div className="min-h-screen font-sans text-white transition-colors duration-200">
      <Header 
        onOpenSettings={() => setIsSettingsOpen(true)}
        onSurpriseMe={handleSurpriseMe}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchInputRef={searchInputRef}
      />

      {/* Hero Section */}
      {!searchQuery && selectedCategory === 'All' && <Hero onOpenSubmit={() => setIsSubmitModalOpen(true)} />}

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 h-full space-y-8">
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPricing={selectedPricing}
              setSelectedPricing={setSelectedPricing}
              sortBy={sortBy}
              setSortBy={setSortBy}
              showFavoritesOnly={showFavoritesOnly}
              setShowFavoritesOnly={setShowFavoritesOnly}
            />
            <TagCloud 
              tools={tools} 
              onTagClick={(tag) => setSearchQuery(tag)} 
              selectedTag={searchQuery}
            />
          </aside>

          {/* Mobile Filters */}
          <div className="lg:hidden flex flex-col gap-4 pb-4">
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category)}
                className="rounded-lg border border-white/10 bg-white/5 py-2 pl-3 pr-10 text-sm text-white focus:border-[#00d2ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d2ff]/50 transition-colors"
              >
                {['All', 'Chat', 'Image', 'Video', 'Coding', 'Audio', 'Writing', 'Other'].map(c => (
                  <option key={c} value={c} className="bg-[#0a0510]">{c}</option>
                ))}
              </select>
              <select 
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value as Pricing)}
                className="rounded-lg border border-white/10 bg-white/5 py-2 pl-3 pr-10 text-sm text-white focus:border-[#00d2ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d2ff]/50 transition-colors"
              >
                {['All', 'Free', 'Freemium', 'Paid'].map(p => (
                  <option key={p} value={p} className="bg-[#0a0510]">{p}</option>
                ))}
              </select>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-lg border border-white/10 bg-white/5 py-2 pl-3 pr-10 text-sm text-white focus:border-[#00d2ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d2ff]/50 transition-colors"
              >
                <option value="newest" className="bg-[#0a0510]">Newest</option>
                <option value="oldest" className="bg-[#0a0510]">Oldest</option>
                <option value="alphabetical" className="bg-[#0a0510]">A-Z</option>
                <option value="reverse-alphabetical" className="bg-[#0a0510]">Z-A</option>
              </select>
            </div>
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex w-max items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all border ${
                showFavoritesOnly
                  ? 'bg-[#ff0055]/20 border-[#ff0055]/50 text-[#ff0055] shadow-[0_0_15px_rgba(255,0,85,0.2)]'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              Favorites Only
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#00d2ff]" />
              </div>
            ) : error ? (
              <div className="flex h-64 flex-col items-center justify-center text-[#ff0055]">
                <AlertCircle className="h-8 w-8 mb-2" />
                <p>{error}</p>
                <button 
                  onClick={fetchTools}
                  className="mt-4 text-sm text-[#00d2ff] hover:underline font-bold"
                >
                  Try again
                </button>
              </div>
            ) : filteredTools.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center text-gray-500">
                <p className="text-lg font-bold text-white font-[Syncopate]">No tools found</p>
                <p className="text-sm mt-2">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTools.map((tool) => (
                  <ToolCard 
                    key={tool.id} 
                    tool={tool} 
                    isFavorite={favorites.includes(tool.id)}
                    onToggleFavorite={toggleFavorite}
                    isSelectedForCompare={compareList.includes(tool.id)}
                    onToggleCompare={toggleCompare}
                    onOpenNotes={openNotes}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Compare Floating Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 rounded-full glass-panel px-6 py-3 text-white shadow-[0_0_30px_rgba(0,210,255,0.2)] border-[#00d2ff]/30">
          <span className="font-bold tracking-wide">{compareList.length} tools selected</span>
          <button 
            onClick={() => setIsCompareOpen(true)}
            className="flex items-center gap-2 rounded-full bg-[#00d2ff]/20 border border-[#00d2ff]/50 px-4 py-1.5 text-sm font-bold text-[#00d2ff] hover:bg-[#00d2ff]/30 transition-colors"
          >
            Compare <ArrowRightLeft className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setCompareList([])}
            className="text-gray-400 hover:text-[#ff0055] transition-colors font-bold text-sm"
          >
            Clear
          </button>
        </div>
      )}

      {/* Modals */}
      <SubmitToolModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmit={handleAddTool}
      />

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onDataImported={fetchTools}
      />

      <CompareModal 
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        tools={tools.filter(t => compareList.includes(t.id))}
        onRemoveTool={toggleCompare}
      />

      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        tool={selectedToolForNotes}
        onSaved={fetchTools}
      />

      <AIConcierge tools={tools} />
    </div>
  );
}
