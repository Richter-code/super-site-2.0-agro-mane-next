import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/features/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        brand: {
          50: '#f2f9f1',
          100: '#d9f0d6',
          200: '#b7e2b6',
          300: '#8bcf94',
          400: '#63b174',
          500: '#3faf5f',
          600: '#348a4d',
          700: '#246b39',
          800: '#1b3f29',
          900: '#112717',
        },
        clay: {
          50: '#f9f4ef',
          100: '#f1e5d6',
          200: '#e4cdb3',
          300: '#d3ab85',
          400: '#c0865b',
          500: '#a36845',
          600: '#854f39',
          700: '#663b2c',
          800: '#45261d',
          900: '#2b170f',
        },
        sand: {
          50: '#fcf9f3',
          100: '#f3ecdc',
          200: '#e8d6b7',
          300: '#d6bb8e',
          400: '#c39c65',
          500: '#a97d45',
          600: '#865f34',
          700: '#654527',
          800: '#442c1a',
          900: '#25160d',
        },
        moss: {
          50: '#eef5f0',
          100: '#d7e8db',
          200: '#b5d1bc',
          300: '#88b396',
          400: '#639974',
          500: '#4a7c5c',
          600: '#3a6249',
          700: '#2c4a37',
          800: '#1d3124',
          900: '#111f15',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'brand-hero':
          'radial-gradient(circle at 0% 0%, rgba(139,207,148,0.35), transparent 55%), radial-gradient(circle at 80% 0%, rgba(255,212,164,0.26), transparent 55%), linear-gradient(135deg, #fdfefc, #f3f8f0)',
        'card-soft':
          'linear-gradient(130deg, rgba(255,255,255,0.95), rgba(240,247,236,0.92))',
        grain:
          'radial-gradient(circle at 1px 1px, rgba(17,39,23,0.05) 1px, transparent 0)',
      },
      backgroundSize: {
        grain: '28px 28px',
      },
      boxShadow: {
        dune: '0 25px 60px rgba(16, 36, 4, 0.08)',
        card: '0 15px 35px rgba(20, 45, 18, 0.08)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        brand: '2.5rem',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
