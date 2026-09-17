import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ConverterWidget } from './components/ConverterWidget';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { FAQSection } from './components/FAQSection';
import { SEOContent } from './components/SEOContent';
import { Footer } from './components/Footer';
import { AdPlacement } from './components/AdPlacement';
import { PrivacyModal } from './components/Pages/PrivacyModal';
import { TermsModal } from './components/Pages/TermsModal';
import { AboutModal } from './components/Pages/AboutModal';
import { ContactModal } from './components/Pages/ContactModal';
import { BlogSection } from './components/Pages/BlogSection';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { CookieBanner } from './components/CookieBanner';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Language } from './types';

type ActiveModal = 'privacy' | 'terms' | 'about' | 'contact' | 'blog' | 'shortcuts' | null;

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('jtop_lang');
      return (saved as Language) || 'en';
    } catch {
      return 'en';
    }
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('jtop_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  useEffect(() => {
    try {
      localStorage.setItem('jtop_lang', lang);
    } catch {}
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem('jtop_dark_mode', darkMode.toString());
    } catch {}
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Global keydown to dismiss modals on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal) {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeModal]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-violet-500 selection:text-white transition-colors duration-200">
      
      {/* Sticky Top Navbar */}
      <Header
        lang={lang}
        onLanguageChange={setLang}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenModal={(m) => setActiveModal(m)}
      />

      <main className="flex-1 flex flex-col">
        
        {/* Hero Section */}
        <Hero lang={lang} />

        {/* Core Main Tool Widget */}
        <ConverterWidget lang={lang} />

        {/* AdSense Placement 1: Below Tool Widget Leaderboard */}
        <div className="max-w-5xl mx-auto px-4 w-full">
          <AdPlacement
            variant="leaderboard"
            id="ad-below-widget-leaderboard"
            slot="1234567890"
            className="my-4"
          />
        </div>

        {/* How It Works Section */}
        <HowItWorks lang={lang} />

        {/* AdSense Placement 2: In-Article Native Ad between How It Works and Features */}
        <div className="max-w-4xl mx-auto px-4 w-full">
          <AdPlacement
            variant="in-article"
            id="ad-in-article-middle"
            slot="2345678901"
            className="my-6"
          />
        </div>

        {/* Features Section */}
        <Features lang={lang} />

        {/* FAQ Section with in-feed ads */}
        <FAQSection lang={lang} />

        {/* Comprehensive SEO Content & Comparison Guide */}
        <SEOContent />

        {/* AdSense Placement 3: Before Footer Leaderboard */}
        <div className="max-w-5xl mx-auto px-4 w-full">
          <AdPlacement
            variant="leaderboard"
            id="ad-before-footer-leaderboard"
            slot="3456789012"
            className="my-8"
          />
        </div>

      </main>

      {/* Global Footer */}
      <Footer
        lang={lang}
        onOpenModal={(m) => setActiveModal(m)}
      />

      {/* Modals & Overlays */}
      {activeModal === 'privacy' && <PrivacyModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'terms' && <TermsModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'about' && <AboutModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'contact' && <ContactModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'blog' && <BlogSection onClose={() => setActiveModal(null)} />}
      {activeModal === 'shortcuts' && <KeyboardShortcutsModal onClose={() => setActiveModal(null)} />}

      {/* Cookie Consent Banner */}
      <CookieBanner onOpenPrivacy={() => setActiveModal('privacy')} />

      {/* Offline Connectivity Status Toast */}
      <OfflineIndicator />

    </div>
  );
}
