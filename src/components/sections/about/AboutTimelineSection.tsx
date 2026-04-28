'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridLines } from '@/components/ui/GridLines';
import type { TimelineItem } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutTimelineSectionProps {
  label: string;
  headline: string;
  items: TimelineItem[];
}

export function AboutTimelineSection({ label, headline, items }: AboutTimelineSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    // Header
    gsap.fromTo(
      section.querySelectorAll('.about-tl__header'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 65%' },
      }
    );

    // Line grows with scroll
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section.querySelector('.about-tl__items'),
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        },
      }
    );

    // Each item fades in
    section.querySelectorAll('.about-tl__item').forEach((item) => {
      gsap.fromTo(
        item,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 82%',
          },
        }
      );
    });

    // Dots pop in
    section.querySelectorAll('.about-tl__dot').forEach((dot) => {
      gsap.fromTo(
        dot,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: dot,
            start: 'top 82%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll()
        .filter(
          (t) =>
            t.trigger === section ||
            section.contains(t.trigger as Element)
        )
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--color-gray-100)',
        padding: 'clamp(5rem, 9vw, 9rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GridLines variant="gray" />

      <div className="wrapper" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header — center aligned */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3.5rem, 5vw, 5rem)' }}>
          <p
            className="about-tl__header"
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-accent)',
              marginBottom: '1.5rem',
            }}
          >
            {label}
          </p>
          <h2
            className="about-tl__header"
            style={{
              fontSize: 'clamp(2rem, 3vw, 2.8125rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: 'var(--color-primary)',
            }}
          >
            {headline}
          </h2>
        </div>

        {/* Timeline */}
        <div className="about-tl__items" style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
          {/* Line */}
          <div
            ref={lineRef}
            style={{
              position: 'absolute',
              left: '7px',
              top: '8px',
              bottom: '8px',
              width: '1px',
              background: 'var(--color-accent)',
              transformOrigin: 'top',
              opacity: 0.3,
            }}
          />

          {items.map((item, index) => (
            <div
              key={item.year}
              className="about-tl__item"
              style={{
                display: 'flex',
                gap: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                paddingBottom: index < items.length - 1 ? 'clamp(2rem, 3.5vw, 3.5rem)' : 0,
                position: 'relative',
              }}
            >
              {/* Dot */}
              <div style={{ flexShrink: 0, paddingTop: '6px' }}>
                <div
                  className="about-tl__dot"
                  style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    background: 'var(--color-white)',
                    border: '2px solid var(--color-accent)',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: '0 0 0 4px var(--color-gray-100)',
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                {/* Year */}
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {item.year}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontSize: 'clamp(1.0625rem, 1.2vw, 1.25rem)',
                    fontWeight: 500,
                    lineHeight: 1.3,
                    color: 'var(--color-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: 'clamp(0.8125rem, 0.95vw, 0.9375rem)',
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: 'var(--color-gray-500)',
                    maxWidth: '480px',
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
