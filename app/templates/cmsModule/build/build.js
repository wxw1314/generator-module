'use strict';
process.env.NODE_ENV = 'production';
const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const spinner = ora('building for production...\n');
const webpack = require('webpack');

const config = require('../config/index');
const api = require(`./api`);

async function buildWeb() {
  // 在模板的api中传入网站id:wid和token
  await api.getData(
    config.wid,
    config.buildUrl,
    config.devUrl,
    config.pubilcUrl,
    config.catalogLink,
    config.root
  );
  spinner.start();
  // 打包前删除文件夹
  await rm(path.resolve(__dirname, '../dist'), () => {});
  try {
    const webpackConfig = await require(path.resolve(
      __dirname,
      `./webpack.prod.config`
    ))();
    // console.log(webpackConfig);
    await webpack(webpackConfig, (err, stats) => {
      if (err) throw err;
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n'
      );
      console.log(chalk.cyan('  Build complete.\n'));
    });
  } catch (e) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>');
    console.log(chalk.red(`${e}`));
    console.log(e);
  } finally {
    spinner.stop();
  }
}
buildWeb();
