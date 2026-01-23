'use client';

import React from 'react';
import Link from 'next/link';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ArrowRight } from '@/components/ui/Icons';
import type { CTAContent } from '@/types/content';

interface CTASectionProps {
  content: CTAContent;
}

export function CTASection({ content }: CTASectionProps) {
  return (
    <section className="cta-section">
      <GridLines variant="light" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <div className="cta-content">
          <AnimatedElement>
            <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {content.label}
            </p>
          </AnimatedElement>
          <AnimatedElement delay={0.1}>
            <h2 className="title fs-90 mb-6" style={{ color: 'var(--color-white)' }}>
              {content.headline}
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={0.2}>
            <p className="para fs-24 mb-12" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {content.description}
            </p>
          </AnimatedElement>

          <AnimatedElement delay={0.3}>
            <div className="cta-buttons">
              <Link href={content.primaryCTA.href} className="btn-primary text-lg px-8 py-4">
                {content.primaryCTA.text}
                <ArrowRight />
              </Link>

              {content.secondaryCTA && (
                <Link href={content.secondaryCTA.href} className="btn-link white text-lg">
                  {content.secondaryCTA.text}
                  <ArrowRight />
                </Link>
              )}
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
