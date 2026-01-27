'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ArrowRight, SearchIcon, CloseIcon } from '@/components/ui/Icons';

interface MegaMenuItem {
  label: string;
  href: string;
}

interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
}

interface FeaturedContent {
  title: string;
  description: string;
  image: string;
  href: string;
}

interface IntroContent {
  title: string;
  description: string;
  cta: {
    text: string;
    href: string;
  };
}

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  columns: MegaMenuColumn[];
  featured?: FeaturedContent;
  intro?: IntroContent;
}

export function MegaMenu({ isOpen, onClose, columns, featured, intro }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const content = contentRef.current;
    if (!menu || !content) return;

    if (isOpen) {
      gsap.set(menu, { display: 'block' });
      gsap.fromTo(
        menu,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        content.children,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.1,
        }
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(menu, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="mega-menu relative z-50 hidden opacity-0 bg-white shadow-xl"
    >
      {/* Main container with flex layout for proper background alignment */}
      <div className="flex">
        {/* Blue Intro Sidebar - extends to edge */}
        {intro && (
          <div className="w-[26%] bg-[#0b5dd0] flex justify-end self-stretch">
            <div className="w-full max-w-[350px] pl-12 pr-10" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
              <h3 className="text-base font-normal text-white mb-6">{intro.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-10">
                {intro.description}
              </p>
              <Link
                href={intro.cta.href}
                onClick={onClose}
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[var(--color-accent)] transition-colors"
              >
                {intro.cta.text}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* White section for columns and featured */}
        <div className="flex-1 bg-white" ref={contentRef}>
          <div className="flex h-full">
            {/* Navigation Columns */}
            <div className="flex-1 px-12 border-l border-gray-200" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
              <div className="flex gap-28">
                {columns.map((column, idx) => (
                  <div key={idx} className="min-w-[140px]">
                    <h4 className="text-sm font-medium text-[var(--color-primary)] mb-6">
                      {column.title}
                    </h4>
                    <ul className="space-y-3">
                      {column.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="text-sm text-[var(--color-gray-500)] hover:text-[var(--color-primary)] transition-colors"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Content - Right side */}
            {featured && (
              <div className="w-[300px] px-10 border-l border-gray-200" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                <h4 className="text-sm font-medium text-[var(--color-primary)] mb-6">
                  Featured Project
                </h4>
                <Link
                  href={featured.href}
                  onClick={onClose}
                  className="group block"
                >
                  <div className="relative aspect-[16/10] overflow-hidden mb-4">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h5 className="text-sm font-medium text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors mb-1">
                    {featured.title}
                  </h5>
                  <p className="text-xs text-[var(--color-gray-500)] line-clamp-2 mb-4">
                    {featured.description}
                  </p>
                </Link>
                <Link
                  href="/projects"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Search Overlay Component
interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(overlay, { display: 'flex' });
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = '';
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] hidden opacity-0 bg-[var(--color-primary)] flex-col items-center justify-center"
    >
      <div className="w-full max-w-3xl px-8">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="What are you looking for?"
            className="w-full bg-transparent border-b-2 border-white/30 py-6 text-4xl text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors"
          />
          <button
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-[var(--color-accent)] transition-colors"
            aria-label="Search"
          >
            <SearchIcon className="w-8 h-8" />
          </button>
        </div>
        <p className="mt-4 text-white/50">
          Press Enter to search or ESC to close
        </p>
      </div>

      <button
        onClick={onClose}
        className="absolute top-8 right-8 p-2 text-white hover:text-[var(--color-accent)] transition-colors"
        aria-label="Close search"
      >
        <CloseIcon className="w-8 h-8" />
      </button>
    </div>
  );
}
