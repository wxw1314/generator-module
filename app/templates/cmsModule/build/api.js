// 后台会传递过来四个参数
// 1，wid: 网站id
// 2，headerData：访问接口头部信息
// 3，buildUrl:打包域名
// 4，devUrl：预览域名
const axios = require('axios');
// 调用axios时访问，加入头部header
axios.interceptors.request.use(
  config => {
    config.headers['webpack'] = true;
    if (config.method == 'post') {
      config.data = {
        ...config.data
      };
    } else if (config.method == 'get') {
      config.params = {
        ...config.params
      };
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
module.exports = {
  isChange: false,
  entryHtml: 'index.html',
  getData(id, build_url, dev_url, public_url, catalogLink, root, moduleName) {
    this.wid = id;
    this.buildUrl = build_url;
    this.devUrl = dev_url;
    this.publicUrl = public_url;
    this.catalogLink = catalogLink;
    this.root = root;
    this.moduleName = moduleName;
  },
  //获取打包出口路径
  getBuildUrl() {
    return this.buildUrl;
  },
  //获取静态文件路径
  getPublicUrl() {
    return this.publicUrl;
  },
  //获取打包出口路径
  getcatalogLink() {
    return this.catalogLink;
  },
  // 获取打包路径
  getRoot() {
    return this.root;
  },
  // 获取cms环境（测试环境：dev_online，正式环境：prod_online）
  getCmsEnv() {
    return process.env.ENV_ONLINE;
  },
  ROOTURL() {
    const URL = {};
    console.log(`环境变量${process.env.NODE_ENV}`);
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'default'
    ) {
      URL.baseURL = this.buildUrl;
    } else {
      URL.baseURL = this.devUrl;
    }
    return URL;
  },
  // 网站的所有数据
  WebSite_AllData() {
    if (process.env.NODE_ENV === 'default') {
      return axios.get(`preview.json`, this.ROOTURL());
    } else {
      return axios.get('WebSite_AllData?wid=' + this.wid, this.ROOTURL());
    }
  }
};
