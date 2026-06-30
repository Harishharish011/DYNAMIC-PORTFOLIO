import { MotionWrapper } from '../animations/MotionWrapper.js';
import './githubActivity.css';

export function GithubContributionGraph({
  contributionImageUrl,
}: {
  contributionImageUrl?: string | null;
}) {
  return (
    <MotionWrapper
      className="bbGithubGraph glass-panel glass-edge"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="bbGithubSectionTitleRow">
        <div className="bbGithubSectionEyebrow">CONTRIBUTIONS</div>
      </div>

      <div className="bbGithubGraphBody">
        {contributionImageUrl ? (
          <img
            className="bbGithubGraphImg"
            src={contributionImageUrl}
            alt="GitHub contribution graph"
            loading="lazy"
          />
        ) : (
          <div className="bbGithubGraphPlaceholder" role="status" aria-live="polite">
            <div className="bbGithubGraphPlaceholderTitle">Contribution graph placeholder</div>
            <div className="bbGithubGraphPlaceholderText">
              Ready for future integration (GitHub API / stats image). This keeps the layout premium and
              stable even without backend.
            </div>
          </div>
        )}
      </div>
    </MotionWrapper>
  );
}

