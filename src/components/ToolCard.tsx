import React from 'react';
import { ExternalLink, Heart, Star, FileText } from 'lucide-react';
import { Tool } from '../types';
import { motion } from 'motion/react';

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onToggleCompare: (id: number) => void;
  isSelectedForCompare: boolean;
  onOpenNotes: (tool: Tool) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ 
  tool, 
  isFavorite, 
  onToggleFavorite,
  onToggleCompare,
  isSelectedForCompare,
  onOpenNotes
}) => {
  const tags = tool.tags ? tool.tags.split(',') : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group relative flex flex-col overflow-hidden rounded-xl glass-panel transition-all duration-300 hover:-translate-y-1 ${
        isSelectedForCompare 
          ? 'border-[#ff0055] shadow-[0_0_15px_rgba(255,0,85,0.3)]' 
          : 'border-white/10 hover:border-[#00d2ff]/50 hover:shadow-[0_0_20px_rgba(0,210,255,0.15)]'
      }`}
    >
      <div className="relative h-40 overflow-hidden bg-[#0a0510]">
        {/* Compare Checkbox */}
        <div className="absolute left-3 top-3 z-10">
          <input
            type="checkbox"
            checked={isSelectedForCompare}
            onChange={() => onToggleCompare(tool.id)}
            className="h-4 w-4 rounded border-white/20 bg-black/50 text-[#ff0055] focus:ring-[#ff0055] focus:ring-offset-0 cursor-pointer"
            title="Compare"
          />
        </div>

        {tool.image_url ? (
          <img
            src={tool.image_url}
            alt={tool.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a0b2e] to-[#0a0510] text-4xl font-bold text-[#00d2ff] opacity-80 ${tool.image_url ? 'hidden' : ''}`}>
          {tool.name[0]}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0510] to-transparent opacity-80"></div>

        <div className="absolute right-3 top-3 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(tool.id);
            }}
            className={`rounded-full p-2 backdrop-blur-md transition-all ${
              isFavorite 
                ? 'bg-[#ff0055]/20 text-[#ff0055] border border-[#ff0055]/50 shadow-[0_0_10px_rgba(255,0,85,0.2)]' 
                : 'bg-black/40 text-gray-400 border border-white/10 hover:text-[#ff0055] hover:border-[#ff0055]/30'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <span className="rounded-full bg-black/60 border border-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md flex items-center">
            {tool.pricing}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 relative z-10 bg-gradient-to-b from-transparent to-[#0a0510]/80">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-[#00d2ff] transition-colors font-[Syncopate] tracking-wide">
              {tool.name}
            </h3>
            <div className="flex items-center gap-3 mt-2 text-xs font-medium text-[#00d2ff]">
              <span className="uppercase tracking-wider">{tool.category}</span>
              {tool.userRating ? (
                <div className="flex items-center gap-1 text-[#ff0055]">
                  <Star className="h-3 w-3 fill-current" />
                  <span>{tool.userRating}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <p className="mb-5 line-clamp-2 text-sm text-gray-400 flex-1 leading-relaxed">
          {tool.description}
        </p>

        {tags.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded bg-white/5 border border-white/10 px-2 py-1 text-[10px] text-gray-300 uppercase tracking-wider">
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="rounded bg-white/5 border border-white/10 px-2 py-1 text-[10px] text-gray-300 uppercase tracking-wider">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 mt-auto">
          <button
            onClick={() => onOpenNotes(tool)}
            className={`flex items-center justify-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
              tool.userNotes 
                ? 'bg-[#00d2ff]/10 border-[#00d2ff]/30 text-[#00d2ff]' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
            title={tool.userNotes ? "Edit Notes" : "Add Notes"}
          >
            <FileText className="h-4 w-4" />
          </button>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#ff0055] px-4 py-2 text-sm font-bold text-white hover:bg-[#ff0055]/80 transition-all neon-border shadow-[0_0_15px_rgba(255,0,85,0.3)] hover:shadow-[0_0_25px_rgba(255,0,85,0.5)]"
          >
            Visit Website
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
