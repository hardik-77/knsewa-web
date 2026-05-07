'use client';

import React from 'react';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement, StaggerContainer } from '@/components/ui/AnimatedElement';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, ArrowRight } from '@/components/ui/Icons';
import type { OfficeLocation } from '@/types/content';

interface ContactInfoSectionProps {
  label: string;
  headline: string;
  description: string;
  offices: OfficeLocation[];
}

export function ContactInfoSection({ label, headline, description, offices }: ContactInfoSectionProps) {
  const hq = offices.find((o) => o.isHeadquarters) ?? offices[0];

  return (
    <section
      style={{
        background: 'var(--color-white)',
        padding: 'clamp(5rem, 9vw, 9rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(3rem, 5vw, 4rem)', maxWidth: '720px' }}>
          <AnimatedElement>
            <p className="section-label" style={{ color: 'var(--color-accent)' }}>
              {label}
            </p>
          </AnimatedElement>
          <AnimatedElement delay={0.05}>
            <h2
              className="title"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.8125rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: 'var(--color-primary)',
                marginTop: '1.25rem',
              }}
            >
              {headline}
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={0.1}>
            <div
              style={{
                width: '36px',
                height: '2px',
                background: 'var(--color-accent)',
                margin: '1.75rem 0',
              }}
            />
          </AnimatedElement>
          <AnimatedElement delay={0.15}>
            <p
              className="para"
              style={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'var(--color-gray-600)',
              }}
            >
              {description}
            </p>
          </AnimatedElement>
        </div>

        {/* Cards Grid */}
        <StaggerContainer
          stagger={0.08}
          className="contact-info-grid"
        >
          {/* Phone Card */}
          <a
            href={`tel:${hq.phone}`}
            className="contact-info-card"
          >
            <div className="contact-info-icon">
              <PhoneIcon width={22} height={22} />
            </div>
            <p className="contact-info-eyebrow">Call Us</p>
            <p className="contact-info-value">{hq.phone}</p>
            <span className="contact-info-link">
              Tap to call <ArrowRight width={20} height={8} />
            </span>
          </a>

          {/* Email Card */}
          <a
            href={`mailto:${hq.email}`}
            className="contact-info-card"
          >
            <div className="contact-info-icon">
              <MailIcon width={22} height={22} />
            </div>
            <p className="contact-info-eyebrow">Email Us</p>
            <p className="contact-info-value" style={{ wordBreak: 'break-all' }}>{hq.email}</p>
            <span className="contact-info-link">
              Send email <ArrowRight width={20} height={8} />
            </span>
          </a>

          {/* Address Card */}
          <a
            href={hq.mapUrl ?? '#'}
            target={hq.mapUrl ? '_blank' : undefined}
            rel={hq.mapUrl ? 'noopener noreferrer' : undefined}
            className="contact-info-card"
          >
            <div className="contact-info-icon">
              <MapPinIcon width={22} height={22} />
            </div>
            <p className="contact-info-eyebrow">Visit Us</p>
            <p className="contact-info-value">{hq.address}</p>
            {hq.mapUrl && (
              <span className="contact-info-link">
                Open in Maps <ArrowRight width={20} height={8} />
              </span>
            )}
          </a>

          {/* Hours Card */}
          {hq.hours && (
            <div className="contact-info-card" style={{ cursor: 'default' }}>
              <div className="contact-info-icon">
                <ClockIcon width={22} height={22} />
              </div>
              <p className="contact-info-eyebrow">Office Hours</p>
              <p className="contact-info-value">{hq.hours}</p>
            </div>
          )}
        </StaggerContainer>

        {/* Map Embed */}
        {hq.mapEmbedUrl && (
          <AnimatedElement delay={0.2}>
            <div
              style={{
                marginTop: 'clamp(3rem, 5vw, 4rem)',
                width: '100%',
                aspectRatio: '16 / 7',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--color-gray-200)',
              }}
            >
              <iframe
                src={hq.mapEmbedUrl}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${hq.name} location map`}
              />
            </div>
          </AnimatedElement>
        )}
      </div>

      <style jsx>{`
        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 1024px) {
          .contact-info-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .contact-info-grid {
            grid-template-columns: 1fr;
          }
        }
        .contact-info-card {
          display: flex;
          flex-direction: column;
          padding: 2rem 1.75rem;
          background: var(--color-white);
          border: 1px solid var(--color-gray-200);
          transition: border-color 0.3s ease, transform 0.3s ease;
          text-decoration: none;
          color: inherit;
        }
        a.contact-info-card:hover {
          border-color: var(--color-accent);
          transform: translateY(-2px);
        }
        .contact-info-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          margin-bottom: 1.25rem;
          color: var(--color-accent);
          background: var(--color-gray-100);
        }
        .contact-info-eyebrow {
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-gray-500);
          margin-bottom: 0.5rem;
        }
        .contact-info-value {
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.4;
          color: var(--color-primary);
          margin-bottom: 1rem;
          flex: 1;
        }
        .contact-info-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--color-accent);
        }
      `}</style>
    </section>
  );
}
