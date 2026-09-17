import React from 'react';
import { UploadCloud, Sliders, DownloadCloud, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface HowItWorksProps {
  lang: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ lang }) => {
  const t = getTranslation(lang);

  const steps = [
    {
      num: '01',
      icon: UploadCloud,
      title: t.step1Title,
      desc: t.step1Desc,
      gradient: 'from-violet-500 to-indigo-600'
    },
    {
      num: '02',
      icon: Sliders,
      title: t.step2Title,
      desc: t.step2Desc,
      gradient: 'from-indigo-600 to-rose-500'
    },
    {
      num: '03',
      icon: DownloadCloud,
      title: t.step3Title,
      desc: t.step3Desc,
      gradient: 'from-rose-500 to-red-600'
    }
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            {t.howItWorksTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.howItWorksSubtitle}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-200 flex flex-col group"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-slate-200 dark:text-slate-800 font-mono">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
