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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
