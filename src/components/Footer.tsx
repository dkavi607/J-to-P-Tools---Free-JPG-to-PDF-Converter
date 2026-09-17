import React from 'react';
import {
  Heart,
  Shield,
  FileText,
  Mail,
  HelpCircle,
  BookOpen,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface FooterProps {
  lang: Language;
  onOpenModal: (modal: 'privacy' | 'terms' | 'about' | 'contact' | 'blog' | 'shortcuts') => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenModal }) => {
  const t = getTranslation(lang);

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center text-white font-bold text-base shadow-sm">
                JP
              </div>
              <div className="flex items-center gap-1.5 font-bold text-xl text-slate-900 dark:text-white">
                <span>J to P</span>
                <span className="brand-text-gradient">Tools</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              The premier client-side JPG to PDF converter. Fast, 100% private, and free forever. No servers, no tracking, and zero data leaves your browser.
            </p>

            <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert('J to P Tools official community profile.'); }}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-violet-600 dark:hover:text-violet-400 transition"
                aria-label="Twitter Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert('J to P Tools GitHub repository.'); }}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-violet-600 dark:hover:text-violet-400 transition"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert('J to P Tools LinkedIn page.'); }}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-violet-600 dark:hover:text-violet-400 transition"
                aria-label="LinkedIn Page"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">
                  {t.navHome}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-violet-600 dark:hover:text-violet-400 transition">
                  {t.navHow}
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-violet-600 dark:hover:text-violet-400 transition">
                  {t.navFeatures}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-violet-600 dark:hover:text-violet-400 transition">
                  {t.navFaq}
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('blog')}
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition text-left"
                >
                  Knowledge Hub & Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onOpenModal('privacy')}
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition text-left"
                >
                  {t.navPrivacy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('terms')}
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition text-left"
                >
                  {t.navTerms}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('about')}
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition text-left"
                >
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('contact')}
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition text-left"
                >
                  {t.navContact}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('shortcuts')}
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition text-left"
                >
                  {t.shortcuts}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 J to P Tools. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for fast, private conversions</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
