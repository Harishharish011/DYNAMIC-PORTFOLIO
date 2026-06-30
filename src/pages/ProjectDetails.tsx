import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container } from '../components/ui/Container.js';
import { Button } from '../components/ui/Button.js';
import { SectionTitle } from '../components/ui/SectionTitle.js';
import { ServiceState } from '../components/ui/ServiceState.js';
import { MotionWrapper } from '../components/animations/MotionWrapper.js';

import { getProjectBySlug } from '../services/projectsService.js';

import { ProjectHero } from '../components/project/ProjectHero.js';
import { TechnologyBadge } from '../components/project/TechnologyBadge.js';
import { GalleryGrid } from '../components/project/GalleryGrid.js';
import { ChallengeSolution } from '../components/project/ChallengeSolution.js';
import type { Project } from '../types/projects.js';

import './project-details.css';

export function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const projectPromise = useMemo(() => {
    if (!id) return undefined;
    return getProjectBySlug(id);
  }, [id]);

  // getProjectBySlug is async; we keep the page schema-safe
  // by resolving the promise and defaulting missing fields.
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!projectPromise) {
      setProject(undefined);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadError(null);

    projectPromise
      .then((p) => {
        if (!mounted) return;
        setProject(p);
      })
      .catch((error) => {
        console.error('Failed to load project details.', error);
        if (!mounted) return;
        setLoadError('This project could not be loaded from the backend right now.');
        setProject(undefined);
      })
      .finally(() => {
        if (!mounted) return;
        setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [projectPromise]);

  const handleBackToProjects = () => {
    navigate('/');
    // Best-effort scroll restoration for Lenis/GSAP-free state.
    setTimeout(() => {
      const el = document.getElementById('projects');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  if (isLoading) {
    return (
      <main className="bbProjectDetailsRoot">
        <section className="bbProjectDetailsSection">
          <Container>
            <ServiceState title="Loading project" message="Fetching the latest project details." />
          </Container>
        </section>
      </main>
    );
  }

  if (!project) {
    return (
      <div className="bbProjectDetailsFallback">
        <Container>
          <MotionWrapper className="bbProjectDetailsFallbackCard">
            <h2 className="bbProjectDetailsFallbackTitle">
              {loadError ? 'Project unavailable' : 'Project not found'}
            </h2>
            <p className="bbProjectDetailsFallbackText">
              {loadError ?? 'The case study could not be loaded.'}
            </p>
            <div className="bbProjectDetailsFallbackActions">
              <Button variant="primary" onClick={handleBackToProjects}>
                Back to Projects
              </Button>
            </div>
          </MotionWrapper>
        </Container>
      </div>
    );
  }

  return (
    <main className="bbProjectDetailsRoot">
      <section className="bbProjectDetailsSection">
        <ProjectHero project={project} />

        <div className="bbProjectDetailsBgWord" aria-hidden="true">
          CASE STUDY
        </div>

        <Container>
          <div className="bbProjectDetailsContent" data-project-title={project.title}>

            <MotionWrapper className="bbProjectDetailsBlock">
              <SectionTitle className="bbContactSupporting bbContactSupporting--hero" >Overview</SectionTitle>
              <div className="bbProjectDetailsOverview">
                <p className="bbProjectDetailsLead">{project.fullDescription}</p>
              </div>
            </MotionWrapper>

            <MotionWrapper className="bbProjectDetailsBlock">
              <SectionTitle className="bbContactSupporting bbContactSupporting--hero">Technologies Used</SectionTitle>
              <div className="bbProjectDetailsBadges">
                { (Array.isArray(project?.technologies) ? project?.technologies : []).map((t) => (
                  <TechnologyBadge key={t} label={t} />
                )) }
              </div>


            </MotionWrapper>

            <MotionWrapper className="bbProjectDetailsBlock">
              <SectionTitle className="bbContactSupporting bbContactSupporting--hero">Challenges &amp; Solutions</SectionTitle>
              <ChallengeSolution
                challenges={Array.isArray(project.challenges) ? project.challenges : []}
                solutions={Array.isArray(project.solutions) ? project.solutions : []}
              />


            </MotionWrapper>

            <MotionWrapper className="bbProjectDetailsBlock">
              <SectionTitle className="bbContactSupporting bbContactSupporting--hero">Gallery / Screenshots</SectionTitle>
              <GalleryGrid images={Array.isArray(project.galleryImages) ? project.galleryImages : []} />

            </MotionWrapper>


            <MotionWrapper className="bbProjectDetailsBlock">
              <SectionTitle className="bbContactSupporting bbContactSupporting--hero">Outcome / Results</SectionTitle>
              <div className="bbProjectDetailsOutcomes">
                {(Array.isArray(project.outcomes) ? project.outcomes : []).map((o, idx) => (
                  <p key={idx} className="bbProjectDetailsOutcomeLine">
                    {o}
                  </p>
                ))}

              </div>

            </MotionWrapper>

            <MotionWrapper className="bbProjectDetailsBlock">
              <div className="bbProjectDetailsActions">
                <Button
                  variant="primary"
                  className="bbProjectDetailsActionBtn"
                  disabled={true}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Live Link
                </Button>




                <a
                  className="bbProjectDetailsActionLink"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" className="bbProjectDetailsActionBtn">
                    GitHub Repository
                  </Button>
                </a>


                <Button
                  variant="ghost"
                  className="bbProjectDetailsBackBtn"
                  onClick={handleBackToProjects}
                >
                  Back to Projects
                </Button>
              </div>
            </MotionWrapper>

          </div>
        </Container>
      </section>
    </main>
  );
}

