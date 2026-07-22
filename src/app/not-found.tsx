'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <section className="section-padding flex items-center justify-center min-h-[80vh]">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          {t.notFound.subtitle}
        </h2>
        <p className="text-text-secondary mb-8">
          {t.notFound.description}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary font-medium rounded-xl transition-all duration-200 hover-lift"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.notFound.backHome}
        </Link>
      </div>
    </section>
  );
}
