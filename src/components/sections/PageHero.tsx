'use client';

import React from 'react';
import Image from 'next/image';
import { GridLines } from '@/components/ui/GridLines';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import type { PageHeroContent } from '@/types/content';

interface PageHeroProps {
  content: PageHeroContent;
  height?: string;
}

export function PageHero({ content, height = '55vh' }: PageHeroProps) {
  return (
    <section
      className="page-hero prel"
      style={{
        minHeight: height,
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.backgroundImage}
          alt={content.headline}
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(23, 23, 27, 0.85) 0%, rgba(23, 23, 27, 0.5) 50%, rgba(23, 23, 27, 0.3) 100%)',
          }}
        />
      </div>

      <GridLines variant="light" />

      <div className="wrapper prel w-full" style={{ zIndex: 10, paddingBottom: '4rem', paddingTop: '8rem' }}>
        {/* Breadcrumbs */}
        <AnimatedElement>
          <div style={{ marginBottom: '2rem' }}>
            <Breadcrumbs items={content.breadcrumbs} />
          </div>
        </AnimatedElement>

        {/* Label */}
        <AnimatedElement delay={0.1}>
          <p
            className="section-label"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {content.label}
          </p>
        </AnimatedElement>

        {/* Headline */}
        <AnimatedElement delay={0.2}>
          <h1
            className="title fs-70"
            style={{ color: 'var(--color-white)', maxWidth: '800px' }}
          >
            {content.headline}
          </h1>
        </AnimatedElement>

        {/* Description */}
        {content.description && (
          <AnimatedElement delay={0.3}>
            <p
              className="para fs-19"
              style={{
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '600px',
                marginTop: '1.5rem',
                lineHeight: 1.6,
              }}
            >
              {content.description}
            </p>
          </AnimatedElement>
        )}
      </div>
    </section>
  );
}
