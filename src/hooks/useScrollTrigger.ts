'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseScrollTriggerOptions {
  trigger?: RefObject<HTMLElement | null>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean | string;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  toggleActions?: string;
}

export function useScrollTrigger<T extends HTMLElement>(
  options: UseScrollTriggerOptions = {}
) {
  const ref = useRef<T>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const element = options.trigger?.current || ref.current;
    if (!element) return;

    triggerRef.current = ScrollTrigger.create({
      trigger: element,
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: options.scrub ?? false,
      pin: options.pin ?? false,
      markers: options.markers ?? false,
      toggleActions: options.toggleActions || 'play none none none',
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      onEnterBack: options.onEnterBack,
      onLeaveBack: options.onLeaveBack,
    });

    return () => {
      triggerRef.current?.kill();
    };
  }, [options]);

  return { ref, trigger: triggerRef };
}

interface UsePinnedSectionOptions {
  pinSpacing?: boolean;
  anticipatePin?: number;
  start?: string;
  end?: string;
  markers?: boolean;
}

export function usePinnedSection<T extends HTMLElement>(
  options: UsePinnedSectionOptions = {}
) {
  const containerRef = useRef<T>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    triggerRef.current = ScrollTrigger.create({
      trigger: element,
      start: options.start || 'top top',
      end: options.end || '+=100%',
      pin: true,
      pinSpacing: options.pinSpacing ?? true,
      anticipatePin: options.anticipatePin ?? 1,
      markers: options.markers ?? false,
    });

    return () => {
      triggerRef.current?.kill();
    };
  }, [options]);

  return containerRef;
}

interface UseScrubAnimationOptions {
  start?: string;
  end?: string;
  scrub?: number;
  markers?: boolean;
}

export function useScrubAnimation<T extends HTMLElement>(
  animationCallback: (element: T, progress: number) => void,
  options: UseScrubAnimationOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: options.start || 'top bottom',
        end: options.end || 'bottom top',
        scrub: options.scrub ?? 1,
        markers: options.markers ?? false,
        onUpdate: (self) => {
          animationCallback(element, self.progress);
        },
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [animationCallback, options]);

  return ref;
}

// Utility to animate elements when they enter viewport
export function useRevealAnimation<T extends HTMLElement>(
  animation: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' = 'fadeUp',
  options: { delay?: number; duration?: number; stagger?: number } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { delay = 0, duration = 0.8, stagger = 0.1 } = options;

    const animations = {
      fadeUp: { y: 40, opacity: 0 },
      fadeIn: { opacity: 0 },
      slideLeft: { x: -50, opacity: 0 },
      slideRight: { x: 50, opacity: 0 },
      scale: { scale: 0.9, opacity: 0 },
    };

    const from = animations[animation];

    gsap.set(element, from);

    ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(element, {
          ...Object.fromEntries(Object.keys(from).map((k) => [k, k === 'opacity' ? 1 : 0])),
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          stagger: element.children.length > 0 ? stagger : 0,
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === element)
        .forEach((t) => t.kill());
    };
  }, [animation, options]);

  return ref;
}
