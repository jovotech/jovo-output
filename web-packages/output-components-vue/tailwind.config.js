const colors = require('tailwindcss/colors');

module.exports = {
  // important: '#app', option to theoretically add a prefix
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.tsx', './src/**/*.ts'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#272f48',
          900: '#20172E',
          800: '#211C37',
          700: '#222340',
          600: '#272f48',
          500: '#435061',
          400: '#60707A',
          300: '#7C8E92',
          200: '#99AAAB',
          100: '#B6C3C1',
          50: '#D3DBD8',
        },
      },
    },
  },
  variants: {
    backgroundColor: ['disabled'],
    borderColor: ['disabled'],
    cursor: ['disabled'],
    textColor: ['disabled'],
    backgroundOpacity: ['disabled'],
    extend: {},
  },
  plugins: [],
};
