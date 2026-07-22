'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { useLanguage } from '@/lib/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % t.hero.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [t.hero.titles.length]);

  return (
    <section id="home" className="section-padding flex items-center min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-3xl">
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-4 animate-fade-in opacity-0">
            {t.hero.greeting}
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight mb-4 animate-fade-in-up opacity-0 delay-100">
            {t.hero.name}
          </h1>

          <div className="h-12 sm:h-14 md:h-16 flex items-center mb-6 animate-fade-in-up opacity-0 delay-200">
            <span
              key={currentTitle}
              className="text-xl sm:text-2xl md:text-3xl font-medium gradient-text animate-fade-in"
            >
              {t.hero.titles[currentTitle]}
            </span>
          </div>

          <p className="text-lg sm:text-xl text-text-secondary max-w-xl mb-10 leading-relaxed animate-fade-in-up opacity-0 delay-300">
            {t.hero.tagline}
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-up opacity-0 delay-400">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary font-medium rounded-xl transition-all duration-200 hover-lift"
            >
              {t.hero.primaryCta}
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/ThiagoIbrahimVieira"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bg-card hover:bg-bg-card-hover text-text-primary font-medium rounded-xl border border-border transition-all duration-200 hover-lift"
            >
              <GithubIcon className="w-4 h-4" />
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
