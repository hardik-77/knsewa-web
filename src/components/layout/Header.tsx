'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MenuIcon, CloseIcon } from '@/components/ui/Icons';
import type { NavItem, SiteSettings } from '@/types/content';

interface HeaderProps {
  settings: SiteSettings;
  navigation: NavItem[];
}

export function Header({ settings, navigation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-holder">
          {/* Logo */}
          <Link href="/" className="header-logo">
            KNS
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav hidden lg:flex">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="header-link">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/contact" className="header-cta">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 ${
              isScrolled || isMobileMenuOpen ? 'text-[var(--color-primary)]' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
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
            <Link
              href="/request-site-visit"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-4 text-center text-lg font-medium bg-[var(--color-accent)] text-white"
            >
              Request Site Visit
            </Link>
            <div className="flex items-center justify-center gap-4 text-sm text-[var(--color-gray-500)]">
              <a href={`tel:${settings.phone}`}>{settings.phone}</a>
              <span>|</span>
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
