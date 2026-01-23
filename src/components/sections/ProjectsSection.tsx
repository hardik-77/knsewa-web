'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ArrowRight } from '@/components/ui/Icons';
import type { Project } from '@/types/content';

interface ProjectsSectionProps {
  headline: string;
  projects: Project[];
}

export function ProjectsSection({ headline, projects }: ProjectsSectionProps) {
  const [featuredProject, ...otherProjects] = projects;

  return (
    <section className="projects-section">
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        {/* Header */}
        <AnimatedElement>
          <h2 className="title fs-70 mb-12">{headline}</h2>
        </AnimatedElement>

        {/* Projects Grid */}
        <div className="projects-grid">
          {/* Featured Project (Left) */}
          {featuredProject && (
            <div className="project-featured">
              <AnimatedElement direction="left">
                <Link href={`/projects/${featuredProject.slug}`} className="project-card">
                  <div className="project-image">
                    <Image
                      src={featuredProject.images.featured}
                      alt={featuredProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="project-title fs-40">{featuredProject.title}</h3>
                  <p className="project-meta">
                    {featuredProject.location} &bull; {featuredProject.scope}
                  </p>
                  <span className="btn-link mt-4 inline-flex">
                    View Project <ArrowRight />
                  </span>
                </Link>
              </AnimatedElement>
            </div>
          )}

          {/* Other Projects (Right) */}
          <div className="projects-list">
            {otherProjects.map((project, index) => (
              <AnimatedElement key={project.id} delay={index * 0.1}>
                <Link href={`/projects/${project.slug}`} className="project-card">
                  <div className="project-image">
                    <Image
                      src={project.images.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="project-title fs-30">{project.title}</h4>
                  <p className="project-meta">{project.location}</p>
                </Link>
              </AnimatedElement>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <AnimatedElement delay={0.4}>
          <div className="mt-12">
            <Link href="/projects" className="btn-link">
              View All Projects <ArrowRight />
            </Link>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
