'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from './Icons';

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'dark' | 'white' | 'accent';
  showArrow?: boolean;
  className?: string;
  target?: string;
}

export function ButtonLink({
  href,
  children,
  variant = 'dark',
  showArrow = true,
  className = '',
  target,
}: ButtonLinkProps) {
  const variantClasses = {
    dark: 'text-[var(--color-primary)] hover:text-[var(--color-accent)]',
    white: 'text-white hover:text-[var(--color-accent)]',
    accent: 'text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]',
  };

  return (
    <Link
      href={href}
      target={target}
      className={`btn-link ${variantClasses[variant]} ${className}`}
    >
      {children}
      {showArrow && <ArrowRight />}
    </Link>
  );
}

interface ButtonPrimaryProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  showArrow?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export function ButtonPrimary({
  href,
  onClick,
  children,
  showArrow = true,
  className = '',
  type = 'button',
}: ButtonPrimaryProps) {
  const content = (
    <>
      {children}
      {showArrow && <ArrowRight />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`btn-primary ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`btn-primary ${className}`}>
      {content}
    </button>
  );
}
