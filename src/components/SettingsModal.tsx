import React, { useState } from 'react';
import { X, Download, Upload, AlertCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toolService } from '../services/toolService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataImported: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onDataImported }) => {
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleExport = async () => {
    try {
      const data = await toolService.exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tooldir-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = event.target?.result as string;
        await toolService.importData(json);
        setImportStatus('success');
        setTimeout(() => {
          onDataImported();
          onClose();
        }, 1500);
      } catch (error) {
        setImportStatus('error');
        setErrorMessage('Invalid file format. Please upload a valid ToolDir backup.');
      }
    };
    reader.readAsText(file);
  };

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
          className="relative w-full max-w-md overflow-hidden rounded-2xl glass-panel shadow-[0_0_30px_rgba(0,210,255,0.15)]"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/5">
            <h2 className="text-lg font-bold text-white font-[Syncopate] tracking-wide">Settings</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Export Section */}
            <div>
              <h3 className="text-sm font-bold text-[#00d2ff] uppercase tracking-[0.1em] mb-2">Export Data</h3>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                Download a backup of your tools, collections, and favorites.
              </p>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 rounded-lg bg-[#00d2ff]/10 border border-[#00d2ff]/30 px-4 py-2 text-sm font-bold text-[#00d2ff] hover:bg-[#00d2ff]/20 hover:shadow-[0_0_15px_rgba(0,210,255,0.2)] transition-all"
              >
                <Download className="h-4 w-4" />
                Download Backup
              </button>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Import Section */}
            <div>
              <h3 className="text-sm font-bold text-[#ff0055] uppercase tracking-[0.1em] mb-2">Import Data</h3>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                Restore your data from a backup file. This will overwrite current data.
              </p>
              
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                  id="import-file"
                />
                <label
                  htmlFor="import-file"
                  className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/20 bg-black/30 px-4 py-8 text-sm font-medium text-gray-400 hover:border-[#ff0055]/50 hover:text-[#ff0055] hover:bg-[#ff0055]/5 transition-all group"
                >
                  <Upload className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
                  <span>Click to upload backup file</span>
                </label>
              </div>

              {importStatus === 'success' && (
                <div className="mt-4 flex items-center gap-2 text-sm text-[#00ffcc] bg-[#00ffcc]/10 border border-[#00ffcc]/30 p-3 rounded-lg">
                  <Check className="h-4 w-4" />
                  Data imported successfully! Reloading...
                </div>
              )}

              {importStatus === 'error' && (
                <div className="mt-4 flex items-center gap-2 text-sm text-[#ff0055] bg-[#ff0055]/10 border border-[#ff0055]/30 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
