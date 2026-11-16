import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nhk: {
          bg: '#FAF9F6', // Warm off-white
          beige: '#EDE8DF', // Soft beige
          'beige-light': '#F5F2EB',
          'beige-dark': '#DDD6C9',
          charcoal: '#242424', // Charcoal
          'charcoal-dark': '#171717',
          grey: '#777777', // Muted grey
          'grey-light': '#A1A1A1',
          'grey-border': '#E7E2D8',
          accent: '#A47551', // Warm earth / caramel accent
          'accent-hover': '#8E6342',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(36, 36, 36, 0.05), 0 2px 6px -1px rgba(36, 36, 36, 0.02)',
        'card-hover': '0 20px 30px -10px rgba(36, 36, 36, 0.12), 0 8px 10px -4px rgba(36, 36, 36, 0.04)',
        soft: '0 10px 40px -10px rgba(36, 36, 36, 0.06)',
      },
      aspectRatio: {
        'pin-vertical': '2 / 3',
        'pin-tall': '3 / 4',
      },
    },
  },
  plugins: [],
};

export default config;
