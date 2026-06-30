import type { Project } from '../../types/projects.js';
import { TechnologyBadge } from './TechnologyBadge.js';

import '../../pages/project-details.css';

export function ProjectHero({ project }: { project: Project }) {
  return (
    <header className="bbProjectHero glass-panel">
      <div
        className="bbProjectHeroAccent"
        style={{ background: project.gradientAccent }}
        aria-hidden="true"
      />

      <div className="bbProjectHeroContent">
        <div className="bbProjectHeroMetadata">
          <div className="bbProjectHeroCategory">{project.category}</div>
          <h1 className="bbProjectHeroTitle">{project.title}</h1>
          <p className="bbProjectHeroSubtitle">{project.shortDescription}</p>

          <div className="bbProjectHeroTech">
            {(Array.isArray(project.technologies) ? project.technologies : []).map((t) => (
              <TechnologyBadge key={t} label={t} />
            ))}
          </div>
        </div>

        <div className="bbProjectHeroPreviewWrap" aria-hidden="true">
          <div className="bbProjectHeroPreviewGlass" />
          <img
            className="bbProjectHeroPreviewImg"
            src={project.heroImage}
            alt=""
            loading="lazy"
          />
        </div>
      </div>

    </header>
  );
}
