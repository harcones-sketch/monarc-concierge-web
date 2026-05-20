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
        gold: '#C8A86E',
        'gold-2': '#B8965A',
        dark: '#080808',
        'dark-2': '#0D0D0D',
        'dark-3': '#111111',
        cream: '#F5F2EC',
        muted: '#888888',
        border: 'rgba(200,168,110,0.12)',
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
