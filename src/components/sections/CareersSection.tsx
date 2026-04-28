'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowIcon } from '@/components/ui/Icons';
import { useImageParallax } from '@/hooks/useParallax';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CareersContent {
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

interface CareersSectionProps {
  content: CareersContent;
}

export function CareersSection({ content }: CareersSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { containerRef, imageRef } = useImageParallax({ scale: 1.2, speed: 0.3 });

  useEffect(() => {
    const section = sectionRef.current;
    const contentEl = contentRef.current;
    if (!section || !contentEl) return;

    gsap.fromTo(
      contentEl.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === section)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="careers-section relative min-h-[60vh] lg:min-h-[80vh] flex items-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div ref={containerRef as React.RefObject<HTMLDivElement>} className="absolute inset-0 z-0">
        <Image
          ref={imageRef as React.RefObject<HTMLImageElement>}
          src={content.image}
          alt="Join our team"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary)]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="wrapper prel z-10 py-20 lg:py-32">
        <div ref={contentRef} className="max-w-2xl">
          <span className="section-label" style={{ color: 'var(--color-accent)' }}>{content.subtitle}</span>
          <h2 className="title fs-45 text-white" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            {content.title}
          </h2>
          <p className="fs-16" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '2rem' }}>
            {content.description}
          </p>

          {/* Stats */}
          {content.stats && content.stats.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginBottom: '2rem' }}>
              {content.stats.map((stat, index) => (
                <div key={index}>
                  <span className="fs-45 font-light" style={{ color: 'var(--color-accent)' }}>
                    {stat.value}
                  </span>
                  <p className="fs-16" style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-6">
            <Link
              href={content.primaryCta.href}
              className="btn-link white"
            >
              {content.primaryCta.text} <ArrowIcon className="w-4 h-4" />
            </Link>

            {content.secondaryCta && (
              <Link
                href={content.secondaryCta.href}
                className="btn-link white"
              >
                {content.secondaryCta.text} <ArrowIcon className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Default content
export const defaultCareersContent: CareersContent = {
  title: 'Build Your Career With Us',
  subtitle: 'Join Our Team',
  description:
    'Be part of a team that is shaping the future of construction in Nepal. We offer competitive compensation, professional development opportunities, and a culture that values innovation and excellence.',
  image: '/images/projects/legacy/project-22.jpg',
  primaryCta: {
    text: 'View Open Positions',
    href: '/careers',
  },
  secondaryCta: {
    text: 'Learn About Our Culture',
    href: '/about#culture',
  },
  stats: [
    {
      value: '1,000+',
      label: 'Team Members',
    },
    {
      value: '50+',
      label: 'Open Positions',
    },
    {
      value: '7',
      label: 'Provinces',
    },
  ],
};
