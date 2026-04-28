'use client';

import React from 'react';
import Image from 'next/image';
import { GridLines } from '@/components/ui/GridLines';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StaggerContainer } from '@/components/ui/AnimatedElement';
import type { TeamMember } from '@/types/content';

interface TeamSectionProps {
  label: string;
  headline: string;
  members: TeamMember[];
}

export function TeamSection({ label, headline, members }: TeamSectionProps) {
  return (
    <section className="team-section" style={{ background: 'var(--color-gray-100)' }}>
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <SectionHeader label={label} headline={headline} />

        <StaggerContainer stagger={0.1} className="team-grid">
          {members.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-card-image to-be-scaled">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="team-card-info">
                <h3 className="team-card-name">{member.name}</h3>
                <p className="team-card-role">{member.role}</p>
              </div>
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
