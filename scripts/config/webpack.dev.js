const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
// const { SERVER_HOST, SERVER_PORT } = require('../constants');
// console.log(SERVER_HOST, SERVER_PORT);

module.exports = merge(common, {
  mode: 'development',
  stats: 'errors-only', // 终端仅打印 error
  devtool: 'eval-source-map',
  devServer: {
    host: 'localhost', // 指定 host，不设置的话默认是 localhost
    port: '9000', // 指定端口，默认是8080
    client: {
      // 控制日志输出格式
      logging: 'info', // 选择 'none', 'error', 'warn', 'info', 'log', 或 'verbose'
    },
    compress: true, // 是否启用 gzip 压缩
    // open: true, // 打开默认浏览器 windows 报错
    hot: true, // 热更新
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
});
