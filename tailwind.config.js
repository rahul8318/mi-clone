/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          DEFAULT: '#F8C8DC',
          50: '#FFF5F8',
          100: '#FDEDF3',
          200: '#F8C8DC',
          300: '#F3A3C5',
          400: '#EB7EAE',
        },
        lavender: {
          DEFAULT: '#D8C9F5',
          50: '#F8F5FE',
          100: '#F0EBFC',
          200: '#D8C9F5',
          300: '#BFA7EE',
        },
        cream: {
          DEFAULT: '#FFF8F0',
          50: '#FFFFFF',
          100: '#FFF8F0',
          200: '#FEEFD8',
        },
        rose: {
          DEFAULT: '#EFA6B8',
          400: '#EFA6B8',
          500: '#E47B95',
          600: '#D15374',
        },
        plum: {
          DEFAULT: '#54354D',
          700: '#43293D',
          800: '#341F2F',
          900: '#241421',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        handwriting: ['Caveat', 'Dancing Script', 'cursive'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.85' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
