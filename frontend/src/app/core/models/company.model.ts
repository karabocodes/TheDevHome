export interface Partner {
  id: string;
  initial: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  github?: string;
  linkedin?: string;
  email?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface StatItem {
  value: string;
  label: string;
  detail: string;
}

export interface EngagementModel {
  title: string;
  description: string;
  bestFor: string;
}

export interface ContactInfo {
  email: string;
  directEmail: string;
  location: string;
  githubOrg: string;
  availability: string;
}

export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  badge: string;
  heroHeading: string;
  heroSubheading: string;
  about: string;
  stats: StatItem[];
  partners: Partner[];
  services: ServiceItem[];
  engagementModels: EngagementModel[];
  contact: ContactInfo;
}
