const path = require('path');

module.exports = {
  parallel: false,
  chainWebpack: (config) => {
    config.resolve.symlinks(false);
    const tsConfigPath = path.resolve(
      process.env.VUE_CLI_BUILD_TARGET === 'lib' ? './tsconfig.lib.json' : './tsconfig.json',
    );

    config.plugin('fork-ts-checker').tap((args) => {
      args[0].tsconfig = tsConfigPath;
      return args;
    });

    config.module
      .rule('ts')
      .use('ts-loader')
      .loader('ts-loader')
      .tap((options) => {
        options.context = __dirname;
        options.configFile = tsConfigPath;
        options.transpileOnly = false;
        return options;
      });

    config.module
      .rule('tsx')
      .use('ts-loader')
      .loader('ts-loader')
      .tap((options) => {
        options.context = __dirname;
        options.configFile = tsConfigPath;
        options.transpileOnly = false;
        return options;
      });
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-import'),
          require('tailwindcss'),
          require('postcss-nested'),
          require('postcss-custom-properties'),
          require('autoprefixer'),
        ],
      },
    },
  },
};
