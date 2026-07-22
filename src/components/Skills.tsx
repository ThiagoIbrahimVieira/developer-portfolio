'use client';

import { Code2, Server, Wrench, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import FadeIn from './ui/FadeIn';
import StaggerChildren, { staggerItem } from './ui/StaggerChildren';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Server,
  Wrench,
  BrainCircuit,
};

const levelColors: Record<string, string> = {
  comfortable: 'bg-success/15 text-success',
  practicing: 'bg-accent/15 text-accent',
  learning: 'bg-warning/15 text-warning',
  studying: 'bg-purple-500/15 text-purple-400',
  future: 'bg-text-tertiary/15 text-text-tertiary',
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-padding bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            {t.skills.sectionTitle}
          </h2>
        </FadeIn>

        <StaggerChildren staggerDelay={0.1} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.skills.categories.map((category, catIndex) => {
            const Icon = iconMap[category.icon] || Code2;
            return (
              <motion.div
                key={catIndex}
                variants={staggerItem}
                className="p-6 bg-bg-card rounded-2xl border border-border-subtle hover:border-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-accent-dim flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary">
                    {category.name}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.items.map((skill: { name: string; level: string; description: string }, skillIndex: number) => (
                    <div key={skillIndex} className="group/skill">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-sm font-medium text-text-primary group-hover/skill:text-accent transition-colors duration-200">
                          {skill.name}
                        </span>
                        <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${levelColors[skill.level] || 'bg-bg-secondary text-text-tertiary'}`}>
                          {t.skills.levelLabels[skill.level as keyof typeof t.skills.levelLabels] || skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-text-tertiary leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
