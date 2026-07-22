'use client';

import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            {t.projects.sectionTitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.items.map((project, index) => (
            <div
              key={index}
              className="group p-6 bg-bg-card rounded-2xl border border-border-subtle hover:border-border transition-all duration-300 hover-lift flex flex-col"
            >
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-text-tertiary group-hover:text-accent transition-colors flex-shrink-0" />
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2.5 py-1 text-xs font-medium text-accent bg-accent-dim rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border-subtle">
                <span className="text-xs text-success font-medium">
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
