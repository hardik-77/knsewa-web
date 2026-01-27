'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronDownIcon, ArrowIcon } from '@/components/ui/Icons';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CultureCommitment {
  id: string;
  title: string;
  description: string;
  image: string;
  stats?: {
    value: string;
    label: string;
  };
}

interface CultureSectionProps {
  commitments: CultureCommitment[];
  title?: string;
  subtitle?: string;
}

export function CultureSection({
  commitments,
  title = 'Our Commitments',
  subtitle = 'Building with Purpose',
}: CultureSectionProps) {
  const [activeCommitment, setActiveCommitment] = useState(commitments[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    gsap.fromTo(
      content,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === section)
        .forEach((t) => t.kill());
    };
  }, []);

  const handleCommitmentChange = (commitment: CultureCommitment, index: number) => {
    setActiveCommitment(commitment);
    setIsDropdownOpen(false);
    swiper?.slideTo(index);
  };

  return (
    <section ref={sectionRef} className="culture-section bg-[var(--color-primary)] py-20 lg:py-32">
      <div ref={contentRef} className="wrapper">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16">
          <div>
            <span className="section-label text-[var(--color-accent)]">{subtitle}</span>
            <h2 className="text-4xl lg:text-5xl font-light text-white mt-2">{title}</h2>
          </div>

          {/* Dropdown Selector */}
          <div className="relative mt-6 lg:mt-0">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-4 px-6 py-4 bg-white/10 text-white min-w-[280px] hover:bg-white/20 transition-colors"
            >
              <span className="font-medium">{activeCommitment.title}</span>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-xl z-20">
                {commitments.map((commitment, index) => (
                  <button
                    key={commitment.id}
                    onClick={() => handleCommitmentChange(commitment, index)}
                    className={`block w-full text-left px-6 py-4 hover:bg-[var(--color-gray-100)] transition-colors ${
                      activeCommitment.id === commitment.id
                        ? 'text-[var(--color-accent)] bg-[var(--color-gray-100)]'
                        : 'text-[var(--color-primary)]'
                    }`}
                  >
                    {commitment.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          onSwiper={setSwiper}
          onSlideChange={(s) => setActiveCommitment(commitments[s.activeIndex])}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="culture-swiper"
        >
          {commitments.map((commitment) => (
            <SwiperSlide key={commitment.id}>
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden rounded-lg">
                  <Image
                    src={commitment.image}
                    alt={commitment.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="text-white">
                  <h3 className="text-3xl lg:text-4xl font-light mb-6">{commitment.title}</h3>
                  <p className="text-white/70 text-lg mb-8 leading-relaxed">
                    {commitment.description}
                  </p>

                  {commitment.stats && (
                    <div className="mb-8">
                      <span className="text-5xl lg:text-6xl font-light text-[var(--color-accent)]">
                        {commitment.stats.value}
                      </span>
                      <p className="text-white/60 mt-2">{commitment.stats.label}</p>
                    </div>
                  )}

                  <button className="inline-flex items-center gap-2 text-white font-medium hover:text-[var(--color-accent)] transition-colors">
                    Learn More
                    <ArrowIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .culture-swiper .swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }
        .culture-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
        }
        .culture-swiper .swiper-pagination-bullet-active {
          background: var(--color-accent);
        }
      `}</style>
    </section>
  );
}

// Default commitments
export const defaultCultureCommitments: CultureCommitment[] = [
  {
    id: 'safety',
    title: 'Safety First',
    description:
      'We prioritize the safety of our workers, partners, and communities above all else. Our comprehensive safety programs and rigorous protocols ensure that everyone returns home safely at the end of each day.',
    image: '/images/projects/project-1.jpg',
    stats: {
      value: '99.9%',
      label: 'Safety record across all projects',
    },
  },
  {
    id: 'sustainability',
    title: 'Environmental Stewardship',
    description:
      'We are committed to minimizing our environmental impact through sustainable building practices, efficient resource utilization, and innovative green construction technologies.',
    image: '/images/projects/project-2.jpg',
    stats: {
      value: '40%',
      label: 'Reduction in carbon footprint since 2020',
    },
  },
  {
    id: 'community',
    title: 'Community Impact',
    description:
      'Our projects are designed to strengthen the communities we serve. We create local jobs, support small businesses, and build infrastructure that improves quality of life for generations.',
    image: '/images/projects/project-3.jpg',
    stats: {
      value: '5,000+',
      label: 'Local jobs created annually',
    },
  },
  {
    id: 'innovation',
    title: 'Innovation & Technology',
    description:
      'We embrace cutting-edge construction technologies and methodologies to deliver projects more efficiently, with higher quality, and reduced environmental impact.',
    image: '/images/projects/project-1.jpg',
    stats: {
      value: '15+',
      label: 'New technologies implemented',
    },
  },
  {
    id: 'quality',
    title: 'Uncompromising Quality',
    description:
      'Every project we undertake reflects our commitment to excellence. We use the finest materials, employ skilled craftsmen, and maintain rigorous quality control standards.',
    image: '/images/projects/project-2.jpg',
    stats: {
      value: '30+',
      label: 'Years of building excellence',
    },
  },
  {
    id: 'integrity',
    title: 'Ethical Business Practices',
    description:
      'We conduct our business with the highest ethical standards, maintaining transparent relationships with clients, partners, and stakeholders.',
    image: '/images/projects/project-3.jpg',
  },
];
