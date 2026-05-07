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
      },
      boxShadow: {
        workstation: '0 18px 50px rgba(0, 0, 0, 0.28)',
      },
    },
  },
  plugins: [],
} satisfies Config;
