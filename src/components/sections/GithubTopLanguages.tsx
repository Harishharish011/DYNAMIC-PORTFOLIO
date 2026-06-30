import { MotionWrapper } from '../animations/MotionWrapper.js';
import './githubActivity.css';

export function GithubTopLanguages({ languages }: { languages?: Array<{ name: string; percent: number }> | null }) {
  const items =
    languages && languages.length
      ? languages
      : [
          { name: 'TypeScript', percent: 42 },
          { name: 'JavaScript', percent: 28 },
          { name: 'HTML', percent: 12 },
          { name: 'CSS', percent: 10 },
          { name: 'Node.js', percent: 8 },
        ];

  const max = Math.max(...items.map((i) => i.percent), 1);

  return (
    <MotionWrapper
      className="bbGithubLanguages glass-panel glass-edge"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="bbGithubSectionTitleRow">
        <div className="bbGithubSectionEyebrow">TOP LANGUAGES</div>
      </div>

      <div className="bbGithubLangList" role="list" aria-label="Top programming languages">
        {items.map((it) => {
          const w = Math.round((it.percent / max) * 100);
          return (
            <div className="bbGithubLangRow" role="listitem" key={it.name}>
              <div className="bbGithubLangName">{it.name}</div>
              <div className="bbGithubLangBar" aria-hidden="true">
                <div className="bbGithubLangFill" style={{ width: `${w}%` }} />
              </div>
              <div className="bbGithubLangPct">{it.percent}%</div>
            </div>
          );
        })}
      </div>

      <div className="bbGithubLanguagesFootnote">
        Language stats are placeholder-ready for future GitHub API integration.
      </div>
    </MotionWrapper>
  );
}

