import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-pink': '#E91E63',
        'brand-cream': '#FEFAE0',
        'brand-rose': '#FF4081',
        'brand-dark': '#1B0035',
        'brand-blush': '#FFB6C1',
        'brand-magenta': '#FF69B4',
      },
      fontFamily: {
        script: ['var(--font-dancing)', 'cursive'],
        body: ['var(--font-lato)', 'sans-serif'],
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-100px) rotate(360deg)', opacity: '0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        heartPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.12)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(233,30,99,0.5), 0 0 60px rgba(233,30,99,0.2)' },
          '50%': { boxShadow: '0 0 50px rgba(233,30,99,0.8), 0 0 100px rgba(233,30,99,0.4)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        floatUp: 'floatUp linear infinite',
        blink: 'blink 0.7s ease-in-out infinite',
        heartPulse: 'heartPulse 2s ease-in-out infinite',
        glowPulse: 'glowPulse 2s ease-in-out infinite',
        twinkle: 'twinkle ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        bounceGentle: 'bounceGentle 2s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.7s ease forwards',
        slideUp: 'slideUp 0.4s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;
