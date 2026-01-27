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
