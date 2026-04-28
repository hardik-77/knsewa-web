'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import type { TimelineItem } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutMilestonesSectionProps {
  label: string;
  headline: string;
  items: TimelineItem[];
}

export function AboutMilestonesSection({ label, headline, items }: AboutMilestonesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mmRef = useRef<gsap.MatchMedia | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const container = containerRef.current;
    if (!section || !track || !container) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const totalWidth = track.scrollWidth;
      const viewportWidth = container.offsetWidth;
      const scrollDistance = totalWidth - viewportWidth;

      if (scrollDistance <= 0) return;

      const scrollTween = gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Progress line
      const progressEl = section.querySelector('.milestones-progress');
      if (progressEl) {
        gsap.fromTo(
          progressEl,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${scrollDistance}`,
              scrub: 1,
            },
          }
        );
      }

      return () => {
        scrollTween.kill();
        ScrollTrigger.getAll()
          .filter((t) => t.trigger === section)
          .forEach((t) => t.kill());
      };
    });

    mmRef.current = mm;
  }, []);

  // useLayoutEffect cleanup runs BEFORE DOM mutations — critical for pin: true
  useLayoutEffect(() => {
    return () => {
      if (mmRef.current) {
        mmRef.current.revert();
        mmRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--color-gray-100)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: 'clamp(3rem, 5vw, 5rem) 0' }}>
        {/* Header */}
        <div
          style={{
            paddingLeft: 'max(2rem, calc((100vw - 1440px) / 2 + 2rem))',
            paddingRight: '2rem',
            marginBottom: 'clamp(2.5rem, 4vw, 4rem)',
          }}
        >
          <AnimatedElement>
            <p
              style={{
                fontSize: '0.6875rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--color-accent)',
                marginBottom: '1.25rem',
              }}
            >
              {label}
            </p>
          </AnimatedElement>
          <AnimatedElement delay={0.05}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: 'var(--color-primary)',
                maxWidth: '500px',
              }}
            >
              {headline}
            </h2>
          </AnimatedElement>
        </div>

        {/* Progress line */}
        <div
          style={{
            height: '1px',
            background: 'var(--color-gray-200)',
            marginBottom: 'clamp(2rem, 3.5vw, 3.5rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            className="milestones-progress"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100%',
              background: 'var(--color-accent)',
              transformOrigin: 'left',
            }}
          />
        </div>

        {/* Horizontal scroll track */}
        <div ref={containerRef} style={{ overflow: 'hidden' }}>
          <div
            ref={trackRef}
            className="milestones-track"
            style={{
              display: 'flex',
              gap: 'clamp(1.5rem, 2.5vw, 2.5rem)',
              paddingLeft: 'max(2rem, calc((100vw - 1440px) / 2 + 2rem))',
              paddingRight: '4rem',
            }}
          >
            {items.map((item, i) => (
              <div
                key={item.year}
                className="milestone-card"
                style={{
                  flexShrink: 0,
                  width: 'clamp(280px, 22vw, 340px)',
                  padding: 'clamp(1.75rem, 2.5vw, 2.5rem)',
                  background: 'var(--color-white)',
                  border: '1px solid var(--color-gray-200)',
                  borderRadius: '2px',
                  position: 'relative',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default',
                  minHeight: '260px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Accent top line */}
                <div
                  className="milestone-accent"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '0%',
                    height: '2px',
                    background: 'var(--color-accent)',
                    transition: 'width 0.4s ease',
                  }}
                />

                <span
                  className="milestone-year"
                  style={{
                    fontSize: 'clamp(2rem, 3vw, 2.75rem)',
                    fontWeight: 200,
                    lineHeight: 1,
                    color: 'var(--color-gray-300)',
                    display: 'block',
                    marginBottom: 'clamp(1.25rem, 2vw, 2rem)',
                    fontVariantNumeric: 'tabular-nums',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.year}
                </span>

                <h3
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
                    fontWeight: 500,
                    lineHeight: 1.3,
                    color: 'var(--color-primary)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: 'clamp(0.8125rem, 0.9vw, 0.875rem)',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    color: 'var(--color-gray-500)',
                    flex: 1,
                  }}
                >
                  {item.description}
                </p>

                <span
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 500,
                    color: 'var(--color-gray-300)',
                    letterSpacing: '0.05em',
                    fontVariantNumeric: 'tabular-nums',
                    marginTop: '1.5rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
