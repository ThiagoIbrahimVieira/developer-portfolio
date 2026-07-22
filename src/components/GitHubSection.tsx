'use client';

import { ExternalLink, Star, ArrowUpRight, Calendar } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import GithubIcon from './GithubIcon';
import { useLanguage } from '@/lib/LanguageContext';
import useGitHub from '@/hooks/useGitHub';
import FadeIn from './ui/FadeIn';
import StaggerChildren, { staggerItem } from './ui/StaggerChildren';

const languageColors: Record<string, string> = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-400',
  Python: 'bg-green-400',
  Java: 'bg-orange-400',
  HTML: 'bg-red-400',
  CSS: 'bg-purple-400',
  Shell: 'bg-gray-400',
  Dockerfile: 'bg-cyan-400',
  YAML: 'bg-pink-400',
  JSON: 'bg-yellow-300',
};

export default function GitHubSection() {
  const { t, locale } = useLanguage();
  const { profile, repos, topLanguages, totalStars, loading, error } = useGitHub();

  const formatDate = (dateStr: string) => {
    const localeMap: Record<string, string> = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };
    return new Date(dateStr).toLocaleDateString(localeMap[locale] || 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section id="github" className="section-padding bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            {t.github.sectionTitle}
          </h2>
          <p className="text-text-secondary text-lg">
            {t.github.description}
          </p>
        </FadeIn>

        {loading ? (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 bg-bg-card rounded-2xl border border-border-subtle">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full skeleton-shimmer" />
                <div className="space-y-2">
                  <div className="h-5 w-40 skeleton-shimmer rounded" />
                  <div className="h-4 w-24 skeleton-shimmer rounded" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 bg-bg-secondary rounded-xl">
                    <div className="h-8 w-12 skeleton-shimmer rounded mb-1" />
                    <div className="h-3 w-16 skeleton-shimmer rounded" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-bg-card rounded-xl border border-border-subtle">
                  <div className="h-4 w-32 skeleton-shimmer rounded mb-2" />
                  <div className="h-3 w-full skeleton-shimmer rounded mb-1" />
                  <div className="h-3 w-20 skeleton-shimmer rounded" />
                </div>
              ))}
            </div>
          </div>
        ) : error || !profile ? (
          <div className="max-w-xl mx-auto">
            <a
              href={`https://github.com/${t.github.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-bg-card rounded-2xl border border-border-subtle hover:border-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-bg-secondary flex items-center justify-center border border-border-subtle">
                  <GithubIcon className="w-7 h-7 text-text-secondary group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                    @{t.github.username}
                  </h3>
                  <p className="text-text-secondary text-sm">{t.github.profile}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-text-tertiary group-hover:text-accent transition-colors ml-auto" />
              </div>
            </a>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="p-6 bg-bg-card rounded-2xl border border-border-subtle mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-border-subtle">
                  <Image
                    src={profile.avatar_url}
                    alt={profile.name || profile.login}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {profile.name || profile.login}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    @{profile.login}
                  </p>
                  {profile.bio && (
                    <p className="text-text-tertiary text-xs mt-1 max-w-md">{profile.bio}</p>
                  )}
                </div>
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto p-2 text-text-tertiary hover:text-accent transition-colors"
                  aria-label="View GitHub profile"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-bg-secondary rounded-xl text-center">
                  <div className="text-2xl font-bold text-text-primary">{profile.public_repos}</div>
                  <div className="text-xs text-text-tertiary mt-1">{t.github.repositories}</div>
                </div>
                <div className="p-4 bg-bg-secondary rounded-xl text-center">
                  <div className="text-2xl font-bold text-text-primary">{totalStars}</div>
                  <div className="text-xs text-text-tertiary mt-1">{t.github.stars}</div>
                </div>
                <div className="p-4 bg-bg-secondary rounded-xl text-center">
                  <div className="text-2xl font-bold text-text-primary">{profile.followers}</div>
                  <div className="text-xs text-text-tertiary mt-1">{t.github.followers}</div>
                </div>
              </div>
            </div>

            {topLanguages.length > 0 && (
              <FadeIn className="mb-6">
                <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                  {t.github.topLanguages}
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {topLanguages.map((lang) => (
                    <div
                      key={lang.name}
                      className="flex items-center gap-2 px-3 py-1.5 bg-bg-card rounded-lg border border-border-subtle"
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${languageColors[lang.name] || 'bg-gray-400'}`} />
                      <span className="text-sm text-text-secondary">{lang.name}</span>
                      <span className="text-xs text-text-tertiary">({lang.count})</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}

            {repos.length > 0 && (
              <FadeIn delay={0.1}>
                <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                  {t.github.recentRepos}
                </h3>
                <StaggerChildren staggerDelay={0.08} className="grid md:grid-cols-3 gap-4">
                  {repos.slice(0, 6).map((repo) => (
                    <motion.a
                      key={repo.id}
                      variants={staggerItem}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-bg-card rounded-xl border border-border-subtle hover:border-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20 group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors truncate">
                          {repo.name}
                        </h4>
                        <ArrowUpRight className="w-4 h-4 text-text-tertiary group-hover:text-accent transition-colors flex-shrink-0 ml-2" />
                      </div>
                      {repo.description && (
                        <p className="text-xs text-text-tertiary leading-relaxed mb-3 line-clamp-2">
                          {repo.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-text-tertiary">
                        {repo.language && (
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${languageColors[repo.language] || 'bg-gray-400'}`} />
                            <span>{repo.language}</span>
                          </div>
                        )}
                        {repo.stargazers_count > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            <span>{repo.stargazers_count}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 ml-auto">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(repo.updated_at)}</span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </StaggerChildren>
              </FadeIn>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
