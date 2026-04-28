'use client';

import React from 'react';

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function ArrowRight({ className = '', width = 35, height = 14 }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 35 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M27.5 1L33.5 7M33.5 7L27.5 13M33.5 7H0"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function ArrowDown({ className = '', width = 14, height = 35 }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 0V33.5M7 33.5L1 27.5M7 33.5L13 27.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function ScrollDownIcon({ className = '' }: IconProps) {
  return (
    <svg
      width="24"
      height="40"
      viewBox="0 0 24 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="1" y="1" width="22" height="38" rx="11" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="currentColor" className="animate-bounce" />
    </svg>
  );
}

export function MenuIcon({ className = '' }: IconProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <span className="w-6 h-0.5 bg-current transition-all" />
      <span className="w-6 h-0.5 bg-current transition-all" />
      <span className="w-6 h-0.5 bg-current transition-all" />
    </div>
  );
}

export function CloseIcon({ className = '', width = 24, height = 24 }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FacebookIcon({ className = '' }: IconProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M21 10H18.5C17.5717 10 16.6815 10.3687 16.0251 11.0251C15.3687 11.6815 15 12.5717 15 13.5V16H13V19H15V26H18V19H20.5L21 16H18V13.5C18 13.2348 18.1054 12.9804 18.2929 12.7929C18.4804 12.6054 18.7348 12.5 19 12.5H21V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function InstagramIcon({ className = '' }: IconProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="4" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="23" cy="9" r="1.5" fill="currentColor"/>
    </svg>
  );
}

export function LinkedInIcon({ className = '' }: IconProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="4" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M11 14V22M11 10V10.01M15 22V17C15 16.4696 15.2107 15.9609 15.5858 15.5858C15.9609 15.2107 16.4696 15 17 15C17.5304 15 18.0391 15.2107 18.4142 15.5858C18.7893 15.9609 19 16.4696 19 17V22M15 14V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function TwitterIcon({ className = '' }: IconProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 6L14.5 16.5M14.5 16.5L6 26H9L16 19L22 26H26L17.5 15.5M14.5 16.5L22 6H26L17.5 15.5M17.5 15.5L14.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function YoutubeIcon({ className = '' }: IconProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M27.5 10.5C27.3 9.5 26.5 8.7 25.5 8.5C23.5 8 16 8 16 8C16 8 8.5 8 6.5 8.5C5.5 8.7 4.7 9.5 4.5 10.5C4 12.5 4 16 4 16C4 16 4 19.5 4.5 21.5C4.7 22.5 5.5 23.3 6.5 23.5C8.5 24 16 24 16 24C16 24 23.5 24 25.5 23.5C26.5 23.3 27.3 22.5 27.5 21.5C28 19.5 28 16 28 16C28 16 28 12.5 27.5 10.5Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M13 20V12L20 16L13 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

export function PhoneIcon({ className = '' }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M22 16.92V19.92C22 20.48 21.53 20.92 20.97 20.97C20.65 21 20.32 21 20 21C10.61 21 3 13.39 3 4C3 3.68 3 3.35 3.03 3.03C3.08 2.47 3.52 2 4.08 2H7.08C7.58 2 8 2.4 8.05 2.89C8.14 3.89 8.35 4.87 8.66 5.81C8.8 6.24 8.69 6.72 8.36 7.04L6.81 8.59C8.38 11.57 10.93 14.12 13.91 15.69L15.46 14.14C15.78 13.81 16.26 13.7 16.69 13.84C17.63 14.15 18.61 14.36 19.61 14.45C20.1 14.5 20.5 14.92 20.5 15.42V18.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function MailIcon({ className = '' }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 7L12 13L22 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function MapPinIcon({ className = '' }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 21C12 21 19 14.3 19 9C19 5.13 15.87 2 12 2C8.13 2 5 5.13 5 9C5 14.3 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function SearchIcon({ className = '' }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function ArrowIcon({ className = '' }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ChevronRightIcon({ className = '', width = 16, height = 16 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function CalendarIcon({ className = '', width = 24, height = 24 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function ClockIcon({ className = '', width = 24, height = 24 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function CheckIcon({ className = '', width = 24, height = 24 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function QuoteIcon({ className = '', width = 24, height = 24 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 11H6C6 7.686 8.686 5 12 5V3C7.582 3 4 6.582 4 11V19H10V11ZM20 11H16C16 7.686 18.686 5 22 5V3C17.582 3 14 6.582 14 11V19H20V11Z" fill="currentColor"/>
    </svg>
  );
}

export function ExcellenceIcon({ className = '', width = 24, height = 24 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IntegrityIcon({ className = '', width = 24, height = 24 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function SafetyIcon({ className = '', width = 24, height = 24 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2 12C2 12 5 4 12 4C19 4 22 12 22 12C22 12 19 20 12 20C5 20 2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function InnovationIcon({ className = '', width = 24, height = 24 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M9 18H15M10 22H14M12 2V3M4.22 4.22L4.93 4.93M1 12H2M4.22 19.78L4.93 19.07M20 12H23M19.07 4.93L19.78 4.22M19.07 19.07L19.78 19.78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 18C7.34 16.66 6 14.5 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 14.5 16.66 16.66 15 18" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function CommunityIcon({ className = '', width = 24, height = 24 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M23 21V19C22.9986 18.1137 22.7005 17.2528 22.1523 16.5523C21.6041 15.8519 20.8368 15.3516 19.9746 15.13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 3.13C16.8604 3.35031 17.6259 3.85071 18.1721 4.55232C18.7183 5.25392 19.0144 6.11683 19.0144 7.005C19.0144 7.89318 18.7183 8.75608 18.1721 9.45769C17.6259 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function SustainabilityIcon({ className = '', width = 24, height = 24 }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 22C12 22 4 18 4 11V4L12 2L20 4V11C20 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 14C8 14 9 12 12 12C15 12 16 10 16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function ChevronDownIcon({ className = '' }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PlayIcon({ className = '' }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="5,3 19,12 5,21" fill="currentColor"/>
    </svg>
  );
}
