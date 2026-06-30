import { useEffect, useMemo, useState } from 'react';
import { MotionWrapper } from '../animations/MotionWrapper.js';
import { Container } from '../ui/Container.js';
import { Button } from '../ui/Button.js';
import { ServiceState } from '../ui/ServiceState.js';

import {
  getFeaturedGithubRepos,
  getGithubProfileSafe,
  getGithubTopLanguagesSafe,
  getGithubContributionImageSafe,
} from '../../services/githubService.js';
import type { GithubProfile } from './GithubProfileCard.js';
import type { GithubRepo } from './GithubRepoCard.js';

import { GithubProfileCard } from './GithubProfileCard.js';
import { GithubRepoCard } from './GithubRepoCard.js';
import { GithubTopLanguages } from './GithubTopLanguages.js';
import { GithubContributionGraph } from './GithubContributionGraph.js';

import './githubActivity.css';

const GITHUB_PROFILE_URL = 'https://github.com/Harishharish011';

export function GithubActivitySectionImpl() {
  const [profile, setProfile] = useState<Partial<GithubProfile> | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [languages, setLanguages] = useState<Array<{ name: string; percent: number }> | null>(null);
  const [contributionImageUrl, setContributionImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const featuredRepos = useMemo(() => repos.slice(0, 6), [repos]);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    setError(null);

    Promise.all([
      getGithubProfileSafe('Harishharish011'),
      getFeaturedGithubRepos('Harishharish011'),
      getGithubTopLanguagesSafe('Harishharish011'),
      getGithubContributionImageSafe('Harishharish011'),
    ])
      .then(([p, r, l, img]) => {
        if (!mounted) return;
        setProfile(p);
        setRepos(r);
        setLanguages(l);
        setContributionImageUrl(img);
      })
      .catch(() => {
        if (!mounted) return;
        console.error('Failed to load GitHub data.');
        setProfile(null);
        setRepos([]);
        setLanguages(null);
        setContributionImageUrl(null);
        setError('GitHub data could not be loaded right now.');
      })
      .finally(() => {
        if (!mounted) return;
        setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="github" className="bbGithubActivity">
      <Container>
        <div className="bbGithubActivityInner">
          <MotionWrapper
            className="bbGithubHeader"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="bbGithubHeaderText">
              <div className="bbContactEyebrow bbContactEyebrow--hero">GITHUB ACTIVITY</div>
              <h2 className="bbContactHeading bbContactHeading--hero bbGithubHeroHeading">
                A live snapshot of my GitHub
              </h2>
              <p className="bbContactSupporting bbContactSupporting--hero bbGithubHeroSupporting">
                Profile highlights, featured repositories, top languages, and a contribution graph panel (API-ready).
              </p>
            </div>

            <div className="bbGithubHeaderRight">
              <div className="bbGithubCtaWrap">
                <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <Button variant="primary">View My Work</Button>
                </a>
              </div>
            </div>
          </MotionWrapper>

          {isLoading ? (
            <ServiceState title="Loading GitHub data" message="Fetching profile, repositories, and language stats." />
          ) : error ? (
            <ServiceState title="GitHub unavailable" message={error} />
          ) : null}

          <div className="bbGithubGrid">
            <div className="bbGithubLeftStack">
              <GithubProfileCard profile={profile} />

              <div className="bbGithubReposPanel glass-panel glass-edge glow-panel">
                <div className="bbGithubSectionTitleRow">
                  <div>
                    <div className="bbGithubSectionEyebrow">REPOSITORY SHOWCASE</div>
                  </div>
                </div>

                <div className="bbGithubReposGrid" role="list" aria-label="Featured repositories">
                  {featuredRepos.length ? (
                    featuredRepos.map((repo, idx) => (
                      <div role="listitem" key={`${repo.name}-${idx}`}>
                        <GithubRepoCard repo={repo} index={idx} />
                      </div>
                    ))
                  ) : (
                    <ServiceState title="No repositories found" message="The backend did not return repository data yet." />
                  )}
                </div>
              </div>
            </div>

            <div className="bbGithubRightStack">
              <GithubTopLanguages languages={languages} />
              <GithubContributionGraph contributionImageUrl={contributionImageUrl} />
            </div>
          </div>

          <div style={{ height: 8 }} aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}

