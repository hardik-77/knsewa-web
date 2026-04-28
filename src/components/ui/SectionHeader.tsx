'use client';

import React from 'react';
import { AnimatedElement } from './AnimatedElement';

interface SectionHeaderProps {
  label?: string;
  headline: string;
  description?: string;
  variant?: 'light' | 'dark';
  align?: 'left' | 'center';
}

export function SectionHeader({
  label,
  headline,
  description,
  variant = 'light',
  align = 'left',
}: SectionHeaderProps) {
  const isDark = variant === 'dark';
  const isCenter = align === 'center';

  return (
    <div className={isCenter ? 'text-center' : ''} style={{ maxWidth: isCenter ? '800px' : undefined, margin: isCenter ? '0 auto' : undefined }}>
      {label && (
        <AnimatedElement>
          <p
            className="section-label"
            style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--color-accent)' }}
          >
            {label}
          </p>
        </AnimatedElement>
      )}
      <AnimatedElement delay={0.1}>
        <h2
          className="title fs-45"
          style={{
            color: isDark ? 'var(--color-white)' : 'var(--color-primary)',
            marginBottom: description ? '1.5rem' : '3rem',
          }}
        >
          {headline}
        </h2>
      </AnimatedElement>
      {description && (
        <AnimatedElement delay={0.2}>
          <p
            className="para fs-19"
            style={{
              color: isDark ? 'rgba(255,255,255,0.7)' : 'var(--color-gray-500)',
              lineHeight: 1.6,
              marginBottom: '3rem',
            }}
          >
            {description}
          </p>
        </AnimatedElement>
      )}
    </div>
  );
}
