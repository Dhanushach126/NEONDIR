import React from 'react';
import { Tag } from 'lucide-react';
import { Tool } from '../types';

interface TagCloudProps {
  tools: Tool[];
  onTagClick: (tag: string) => void;
  selectedTag?: string;
}

export const TagCloud: React.FC<TagCloudProps> = ({ tools, onTagClick, selectedTag }) => {
  // Calculate tag frequency
  const tagCounts = tools.reduce((acc, tool) => {
    if (!tool.tags) return acc;
    const tags = tool.tags.split(',').map(t => t.trim().toLowerCase());
    tags.forEach(tag => {
      if (tag) acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Sort by frequency
  const sortedTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 20); // Top 20 tags

  if (sortedTags.length === 0) return null;

  return (
    <div className="glass-panel p-6 rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="h-4 w-4 text-[#ff0055]" />
        <h3 className="text-xs font-bold text-[#ff0055] uppercase tracking-[0.2em] font-[Syncopate]">
          Popular Tags
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {sortedTags.map(([tag, count]) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              selectedTag === tag
                ? 'bg-[#ff0055]/20 border-[#ff0055]/50 text-[#ff0055] shadow-[0_0_10px_rgba(255,0,85,0.2)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20'
            }`}
          >
            {tag} <span className="opacity-50 ml-1">({count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};
