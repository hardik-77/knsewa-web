'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GridLines } from '@/components/ui/GridLines';
import type { NewsArticle } from '@/types/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface InsightsGridProps {
  label: string;
  headline: string;
  categories: string[];
  articles: NewsArticle[];
}

function ArticleCard({ article }: { article: NewsArticle }) {
  const date = new Date(article.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group block"
      style={{ textDecoration: 'none' }}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: '16 / 10',
          borderRadius: 16,
        }}
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-600 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Meta */}
      <div style={{ marginTop: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
        {/* Category + Date */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.625rem',
          }}
        >
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--color-accent)',
            }}
          >
            {article.category}
          </span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--color-gray-300)' }} />
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 400,
              color: 'var(--color-gray-400)',
            }}
          >
            {date}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: 'clamp(1rem, 1.3vw, 1.1875rem)',
            fontWeight: 500,
            lineHeight: 1.35,
            color: 'var(--color-primary)',
            transition: 'color 0.3s ease',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
          className="group-hover:text-[var(--color-accent)]"
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p
          style={{
            fontSize: 'clamp(0.8125rem, 0.9vw, 0.875rem)',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'var(--color-gray-500)',
            marginTop: '0.5rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.excerpt}
        </p>

        {/* Read more */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            marginTop: '0.75rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
          }}
        >
          Read More
          <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M0 4H14M14 4L10 1M14 4L10 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function FeaturedCard({ article }: { article: NewsArticle }) {
  const date = new Date(article.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group block"
      style={{ textDecoration: 'none' }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: '16 / 9',
          borderRadius: 16,
        }}
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(23,23,27,0.75) 0%, rgba(23,23,27,0) 60%)',
          }}
        />
        {/* Content on image */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-accent)',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                padding: '4px 10px',
                borderRadius: 3,
              }}
            >
              {article.category}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{date}</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.375rem, 2.2vw, 1.75rem)',
              fontWeight: 500,
              lineHeight: 1.25,
              color: 'white',
              maxWidth: '600px',
            }}
          >
            {article.title}
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.8125rem, 1vw, 0.9375rem)',
              fontWeight: 400,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.6)',
              marginTop: '0.75rem',
              maxWidth: '500px',
            }}
          >
            {article.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function InsightsGrid({ label, headline, categories, articles }: InsightsGridProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  // Animate cards on filter change
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.insight-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
    );
  }, [activeCategory]);

  // Scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 85%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="prel"
      style={{ padding: 'clamp(4rem, 7vw, 7rem) 0', background: 'var(--color-white)' }}
    >
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        {/* Header + Filters */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(1.5rem, 2.5vw, 2rem)',
            marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
          }}
          className="lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-accent)',
                marginBottom: '0.75rem',
              }}
            >
              {label}
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: 'var(--color-primary)',
              }}
            >
              {headline}
            </h2>
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="cursor-pointer"
                style={{
                  padding: '0.5rem 1.125rem',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: activeCategory === cat ? 'var(--color-accent)' : 'var(--color-gray-200)',
                  background: activeCategory === cat ? 'var(--color-accent)' : 'transparent',
                  color: activeCategory === cat ? 'white' : 'var(--color-gray-500)',
                  transition: 'all 0.25s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content grid */}
        <div ref={gridRef}>
          {featured && (
            <div className="insight-card" style={{ marginBottom: 'clamp(2rem, 3vw, 3rem)' }}>
              <FeaturedCard article={featured} />
            </div>
          )}

          {rest.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gap: 'clamp(2rem, 3vw, 2.5rem)',
              }}
              className="sm:grid-cols-2 lg:grid-cols-3"
            >
              {rest.map((article) => (
                <div key={article.id} className="insight-card">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--color-gray-400)', padding: '4rem 0' }}>
              No insights found for this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
