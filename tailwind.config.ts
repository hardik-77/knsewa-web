import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
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
      },
    },
  },
  plugins: [],
}
export default config
