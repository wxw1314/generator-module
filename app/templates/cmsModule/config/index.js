'use strict';
const path = require('path');
const wid = '5c9230bf26c016002a92fa5e';
const catalogLink = '';
const root = './';
module.exports = {
  dev: {
    // 线上的根目录
    assetsPublicPath: '/',

    assetsSubDirectory: 'static/',

    autoOpenBrowser: false,

    notifyOnErrors: true,

    // 主机、端口号
    host: 'localhost',
    port: 3000,
    // 开启eslint(必须开启)
    showEslintErrorsInOverlay: false,
    useEslint: false,
    // 开发环境的配置路径
    devUrl: 'http://120.92.182.196/',
    publicUrl: 'http://120.92.182.196/public/upload/overseas/',
    wid,
    root,
    catalogLink
  },

  build: {
    // 打包后的路径
    assetsRoot: path.resolve(__dirname, '../../../dist'),

    // 打包output的publicPath
    assetsPublicPath: './',

    // 静态资源目录
    assetsSubDirectory: '',

    productionSourceMap: true,

    buildUrl: 'http://120.92.182.196/',
    // 生产环境的配置路径
    publicUrl: 'http://120.92.182.196/public/upload/overseas/',
    wid,
    root,
    catalogLink
  }
};
