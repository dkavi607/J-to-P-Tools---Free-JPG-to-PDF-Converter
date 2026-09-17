import React from 'react';
import { X, Keyboard, Command } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ onClose }) => {
  const isMac = typeof window !== 'undefined' && /macintosh|mac os x/i.test(navigator.userAgent);
  const modKey = isMac ? '⌘ Cmd' : 'Ctrl';

  const shortcuts = [
    { key: `${modKey} + O`, desc: 'Open file selector to add JPG/PNG images' },
    { key: `${modKey} + Enter`, desc: 'Start converting images to PDF immediately' },
    { key: 'Esc', desc: 'Close any active modal or preview dialog' },
    { key: 'Drag & Drop', desc: 'Rearrange page order directly on image cards' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl brand-gradient flex items-center justify-center text-white">
              <Keyboard className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Keyboard Shortcuts</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          {shortcuts.map((sc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-xs sm:text-sm"
            >
              <span className="text-slate-600 dark:text-slate-300 font-medium">{sc.desc}</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-mono font-bold shadow-xs border border-slate-200 dark:border-slate-600 text-xs">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl brand-gradient text-white text-xs font-bold shadow hover:opacity-95 transition"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
