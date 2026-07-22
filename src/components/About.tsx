'use client';

import { BookOpen, Server, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import FadeIn from './ui/FadeIn';
import StaggerChildren, { staggerItem } from './ui/StaggerChildren';

const icons = [BookOpen, Server, Brain];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            {t.about.sectionTitle}
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            {t.about.description}
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.12} className="grid md:grid-cols-3 gap-6">
          {t.about.highlights.map((highlight, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group p-6 bg-bg-card rounded-2xl border border-border-subtle hover:border-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-dim flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-200">
                  {highlight.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            );
          })}
        </StaggerChildren>

        <FadeIn delay={0.3} className="mt-16">
          <div className="relative p-8 bg-bg-card rounded-2xl border border-border-subtle text-center overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-accent/30 rounded-r" />
            <p className="text-text-secondary text-lg italic leading-relaxed">
              &ldquo;{t.about.goal}&rdquo;
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
