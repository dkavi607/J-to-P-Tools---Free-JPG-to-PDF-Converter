import React from 'react';
import { X, Sparkles, Heart, Zap, ShieldCheck } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl brand-gradient flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">About J to P Tools</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Our Mission: Fast, Private, Effortless Document Tools
            </h4>
            <p>
              <strong>J to P Tools</strong> was created with a clear philosophy: everyday document conversion should never require sacrificing personal privacy or waiting on slow server queues. We engineered a powerful, lightweight browser engine that compiles PDFs directly on your processor without uploading a single byte to external clouds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/50 text-center">
              <ShieldCheck className="w-6 h-6 text-violet-600 mx-auto mb-1.5" />
              <div className="font-bold text-slate-900 dark:text-white text-xs">Privacy by Architecture</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Files never leave your device</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50 text-center">
              <Zap className="w-6 h-6 text-amber-500 mx-auto mb-1.5" />
              <div className="font-bold text-slate-900 dark:text-white text-xs">Sub-Second Processing</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Instant local canvas rendering</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50 text-center">
              <Heart className="w-6 h-6 text-red-500 mx-auto mb-1.5" />
              <div className="font-bold text-slate-900 dark:text-white text-xs">Free & Accessible</div>
              <div className="text-[11px] text-slate-500 mt-0.5">No paywalls or watermarks</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              The Technology
            </h4>
            <p>
              Built using HTML5 Canvas API, Web Workers, Progressive Web App caching, and custom jsPDF rendering kernels. Optimized for mobile and desktop screens with full dark mode support.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl brand-gradient text-white text-xs sm:text-sm font-bold shadow hover:opacity-95 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
