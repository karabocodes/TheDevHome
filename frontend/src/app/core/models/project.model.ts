export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  images: string[];
  demoUrl?: string;
  repoUrl?: string;
  repoIsPublic?: boolean;
  highlights?: string[];
  challenges?: string[];
  decisions?: string[];
}
