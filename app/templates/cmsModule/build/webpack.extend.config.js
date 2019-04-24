'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _ = require("lodash");


const api = require('./api');
const config = require('../config/index');

const date = require('./calculate/common');






const plugins = [];
class methods {
  //考虑到文件夹太多，有关联的页面可以整理到统一文件夹下
  /*普通页面
   * @param {String} dir: 模板目录
   * @param {String} dirname: 模板文件夹
   * @param {String} pagename: 生成的文件名
   * @param {Object} pagedata: 模板数据
   */
  static Pushpage(dir, pagename, pagedata) {
    plugins.push(
      new HtmlWebpackPlugin({
        title: `${pagename}`,
        template: `${dir}`,
        filename: `${pagename}.html`,
        inject: 'body',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
        },
        chunks: [`${pagename}`, 'common'],
        data: pagedata,
      })
    );
  }
}


module.exports = (async () => {
  //打包路径
  let pubilcUrl = '';
  try {
    //本地开发环境
    if (process.env.NODE_ENV === 'development') {
      //初始化配置数据
      await api.getData(config.wid, config.buildUrl, config.devUrl, config.pubilcUrl,config.catalogLink, config.root);
    }
    // 静态文件，例如图片的地址
    pubilcUrl = api.getPubilcUrl();
    // 调用接口获取该网站下的所有数据
    const data = await api.WebSite_AllData();
    // 删除缓存
    delete require.cache[require.resolve('./calculate/index.js')];
    // 引进处理过的数据，数据处理可以看./calculate/index文件
    const calculate_activity = require('./calculate/index');
    const data_activity = calculate_activity(pubilcUrl, data);
    // 获取../src/page下的所有html页面
    const activity_ = config.getentry(path.resolve(__dirname, '../src/page/**/*.html'));
    // 把数据注入一个一个的页面中
    for (const page in activity_) {
      methods.Pushpage(`${activity_[page]}`, `${page}`, data_activity);
    }
    // 返回plugins，在页面中可以使用该模板对页面进行数据的渲染
    return plugins
  } catch (e) {
    throw e
  }
})();
