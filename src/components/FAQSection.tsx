import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { AdPlacement } from './AdPlacement';

interface FAQSectionProps {
  lang: Language;
}

interface FAQItem {
  q: string;
  a: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang }) => {
  const t = getTranslation(lang);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: 'Is J to P Tools completely free to use?',
      a: 'Yes! J to P Tools is 100% free with no hidden paywalls, subscriptions, daily quotas, or watermarks forced on your files. You can convert unlimited images as often as you need.'
    },
    {
      q: 'How is my privacy protected during conversion?',
      a: 'Unlike traditional online converters that upload your confidential photos and documents to remote cloud servers, J to P Tools runs entirely client-side inside your browser sandbox. Your images and documents are processed locally on your machine and never transmitted anywhere.'
    },
    {
      q: 'What image formats can I convert?',
      a: 'We support all standard web image formats including JPG, JPEG, PNG, WEBP, and BMP. You can also mix and match different formats in the same batch.'
    },
    {
      q: 'Can I reorder or rotate the images before saving to PDF?',
      a: 'Yes! You can reorder images by dragging the thumbnail cards or using the Up/Down arrow buttons. You can also rotate any individual image 90° clockwise by clicking the rotate icon.'
    },
    {
      q: 'Does this converter work offline without an internet connection?',
      a: 'Yes! J to P Tools is built as an installable Progressive Web App (PWA) with service worker caching. Once you have opened the page, all conversion scripts are cached locally, allowing you to convert files even on airplanes or in offline locations.'
    },
    {
      q: 'What page sizes and layout options are supported?',
      a: 'You can choose between standard ISO A4 (210×297mm), US Letter (8.5×11"), US Legal (8.5×14"), Executive, or "Fit to Image Dimensions". You can also choose Portrait, Landscape, or Auto-Detect orientations, and customize margin widths.'
    },
    {
      q: 'How can I reduce the output PDF file size?',
      a: 'Use the Image Quality / Compression slider in the settings panel. Setting it to 75%–85% significantly reduces the resulting PDF file size while retaining excellent visual clarity for printing and email sharing.'
    },
    {
      q: 'Can I generate separate PDFs for each image instead of one merged file?',
      a: 'Yes. In the Global Settings panel, switch the Output Mode from "Single PDF (Merged)" to "Separate PDFs (.ZIP)". When you convert, all individual PDF files will be generated and conveniently packaged into a single downloadable .ZIP archive.'
    },
    {
      q: 'Do I need to install any software or browser extensions?',
      a: 'No installation is necessary! J to P Tools runs directly inside Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge, and mobile browsers on iOS and Android.'
    },
    {
      q: 'Can I add custom watermarks and page numbering?',
      a: 'Yes! Open the "Advanced Features" section in the settings panel. You can type any custom text watermark (like "CONFIDENTIAL" or "DRAFT") with adjustable opacity, and enable automatic "Page X of Y" numbering.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            {t.faqTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.faqSubtitle}
          </p>
        </div>

        {/* Accordion List with Strategic Native Ad Insertion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <React.Fragment key={index}>
                <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-200">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-violet-600 dark:text-violet-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>

                {/* Strategic in-feed AdSense placement inserted between questions (after index 2 and index 5) */}
                {(index === 2 || index === 5) && (
                  <AdPlacement variant="in-feed" id={`faq-ad-${index}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
};
