'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ArrowRight } from '@/components/ui/Icons';
import type { Service } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesSectionProps {
  headline: string;
  description: string;
  services: Service[];
}

export function ServicesSection({ headline, description, services }: ServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Animate content change
  useEffect(() => {
    const content = contentRef.current;
    const image = imageRef.current;
    if (!content || !image) return;

    const tl = gsap.timeline();

    // Fade out current content
    tl.to([content, image], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.in',
    });

    // Fade in new content
    tl.to([content, image], {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  return (
    <section className="services-section">
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        {/* Header */}
        <div className="services-header">
          <AnimatedElement>
            <h2 className="title fs-90 mb-6">{headline}</h2>
          </AnimatedElement>
          <AnimatedElement delay={0.1}>
            <p className="para fs-32" style={{ color: 'var(--color-gray-500)' }}>
              {description}
            </p>
          </AnimatedElement>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {/* Left - Service List with Progress Indicator */}
          <nav className="services-nav">
            <AnimatedElement direction="left">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  className={`service-nav-item ${activeIndex === index ? 'active' : ''}`}
                >
                  <span className="service-index">{service.index}</span>
                  <span className="service-nav-title">{service.shortTitle}</span>
                  {/* Progress indicator */}
                  {activeIndex === index && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-accent)]" />
                  )}
                </button>
              ))}
            </AnimatedElement>

            {/* Mobile progress dots */}
            <div className="flex gap-2 mt-6 lg:hidden">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeIndex === index ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-gray-300)]'
                  }`}
                  aria-label={`Go to service ${index + 1}`}
                />
              ))}
            </div>
          </nav>

          {/* Right - Active Service Detail */}
          <div className="services-content">
            {/* Text Content */}
            <div ref={contentRef} className="services-text">
              <p className="section-label" style={{ color: 'var(--color-gray-500)' }}>
                {activeService.title}
              </p>
              <h3 className="title fs-70 mb-6">{activeService.title}</h3>
              <p className="para fs-23 mb-8" style={{ color: 'var(--color-gray-500)' }}>
                {activeService.description}
              </p>
              <Link href={activeService.href} className="btn-link group">
                Learn More
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Image */}
            <div className="services-image">
              <div ref={imageRef} className="services-image-wrapper">
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
