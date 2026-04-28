'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ArrowRight } from '@/components/ui/Icons';
import type { TwoColumnContent } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TwoColumnSectionProps {
  content: TwoColumnContent;
  variant?: 'light' | 'dark';
}

export function TwoColumnSection({ content, variant = 'light' }: TwoColumnSectionProps) {
  const isDark = variant === 'dark';
  const imagePosition = content.imagePosition || 'left';
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Parallax effect for image
  useEffect(() => {
    const container = imageContainerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    // Scale the image initially
    gsap.set(image, { scale: 1.15 });

    // Create parallax effect
    gsap.to(image, {
      y: '15%',
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === container)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className={`two-col-section ${isDark ? 'dark' : ''}`}>
      <GridLines variant={isDark ? 'light' : 'gray'} />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <div className={`two-col-grid ${imagePosition === 'right' ? 'reverse' : ''}`}>
          {/* Image with Parallax */}
          <div className="two-col-image">
            <AnimatedElement direction={imagePosition === 'left' ? 'left' : 'right'}>
              <div ref={imageContainerRef} className="two-col-image-wrapper overflow-hidden">
                <div ref={imageRef} className="absolute inset-0">
                  <Image
                    src={content.image}
                    alt={content.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </AnimatedElement>
          </div>

          {/* Text */}
          <div className="two-col-text">
            <AnimatedElement direction={imagePosition === 'left' ? 'right' : 'left'}>
              <p
                className="section-label"
                style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--color-accent)' }}
              >
                {content.label}
              </p>
            </AnimatedElement>
            <AnimatedElement delay={0.1}>
              <h2
                className="title fs-45"
                style={{
                  color: isDark ? 'var(--color-white)' : 'var(--color-primary)',
                  marginBottom: '2rem',
                }}
              >
                {content.headline}
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={0.2}>
              <p
                className="para fs-19"
                style={{
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'var(--color-gray-500)',
                  lineHeight: 1.6,
                }}
              >
                {content.description}
              </p>
            </AnimatedElement>
          </div>
        </div>

        {/* CTA Bar */}
        {(content.cta || content.secondaryLink) && (
          <AnimatedElement delay={0.3}>
            <div className="two-col-cta-bar" style={{
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'var(--color-gray-200)',
            }}>
              {content.cta && (
                <Link href={content.cta.href} className={`two-col-cta-primary ${isDark ? 'white' : ''}`}>
                  {content.cta.text} <ArrowRight />
                </Link>
              )}
              {content.cta && content.secondaryLink && (
                <div className="two-col-cta-divider" style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'var(--color-gray-200)',
                }} />
              )}
              {content.secondaryLink && (
                <Link
                  href={content.secondaryLink.href}
                  className="two-col-cta-secondary"
                  style={{
                    color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--color-gray-500)',
                  }}
                >
                  {content.secondaryLink.text}
                </Link>
              )}
            </div>
          </AnimatedElement>
        )}
      </div>
    </section>
  );
}
