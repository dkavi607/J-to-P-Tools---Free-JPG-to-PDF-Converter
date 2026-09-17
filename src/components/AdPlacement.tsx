import React from 'react';

export type AdVariant = 'leaderboard' | 'rectangle' | 'in-article' | 'in-feed';

interface AdPlacementProps {
  id?: string;
  variant: AdVariant;
  slot?: string;
  client?: string;
  className?: string;
}

/**
 * Google AdSense Strategic Ad Placeholder Component
 * Formatted with explicit dimensions to completely prevent Cumulative Layout Shift (CLS).
 */
export const AdPlacement: React.FC<AdPlacementProps> = ({
  id,
  variant,
  slot = '1234567890',
  client = 'ca-pub-0000000000000000',
  className = ''
}) => {
  if (variant === 'leaderboard') {
    return (
      <aside
        id={id || 'ad-leaderboard'}
        aria-label="Advertisement"
        className={`w-full flex flex-col items-center justify-center my-6 overflow-hidden ${className}`}
      >
        <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 dark:text-slate-500 mb-1">
          Advertisement
        </span>
        {/* Google AdSense Responsive Leaderboard Container */}
        <div
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
          className="w-full max-w-[728px] min-h-[90px] md:h-[90px] rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col items-center justify-center p-3 text-center transition-all"
        >
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
              AdSense
            </span>
            <span>Leaderboard 728×90 / 320×100</span>
          </div>
        </div>
      </aside>
    );
  }

  if (variant === 'rectangle') {
    return (
      <aside
        id={id || 'ad-sidebar-rectangle'}
        aria-label="Advertisement"
        className={`flex flex-col items-center justify-center my-4 overflow-hidden ${className}`}
      >
        <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 dark:text-slate-500 mb-1">
          Advertisement
        </span>
        {/* Google AdSense Medium Rectangle Container */}
        <div
          data-ad-client={client}
          data-ad-slot={slot}
          className="w-[300px] h-[250px] min-h-[250px] rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col items-center justify-center p-4 text-center"
        >
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono mb-2">
            AdSense
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Medium Rectangle (300×250)
          </span>
        </div>
      </aside>
    );
  }

  if (variant === 'in-article') {
    return (
      <aside
        id={id || 'ad-in-article'}
        aria-label="Advertisement"
        className={`w-full max-w-3xl mx-auto my-8 overflow-hidden ${className}`}
      >
        <span className="block text-center text-[10px] tracking-wider uppercase font-semibold text-slate-400 dark:text-slate-500 mb-1">
          Sponsored Content
        </span>
        {/* Google AdSense In-Article Native Ad Container */}
        <div
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          className="w-full min-h-[110px] rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex items-center justify-center p-4 text-center"
        >
          <div className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500">
            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
              Native Ad Unit
            </span>
            <span className="text-xs font-medium">Responsive In-Article Banner</span>
          </div>
        </div>
      </aside>
    );
  }

  // in-feed (inside FAQ or list)
  return (
    <div
      id={id || 'ad-in-feed'}
      aria-label="Advertisement"
      className={`my-3 p-3 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between min-h-[70px] ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono uppercase">
          Ad
        </span>
        <span className="text-xs text-slate-400 dark:text-slate-500">Sponsored link / in-feed recommendation</span>
      </div>
      <span className="text-[10px] text-slate-400">Promoted</span>
    </div>
  );
};
