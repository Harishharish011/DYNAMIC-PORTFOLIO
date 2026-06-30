import { useNavigate } from 'react-router-dom';
import { MotionWrapper } from '../animations/MotionWrapper.js';
import { Button } from '../ui/Button.js';
import type { Project } from '../../types/projects.js';

import './projects.css';

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const navigate = useNavigate();

  return (
    <MotionWrapper
      className={`bbProjectCard ${
        index % 2 === 0 ? 'bbProjectCard--mediaLeft' : 'bbProjectCard--mediaRight'
      }`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.04 * (index % 3),
      }}
    >
      <div className="bbProjectMedia glass-panel" aria-hidden="true">
        <div
          className="bbProjectMediaAccent"
          style={{ background: project.gradientAccent }}
        />
        <img
          className="bbProjectThumb"
          src={project.thumbnailImage}
          alt=""
          loading="lazy"
        />
      </div>

      <div className="bbProjectBody">
        <div className="bbProjectCategory">{project.category}</div>
        <h3 className="bbProjectTitle">{project.title}</h3>
        <p className="bbProjectDesc">{project.shortDescription}</p>

        <div className="bbProjectTech" aria-label={`${project.title} technologies`}>
          {project.technologies.map((t) => (
            <span key={t} className="bbProjectTag">
              {t}
            </span>
          ))}
        </div>

        <div className="bbProjectActions">
          <Button
            variant="primary"
            className="bbProjectBtn"
            onClick={() => navigate(`/project/${project.slug}`)}
          >
            View Project
          </Button>
          <Button variant="secondary" className="bbProjectBtn">
            Live Demo
          </Button>
        </div>

        {/* Placeholder for future case study routing */}
        <div
          className="bbProjectLinks"
          aria-hidden="true"
          data-github={project.githubUrl}
          data-demo={project.liveDemoUrl}
        />
      </div>
    </MotionWrapper>
  );
}
