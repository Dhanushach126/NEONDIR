import React, { useState, useEffect } from 'react';
import { X, Star, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tool } from '../types';
import { toolService } from '../services/toolService';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: Tool | null;
  onSaved: () => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose, tool, onSaved }) => {
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (tool) {
      setRating(tool.userRating || 0);
      setNotes(tool.userNotes || '');
    }
  }, [tool]);

  if (!isOpen || !tool) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await toolService.updateTool(tool.id, { userRating: rating, userNotes: notes });
      onSaved();
      onClose();
    } catch (error) {
      console.error('Failed to save notes', error);
    } finally {
      setIsSaving(false);
    }
  };

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
          className="relative w-full max-w-md overflow-hidden rounded-2xl glass-panel shadow-[0_0_30px_rgba(0,210,255,0.15)]"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/5">
            <h2 className="text-lg font-bold text-white font-[Syncopate] tracking-wide">
              Notes for <span className="text-[#00d2ff]">{tool.name}</span>
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#00d2ff] uppercase tracking-[0.1em] mb-3">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating
                          ? 'fill-[#ff0055] text-[#ff0055] drop-shadow-[0_0_8px_rgba(255,0,85,0.5)]'
                          : 'text-gray-600 hover:text-gray-400'
                      } transition-all`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-xs font-bold text-[#00d2ff] uppercase tracking-[0.1em] mb-3">
                Personal Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                placeholder="What do you use this tool for? Any pros/cons?"
                className="block w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-[#00d2ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d2ff]/50 transition-all resize-none"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
              <button
                onClick={onClose}
                className="rounded-lg px-5 py-2.5 text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 rounded-lg bg-[#00d2ff] px-6 py-2.5 text-sm font-bold text-[#0a0510] hover:bg-[#00d2ff]/90 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(0,210,255,0.3)] hover:shadow-[0_0_25px_rgba(0,210,255,0.5)]"
              >
                {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                Save Notes
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
