'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Specialization } from '@/types/content';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ArrowRight } from '@/components/ui/Icons';

gsap.registerPlugin(ScrollTrigger);

interface SpecializationsGridProps {
  specializations: Specialization[];
}

function SpecializationCard({ item }: { item: Specialization }) {
  return (
    <Link
      href={item.href}
      className="group relative aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden block"
    >
      {/* Background image */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />

      {/* Default gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[var(--color-accent)]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Default content (bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 transition-opacity duration-300 group-hover:opacity-0">
        <p className="text-white/60 text-[12px] font-medium tracking-[0.1em] uppercase mb-2">
          {item.tagline}
        </p>
        <h3 className="text-white text-fs-19 lg:text-fs-24 font-medium leading-[1.2]">
          {item.title}
        </h3>
      </div>

      {/* Hover content (centered) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        <h3 className="text-white text-fs-24 font-medium leading-[1.2] mb-3">
          {item.title}
        </h3>
        <p className="text-white/80 text-[14px] leading-[1.6] mb-5 max-w-[220px]">
          {item.description}
        </p>
        <span className="inline-flex items-center gap-2 text-white text-[13px] font-medium tracking-[0.05em] uppercase">
          Explore
          <ArrowRight />
        </span>
      </div>
    </Link>
  );
}

export function SpecializationsGrid({ specializations }: SpecializationsGridProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.spec-card');

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-[var(--color-primary)] overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="wrapper relative">
        <SectionHeader
          label="SPECIALIZATIONS"
          headline="Areas of Expertise"
          variant="dark"
          align="left"
        />

        <div className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {specializations.map((item) => (
            <div key={item.id} className="spec-card">
              <SpecializationCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
