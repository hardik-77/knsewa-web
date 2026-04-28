'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from './Icons';
import type { BreadcrumbItem } from '@/types/content';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="breadcrumb-link"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumb-current">
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRightIcon className="breadcrumb-separator" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
