'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ArrowRight } from '@/components/ui/Icons';
import type { Service } from '@/types/content';

interface ServicesSectionProps {
  headline: string;
  description: string;
  services: Service[];
}

export function ServicesSection({ headline, description, services }: ServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];

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
          {/* Left - Service List */}
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
                </button>
              ))}
            </AnimatedElement>
          </nav>

          {/* Right - Active Service Detail */}
          <div className="services-content">
            {/* Text Content */}
            <div className="services-text">
              <AnimatedElement key={`label-${activeService.id}`}>
                <p className="section-label" style={{ color: 'var(--color-gray-500)' }}>
                  {activeService.title}
                </p>
              </AnimatedElement>
              <AnimatedElement delay={0.1} key={`title-${activeService.id}`}>
                <h3 className="title fs-70 mb-6">{activeService.title}</h3>
              </AnimatedElement>
              <AnimatedElement delay={0.2} key={`desc-${activeService.id}`}>
                <p className="para fs-23 mb-8" style={{ color: 'var(--color-gray-500)' }}>
                  {activeService.description}
                </p>
              </AnimatedElement>
              <AnimatedElement delay={0.3} key={`cta-${activeService.id}`}>
                <Link href={activeService.href} className="btn-link">
                  Learn More <ArrowRight />
                </Link>
              </AnimatedElement>
            </div>

            {/* Image */}
            <div className="services-image">
              <AnimatedElement direction="right" key={`img-${activeService.id}`}>
                <div className="services-image-wrapper">
                  <Image
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
