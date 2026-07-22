'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Locale, getTranslations, locales } from './i18n';

interface LanguageContextType {
  locale: Locale;
  t: ReturnType<typeof getTranslations>;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-locale') as Locale;
      if (saved && locales.includes(saved)) return saved;
      const browserLang = navigator.language.slice(0, 2) as Locale;
      if (locales.includes(browserLang)) return browserLang;
    }
    return 'pt';
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('portfolio-locale', newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = getTranslations(locale);

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
