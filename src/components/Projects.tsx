'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import FadeIn from './ui/FadeIn';
import StaggerChildren, { staggerItem } from './ui/StaggerChildren';

const statusColors: Record<string, string> = {
  'In Development': 'bg-success/15 text-success border-success/20',
  'Em desenvolvimento': 'bg-success/15 text-success border-success/20',
  'En Desarrollo': 'bg-success/15 text-success border-success/20',
  'Completed': 'bg-accent/15 text-accent border-accent/20',
  'Planning': 'bg-warning/15 text-warning border-warning/20',
};

export default function Projects() {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            {t.projects.sectionTitle}
          </h2>
        </FadeIn>

        <StaggerChildren staggerDelay={0.12} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.items.map((project, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="group bg-bg-card rounded-2xl border border-border-subtle hover:border-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 overflow-hidden flex flex-col"
            >
              <div className="h-32 bg-gradient-to-br from-bg-card to-bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-accent/10">{project.name.charAt(0)}</span>
                </div>
                {project.status && (
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${statusColors[project.status] || 'bg-bg-card text-text-secondary border-border'}`}>
                      {project.status}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
                    {project.name}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-text-tertiary group-hover:text-accent transition-colors duration-200 flex-shrink-0 mt-0.5" />
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((tech: string, techIndex: number) => (
                    <span
                      key={techIndex}
                      className="px-2 py-0.5 text-xs font-medium text-accent bg-accent-dim rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.github && (
                  <div className="flex items-center gap-3 mb-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent transition-colors duration-200"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      {t.projects.viewCode}
                    </a>
                  </div>
                )}

                {project.architecture && (
                  <div className="mt-auto">
                    <button
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                      className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover transition-colors duration-200"
                    >
                      {t.projects.details}
                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-border-subtle space-y-3">
                            <div>
                              <h4 className="text-xs font-semibold text-text-primary mb-1 uppercase tracking-wider">
                                {t.projects.architecture}
                              </h4>
                              <p className="text-xs text-text-secondary leading-relaxed">{project.architecture}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-text-primary mb-1 uppercase tracking-wider">
                                {t.projects.challenge}
                              </h4>
                              <p className="text-xs text-text-secondary leading-relaxed">{project.challenge}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-text-primary mb-1 uppercase tracking-wider">
                                {t.projects.lessons}
                              </h4>
                              <p className="text-xs text-text-secondary leading-relaxed">{project.lessons}</p>
                            </div>
                            {project.future && (
                              <div>
                                <h4 className="text-xs font-semibold text-text-primary mb-1 uppercase tracking-wider">
                                  {t.projects.future}
                                </h4>
                                <ul className="space-y-1">
                                  {project.future.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-1.5 text-xs text-text-secondary">
                                      <span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
