'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { MenuIcon, CloseIcon, SearchIcon, ChevronDownIcon } from '@/components/ui/Icons';
import { MegaMenu, SearchOverlay } from './MegaMenu';
import { ContactPanel } from './ContactPanel';
import type { NavItem, SiteSettings } from '@/types/content';

interface HeaderProps {
  settings: SiteSettings;
  navigation: NavItem[];
}

// Mega menu content structure
const megaMenuContent = {
  services: {
    intro: {
      title: 'Our Services',
      description:
        'KNS is a leading construction company in Nepal, delivering excellence across commercial, government, and infrastructure projects for over 30 years.',
      cta: {
        text: 'Explore All Services',
        href: '/services',
      },
    },
    columns: [
      {
        title: 'Construction',
        items: [
          { label: 'Commercial Buildings', href: '/services/commercial' },
          { label: 'Government Projects', href: '/services/government' },
          { label: 'Industrial Facilities', href: '/services/industrial' },
          { label: 'Infrastructure', href: '/services/infrastructure' },
        ],
      },
      {
        title: 'Expertise',
        items: [
          { label: 'Project Management', href: '/services/project-management' },
          { label: 'Design-Build', href: '/services/design-build' },
          { label: 'Renovation', href: '/services/renovation' },
          { label: 'Sustainability', href: '/services/sustainability' },
        ],
      },
      {
        title: 'Resources',
        items: [
          { label: 'Case Studies', href: '/projects' },
          { label: 'Latest News', href: '/insights' },
          { label: 'Our Process', href: '/about#process' },
        ],
      },
    ],
    featured: {
      title: 'Kathmandu Business Tower',
      description: 'A landmark commercial development in the heart of the capital.',
      image: '/images/projects/project-1.jpg',
      href: '/projects/kathmandu-business-tower',
    },
  },
};

export function Header({ settings, navigation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isContactOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen, isContactOpen]);

  const closeMegaMenu = useCallback(() => {
    setActiveMegaMenu(null);
  }, []);

  const handleNavHover = (href: string) => {
    if (href === '/services') {
      setActiveMegaMenu('services');
    } else {
      setActiveMegaMenu(null);
    }
  };

  const handleHeaderLeave = () => {
    setActiveMegaMenu(null);
  };

  return (
    <>
      <header
        className={`header ${isScrolled ? 'scrolled' : ''}`}
        onMouseLeave={handleHeaderLeave}
      >
        <div className="header-holder">
          {/* Logo */}
          <Link href="/" className="header-logo">
            <img src="/images/khusbhu-logo.png" alt="Khushbu Nirman Sewa" className="header-logo-img" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav hidden xl:flex items-stretch h-full">
            {navigation.map((item) => {
              const isActive = item.href === '/services' && activeMegaMenu === 'services';
              const isServices = item.href === '/services';
              return (
                <div
                  key={item.href}
                  className={`relative flex items-center h-full ${isActive ? 'mega-menu-nav-active' : ''}`}
                  onMouseEnter={() => handleNavHover(item.href)}
                >
                  <Link
                    href={item.href}
                    className={`header-link flex items-center gap-1 h-full px-6 ${isActive ? '!text-[var(--color-primary)]' : ''}`}
                  >
                    {item.label}
                    {isServices && (
                      <ChevronDownIcon
                        className={`w-4 h-4 transition-transform ${
                          activeMegaMenu === 'services' ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden xl:flex items-center gap-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 transition-colors ${
                !isScrolled
                  ? 'text-white hover:text-[var(--color-accent)]'
                  : 'text-[var(--color-primary)] hover:text-[var(--color-accent)]'
              }`}
              aria-label="Search"
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            {/* CTA Button */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="header-cta"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`xl:hidden p-2 ${
              isScrolled || isMobileMenuOpen ? 'text-[var(--color-primary)]' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mega Menu */}
        {activeMegaMenu === 'services' && (
          <div
            className="absolute left-0 right-0"
            style={{ top: 'calc(100% - 1.5rem)' }}
            onMouseEnter={() => setActiveMegaMenu('services')}
            onMouseLeave={closeMegaMenu}
          >
            <MegaMenu
              isOpen={true}
              onClose={closeMegaMenu}
              intro={megaMenuContent.services.intro}
              columns={megaMenuContent.services.columns}
              featured={megaMenuContent.services.featured}
            />
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-500 xl:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-6 overflow-y-auto">
          {/* Search in Mobile */}
          <div className="mb-6">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="flex items-center gap-3 w-full py-3 text-lg text-[var(--color-gray-500)]"
            >
              <SearchIcon className="w-5 h-5" />
              Search
            </button>
          </div>

          <nav className="flex-1">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-4 text-3xl font-medium text-[var(--color-primary)] border-b border-[var(--color-gray-200)] hover:text-[var(--color-accent)] transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsContactOpen(true);
              }}
              className="block w-full py-4 text-center text-lg font-medium bg-[var(--color-accent)] text-white"
            >
              Contact Us
            </button>
            <div className="flex items-center justify-center gap-4 text-sm text-[var(--color-gray-500)]">
              <a href={`tel:${settings.phone}`}>{settings.phone}</a>
              <span>|</span>
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Contact Panel */}
      <ContactPanel
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        settings={settings}
      />
    </>
  );
}
