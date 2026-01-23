/**
 * Content Adapter
 *
 * This adapter provides a unified interface for accessing content.
 * Phase 1: Reads from local TypeScript files
 * Phase 2: Will read from Sanity CMS (no page changes required)
 */

import { siteSettings, mainNavigation, footerNavigation } from '@/content/site/settings';
import { homePageContent } from '@/content/pages/home';
import type { SiteSettings, NavItem, HomePageContent } from '@/types/content';

// Site Settings
export function getSiteSettings(): SiteSettings {
  return siteSettings;
}

export function getMainNavigation(): NavItem[] {
  return mainNavigation;
}

export function getFooterNavigation(): NavItem[] {
  return footerNavigation;
}

// Pages
export function getHomePage(): HomePageContent {
  return homePageContent;
}

// Future: These will be implemented as content grows
// export function getAboutPage(): AboutPageContent { }
// export function getServicesPage(): ServicesPageContent { }
// export function getProjects(): Project[] { }
// export function getProjectBySlug(slug: string): Project | null { }
// export function getBlogPosts(): BlogPost[] { }
// export function getBlogPostBySlug(slug: string): BlogPost | null { }
// export function getLocations(): Location[] { }
