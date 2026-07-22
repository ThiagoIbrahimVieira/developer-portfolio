'use client';

import { BookOpen, Rocket, Target } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function CurrentStatus() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-center mb-16">
          {t.status.sectionTitle}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-bg-card rounded-2xl border border-border-subtle">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent-dim flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">
                {t.status.studying.title}
              </h3>
            </div>
            <ul className="space-y-2">
              {t.status.studying.items.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-text-secondary text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-bg-card rounded-2xl border border-border-subtle">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">
                {t.status.building.title}
              </h3>
            </div>
            <ul className="space-y-2">
              {t.status.building.items.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-text-secondary text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-bg-card rounded-2xl border border-border-subtle">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-warning" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">
                {t.status.goal.title}
              </h3>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              {t.status.goal.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
