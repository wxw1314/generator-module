const path = require('path');
const utils = require('./utils');
const config = require('../config/index');
const baseentry = path.resolve(__dirname, '../src/entry/**/*.js');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  entry: utils.getentry(baseentry),
  output: {
    publicPath:
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'default'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            // cacheDirectory: true
          }
        }
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: utils.assetsPath('img/[name].[hash:8].[ext]'),
              publicPath: '../'
            }
          }
        ]
      },
      {
        test: /\.(mp4|flv|swf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: utils.assetsPath('img/[name].[hash:8].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(html|ejs)$/,
        loader: 'underscore-template-loader',
        query: {
          engine: 'underscore'
        }
      }
    ]
  },
  plugins: []
};
