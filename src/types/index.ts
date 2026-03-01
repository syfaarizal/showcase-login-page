export interface UseCase {
  icon: string;
  label: string;
}

export interface ProjectStats {
  linesOfCode: number | string;
  developmentTime: string;
  performanceScore: string;
  accessibility: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  challenges: string;
  technologies: string[];
  date: string;
  github: string;
  demo: string;
  designInspiration: string;
  useCases: UseCase[];
  stats: ProjectStats;
}

export type ProjectId =
  | 'blackcat'
  | 'panorama'
  | 'basic-purple'
  | 'astronaut'
  | 'pink'
  | 'red-rose'
  | 'otakore'
  | 'cherry-cart';

export type Theme = 'dark' | 'light';

export type FilterCategory = 'all' | 'minimalist' | 'dark' | 'gradient' | 'premium';

export type SortCriteria = 'featured' | 'newest' | 'popular';

export interface CardData {
  id: ProjectId;
  categories: string[];
  badges: Array<{ type: string; label: string }>;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  tech: string;
  date: string;
  tags: string[];
  github: string;
  demoUrl: string;
}
