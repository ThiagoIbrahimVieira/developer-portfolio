'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import FadeIn from './ui/FadeIn';
import SlideIn from './ui/SlideIn';

export default function LearningJourney() {
  const { t } = useLanguage();

  return (
    <section id="journey" className="section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            {t.journey.sectionTitle}
          </h2>
        </FadeIn>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {t.journey.milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="hidden md:block md:w-1/2" />

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.3, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
                  className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-accent border-4 border-bg-primary -translate-x-1.5 mt-2 z-10"
                />

                <SlideIn
                  direction={isLeft ? 'left' : 'right'}
                  delay={0.1}
                  className={`flex-1 pl-14 md:pl-0 ${isLeft ? 'md:pl-10' : 'md:pr-10'}`}
                >
                  <div className="p-5 bg-bg-card rounded-2xl border border-border-subtle hover:border-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20">
                    <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-accent bg-accent-dim rounded-md mb-2">
                      {milestone.period}
                    </span>
                    <h3 className="text-base font-semibold text-text-primary mb-1.5">
                      {milestone.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </SlideIn>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
