// Site Settings
export interface SiteSettings {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
}

// SEO
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Hero Section
export interface HeroContent {
  headline: string;
  highlightedText: string;
  cta: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
}

// Stats
export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

// Services
export interface Service {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  href: string;
}

// Projects
export interface Project {
  id: string;
  slug: string;
  title: string;
  clientType: 'government' | 'commercial' | 'institutional';
  location: string;
  scope: string;
  highlights: string[];
  images: {
    thumbnail: string;
    featured: string;
    gallery: string[];
  };
  seo: SEOData;
}

// Locations / Coverage
export interface Location {
  id: string;
  slug: string;
  name: string;
  region: string;
  description: string;
  image: string;
  isHeadquarters?: boolean;
  seo: SEOData;
}

// Blog / Insights
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  author: string;
  category: string;
  image: string;
  seo: SEOData;
}

// CTA Section
export interface CTAContent {
  label: string;
  headline: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

// Two Column Section (Image + Text)
export interface TwoColumnContent {
  label: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  cta?: {
    text: string;
    href: string;
  };
  secondaryLink?: {
    text: string;
    href: string;
  };
  imagePosition?: 'left' | 'right';
}

// Home Page Content
export interface HomePageContent {
  seo: SEOData;
  hero: HeroContent;
  stats: Stat[];
  services: {
    headline: string;
    description: string;
    items: Service[];
  };
  featuredProjects: {
    headline: string;
    projects: Project[];
  };
  coverage: TwoColumnContent;
  whyChooseUs: TwoColumnContent;
  cta: CTAContent;
}
