import React, { useState } from 'react';
import { X, Loader2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Category, Pricing } from '../types';

interface SubmitToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (toolData: any) => Promise<void>;
}

export const SubmitToolModal: React.FC<SubmitToolModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: 'Other' as Category,
    description: '',
    pricing: 'Free' as Pricing,
    tags: '',
    image_url: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({
        name: '', url: '', category: 'Other', description: '', pricing: 'Free', tags: '', image_url: ''
      });
      onClose();
    } catch (error) {
      console.error('Failed to submit tool:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl glass-panel shadow-[0_0_30px_rgba(0,210,255,0.15)] max-h-[90vh] flex flex-col"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/5">
            <h2 className="text-lg font-bold text-white font-[Syncopate] tracking-wide">
              Submit New <span className="text-[#00d2ff]">Tool</span>
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-[#00d2ff] uppercase tracking-[0.1em] mb-2">
                    Tool Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-[#00d2ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d2ff]/50 transition-all"
                    placeholder="e.g., Midjourney"
                  />
                </div>

                {/* URL */}
                <div>
                  <label className="block text-xs font-bold text-[#00d2ff] uppercase tracking-[0.1em] mb-2">
                    Website URL *
                  </label>
                  <input
                    required
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-[#00d2ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d2ff]/50 transition-all"
                    placeholder="https://..."
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-[#00d2ff] uppercase tracking-[0.1em] mb-2">
                    Category *
                  </label>
                  <select
                    required
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white focus:border-[#00d2ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d2ff]/50 transition-all"
                  >
                    {['Chat', 'Image', 'Video', 'Coding', 'Audio', 'Writing', 'Other'].map(c => (
                      <option key={c} value={c} className="bg-[#0a0510]">{c}</option>
                    ))}
                  </select>
                </div>

                {/* Pricing */}
                <div>
                  <label className="block text-xs font-bold text-[#00d2ff] uppercase tracking-[0.1em] mb-2">
                    Pricing *
                  </label>
                  <select
                    required
                    name="pricing"
                    value={formData.pricing}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white focus:border-[#00d2ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d2ff]/50 transition-all"
                  >
                    {['Free', 'Freemium', 'Paid'].map(p => (
                      <option key={p} value={p} className="bg-[#0a0510]">{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#00d2ff] uppercase tracking-[0.1em] mb-2">
                  Description *
                </label>
                <textarea
                  required
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-[#00d2ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d2ff]/50 transition-all resize-none"
                  placeholder="Briefly describe what this tool does..."
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold text-[#00d2ff] uppercase tracking-[0.1em] mb-2">
                  Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-[#00d2ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d2ff]/50 transition-all"
                  placeholder="e.g., ai art, generation, text-to-image"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-bold text-[#00d2ff] uppercase tracking-[0.1em] mb-2">
                  Logo / Image URL
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-[#00d2ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00d2ff]/50 transition-all"
                  placeholder="https://... (Optional but recommended)"
                />
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg px-5 py-2.5 text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-lg bg-[#00d2ff] px-6 py-2.5 text-sm font-bold text-[#0a0510] hover:bg-[#00d2ff]/90 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(0,210,255,0.3)] hover:shadow-[0_0_25px_rgba(0,210,255,0.5)]"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  Submit Tool
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
