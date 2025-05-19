/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Varela Round"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#7B1536',
          50: '#F9E6EB',
          100: '#F3CCD7',
          200: '#E699AF',
          300: '#D96687',
          400: '#CC335F',
          500: '#7B1536',
          600: '#62112B',
          700: '#490D20',
          800: '#310815',
          900: '#18040A',
        },
        secondary: {
          DEFAULT: '#182737',
          50: '#E6E9EC',
          100: '#CCD3D9',
          200: '#99A7B3',
          300: '#667B8D',
          400: '#334F67',
          500: '#182737',
          600: '#131F2C',
          700: '#0E1721',
          800: '#0A0F16',
          900: '#05080B',
        },
        accent: {
          DEFAULT: '#FFD166',
          50: '#FFFAEB',
          100: '#FFF5D6',
          200: '#FFEAAD',
          300: '#FFE085',
          400: '#FFD85C',
          500: '#FFD166',
          600: '#FFBF0D',
          700: '#D49C00',
          800: '#A17500',
          900: '#6E4F00',
        },
        success: '#06D6A0',
        warning: '#FFD166',
        error: '#EF476F',
        background: '#FFFFFF',
        foreground: '#182737',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};