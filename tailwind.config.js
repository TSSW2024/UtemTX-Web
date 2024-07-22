// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        dark: '#3D3F3E',
        primary: {
          DEFAULT: '#E8C8B7',
          hover: '#FCD535',
          dark: '#F9C74F',
          light: '#61677A',
          lighthover: '#ff9d5a',
        },
        secondary: {
          DEFAULT: '#0C0D0F',
          hover: '#202226',
          dark: '#1A1D21',
          light: '#2ecc71',
          lighthover: '#27ae60',
        },
        danger: {
          DEFAULT: '#e3342f',
          hover: '#CC312B',
          dark: '#D64540',
        },
        light: {
          DEFAULT: '#FFF6E0',
          dark: '#E5E5E5',
          secondary: '#F4F0EA',
        },
        disabled: '#BDBDBD',
      },
      colors: {
        primary: {
          DEFAULT: '#ffed4a',
          hover: '#FCD535',
          dark: '#F9C74F',
          light: '#f97316',
        },
        secondary: '#2B3139',
        danger: '#e3342f',
      },
      listStyleType: {
        square: 'square',
        roman: 'upper-roman',
        alpha: 'lower-alpha',
      },
      keyframes: {
        'carrusel-spin': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        }
      },
      animation: {
        'carrusel-spin': 'carrusel-spin 6s linear infinite',
        'fade-in': 'fade-in 1s ease-in-out',
        'fade-out': 'fade-out 1s ease-in-out'
      },
    },
  },
  plugins: [],
};
