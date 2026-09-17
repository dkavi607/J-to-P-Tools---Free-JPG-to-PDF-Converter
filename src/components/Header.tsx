import React, { useState } from 'react';
import {
  FileText,
  Moon,
  Sun,
  Menu,
  X,
  Globe,
  Download,
  Keyboard,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenModal: (modal: 'privacy' | 'terms' | 'about' | 'contact' | 'blog' | 'shortcuts') => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  darkMode,
  onToggleDarkMode,
  onOpenModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = getTranslation(lang);
  const { isInstallable, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  const navLinks = [
    { label: t.navHome, href: '#' },
    { label: t.navHow, href: '#how-it-works' },
    { label: t.navFeatures, href: '#features' },
    { label: t.navFaq, href: '#faq' },
    { label: t.navBlog, onClick: () => onOpenModal('blog') }
  ];

  const handleNavClick = (link: { href?: string; onClick?: () => void }) => {
    setMobileMenuOpen(false);
    if (link.onClick) {
      link.onClick();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl brand-gradient flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-200">
            <span className="font-extrabold tracking-tight">JP</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white">
                J to P
              </span>
              <span className="font-bold text-xl sm:text-2xl brand-text-gradient">
                Tools
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Free JPG to PDF Converter
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href || '#'}
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                  link.onClick();
                }
              }}
              className="text-sm font-semibold text-slate-600 hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400 transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* PWA Install Button (Chromium / Desktop) */}
          {isInstallable && (
            <button
              onClick={install}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-violet-50 text-violet-700 hover:bg-violet-100 dark:bg-violet-950/60 dark:text-violet-300 dark:hover:bg-violet-900/60 border border-violet-200 dark:border-violet-800 transition shadow-sm"
              title="Install Desktop/Mobile App"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          )}

          {/* iOS Install Guide Trigger */}
          {isIOS && (
            <button
              onClick={() => setShowIOSGuide(true)}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-violet-50 text-violet-700 hover:bg-violet-100 dark:bg-violet-950/60 dark:text-violet-300 border border-violet-200 dark:border-violet-800 transition shadow-sm"
            >
              <span>Install App</span>
            </button>
          )}

          {/* Keyboard Shortcuts Trigger */}
          <button
            onClick={() => onOpenModal('shortcuts')}
            className="p-2 rounded-lg text-slate-600 hover:text-violet-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-violet-400 dark:hover:bg-slate-800 transition"
            title="Keyboard Shortcuts (Ctrl+O, Ctrl+Enter)"
            aria-label="Keyboard Shortcuts"
          >
            <Keyboard className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Language Selector */}
          <div className="relative group">
            <button
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-violet-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-violet-400 dark:hover:bg-slate-800 transition"
              aria-label="Select Language"
            >
              <Globe className="w-4 h-4" />
              <span>{lang}</span>
            </button>
            <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 min-w-[120px] z-50">
              <button
                onClick={() => onLanguageChange('en')}
                className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-violet-50 dark:hover:bg-slate-700 ${
                  lang === 'en' ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                🇺🇸 English
              </button>
              <button
                onClick={() => onLanguageChange('es')}
                className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-violet-50 dark:hover:bg-slate-700 ${
                  lang === 'es' ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                🇪🇸 Español
              </button>
              <button
                onClick={() => onLanguageChange('fr')}
                className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-violet-50 dark:hover:bg-slate-700 ${
                  lang === 'fr' ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                🇫🇷 Français
              </button>
              <button
                onClick={() => onLanguageChange('de')}
                className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-violet-50 dark:hover:bg-slate-700 ${
                  lang === 'de' ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                🇩🇪 Deutsch
              </button>
            </div>
          </div>

          {/* Dark / Light Mode Switcher */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-slate-600 hover:text-violet-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-yellow-400 dark:hover:bg-slate-800 transition"
            aria-label="Toggle Theme"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href || '#'}
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                }
                handleNavClick(link);
              }}
              className="block py-2 text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('privacy');
              }}
              className="text-xs text-slate-500 hover:text-violet-600 dark:text-slate-400"
            >
              {t.navPrivacy}
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('terms');
              }}
              className="text-xs text-slate-500 hover:text-violet-600 dark:text-slate-400"
            >
              {t.navTerms}
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('contact');
              }}
              className="text-xs text-slate-500 hover:text-violet-600 dark:text-slate-400"
            >
              {t.navContact}
            </button>
          </div>
        </div>
      )}

      {/* iOS PWA Installation Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-white mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Install on iPhone & iPad</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <span className="block">1. Tap the <strong>Share</strong> button (box with arrow) in Safari.</span>
              <span className="block">2. Scroll down and choose <strong>Add to Home Screen</strong>.</span>
              <span className="block text-violet-600 dark:text-violet-400 font-medium">3. Enjoy instant offline conversion anytime!</span>
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-2.5 text-sm font-bold hover:opacity-90 transition"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
