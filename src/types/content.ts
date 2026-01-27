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

// Mega Menu
export interface MegaMenuItem {
  label: string;
  href: string;
  description?: string;
}

export interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
}

export interface MegaMenuFeatured {
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface MegaMenuContent {
  columns: MegaMenuColumn[];
  featured?: MegaMenuFeatured;
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
  backgroundVideo?: string;
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
  category: string;
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

// Blog / Insights / News
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

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  publishDate: string;
  slug: string;
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

// CTA Popup Card
export interface CTAPopupCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  cta: {
    text: string;
    href: string;
  };
}

// Culture Commitment
export interface CultureCommitment {
  id: string;
  title: string;
  description: string;
  image: string;
  stats?: {
    value: string;
    label: string;
  };
}

// Careers Section
export interface CareersContent {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  stats?: {
    value: string;
    label: string;
  }[];
}

// Specialization
export interface Specialization {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  href: string;
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
  ctaPopup: CTAPopupCard[];
  stats: Stat[];
  news: NewsArticle[];
  services: {
    headline: string;
    description: string;
    items: Service[];
  };
  featuredProjects: {
    headline: string;
    categories: string[];
    projects: Project[];
  };
  coverage: TwoColumnContent;
  culture: CultureCommitment[];
  careers: CareersContent;
  specializations: Specialization[];
  whyChooseUs: TwoColumnContent;
  cta: CTAContent;
}
