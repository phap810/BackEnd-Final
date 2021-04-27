const path = require('path');
const projectRoot = path.resolve(__dirname);

module.exports = {
  devServer: {
    compress: true,
    port: 9000
  },
  assetsDir: 'static',
  outputDir: '../public',
  indexPath: process.env.NODE_ENV === 'production'
    ? '../resources/views/index.blade.php'
    : 'index.html',
  chainWebpack: config => {
    config.resolve.symlinks(true);
    config.resolve.alias.set('@', `${projectRoot}/src`);
  }
};
