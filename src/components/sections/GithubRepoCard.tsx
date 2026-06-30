import { MotionWrapper } from '../animations/MotionWrapper.js';
import './githubActivity.css';

export type GithubRepo = {
  name: string;
  description?: string;
  language?: string;
  stars?: number;
  updatedAt?: string;
  htmlUrl: string;
};

export function GithubRepoCard({ repo, index }: { repo: GithubRepo; index: number }) {
  const updated = repo.updatedAt ? new Date(repo.updatedAt) : null;
  const updatedLabel = updated && !Number.isNaN(updated.getTime()) ? updated.toLocaleDateString() : '—';

  return (
    <MotionWrapper
      className="bbGithubRepoCard glass-panel glass-edge"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.04 * (index % 3),
      }}
    >
      <div className="bbGithubRepoHead">
        <div className="bbGithubRepoName" title={repo.name}>
          {repo.name}
        </div>
        <div className="bbGithubRepoMeta">
          {repo.language ? <span className="bbGithubRepoLang">{repo.language}</span> : null}
        </div>
      </div>

      <div className="bbGithubRepoDesc">{repo.description?.trim() ? repo.description : 'No description'}</div>

      <div className="bbGithubRepoFooter">
        <div className="bbGithubRepoStats" aria-label="Repository stats">
          <div className="bbGithubRepoStat">
            <span className="bbGithubRepoStatValue">★ {repo.stars ?? 0}</span>
            <span className="bbGithubRepoStatLabel">Stars</span>
          </div>
          <div className="bbGithubRepoStat">
            <span className="bbGithubRepoStatValue">{updatedLabel}</span>
            <span className="bbGithubRepoStatLabel">Updated</span>
          </div>
        </div>

        <a className="bbGithubRepoBtnLink" href={repo.htmlUrl} target="_blank" rel="noreferrer">
          <span className="btn btn-primary bbGithubRepoBtn" role="button" aria-label={`View ${repo.name} on GitHub`}>
            View on GitHub
          </span>
        </a>

      </div>
    </MotionWrapper>
  );
}

