import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('jtop_cookie_consent');
      if (!consent) {
        // Small delay for natural entrance
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('jtop_cookie_consent', 'accepted');
    } catch {}
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('jtop_cookie_consent', 'essential_only');
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl brand-gradient flex items-center justify-center text-white shrink-0 mt-0.5">
          <Cookie className="w-4 h-4" />
        </div>
        <div className="flex-1 space-y-1.5">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            Cookie & Privacy Preferences
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            We use minimal cookies and local storage to remember your PDF preferences and serve relevant advertisements via Google AdSense.{' '}
            <button
              onClick={onOpenPrivacy}
              className="text-violet-600 dark:text-violet-400 font-semibold underline"
            >
              Privacy Policy
            </button>
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleAccept}
              className="px-3.5 py-1.5 rounded-lg brand-gradient text-white text-xs font-bold shadow hover:opacity-95 transition"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
