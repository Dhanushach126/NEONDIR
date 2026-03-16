import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tool } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  tools: Tool[];
  onRemoveTool: (id: number) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose, tools, onRemoveTool }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0a0510]/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl glass-panel shadow-[0_0_30px_rgba(0,210,255,0.15)] max-h-[90vh] flex flex-col"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/5">
            <h2 className="text-lg font-bold text-white font-[Syncopate] tracking-wide">Tool Comparison</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-auto p-6 custom-scrollbar">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 bg-[#0a0510] p-4 font-bold text-[#00d2ff] uppercase tracking-[0.1em] border-b border-white/10 min-w-[150px]">
                    Feature
                  </th>
                  {tools.map(tool => (
                    <th key={tool.id} className="p-4 font-bold text-white border-b border-white/10 min-w-[200px]">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          {tool.image_url && (
                            <img src={tool.image_url} alt="" className="h-8 w-8 rounded-lg object-cover border border-white/10" />
                          )}
                          <span className="font-[Syncopate] tracking-wide">{tool.name}</span>
                        </div>
                        <button 
                          onClick={() => onRemoveTool(tool.id)}
                          className="text-gray-500 hover:text-[#ff0055] transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="sticky left-0 z-10 bg-[#0a0510] p-4 font-bold text-white">Category</td>
                  {tools.map(tool => (
                    <td key={tool.id} className="p-4 text-gray-400">{tool.category}</td>
                  ))}
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="sticky left-0 z-10 bg-[#0a0510] p-4 font-bold text-white">Pricing</td>
                  {tools.map(tool => (
                    <td key={tool.id} className="p-4">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border ${
                        tool.pricing === 'Free' ? 'bg-[#00ffcc]/10 text-[#00ffcc] border-[#00ffcc]/30' :
                        tool.pricing === 'Freemium' ? 'bg-[#00d2ff]/10 text-[#00d2ff] border-[#00d2ff]/30' :
                        'bg-[#ff0055]/10 text-[#ff0055] border-[#ff0055]/30'
                      }`}>
                        {tool.pricing}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="sticky left-0 z-10 bg-[#0a0510] p-4 font-bold text-white">Description</td>
                  {tools.map(tool => (
                    <td key={tool.id} className="p-4 text-gray-400 min-w-[250px] leading-relaxed">{tool.description}</td>
                  ))}
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="sticky left-0 z-10 bg-[#0a0510] p-4 font-bold text-white">Tags</td>
                  {tools.map(tool => (
                    <td key={tool.id} className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {tool.tags?.split(',').map(tag => (
                          <span key={tag} className="rounded bg-white/5 border border-white/10 px-2 py-1 text-[10px] text-gray-300 uppercase tracking-wider">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="sticky left-0 z-10 bg-[#0a0510] p-4 font-bold text-white">Website</td>
                  {tools.map(tool => (
                    <td key={tool.id} className="p-4">
                      <a 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#00d2ff] hover:text-white hover:underline text-sm font-bold transition-colors"
                      >
                        Visit Site
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
