'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ArrowRight } from '@/components/ui/Icons';
import type { TwoColumnContent } from '@/types/content';

interface TwoColumnSectionProps {
  content: TwoColumnContent;
  variant?: 'light' | 'dark';
}

export function TwoColumnSection({ content, variant = 'light' }: TwoColumnSectionProps) {
  const isDark = variant === 'dark';
  const imagePosition = content.imagePosition || 'left';

  return (
    <section className={`two-col-section ${isDark ? 'dark' : ''}`}>
      <GridLines variant={isDark ? 'light' : 'gray'} />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <div className={`two-col-grid ${imagePosition === 'right' ? 'reverse' : ''}`}>
          {/* Image */}
          <div className="two-col-image">
            <AnimatedElement direction={imagePosition === 'left' ? 'left' : 'right'}>
              <div className="two-col-image-wrapper">
                <Image
                  src={content.image}
                  alt={content.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedElement>
          </div>

          {/* Text */}
          <div className="two-col-text">
            <AnimatedElement direction={imagePosition === 'left' ? 'right' : 'left'}>
              <p
                className="section-label"
                style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--color-gray-500)' }}
              >
                {content.label}
              </p>
            </AnimatedElement>
            <AnimatedElement delay={0.1}>
              <h2
                className="title fs-70 mb-6"
                style={{ color: isDark ? 'var(--color-white)' : 'var(--color-primary)' }}
              >
                {content.headline}
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={0.2}>
              <p
                className="para fs-32 mb-8"
                style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'var(--color-gray-500)' }}
              >
                {content.description}
              </p>
            </AnimatedElement>

            <AnimatedElement delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {content.cta && (
                  <Link href={content.cta.href} className={`btn-link ${isDark ? 'white' : ''}`}>
                    {content.cta.text} <ArrowRight />
                  </Link>
                )}
                {content.secondaryLink && (
                  <Link
                    href={content.secondaryLink.href}
                    className="text-base font-medium underline underline-offset-4 transition-colors"
                    style={{
                      color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--color-gray-500)',
                    }}
                  >
                    {content.secondaryLink.text}
                  </Link>
                )}
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
}
