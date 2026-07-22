'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { locales, localeNames, localeFlags, Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const navItems = ['home', 'about', 'projects', 'skills', 'journey', 'github', 'contact'] as const;

export default function Navbar() {
  const { locale, t, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'nav-blur border-b border-border-subtle shadow-lg shadow-black/20' : 'bg-transparent'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            className="text-lg font-semibold text-text-primary hover:text-accent transition-colors"
            aria-label="Go to home"
          >
            TI
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-bg-card"
              >
                {t.nav[item]}
              </a>
            ))}

            <div className="relative ml-2">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-bg-card"
                aria-label="Select language"
                aria-expanded={showLangMenu}
                aria-haspopup="true"
              >
                <Globe className="w-4 h-4" />
                <span>{localeFlags[locale]} {localeNames[locale]}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-36 py-1 bg-bg-card border border-border rounded-xl shadow-xl animate-fade-in">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => { setLocale(loc as Locale); setShowLangMenu(false); }}
                      className={cn(
                        'w-full px-4 py-2 text-sm text-left hover:bg-bg-card-hover transition-colors flex items-center gap-2',
                        locale === loc ? 'text-accent' : 'text-text-secondary'
                      )}
                    >
                      <span>{localeFlags[loc]}</span>
                      <span>{localeNames[loc]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden nav-blur border-t border-border-subtle animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card rounded-lg transition-colors"
              >
                {t.nav[item]}
              </a>
            ))}

            <div className="pt-2 border-t border-border-subtle">
              <p className="px-3 py-2 text-xs text-text-tertiary uppercase tracking-wider">{t.nav.home ? 'Language' : 'Language'}</p>
              <div className="flex gap-1 px-3">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { setLocale(loc as Locale); setIsOpen(false); }}
                    className={cn(
                      'px-3 py-1.5 text-sm rounded-lg transition-colors',
                      locale === loc
                        ? 'bg-accent-dim text-accent'
                        : 'text-text-secondary hover:bg-bg-card'
                    )}
                  >
                    {localeFlags[loc]} {localeNames[loc]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
