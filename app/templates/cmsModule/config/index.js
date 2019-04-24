/* eslint-disable linebreak-style */
'use strict';
const path = require('path');
const config = require('./index');
const glob = require('glob');

const buildUrl = 'http://localhost:7001/';
const devUrl = 'http://localhost:7001/';
const pubilcUrl = 'http://localhost:7001/';
const wid = '5c763a1f18c13f2ccc7853ef';
const catalogLink = '';
const root = '';
const ConfigSetting = {
  dev: {
    // 线上的根目录
    assetsPublicPath: '/',

    assetsSubDirectory: 'static/',

    autoOpenBrowser: false,

    notifyOnErrors: true,

    // 主机、端口号
    host: 'localhost',
    port: 3000,
  },

  build: {
    // 打包后的路径
    assetsRoot: path.resolve(__dirname, '../../../dist'),

    // 打包output的publicPath
    assetsPublicPath: './',

    // 静态资源目录
    assetsSubDirectory: '',

    productionSourceMap: true,

  },
};


exports.buildUrl = buildUrl;
exports.devUrl = devUrl;
exports.pubilcUrl = pubilcUrl;
exports.wid = wid;
exports.catalogLink = catalogLink;
exports.root = root;

exports.ConfigSetting = ConfigSetting;
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' || 'default' ?
    config.ConfigSetting.build.assetsSubDirectory :
    config.ConfigSetting.dev.assetsSubDirectory;
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
    throw e
  }
  // console.log(entries)
  return entries;
};
