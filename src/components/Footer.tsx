'use client';

import GithubIcon from './GithubIcon';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-8 border-t border-border-subtle bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-tertiary text-sm">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>

          <div className="flex items-center gap-4">
            <span className="text-text-tertiary text-sm flex items-center gap-1">
              {t.footer.builtWith}
            </span>
            <a
              href="https://github.com/ThiagoIbrahimVieira"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
