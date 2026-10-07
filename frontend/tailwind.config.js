/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Arial',
          'sans-serif',
        ],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      // The site palette. Use as classes (`bg-primary`, `text-azure`) in templates and as
      // `theme('colors.primary')` / `theme('colors.primary / 10%')` in SCSS.
      // Flat names (not nested objects) so theme() works without `.DEFAULT`.
      // Tailwind's default colors (white, black, transparent, ...) stay available too.
      colors: {
        primary: '#0000FF',
        violet: '#AA00FF',
        indigo: '#2A00FF',
        azure: '#007FFF',
        electric: '#00C8FF',
        purple: '#6A00FF',
        magenta: '#D400FF',

        // Text colors.
        ink: '#ffffff',
        'ink-muted': '#b4b8d6',
        'ink-subtle': '#6c7096',

        // Dark backgrounds.
        background: '#000000',
        surface: '#07071a',
        'surface-light': '#0e0e2a',
        border: '#1c1c48',

        danger: '#ff3b6b',
        success: '#22e39b',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0000FF 0%, #2A00FF 35%, #AA00FF 100%)',
        'gradient-azure': 'linear-gradient(135deg, #007FFF 0%, #0000FF 50%, #2A00FF 100%)',
        'gradient-title': 'linear-gradient(90deg, #007FFF, #2A00FF, #AA00FF, #007FFF)',
        'gradient-neon': 'linear-gradient(90deg, #00C8FF, #007FFF, #6A00FF, #D400FF)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 0deg, #0000FF, #AA00FF, #007FFF, #2A00FF, #0000FF)',
      },
      boxShadow: {
        glow: '0 0 24px rgba(0, 127, 255, 0.55)',
        'glow-lg': '0 0 48px rgba(42, 0, 255, 0.6), 0 0 96px rgba(170, 0, 255, 0.35)',
        'glow-violet': '0 0 32px rgba(170, 0, 255, 0.6)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-in': { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        // Opacity only - used on a pre-drawn shadow (see .pulse-glow in styles.scss).
        'pulse-glow': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
        shine: {
          from: { transform: 'translateX(-120%) skewX(-20deg)' },
          to: { transform: 'translateX(220%) skewX(-20deg)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.15)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.9)' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease',
        'slide-in': 'slide-in 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'gradient-x': 'gradient-x 6s ease infinite',
        float: 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        shine: 'shine 1.1s ease',
        blob: 'blob 14s ease-in-out infinite',
        'spin-slow': 'spin-slow 12s linear infinite',
      },
    },
  },
  plugins: [],
};
