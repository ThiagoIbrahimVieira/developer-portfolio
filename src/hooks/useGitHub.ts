'use client';

import { useState, useEffect } from 'react';

interface GitHubProfile {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

interface GitHubData {
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  topLanguages: { name: string; count: number }[];
  totalStars: number;
  loading: boolean;
  error: boolean;
}

const GITHUB_USERNAME = 'ThiagoIbrahimVieira';
const CACHE_KEY = 'github-cache';
const CACHE_DURATION = 10 * 60 * 1000;

function getCachedData(): GitHubData | null {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) return null;
    return data;
  } catch {
    return null;
  }
}

function setCachedData(data: GitHubData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

export default function useGitHub(): GitHubData {
  const [data, setData] = useState<GitHubData>({
    profile: null,
    repos: [],
    topLanguages: [],
    totalStars: 0,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const cached = getCachedData();
      if (cached) {
        if (!cancelled) setData(cached);
        return;
      }

      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`),
        ]);

        if (!profileRes.ok || !reposRes.ok) {
          throw new Error('GitHub API request failed');
        }

        const profile: GitHubProfile = await profileRes.json();
        const allRepos: GitHubRepo[] = await reposRes.json();
        const repos = allRepos.filter((r) => !r.fork);

        const languageMap = new Map<string, number>();
        repos.forEach((repo) => {
          if (repo.language) {
            languageMap.set(repo.language, (languageMap.get(repo.language) || 0) + 1);
          }
        });

        const topLanguages = Array.from(languageMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

        const result: GitHubData = {
          profile,
          repos,
          topLanguages,
          totalStars,
          loading: false,
          error: false,
        };

        setCachedData(result);
        if (!cancelled) setData(result);
      } catch {
        if (!cancelled) setData((prev) => ({ ...prev, loading: false, error: true }));
      }
    };

    load();

    return () => { cancelled = true; };
  }, []);

  return data;
}
