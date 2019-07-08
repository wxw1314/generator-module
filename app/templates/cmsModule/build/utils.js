'use strict';
const config = require('../config/index');
const glob = require('glob');
const path = require('path');
exports.assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production' || 'default'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;
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
  return entries;
};
