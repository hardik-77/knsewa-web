'use client';

import React, { useRef, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface Specialization {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  href: string;
}

interface SpecializationsSectionProps {
  specializations: Specialization[];
  title?: string;
}

/**
 * Specializations Section
 *
 * Features:
 * - Horizontal scroll triggered by vertical scroll (GSAP ScrollTrigger)
 * - Shows 4 cards at a time
 * - Section pins while cards scroll horizontally
 * - Card hover effects: light bg, description appears, larger arrow
 */
export function SpecializationsSection({
  specializations,
  title = 'Our Specializations',
}: SpecializationsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!section || !trigger || !cardsContainer) return;

    // Calculate scroll distance (total width - viewport width)
    const totalWidth = cardsContainer.scrollWidth;
    const viewportWidth = trigger.offsetWidth;
    const scrollDistance = totalWidth - viewportWidth;

    // Only apply horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const scrollTween = gsap.to(cardsContainer, {
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

      return () => {
        scrollTween.kill();
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === section) t.kill();
        });
      };
    });

    mmRef.current = mm;
  }, []);

  // useLayoutEffect cleanup runs BEFORE DOM mutations — critical for pin: true
  const mmRef = useRef<gsap.MatchMedia | null>(null);
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
      className="specializations-section bg-white relative overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <div className="h-full flex flex-col justify-center py-16 lg:py-0">
        {/* Section Header - 80px margin to content */}
        <div style={{ marginBottom: '80px', paddingLeft: 'max(2rem, calc((100vw - 1440px) / 2 + 2rem))' }}>
          <h2
            className="font-light text-left"
            style={{
              fontSize: 'clamp(2rem, 3vw, 2.8125rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.01em',
              color: 'var(--color-primary)',
            }}
          >
            {title}
          </h2>
        </div>

        {/* Cards Container with Horizontal Scroll */}
        <div ref={triggerRef} className="relative overflow-hidden">
          <div
            ref={cardsContainerRef}
            className="flex"
            style={{ paddingLeft: 'max(2rem, calc((100vw - 1440px) / 2 + 2rem))', paddingRight: '2rem', gap: '38px' }}
          >
            {specializations.map((spec) => (
              <SpecializationCard
                key={spec.id}
                specialization={spec}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Specialization Card Component
 *
 * Design:
 * - Full background image
 * - Rounded corners
 * - Title label at bottom-left with accent background
 * - White text on accent background
 */
function SpecializationCard({
  specialization,
}: {
  specialization: Specialization;
}) {
  return (
    <Link
      href={specialization.href}
      className="group block flex-shrink-0 relative overflow-hidden rounded-2xl"
      style={{ width: 'calc(25vw)', minWidth: '300px', maxWidth: '400px', aspectRatio: '3/4' }}
    >
      {/* Background Image */}
      <Image
        src={specialization.image}
        alt={specialization.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Default: Title Label at Bottom (visible when not hovered) */}
      <div className="absolute bottom-6 left-6 right-6 transition-opacity duration-300 group-hover:opacity-0">
        <div
          className="inline-block rounded-xl"
          style={{ backgroundColor: 'var(--color-accent)', padding: '24px 24px', minHeight: '120px', display: 'flex', alignItems: 'center' }}
        >
          <h3
            className="font-normal text-white"
            style={{
              fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)',
              lineHeight: '1.3',
            }}
          >
            {specialization.title}
          </h3>
        </div>
      </div>

      {/* Hover: Full Blue Overlay (hidden by default, appears on hover) */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-start"
        style={{
          backgroundColor: 'var(--color-accent)',
          padding: '32px 24px',
        }}
      >
        {/* Title */}
        <h3
          className="font-normal text-white"
          style={{
            fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)',
            lineHeight: '1.3',
            marginBottom: '20px',
          }}
        >
          {specialization.title}
        </h3>

        {/* Description */}
        <p
          className="text-white/90"
          style={{
            fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
            lineHeight: '1.6',
            marginBottom: '24px',
          }}
        >
          {specialization.description}
        </p>

        {/* CTA */}
        <div className="mt-auto">
          <span
            className="inline-flex items-center gap-3 text-white font-medium uppercase tracking-wider"
            style={{ fontSize: '0.75rem' }}
          >
            Learn More About {specialization.title}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="2" y1="12" x2="20" y2="12" />
              <polyline points="14,6 20,12 14,18" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// Default specializations data
export const defaultSpecializations: Specialization[] = [
  {
    id: 'building',
    title: 'Building',
    tagline: 'Building the Future',
    description: 'We mold spaces that inspire, innovate, and endure.',
    image: '/images/services/service1.jpg',
    href: '/services/building',
  },
  {
    id: 'water-treatment',
    title: 'Water Treatment & Sanitation',
    tagline: 'Sanctuaries of Well-being',
    description: 'Elevating living conditions with advanced water treatment and sanitation.',
    image: '/images/services/service2.jpg',
    href: '/services/water-treatment',
  },
  {
    id: 'road-drain',
    title: 'Road and Drain',
    tagline: 'Pathways of Progress',
    description: 'Crafting roads and drains that lead societies towards advancement.',
    image: '/images/services/service3.jpg',
    href: '/services/road-drain',
  },
  {
    id: 'airport',
    title: 'Airport',
    tagline: 'Taking Flight',
    description: 'Building gateways to possibilities with airport construction.',
    image: '/images/services/service4.jpg',
    href: '/services/airport',
  },
  {
    id: 'irrigation',
    title: 'Irrigation',
    tagline: 'Nurturing Growth',
    description: 'Engineering irrigation solutions that nurture landscapes and livelihoods.',
    image: '/images/services/service5.jpg',
    href: '/services/irrigation',
  },
  {
    id: 'energy',
    title: 'Energy',
    tagline: 'Powering Progress',
    description: 'Energizing growth through cutting-edge energy solutions.',
    image: '/images/services/service6.jpg',
    href: '/services/energy',
  },
  {
    id: 'water-supply',
    title: 'Water Supply',
    tagline: 'Fluid Connections',
    description: 'Ensuring communities thrive with efficient water supply networks.',
    image: '/images/services/service-center.jpg',
    href: '/services/water-supply',
  },
  {
    id: 'bridge-culvert',
    title: 'Bridge and Culvert',
    tagline: 'Bridges to Unity',
    description: 'Connecting hearts and places through bridges and culverts.',
    image: '/images/services/infrastructure.jpg',
    href: '/services/bridge-culvert',
  },
];
