'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridLines } from '@/components/ui/GridLines';
import type { PageHeroContent } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface InsightsHeroProps {
  content: PageHeroContent;
}

export function InsightsHero({ content }: InsightsHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const contentEl = contentRef.current;
    if (!section || !contentEl) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      contentEl.querySelector('.hero-label'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    );

    tl.fromTo(
      contentEl.querySelector('.hero-headline'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(
      contentEl.querySelector('.hero-desc'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
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
      className="prel"
      style={{
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        background: 'var(--color-primary)',
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.backgroundImage}
          alt={content.headline}
          fill
          className="object-cover"
          priority
          style={{ objectPosition: 'center 40%', opacity: 0.3 }}
        />
      </div>

      <GridLines variant="light" />

      <div
        ref={contentRef}
        className="wrapper prel w-full"
        style={{ zIndex: 10, padding: 'clamp(8rem, 12vw, 10rem) 0 clamp(3rem, 5vw, 5rem)' }}
      >
        <p
          className="hero-label opacity-0"
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--color-accent)',
            marginBottom: '1.25rem',
          }}
        >
          {content.label}
        </p>

        <h1
          className="hero-headline opacity-0"
          style={{
            fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--color-white)',
            maxWidth: '700px',
          }}
        >
          {content.headline}
        </h1>

        {content.description && (
          <p
            className="hero-desc opacity-0"
            style={{
              fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
              fontWeight: 400,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '520px',
              marginTop: '1.5rem',
            }}
          >
            {content.description}
          </p>
        )}
      </div>
    </section>
  );
}
