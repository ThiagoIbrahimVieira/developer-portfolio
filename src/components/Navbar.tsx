'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { locales, localeNames, localeFlags, Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import useActiveSection from '@/hooks/useActiveSection';

const navItems = ['home', 'about', 'projects', 'skills', 'journey', 'github', 'contact'] as const;

export default function Navbar() {
  const { locale, t, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const activeSection = useActiveSection();

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

  useEffect(() => {
    const handleClick = () => setShowLangMenu(false);
    if (showLangMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [showLangMenu]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-border-subtle/50 shadow-lg shadow-black/10'
          : 'bg-transparent'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            className="text-lg font-semibold text-text-primary hover:text-accent transition-colors duration-200"
            aria-label="Go to home"
          >
            TI
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                aria-current={activeSection === item ? 'page' : undefined}
                className={cn(
                  'relative px-3 py-2 text-sm rounded-lg transition-colors duration-200',
                  activeSection === item
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-card/50'
                )}
              >
                {t.nav[item]}
                {activeSection === item && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-accent/10 rounded-lg border border-accent/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}

            <div className="relative ml-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLangMenu(!showLangMenu);
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 rounded-lg hover:bg-bg-card/50"
                aria-label="Select language"
                aria-expanded={showLangMenu}
                aria-haspopup="true"
              >
                <Globe className="w-4 h-4" />
                <span>{localeFlags[locale]} {localeNames[locale]}</span>
              </button>

              <AnimatePresence>
                {showLangMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] as const }}
                    className="absolute right-0 mt-2 w-36 py-1 bg-bg-card border border-border rounded-xl shadow-xl shadow-black/30"
                  >
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => { setLocale(loc as Locale); setShowLangMenu(false); }}
                        className={cn(
                          'w-full px-4 py-2 text-sm text-left hover:bg-bg-card-hover transition-colors duration-150 flex items-center gap-2',
                          locale === loc ? 'text-accent' : 'text-text-secondary'
                        )}
                      >
                        <span>{localeFlags[loc]}</span>
                        <span>{localeNames[loc]}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="md:hidden overflow-hidden bg-bg-primary/95 backdrop-blur-xl border-t border-border-subtle/50"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setIsOpen(false)}
                  aria-current={activeSection === item ? 'page' : undefined}
                  className={cn(
                    'block px-3 py-2.5 text-sm rounded-lg transition-colors duration-150',
                    activeSection === item
                      ? 'text-accent bg-accent/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-card/50'
                  )}
                >
                  {t.nav[item]}
                </a>
              ))}

              <div className="pt-2 border-t border-border-subtle">
                <p className="px-3 py-2 text-xs text-text-tertiary uppercase tracking-wider">{t.nav.language}</p>
                <div className="flex gap-1 px-3">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => { setLocale(loc as Locale); setIsOpen(false); }}
                      className={cn(
                        'px-3 py-1.5 text-sm rounded-lg transition-colors duration-150',
                        locale === loc
                          ? 'bg-accent-dim text-accent'
                          : 'text-text-secondary hover:bg-bg-card/50'
                      )}
                    >
                      {localeFlags[loc]} {localeNames[loc]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
