'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Capability } from '@/types/content';
import { SectionHeader } from '@/components/ui/SectionHeader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CapabilitiesGridProps {
  label: string;
  headline: string;
  items: Capability[];
}

export function CapabilitiesGrid({ label, headline, items }: CapabilitiesGridProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Stagger reveal each capability row
      const rows = section.querySelectorAll('.cap-row');
      gsap.fromTo(
        rows,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
          },
        }
      );

      // Animate the divider lines
      const lines = section.querySelectorAll('.cap-line');
      gsap.fromTo(
        lines,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ padding: 'clamp(5rem, 8vw, 8rem) 0' }}
    >
      <div className="wrapper">
        <SectionHeader label={label} headline={headline} align="left" />

        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ marginTop: 'clamp(3rem, 5vw, 4rem)' }}
        >
          {items.map((item, index) => {
            const number = String(index + 1).padStart(2, '0');
            return (
              <div key={item.id} className="cap-row">
                {/* Top divider line */}
                <div
                  className="cap-line"
                  style={{
                    height: 1,
                    background: 'var(--color-gray-200)',
                    transformOrigin: 'left',
                  }}
                />

                <div
                  className="group"
                  style={{
                    padding: 'clamp(1.5rem, 2.5vw, 2.25rem) 0',
                    paddingRight: 'clamp(1rem, 3vw, 3rem)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 'clamp(1rem, 2vw, 1.5rem)', alignItems: 'flex-start' }}>
                    {/* Number */}
                    <span
                      style={{
                        fontSize: 'clamp(2rem, 3vw, 2.75rem)',
                        fontWeight: 200,
                        lineHeight: 1,
                        color: 'var(--color-accent)',
                        flexShrink: 0,
                        width: 50,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {number}
                    </span>

                    <div style={{ flex: 1 }}>
                      {/* Title */}
                      <h3
                        style={{
                          fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
                          fontWeight: 500,
                          lineHeight: 1.25,
                          color: 'var(--color-primary)',
                          marginBottom: '0.625rem',
                        }}
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: 'clamp(0.8125rem, 1vw, 0.9375rem)',
                          fontWeight: 400,
                          lineHeight: 1.65,
                          color: 'var(--color-gray-500)',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
