'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GridLines } from '@/components/ui/GridLines';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedElement, StaggerContainer } from '@/components/ui/AnimatedElement';
import { ArrowRight } from '@/components/ui/Icons';
import type { Project, NewsArticle } from '@/types/content';

interface RelatedSectionProps {
  label: string;
  headline: string;
  items: (Project | NewsArticle)[];
  type: 'projects' | 'articles';
  seeAllHref?: string;
  seeAllText?: string;
  variant?: 'light' | 'dark';
}

function isProject(item: Project | NewsArticle): item is Project {
  return 'slug' in item && 'category' in item && 'location' in item;
}

export function RelatedSection({
  label,
  headline,
  items,
  type,
  seeAllHref,
  seeAllText = 'See All',
  variant = 'light',
}: RelatedSectionProps) {
  const isDark = variant === 'dark';

  return (
    <section style={{ background: isDark ? 'var(--color-primary)' : 'var(--color-white)' }}>
      <GridLines variant={isDark ? 'light' : 'gray'} />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <SectionHeader label={label} headline={headline} variant={variant} />

        <StaggerContainer stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.slice(0, 3).map((item) => {
            const href = type === 'projects' && isProject(item)
              ? `/projects/${item.slug}`
              : `/insights/${item.slug}`;
            const image = isProject(item) ? item.images.thumbnail : item.image;
            const subtitle = isProject(item) ? item.location : item.category;

            return (
              <div key={item.id}>
                <Link href={href} className="block text-decoration-none group">
                  <div className="to-be-scaled radius" style={{ aspectRatio: '16/10', position: 'relative', marginBottom: '0.75rem' }}>
                    <Image
                      src={image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p style={{
                    fontSize: '0.875rem',
                    color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--color-gray-500)',
                    marginBottom: '0.25rem',
                  }}>
                    {subtitle}
                  </p>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: isDark ? 'var(--color-white)' : 'var(--color-primary)',
                    transition: 'color 0.3s ease',
                  }}>
                    {item.title}
                  </h3>
                </Link>
              </div>
            );
          })}
        </StaggerContainer>

        {seeAllHref && (
          <AnimatedElement delay={0.4}>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link
                href={seeAllHref}
                className={`btn-link ${isDark ? 'white' : ''}`}
              >
                {seeAllText}
                <ArrowRight />
              </Link>
            </div>
          </AnimatedElement>
        )}
      </div>
    </section>
  );
}
