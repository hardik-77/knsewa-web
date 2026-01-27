'use client';

import React from 'react';
import Link from 'next/link';
import { GridLines } from '@/components/ui/GridLines';
import { FacebookIcon, LinkedInIcon, InstagramIcon, PhoneIcon, MailIcon, MapPinIcon, ArrowIcon } from '@/components/ui/Icons';
import type { SiteSettings, NavItem } from '@/types/content';

interface FooterProps {
  settings: SiteSettings;
  navigation: NavItem[];
}

// Secondary navigation items
const secondaryNavigation = [
  { label: 'Careers', href: '/careers' },
  { label: 'News & Insights', href: '/insights' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Health & Safety', href: '/safety' },
];

export function Footer({ settings, navigation }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Split navigation into columns
  const navColumn1 = navigation.slice(0, 2);
  const navColumn2 = navigation.slice(2, 4);
  const navColumn3 = navigation.slice(4);

  return (
    <footer className="footer">
      <GridLines variant="light" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        {/* Main Footer Grid - Turner Layout */}
        <div className="footer-main-grid">
          {/* Logo & Contact Info Column */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo-large">
              <img src="/images/khusbhu-logo.png" alt="Khushbu Nirman Sewa" className="footer-logo-img" />
            </Link>
            <p className="footer-tagline mt-4">{settings.tagline}</p>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <a href={`tel:${settings.phone}`} className="footer-contact-item">
                <PhoneIcon className="w-5 h-5 flex-shrink-0" />
                <span>{settings.phone}</span>
              </a>
              <a href={`mailto:${settings.email}`} className="footer-contact-item">
                <MailIcon className="w-5 h-5 flex-shrink-0" />
                <span>{settings.email}</span>
              </a>
              <div className="footer-contact-item">
                <MapPinIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  {settings.address.street}<br />
                  {settings.address.city}, {settings.address.country}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="footer-nav-container">
            <div className="footer-nav-grid">
              {/* Column 1 */}
              <div className="footer-nav-col">
                <h4 className="footer-nav-title">Company</h4>
                <ul className="space-y-3">
                  {navColumn1.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="footer-nav-link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2 */}
              <div className="footer-nav-col">
                <h4 className="footer-nav-title">Work</h4>
                <ul className="space-y-3">
                  {navColumn2.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="footer-nav-link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 */}
              <div className="footer-nav-col">
                <h4 className="footer-nav-title">Connect</h4>
                <ul className="space-y-3">
                  {navColumn3.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="footer-nav-link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/contact" className="footer-nav-link">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA & Social Column */}
          <div className="footer-cta-col">
            {/* Social Links */}
            <div className="footer-social mb-8">
              {settings.social.facebook && (
                <a
                  href={settings.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              )}
              {settings.social.linkedin && (
                <a
                  href={settings.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              )}
              <a
                href="https://instagram.com/knsewa"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-6 py-4 bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Request a Quote
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Newsletter Teaser */}
            <div className="mt-8">
              <p className="text-sm text-white/60 mb-3">Stay updated with our latest projects</p>
              <Link
                href="/newsletter"
                className="text-white hover:text-[var(--color-accent)] transition-colors text-sm font-medium"
              >
                Subscribe to Newsletter →
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="footer-secondary-nav">
          {secondaryNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="footer-secondary-link">
              {item.label}
            </Link>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              &copy; {currentYear} {settings.name}. All rights reserved.
            </p>
            <span className="footer-bottom-divider" />
            <a
              href="https://zunkireelabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-developed-by"
            >
              Developed by
              <img src="/images/zunkireelabs-logo.png" alt="Zunkireelabs" className="footer-zl-logo" />
            </a>
          </div>
          <p className="footer-bottom-right">
            Premium Construction Contractor in Biratnagar, Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}
