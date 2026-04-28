'use client';

import React from 'react';
import { GridLines } from '@/components/ui/GridLines';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import type { TimelineItem } from '@/types/content';

interface TimelineSectionProps {
  label: string;
  headline: string;
  items: TimelineItem[];
}

export function TimelineSection({ label, headline, items }: TimelineSectionProps) {
  return (
    <section className="timeline-section">
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <SectionHeader label={label} headline={headline} align="center" />

        <div className="timeline">
          <div className="timeline-line" />

          {items.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <AnimatedElement
                key={item.year}
                direction={isLeft ? 'left' : 'right'}
                delay={index * 0.1}
              >
                <div className={`timeline-item ${isLeft ? 'timeline-item-left' : 'timeline-item-right'}`}>
                  {/* Year Badge */}
                  <div className="timeline-badge">
                    <span className="timeline-year">{item.year}</span>
                  </div>

                  {/* Content Card */}
                  <div className="timeline-card">
                    <h3 className="timeline-card-title">{item.title}</h3>
                    <p className="timeline-card-description">{item.description}</p>
                  </div>
                </div>
              </AnimatedElement>
            );
          })}
        </div>
      </div>
    </section>
  );
}
