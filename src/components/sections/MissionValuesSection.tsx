'use client';

import React from 'react';
import { GridLines } from '@/components/ui/GridLines';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedElement, StaggerContainer } from '@/components/ui/AnimatedElement';
import {
  ExcellenceIcon,
  IntegrityIcon,
  SafetyIcon,
  InnovationIcon,
  CommunityIcon,
  SustainabilityIcon,
} from '@/components/ui/Icons';
import type { ValueItem } from '@/types/content';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  excellence: ExcellenceIcon,
  integrity: IntegrityIcon,
  safety: SafetyIcon,
  innovation: InnovationIcon,
  community: CommunityIcon,
  sustainability: SustainabilityIcon,
};

interface MissionValuesSectionProps {
  label: string;
  headline: string;
  values: ValueItem[];
}

export function MissionValuesSection({ label, headline, values }: MissionValuesSectionProps) {
  return (
    <section className="values-section" style={{ background: 'var(--color-gray-100)' }}>
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <SectionHeader label={label} headline={headline} />

        <StaggerContainer stagger={0.08} className="values-grid">
          {values.map((value) => {
            const IconComponent = iconMap[value.icon] || ExcellenceIcon;

            return (
              <div key={value.id} className="value-card">
                <div className="value-card-accent" />
                <div className="value-card-content">
                  <div className="value-card-icon">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="value-card-title">{value.title}</h3>
                  <p className="value-card-description">{value.description}</p>
                </div>
              </div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
