module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        /**
         * https://cli.vuejs.org/guide/browser-compatibility.html#polyfills-when-building-as-library-or-web-components
         */
        useBuiltIns: false, // false for lib and 'usage' for app
        // polyfills: ['es.promise']
      },
    ],
  ],
};
