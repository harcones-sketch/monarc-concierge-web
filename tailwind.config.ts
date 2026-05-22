import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold:       '#B8965A',
        'gold-2':   '#9E7D46',
        'gold-light': '#C8A86E',
        dark:       '#1C1A17',
        'dark-2':   '#232018',
        'dark-3':   '#2A2620',
        cream:      '#F7F4EF',
        'cream-2':  '#EDE8DF',
        white:      '#FDFCF9',
        muted:      '#7A7269',
        'muted-2':  '#A09588',
        border:     'rgba(184,150,90,0.15)',
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: [
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s ease forwards',
        fadeIn: 'fadeIn 0.6s ease forwards',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
