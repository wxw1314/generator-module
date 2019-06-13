/* eslint-disable linebreak-style */
'use strict';
const path = require('path');
const config = require('./index');
const glob = require('glob');
const buildUrl = 'http://120.92.182.196/';
const devUrl = 'http://120.92.182.196/';
const pubilcUrl = 'http://120.92.182.196/public/upload/overseas/';
const wid = '5c9230bf26c016002a92fa5e';
const catalogLink = '';
const root = './';
const ConfigSetting = {
  dev: {
    // 线上的根目录
    assetsPublicPath: '/',

    assetsSubDirectory: 'static/',

    autoOpenBrowser: false,

    notifyOnErrors: true,

    // 主机、端口号
    host: 'localhost',
    port: 3000
  },

  build: {
    // 打包后的路径
    assetsRoot: path.resolve(__dirname, '../../../dist'),

    // 打包output的publicPath
    assetsPublicPath: './',

    // 静态资源目录
    assetsSubDirectory: '',

    productionSourceMap: true
  }
};
exports.buildUrl = buildUrl;
exports.devUrl = devUrl;
exports.pubilcUrl = pubilcUrl;
exports.wid = wid;
exports.catalogLink = catalogLink;
exports.root = root;
exports.ConfigSetting = ConfigSetting;
exports.assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production' || 'default'
      ? config.ConfigSetting.build.assetsSubDirectory
      : config.ConfigSetting.dev.assetsSubDirectory;
  const p = `${assetsSubDirectory}${_path}`;
  return p;
};

exports.getentry = filepath => {
  const entries = {};
  try {
    glob.sync(filepath).forEach(file => {
      const basename = path.basename(file, path.extname(file));
      entries[basename] = file;
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
  // console.log(entries)
  return entries;
};
