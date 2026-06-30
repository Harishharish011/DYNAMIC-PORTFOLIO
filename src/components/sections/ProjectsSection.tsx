import { MotionWrapper } from '../animations/MotionWrapper.js';
import { Container } from '../ui/Container.js';
import { ServiceState } from '../ui/ServiceState.js';

import { useEffect, useState } from 'react';

import { ProjectCard } from './ProjectCard.js';
import './projects.css';

import { getProjects } from '../../services/projectsService.js';
import type { Project } from '../../types/projects.js';

export function ProjectsSection() {

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    setError(null);

    getProjects()
      .then((data) => {
        if (!mounted) return;
        setProjects(data);
      })
      .catch((err) => {
        console.error('Failed to load projects.', err);
        if (!mounted) return;
        setError('Projects could not be loaded right now.');
        setProjects([]);
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
    <section id="projects" className="bbProjects">
      <Container>
        <div className="bbProjectsInner">


          <MotionWrapper
            className="bbProjectsHeader"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="bbProjectsEyebrow">FEATURED WORK</div>
            <h2 className="bbProjectsHeading">Selected Projects &amp; Case Studies</h2>
            <p className="bbProjectsSupporting">
              A curated collection of projects focused on full‑stack development, UI
              engineering, and modern web experiences.
            </p>
          </MotionWrapper>

          <div className="bbProjectsList">
            {isLoading ? (
              <ServiceState title="Loading projects" message="Fetching the latest case studies from the backend." />
            ) : error ? (
              <ServiceState title="Projects unavailable" message={error} />
            ) : projects.length ? (
              projects.map((project: Project, idx: number) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))
            ) : (
              <ServiceState title="No projects found" message="No featured projects are available yet." />
            )}
          </div>

          <div className="bbProjectsSpacer" aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}

