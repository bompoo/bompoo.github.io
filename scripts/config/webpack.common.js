const { resolve } = require('path');
const { PROJECT_PATH, isDev } = require('../constants');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getCssLoaders = (importLoaders = 1) => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      // modules: true, 默认只为匹配到 .module.scss 的文件启用css
      sourceMap: isDev,
      importLoaders,
    },
  },
  // 'postcss',
];

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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getCssLoaders(),
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp|awebp|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(txt)$/i,
        type: 'asset/resource',
      },
      {
        // 通用文件则使用 asset，此时会按照默认条件自动决定是否转换为 Data URI
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset',
        parser: {
          // 如果文件大小小于 8kb，那么会转换为 data URI，否则为单独文件。
          // 8kb 是默认值，你可以根据需要进行调整
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
      },
    ],
  },
  plugins: PLUGINS,
};
