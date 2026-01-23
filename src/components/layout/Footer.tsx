import React from 'react';
import Link from 'next/link';
import { GridLines } from '@/components/ui/GridLines';
import { FacebookIcon, LinkedInIcon, PhoneIcon, MailIcon, MapPinIcon } from '@/components/ui/Icons';
import type { SiteSettings, NavItem } from '@/types/content';

interface FooterProps {
  settings: SiteSettings;
  navigation: NavItem[];
}

export function Footer({ settings, navigation }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <GridLines variant="light" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Logo & Info */}
          <div>
            <Link href="/" className="footer-logo">
              {settings.name}
            </Link>
            <p className="footer-tagline">{settings.tagline}</p>

            {/* Contact Info */}
            <div>
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

          {/* Navigation */}
          <div className="footer-nav">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="footer-nav-link">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Social & CTA */}
          <div>
            <div className="footer-social">
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
            </div>

            <Link
              href="/request-site-visit"
              className="inline-block px-6 py-3 bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Request Site Visit
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} {settings.name}. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link href="/privacy" className="footer-legal-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-legal-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
