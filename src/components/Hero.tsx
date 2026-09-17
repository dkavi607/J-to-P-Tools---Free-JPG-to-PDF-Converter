import React from 'react';
import { ShieldCheck, Zap, Heart, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = getTranslation(lang);

  return (
    <section className="relative pt-6 pb-4 sm:pt-10 sm:pb-8 overflow-hidden text-center">
      {/* Soft background ambient gradient blooms */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-violet-500/10 via-red-500/5 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Pill Tagline */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100/80 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs sm:text-sm font-semibold mb-4 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 animate-pulse" />
          <span>{t.tagline}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-4">
          Convert JPG to PDF in{' '}
          <span className="brand-text-gradient">Seconds</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 font-normal">
          {t.heroSubtitle}
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span>{t.trustPrivate}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>{t.trustClient}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
            <Heart className="w-4 h-4 text-red-500 fill-red-500/20" />
            <span>{t.trustFree}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
