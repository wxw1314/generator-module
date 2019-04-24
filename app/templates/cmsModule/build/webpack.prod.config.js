/* eslint-disable no-unused-vars */
'use strict';
const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('../config/index');
const api = require('./api');
const catalogLink = api.getcatalogLink();
const filePath = api.getRoot();
const publicPath = config.ConfigSetting.build.assetsPublicPath;
// 生产环境的基本配置
const prodconfig = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, `${filePath}../dist/${catalogLink}`),
    filename: config.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: config.assetsPath('js/[id].[chunkhash].js'),
  },
  plugins: [
    new ExtractTextPlugin({
      filename: config.assetsPath('css/[name].[hash:8].css'),
    })
  ],
  module: {
    rules: [{
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: loader => [
                  require('autoprefixer')({
                    browsers: [
                      'ie>=8',
                      '>1% in CN',
                      '> 1%',
                      'iOS 7',
                      'last 3 iOS versions',
                      'last 2 versions',
                    ],
                  }),
                ],
              },
            },
          ],
          publicPath,
        }),
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: loader => [
                  require('autoprefixer')({
                    browsers: [
                      'ie>=8',
                      '>1% in CN',
                      '> 1%',
                      'iOS 7',
                      'last 3 iOS versions',
                      'last 2 versions',
                    ],
                  }),
                ],
              },
            },
            {
              loader: 'less-loader',
            },
          ],
          publicPath,
        }),
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: loader => [
                  require('autoprefixer')({
                    browsers: [
                      'ie>=8',
                      '>1% in CN',
                      '> 1%',
                      'iOS 7',
                      'last 3 iOS versions',
                      'last 2 versions',
                    ],
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
          publicPath,
        }),
      }
    ],
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 300000,
    maxEntrypointSize: 500000,
    assetFilter(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    },
  },
  optimization: {
    splitChunks: {
      minSize: 0,
      minChunks: 2,
      chunks: 'initial',
      name: 'common',
    },
  },
};

module.exports = async () => {
  // 清除缓存
  delete require.cache[require.resolve('./webpack.base.config')];
  delete require.cache[require.resolve('./webpack.extend.config')];
  //导入配置
  const basewebpackconfig = await require('./webpack.base.config');
  const plugins = await require('./webpack.extend.config');
  // console.log(plugins)
  const r = function () {
    for (const plugin of plugins) {
      prodconfig.plugins.push(plugin);
    }
    return prodconfig;
  };
  //合并配置
  const o = await merge(basewebpackconfig, r());
  return o;
};
