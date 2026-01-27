import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      // Turner-specific breakpoints
      'mobile': { max: '719px' },
      'tablet': { min: '720px', max: '1024px' },
      'desktop': { min: '1025px' },
      'large': { min: '1281px' },
    },
    extend: {
      colors: {
        // Turner brand colors
        'turner-blue': '#0b5dd0',
        'turner-orange': '#0b5dd0',
        'turner-dark': '#17171b',
        'turner-navy': '#001e6a',
        'turner-blue-light': '#bfd2e4',
        // Brand aliases
        'brand-blue': 'var(--brand-blue)',
        'brand-gray': {
          '50': 'var(--brand-gray-50)',
          '100': 'var(--brand-gray-100)',
          '200': 'var(--brand-gray-200)',
          '300': 'var(--brand-gray-300)',
          '400': 'var(--brand-gray-400)',
          '500': 'var(--brand-gray-500)',
          '600': 'var(--brand-gray-600)',
          '700': 'var(--brand-gray-700)',
          '800': 'var(--brand-gray-800)',
          '900': 'var(--brand-gray-900)',
        },
      },
      fontFamily: {
        sans: ['"Apercu Pro"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['Rockness', 'Georgia', 'serif'],
      },
      fontSize: {
        // Turner responsive font sizes with clamp()
        'fs-16': ['clamp(0.875rem, 1vw, 1rem)', { lineHeight: '1.5' }],
        'fs-19': ['clamp(1rem, 1.2vw, 1.1875rem)', { lineHeight: '1.4' }],
        'fs-23': ['clamp(1.125rem, 1.5vw, 1.4375rem)', { lineHeight: '1.3' }],
        'fs-30': ['clamp(1.5rem, 2vw, 1.875rem)', { lineHeight: '1.2' }],
        'fs-40': ['clamp(1.75rem, 2.5vw, 2.5rem)', { lineHeight: '1.15' }],
        'fs-45': ['clamp(2rem, 3vw, 2.8125rem)', { lineHeight: '1.1' }],
        'fs-70': ['clamp(2.5rem, 5vw, 4.375rem)', { lineHeight: '1.05' }],
        'fs-90': ['clamp(3rem, 6vw, 5.625rem)', { lineHeight: '1' }],
        'fs-120': ['clamp(4rem, 8vw, 7.5rem)', { lineHeight: '0.9' }],
        'fs-160': ['clamp(5rem, 10vw, 10rem)', { lineHeight: '0.85' }],
      },
      lineHeight: {
        'tight-08': '0.8',
        'tight-1': '1',
        'tight-11': '1.1',
        'tight-12': '1.2',
        'normal-13': '1.3',
        'normal-15': '1.5',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-down': 'fadeDown 0.6s ease forwards',
        'slide-in-left': 'slideInLeft 0.6s ease forwards',
        'slide-in-right': 'slideInRight 0.6s ease forwards',
        'rolling-text': 'rollingText 0.5s ease forwards',
        'scale-up': 'scaleUp 0.6s ease forwards',
        'parallax': 'parallax linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        rollingText: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        parallax: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20%)' },
        },
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}
export default config
