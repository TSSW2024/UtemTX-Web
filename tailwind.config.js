// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        // Color de fondo para el modo oscuro
        dark: '#3D3F3E', 

        primary: {
          // Color principal por defecto
          DEFAULT: '#E8C8B7', // Color beige claro

          // Color principal al hacer hover
          hover: '#FCD535', // Color amarillo brillante

          // Color principal en modo oscuro
          dark: '#F9C74F', // Color dorado

          // Color principal claro
          light: '#61677A', // Color gris azulado

          // Color principal claro al hacer hover
          lighthover: '#ff9d5a', // Color naranja claro
        },
        
        secondary: {
          // Color secundario por defecto
          DEFAULT: '#0C0D0F', // Color negro profundo

          // Color secundario al hacer hover
          hover: '#202226', // Color gris oscuro

          // Color secundario en modo oscuro
          dark: '#1A1D21', // Color gris muy oscuro

          // Color secundario claro
          light: '#2ecc71', // Color verde brillante

          // Color secundario claro al hacer hover
          lighthover: '#27ae60', // Color verde más oscuro
        },

        danger: {
          // Color de peligro por defecto
          DEFAULT: '#e3342f', // Color rojo

          // Color de peligro al hacer hover
          hover: '#CC312B', // Color rojo más oscuro

          // Color de peligro en modo oscuro
          dark: '#D64540', // Color rojo menos brillante
        },

        light: {
          // Color claro por defecto
          DEFAULT: '#FFF6E0', // Color crema

          // Color claro en modo oscuro
          dark: '#E5E5E5', // Color gris claro

          // Color claro secundario
          secondary: '#F4F0EA', // Color blanco sucio
        },

        // Color para elementos deshabilitados
        disabled: '#BDBDBD', // Color gris medio
      },

      colors: {
        primary: {
          // Color principal por defecto
          DEFAULT: '#ffed4a', // Color amarillo

          // Color principal al hacer hover
          hover: '#FCD535', // Color amarillo brillante

          // Color principal en modo oscuro
          dark: '#F9C74F', // Color dorado

          // Color principal claro
          light: '#f97316', // Color naranja
        },

        // Color secundario
        secondary: '#2B3139', // Color gris oscuro

        // Color de peligro
        danger: '#e3342f', // Color rojo
      },

      listStyleType: {
        // Lista con viñetas cuadradas
        square: 'square',

        // Lista con numeración romana en mayúsculas
        roman: 'upper-roman',

        // Lista con letras minúsculas
        alpha: 'lower-alpha',
      },
    },
  },
  plugins: [],
};
