'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  start?: string;
  end?: string;
  scrub?: number;
}

export function useParallax<T extends HTMLElement>(options: UseParallaxOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      speed = 0.2,
      direction = 'vertical',
      start = 'top bottom',
      end = 'bottom top',
      scrub = 1,
    } = options;

    const distance = 100 * speed;
    const property = direction === 'vertical' ? 'y' : 'x';

    gsap.fromTo(
      element,
      { [property]: -distance },
      {
        [property]: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === element)
        .forEach((t) => t.kill());
    };
  }, [options]);

  return ref;
}

interface UseImageParallaxOptions {
  scale?: number;
  speed?: number;
  scrub?: number;
}

export function useImageParallax<T extends HTMLElement>(
  options: UseImageParallaxOptions = {}
) {
  const containerRef = useRef<T>(null);
  const imageRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const { scale = 1.2, speed = 0.3, scrub = 1 } = options;

    // Set initial state
    gsap.set(image, {
      scale,
      y: 0,
    });

    // Create parallax effect
    gsap.to(image, {
      y: `${speed * 100}%`,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub,
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === container)
        .forEach((t) => t.kill());
    };
  }, [options]);

  return { containerRef, imageRef };
}

// Parallax for background images
export function useBackgroundParallax<T extends HTMLElement>(
  options: { speed?: number; scrub?: number } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { speed = 0.5, scrub = 1 } = options;

    gsap.to(element, {
      backgroundPositionY: `${speed * 100}%`,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub,
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === element)
        .forEach((t) => t.kill());
    };
  }, [options]);

  return ref;
}

// Counter animation that triggers on scroll
export function useCounterAnimation(
  targetValue: number,
  options: { duration?: number; suffix?: string; prefix?: string } = {}
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { duration = 2, suffix = '', prefix = '' } = options;
    const counter = { value: 0 };

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(counter, {
          value: targetValue,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            element.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
          },
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === element)
        .forEach((t) => t.kill());
    };
  }, [targetValue, options]);

  return ref;
}

// Hook for creating horizontal scroll sections
export function useHorizontalScroll<T extends HTMLElement>(
  contentRef: RefObject<HTMLElement | null>,
  options: { anticipatePin?: number } = {}
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const scrollWidth = content.scrollWidth - container.offsetWidth;

    gsap.to(content, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: options.anticipatePin ?? 1,
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === container)
        .forEach((t) => t.kill());
    };
  }, [contentRef, options]);

  return containerRef;
}
