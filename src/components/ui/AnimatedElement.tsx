'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedElementProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
  start?: string;
}

export function AnimatedElement({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  stagger = 0,
  className = '',
  once = true,
  start = 'top 85%',
}: AnimatedElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Define animation starting states based on direction
    const fromStates: Record<string, gsap.TweenVars> = {
      up: { y: 40, opacity: 0 },
      down: { y: -40, opacity: 0 },
      left: { x: -40, opacity: 0 },
      right: { x: 40, opacity: 0 },
      fade: { opacity: 0 },
      scale: { scale: 0.9, opacity: 0 },
    };

    const toStates: Record<string, gsap.TweenVars> = {
      up: { y: 0, opacity: 1 },
      down: { y: 0, opacity: 1 },
      left: { x: 0, opacity: 1 },
      right: { x: 0, opacity: 1 },
      fade: { opacity: 1 },
      scale: { scale: 1, opacity: 1 },
    };

    // Get targets (element itself or its children if stagger is set)
    const targets = stagger > 0 ? element.children : element;

    // Set initial state
    gsap.set(targets, fromStates[direction]);

    // Create scroll trigger animation
    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      onEnter: () => {
        gsap.to(targets, {
          ...toStates[direction],
          duration,
          delay,
          stagger: stagger > 0 ? stagger : 0,
          ease: 'power3.out',
        });
      },
      once,
    });

    return () => {
      trigger.kill();
    };
  }, [direction, delay, duration, stagger, once, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Simplified animation wrapper for single elements
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  return (
    <AnimatedElement direction="fade" delay={delay} className={className}>
      {children}
    </AnimatedElement>
  );
}

export function FadeUp({ children, delay = 0, className = '' }: FadeInProps) {
  return (
    <AnimatedElement direction="up" delay={delay} className={className}>
      {children}
    </AnimatedElement>
  );
}

export function FadeDown({ children, delay = 0, className = '' }: FadeInProps) {
  return (
    <AnimatedElement direction="down" delay={delay} className={className}>
      {children}
    </AnimatedElement>
  );
}

export function SlideLeft({ children, delay = 0, className = '' }: FadeInProps) {
  return (
    <AnimatedElement direction="left" delay={delay} className={className}>
      {children}
    </AnimatedElement>
  );
}

export function SlideRight({ children, delay = 0, className = '' }: FadeInProps) {
  return (
    <AnimatedElement direction="right" delay={delay} className={className}>
      {children}
    </AnimatedElement>
  );
}

// Stagger container for child elements
interface StaggerContainerProps {
  children: React.ReactNode;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  className?: string;
}

export function StaggerContainer({
  children,
  stagger = 0.1,
  direction = 'up',
  className = '',
}: StaggerContainerProps) {
  return (
    <AnimatedElement direction={direction} stagger={stagger} className={className}>
      {children}
    </AnimatedElement>
  );
}
