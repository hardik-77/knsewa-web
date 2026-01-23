'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GridLines } from '@/components/ui/GridLines';
import { ArrowRight } from '@/components/ui/Icons';
import type { HeroContent } from '@/types/content';

interface HeroSectionProps {
  content: HeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section">
      {/* Background */}
      <div className="hero-bg">
        {content.backgroundImage && (
          <Image
            src={content.backgroundImage}
            alt="Hero background"
            fill
            priority
            quality={90}
            className="object-cover"
          />
        )}
        <div className="hero-overlay" />
      </div>

      {/* Grid Lines */}
      <GridLines variant="light" />

      {/* Content */}
      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <div className="hero-content">
          <h1
            className={`hero-title transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {content.headline} <strong>{content.highlightedText}</strong>
          </h1>

          <Link
            href={content.cta.href}
            className={`btn-link white text-lg transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            {content.cta.text}
            <ArrowRight />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 text-white transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '0.6s' }}
      >
        <span className="text-sm font-medium tracking-wider uppercase">Scroll</span>
        <div className="relative h-12 w-px">
          <span className="absolute inset-0 bg-white/30" />
          <span
            className="absolute top-0 left-0 w-full bg-white"
            style={{
              height: '24px',
              animation: 'scrollIndicator 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollIndicator {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(24px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
