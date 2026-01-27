'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { GridLines } from '@/components/ui/GridLines';
import { ArrowRight } from '@/components/ui/Icons';
import type { HeroContent } from '@/types/content';

interface HeroSectionProps {
  content: HeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline();

    // Animate title
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }

    // Animate CTA
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
    }

    // Animate scroll indicator
    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );
    }

    return () => {
      tl.kill();
    };
  }, [isLoaded]);

  // Handle video playback
  useEffect(() => {
    if (videoRef.current && content.backgroundVideo) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    }
  }, [content.backgroundVideo]);

  const hasVideo = !!content.backgroundVideo;

  return (
    <section className="hero-section">
      {/* Background - Video or Image */}
      <div className="hero-bg">
        {hasVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={content.backgroundImage}
            className="w-full h-full object-cover"
          >
            <source src={content.backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          content.backgroundImage && (
            <Image
              src={content.backgroundImage}
              alt="Hero background"
              fill
              priority
              quality={90}
              className="object-cover"
            />
          )
        )}
        <div className="hero-overlay" />
      </div>

      {/* Grid Lines */}
      <GridLines variant="light" />

      {/* Content */}
      <div className="wrapper prel w-full" style={{ zIndex: 10 }}>
        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title opacity-0">
            {content.headline}{' '}
            <strong className="text-[var(--color-accent)]">{content.highlightedText}</strong>
          </h1>

          <Link
            ref={ctaRef}
            href={content.cta.href}
            className="btn-link white text-lg opacity-0 mt-8 inline-flex"
          >
            {content.cta.text}
            <ArrowRight />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 text-white opacity-0"
      >
        <span className="text-sm font-medium tracking-wider uppercase">Scroll</span>
        <div className="scroll-indicator-line">
          <span className="scroll-indicator-dot" />
        </div>
      </div>

      <style jsx>{`
        .scroll-indicator-line {
          position: relative;
          height: 48px;
          width: 1px;
          background: rgba(255, 255, 255, 0.3);
        }
        .scroll-indicator-dot {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 24px;
          background: white;
          animation: scrollIndicator 1.5s ease-in-out infinite;
        }
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
