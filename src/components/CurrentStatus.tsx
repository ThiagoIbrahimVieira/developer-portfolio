'use client';

import { BookOpen, Rocket, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import FadeIn from './ui/FadeIn';
import StaggerChildren, { staggerItem } from './ui/StaggerChildren';

const iconMap = {
  studying: { icon: BookOpen, color: 'text-accent', bg: 'bg-accent-dim' },
  building: { icon: Rocket, color: 'text-success', bg: 'bg-success/10' },
  goal: { icon: Target, color: 'text-warning', bg: 'bg-warning/10' },
} as const;

export default function CurrentStatus() {
  const { t } = useLanguage();

  return (
    <section id="status" className="section-padding bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {t.status.sectionTitle}
          </h2>
        </FadeIn>

        <StaggerChildren staggerDelay={0.12} className="grid md:grid-cols-3 gap-6">
          {(['studying', 'building', 'goal'] as const).map((key) => {
            const config = iconMap[key];
            const Icon = config.icon;
            const data = t.status[key];

            return (
              <motion.div
                key={key}
                variants={staggerItem}
                className="relative p-6 bg-bg-card rounded-2xl border border-border-subtle hover:border-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${
                  key === 'studying' ? 'bg-accent' : key === 'building' ? 'bg-success' : 'bg-warning'
                }`} />

                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {data.title}
                  </h3>
                </div>

                {key === 'goal' ? (
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {(data as { description: string }).description}
                  </p>
                ) : (
                  <ul className="space-y-2.5">
                    {(data as { items: string[] }).items.map((item: string, index: number) => (
                      <li key={index} className="flex items-center gap-2.5 text-text-secondary text-sm">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          key === 'studying' ? 'bg-accent' : 'bg-success'
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
