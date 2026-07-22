'use client';

import { ExternalLink, GitBranch, Star, Users } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { useLanguage } from '@/lib/LanguageContext';

export default function GitHubSection() {
  const { t } = useLanguage();

  return (
    <section id="github" className="section-padding bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            {t.github.sectionTitle}
          </h2>
          <p className="text-text-secondary text-lg">
            {t.github.description}
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <a
            href={`https://github.com/${t.github.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-bg-card rounded-2xl border border-border-subtle hover:border-border transition-all duration-300 hover-lift group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-bg-secondary flex items-center justify-center border border-border-subtle">
                <GithubIcon className="w-7 h-7 text-text-secondary group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                  @{t.github.username}
                </h3>
                <p className="text-text-secondary text-sm">
                  GitHub Profile
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-text-tertiary group-hover:text-accent transition-colors ml-auto" />
            </div>

            <div className="flex items-center gap-6 text-text-tertiary text-sm">
              <div className="flex items-center gap-1.5">
                <GitBranch className="w-4 h-4" />
                <span>Repositories</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4" />
                <span>Stars</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>Followers</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
