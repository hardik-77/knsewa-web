import { SiteSettings, NavItem } from '@/types/content';

export const siteSettings: SiteSettings = {
  name: 'Khushbu Nirman Sewa',
  tagline: 'Building Nepal\'s Future for 30 Years',
  phone: '+977-21-123456',
  email: 'info@knsewa.com',
  address: {
    street: 'Main Road, Biratnagar',
    city: 'Biratnagar',
    country: 'Nepal',
  },
  social: {
    facebook: 'https://facebook.com/knsewa',
    linkedin: 'https://linkedin.com/company/knsewa',
  },
};

export const mainNavigation: NavItem[] = [
  {
    label: 'About Us',
    href: '/about',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Coverage',
    href: '/coverage',
  },
  {
    label: 'Insights',
    href: '/insights',
  },
];

export const footerNavigation: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Coverage', href: '/coverage' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];
