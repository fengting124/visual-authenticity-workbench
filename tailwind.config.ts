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
        archive: {
          paper: '#1C1E20',
          grid: '#252830',
          folder: '#3A2E1F',
          redink: '#A64545',
          blueink: '#3F5E7E',
          tape: '#C9A66B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: [
          '"Crimson Pro"',
          'ui-serif',
          '"Source Han Serif SC"',
          '"Noto Serif SC"',
          '"Songti SC"',
          'SimSun',
          'serif',
        ],
        hand: ['Caveat', 'ui-sans-serif', 'cursive'],
        lcd: ['"Share Tech Mono"', 'ui-monospace', 'monospace'],
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
        'stamp-in': {
          '0%': { transform: 'scale(1.4) rotate(-12deg)', opacity: '0' },
          '60%': { transform: 'scale(0.9) rotate(-6deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(-4deg)', opacity: '0.92' },
        },
        'paper-fade': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3.5s linear infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'data-flow': 'data-flow 2.4s ease-in-out infinite',
        'glitch-in': 'glitch-in 0.45s ease-out',
        'stamp-in': 'stamp-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'paper-fade': 'paper-fade 0.35s ease-out forwards',
      },
      boxShadow: {
        workstation: '0 18px 50px rgba(0, 0, 0, 0.28)',
        'archive-card':
          '0 1px 2px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(184,138,68,0.06)',
        pinned: '0 8px 18px rgba(0,0,0,0.45), 0 2px 4px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config;
