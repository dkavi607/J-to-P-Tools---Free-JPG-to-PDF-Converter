import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, Cookie } from 'lucide-react';

interface PrivacyModalProps {
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl brand-gradient flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Privacy Policy</h3>
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
            Last Updated: September 2026
          </p>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
              <Lock className="w-4 h-4 text-violet-600" />
              1. 100% Client-Side Processing (Zero File Uploads)
            </h4>
            <p>
              At <strong>J to P Tools</strong>, privacy is not an afterthought—it is the foundational architecture of our service. Unlike traditional web converters, <strong>no files or images are ever uploaded to our servers or stored on remote cloud infrastructure</strong>. All image processing, rotation, compression, and PDF compilation take place strictly inside your browser sandbox on your local device.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-emerald-600" />
              2. Personal Data Collection
            </h4>
            <p>
              We do not require account registration, email addresses, or phone numbers. We do not inspect, log, or index the content or metadata of your images. When you close the browser tab, all temporary memory objects (such as image object URLs) are immediately purged by your browser.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
              <Cookie className="w-4 h-4 text-amber-500" />
              3. Cookies and Advertising (Google AdSense)
            </h4>
            <p>
              To keep this tool free for everyone, we display non-intrusive advertisements served through Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on prior visits to this or other websites. You may opt out of personalized advertising by visiting Google Ads Settings.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              4. Local Preferences Storage
            </h4>
            <p>
              We use standard browser <code>localStorage</code> solely to remember your preferred converter settings (such as chosen default page size, orientation, and margins) across sessions for your convenience. No personal identifier is attached to this data.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              5. Contact Us
            </h4>
            <p>
              If you have any questions or feedback regarding our privacy practices, you can contact us directly via the Contact form or at <code>privacy@jtoptools.com</code>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl brand-gradient text-white text-xs sm:text-sm font-bold shadow hover:opacity-95 transition"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
