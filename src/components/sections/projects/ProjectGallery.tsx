'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { GridLines } from '@/components/ui/GridLines';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StaggerContainer } from '@/components/ui/AnimatedElement';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, goNext, goPrev]);

  const gridClass =
    images.length === 1
      ? 'project-gallery-single'
      : images.length === 2
        ? 'project-gallery-two'
        : 'project-gallery-grid';

  return (
    <section style={{ background: 'var(--color-primary)' }}>
      <GridLines variant="light" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <SectionHeader label="PROJECT GALLERY" headline="Gallery" variant="dark" />

        <StaggerContainer stagger={0.08} className={gridClass}>
          {images.map((src, index) => (
            <div
              key={index}
              className={`project-gallery-item to-be-scaled radius ${
                images.length >= 3 && index === 0 ? 'project-gallery-featured' : ''
              }`}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
              aria-label={`View ${title} image ${index + 1}`}
            >
              <Image
                src={src}
                alt={`${title} — ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </StaggerContainer>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="project-lightbox" onClick={closeLightbox}>
          <div
            className="project-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`${title} — ${lightboxIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Close */}
          <button
            className="project-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Counter */}
          <div className="project-lightbox-counter">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                className="project-lightbox-nav project-lightbox-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="project-lightbox-nav project-lightbox-next"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
