import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#111315',
          900: '#1A1D20',
          850: '#202428',
          800: '#2D3338',
        },
        forensic: {
          gold: '#B88A44',
          olive: '#6F8F72',
          stone: '#A8A29A',
          risk: '#C95A4A',
          warning: '#D2A64A',
          text: '#F3F0EA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'data-flow': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'glitch-in': {
          '0%': { transform: 'translate(0)', opacity: '0' },
          '20%': { transform: 'translate(-2px, 1px)', opacity: '1' },
          '40%': { transform: 'translate(2px, -1px)' },
          '60%': { transform: 'translate(-1px, 1px)' },
          '100%': { transform: 'translate(0)', opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 3.5s linear infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'data-flow': 'data-flow 2.4s ease-in-out infinite',
        'glitch-in': 'glitch-in 0.45s ease-out',
      },
      boxShadow: {
        workstation: '0 18px 50px rgba(0, 0, 0, 0.28)',
      },
    },
  },
  plugins: [],
} satisfies Config;
