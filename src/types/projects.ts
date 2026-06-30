export interface Project {
  id: string;
  slug: string;

  title: string;
  shortDescription: string;
  fullDescription: string;

  technologies: string[];
  category: string;

  githubUrl: string;
  liveUrl: string;

  featured: boolean;

  screenshots: string[];
  thumbnail: string;

  createdAt: string;

  // Existing UI fields (ProjectCard + ProjectDetails)
  heroImage: string;
  galleryImages: string[];
  challenges: string[];
  solutions: string[];
  outcomes: string[];

  thumbnailImage: string;
  gradientAccent: string;
  liveDemoUrl: string;
}

