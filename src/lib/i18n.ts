import pt from '@/i18n/pt.json';
import en from '@/i18n/en.json';
import es from '@/i18n/es.json';

export type Locale = 'pt' | 'en' | 'es';

export const locales: Locale[] = ['pt', 'en', 'es'];

export const localeNames: Record<Locale, string> = {
  pt: 'PT',
  en: 'EN',
  es: 'ES',
};

export const localeFlags: Record<Locale, string> = {
  pt: '\u{1F1E7}\u{1F1F7}',
  en: '\u{1F1FA}\u{1F1F8}',
  es: '\u{1F1EA}\u{1F1F8}',
};

const translations: Record<Locale, typeof pt> = { pt, en, es };

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en;
}
