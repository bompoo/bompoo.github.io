const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { isDev } = require('scripts/constants.js');

const PLUGINS = [new CleanWebpackPlugin()];

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  plugins: PLUGINS,
});
