const { resolve } = require('path');
const { PROJECT_PATH, isDev } = require('../constants');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PLUGINS = [
  new HtmlWebpackPlugin({
    template: resolve(PROJECT_PATH, './public/index.html'),
    filename: 'index.html',
    cache: false,
    minify: isDev
      ? false
      : {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
          collapseBooleanAttributes: true,
          collapseInlineTagWhitespace: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          useShortDoctype: true,
        },
  }),
];

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    app: resolve(PROJECT_PATH, './src/app.js'),
  },
  output: {
    filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
    path: resolve(PROJECT_PATH, './dist'),
  },
  plugins: PLUGINS,
};
