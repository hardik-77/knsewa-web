'use client';

import React from 'react';
import { GridLines } from '@/components/ui/GridLines';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedElement, StaggerContainer } from '@/components/ui/AnimatedElement';
import type { Project } from '@/types/content';

interface ProjectOverviewProps {
  project: Project;
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const description = project.description || project.scope;

  return (
    <section style={{ background: 'var(--color-white)' }}>
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <div className="project-overview-grid">
          {/* Left — Description */}
          <div>
            <SectionHeader label="PROJECT OVERVIEW" headline="About This Project" />
            <AnimatedElement delay={0.2}>
              <p
                className="para fs-19"
                style={{
                  color: 'var(--color-gray-500)',
                  lineHeight: 1.7,
                  maxWidth: '560px',
                }}
              >
                {description}
              </p>
            </AnimatedElement>
          </div>

          {/* Right — Highlights */}
          {project.highlights.length > 0 && (
            <div>
              <AnimatedElement delay={0.1}>
                <p
                  className="section-label"
                  style={{ color: 'var(--color-accent)', marginBottom: '1.5rem' }}
                >
                  KEY HIGHLIGHTS
                </p>
              </AnimatedElement>
              <StaggerContainer stagger={0.08}>
                {project.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      style={{ flexShrink: 0, marginTop: '2px' }}
                    >
                      <path
                        d="M16.667 5L7.5 14.167 3.333 10"
                        stroke="var(--color-accent)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p
                      style={{
                        fontSize: '1rem',
                        fontWeight: 400,
                        color: 'var(--color-gray-600)',
                        lineHeight: 1.6,
                      }}
                    >
                      {highlight}
                    </p>
                  </div>
                ))}
              </StaggerContainer>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
