import React from 'react';
import {
  ShieldCheck,
  Zap,
  Smartphone,
  SlidersHorizontal,
  Layers,
  Sparkles,
  Lock,
  Cpu
} from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface FeaturesProps {
  lang: Language;
}

export const Features: React.FC<FeaturesProps> = ({ lang }) => {
  const t = getTranslation(lang);

  const featureList = [
    {
      icon: Lock,
      title: '100% Private & Secure',
      desc: 'All conversion runs locally in your web browser with zero server uploads. Your confidential files, IDs, receipts, and personal photos remain completely in your hands.',
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50 dark:bg-violet-950/50'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Engine',
      desc: 'Powered by modern WebAssembly and HTML5 Canvas API for instant rendering with no queuing or network latency bottlenecks.',
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-950/50'
    },
    {
      icon: Smartphone,
      title: 'Works Everywhere',
      desc: 'Fully responsive and PWA-ready across Android, iPhone, iPad, Windows, macOS, and Linux without installing cumbersome apps or plugins.',
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-950/50'
    },
    {
      icon: SlidersHorizontal,
      title: 'Total Layout Customization',
      desc: 'Choose from international standard page formats (A4, Letter, Legal), customize page margins, select portrait or landscape orientations, and rotate single images.',
      color: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-950/50'
    },
    {
      icon: Layers,
      title: 'Batch Image Processing',
      desc: 'Select dozens of images simultaneously. Merge them into a single multi-page PDF document or export individual PDFs bundled into a neat .ZIP archive.',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-950/50'
    },
    {
      icon: Sparkles,
      title: 'Completely Free Forever',
      desc: 'No credit cards, no subscriptions, no forced account signups, and zero intrusive branding watermarks placed on your final document.',
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-950/50'
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            {t.featuresTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.featuresSubtitle}
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-200 flex flex-col group"
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
