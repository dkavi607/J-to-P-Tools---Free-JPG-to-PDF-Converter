import React from 'react';
import { X, FileText, Scale } from 'lucide-react';

interface TermsModalProps {
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl brand-gradient flex items-center justify-center text-white">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Terms of Service</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="font-semibold text-slate-900 dark:text-white">
            Effective Date: September 2026
          </p>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              1. Acceptance of Terms
            </h4>
            <p>
              By accessing and using <strong>J to P Tools</strong> ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the tool.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              2. Permitted Use & Free License
            </h4>
            <p>
              You are granted a non-exclusive, worldwide, royalty-free license to use the Service for personal, educational, or commercial purposes. You may convert as many files as desired without payment.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              3. User Responsibilities & Content Rights
            </h4>
            <p>
              You retain all intellectual property rights to any images you convert with the Service. Because all conversion occurs directly on your client device, you are solely responsible for ensuring that you possess the necessary rights and permissions to use, manipulate, and distribute your images.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              4. Disclaimer of Warranties
            </h4>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. While we strive for 100% precision, we make no guarantee that the generated files will be completely error-free.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl brand-gradient text-white text-xs sm:text-sm font-bold shadow hover:opacity-95 transition"
          >
            Agree & Close
          </button>
        </div>

      </div>
    </div>
  );
};
