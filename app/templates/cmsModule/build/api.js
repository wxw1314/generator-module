// 后台会传递过来四个参数
// 1，wid: 网站id
// 2，headerData：访问接口头部信息
// 3，buildUrl:打包域名
// 4，devUrl：预览域名
const axios = require('axios');
var log4js = require('log4js');
log4js.configure({
  appenders: { api: { type: 'file', filename: 'log/api.log' } },
  categories: { default: { appenders: ['api'], level: 'info' } }
});
var logger = log4js.getLogger();
let buildUrl = '';
let devUrl = '';
let pubilcUrl = '';

function ROOTURL() {
  const URL = {};
  console.log(`环境变量${process.env.NODE_ENV}`);
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'default') {
    URL.baseURL = buildUrl;
  } else {
    URL.baseURL = devUrl;
  }
  // console.log(URL)
  logger.info(`地址${buildUrl}`);
  return URL;
}
// 调用axios时访问，加入头部header
axios.interceptors.request.use(
  config => {
    config.headers['webpack'] = true;
    if (config.method == 'post') {
      config.data = {
        ...config.data
      }
    } else if (config.method == 'get') {
      config.params = {
        ...config.params
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
);
module.exports = {
  isChange:false,
  entryHtml:'index.html',
  getData: (id, build_url, dev_url,pubilc_url, catalogLink, root, moduleName) => {
    this.wid = id;
    buildUrl = build_url;
    devUrl = dev_url;
    pubilcUrl = pubilc_url;
    this.catalogLink = catalogLink;
    this.root = root;
    this.moduleName = moduleName;
    logger.info(`接受到的打包路径${buildUrl}`);
  },
  //获取打包出口路径
  getBuildUrl: () => {
    logger.info(`打包路径${buildUrl}`);
    return buildUrl;
  },
  //获取静态文件路径
  getPubilcUrl:()=>{
    return pubilcUrl;
  },
  //获取打包出口路径
  getcatalogLink: () => {
    return this.catalogLink;
  },
  // 获取打包路径
  getRoot: () => {
    return this.root;
  },

  //网站的所有数据
  WebSite_AllData: () => {
    if (process.env.NODE_ENV === 'default') {
      return axios.get(`preview.json`, ROOTURL());
    } else {
      return axios.get('WebSite_AllData?wid=' + this.wid, ROOTURL());
    }
  },
};
