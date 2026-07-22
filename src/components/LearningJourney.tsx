'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function LearningJourney() {
  const { t } = useLanguage();

  return (
    <section id="journey" className="section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            {t.journey.sectionTitle}
          </h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {t.journey.milestones.map((milestone, index) => (
            <div
              key={index}
              className={`relative flex items-start gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="hidden md:block md:w-1/2" />

              <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-accent border-4 border-bg-primary -translate-x-1.5 mt-2 z-10" />

              <div className={`flex-1 pl-14 md:pl-0 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                <div className="p-6 bg-bg-card rounded-2xl border border-border-subtle hover:border-border transition-all duration-300">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-accent bg-accent-dim rounded-lg mb-3">
                    {milestone.period}
                  </span>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
