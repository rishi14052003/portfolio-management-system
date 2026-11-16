import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ff921c',
          600: '#b85a00',
          700: '#974900',
          800: '#7c3a06',
          900: '#632d00',
          950: '#431a00',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#eca427',
          600: '#a86600',
          700: '#855207',
          800: '#713f12',
          900: '#633c12',
          950: '#422006',
        },
        gray: {
          50: '#fffcf7',
          100: '#fff6e9',
          200: '#f2e6d1',
          300: '#dccab0',
          400: '#b69f7d',
          500: '#8a7456',
          600: '#69543d',
          700: '#4e3d2b',
          800: '#34271b',
          900: '#241a11',
          950: '#17100a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #FF921C 0%, #ECA427 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
