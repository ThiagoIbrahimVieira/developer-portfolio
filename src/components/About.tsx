'use client';

import { BookOpen, Server, Brain } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const icons = [BookOpen, Server, Brain];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            {t.about.sectionTitle}
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            {t.about.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.about.highlights.map((highlight, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="p-6 bg-bg-card rounded-2xl border border-border-subtle hover:border-border transition-all duration-300 hover-lift group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-dim flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {highlight.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 bg-bg-card rounded-2xl border border-border-subtle text-center">
          <p className="text-text-secondary text-lg italic">
            &ldquo;{t.about.goal}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
