import React from 'react';

interface GridLinesProps {
  variant?: 'light' | 'gray';
}

export function GridLines({ variant = 'light' }: GridLinesProps) {
  return (
    <div className={`grid-lines ${variant === 'gray' ? 'gray' : ''}`}>
      <div className="line-25" />
      <div className="line-50" />
      <div className="line-25" />
    </div>
  );
}
