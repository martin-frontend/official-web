module.exports = {
  filenameHashing: true,
  publicPath: process.env.VUE_APP_BASE_PATH,
  lintOnSave: false,
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://dev.primestar.plus/dev/coc-official-web/',
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    output: {
      chunkFilename: '[name].[hash].js',
      filename: '[name].[hash].js',
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
  },
};
