'use client';

import { Code2, Server, Wrench, BrainCircuit } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const categoryIcons = [Code2, Server, Wrench, BrainCircuit];

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-padding bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            {t.skills.sectionTitle}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.skills.categories.map((category, catIndex) => {
            const Icon = categoryIcons[catIndex];
            return (
              <div
                key={catIndex}
                className="p-6 bg-bg-card rounded-2xl border border-border-subtle hover:border-border transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-dim flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary">
                    {category.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1.5 text-sm text-text-secondary bg-bg-secondary rounded-lg border border-border-subtle hover:border-border hover:text-text-primary transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
