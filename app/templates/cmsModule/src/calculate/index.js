/**
 *
 * 对应页面数据处理文件
 * @param <String> pubilcUrl 静态文件的地址
 * @param <Object> content 后台接口返回的所有数据
 * @return <Object> 返回对应页面注入的数据
 *
 * */

// 引进公共方法文件
// const methods = require('../common/common.js');

module.exports = (pubilcUrl, content) => {
  if (content.data.ret !== 0) {
    throw new Error('服务器接口报错~');
  }
  const data = content.data.content[0];
  const json = {};

  // detail
  json.detail = {};
  // detail处理,页面站点基本信息检查
  if (data.detail.favicon) {
    data.detail.favicon = pubilcUrl + data.detail.favicon;
  }

  json.detail = data.detail;

  // img模块处理例子处理
  // if (data.img.length !== 0) {
  //   for (let i = 0; i < data.img.length; i++) {
  //     //过滤未发布
  //     if (!data.img[i].release) continue;
  //     data.img[i].img = pubilcUrl + data.img[i].img;
  //     data.img[i].icon = pubilcUrl + data.img[i].icon;
  //     data.img[i].updateTime = methods.arcticletimechange(data.img[i].updateTime);
  //     switch (data.img[i].type) {
  //       case ('PC-滑动提示'):
  //         json.img.next.push(data.img[i]);
  //         break;
  //       case ('游戏特色切换'):
  //         json.img.features_switch.push(data.img[i])
  //         break;
  //     }
  //   }
  //   //   //提示没有编辑的栏目
  //   if (json.img.features_switch.length === 0) {
  //     throw new Error(`请先编辑图片管理>>游戏特色切换~`)
  //   }
  //   if (json.img.next.length === 0) {
  //     throw new Error(`请先编辑图片管理>>PC-滑动提示~`)
  //   }
  // }else{
  //   throw new Error(`请先编辑图片再进行打包~`)
  // }

  // article处理
  // if (data.article.total !== 0 && data.article.list.length !== 0) {
  //   let list = data.article.list;
  //   //先过滤未发布的文章
  //   for (let i = 0; i < list.length; i++) {
  //     if (!list[i].release) {
  //       list.splice(i, 1);
  //       i--;
  //       continue
  //     }
  //   }
  //   json.article  = list;
  // } else {
  //   throw new Error(`请编辑文章管理>>活动规则~`);
  // }
  // video处理
  // let videolist = data.video;
  // //先过滤未发布的视屏
  // if (videolist.length === 0) {
  //   json.video = [];
  // }
  // for (let i = 0; i < videolist.length; i++) {
  //   if (!videolist[i].release)
  //     continue;
  //   videolist[i].img = pubilcUrl + videolist[i].img;
  //   //如果有本地的链接则拿本地的链接
  //   if (videolist[i].file === '') {
  //     videolist[i].video_link = videolist[i].url;
  //   } else {
  //     videolist[i].video_link = pubilcUrl + videolist[i].file;
  //   }
  //   json.video.push(videolist[i])
  // }

  // banner处理
  // if (data.banner.length !== 0) {
  //   for (let i = 0; i < data.banner.length; i++) {
  //     //过滤未发布
  //     if (!data.banner[i].release) continue;
  //     if (data.banner[i].img === '' && data.banner[i].video === '') {
  //       throw new Error(`请编辑BANNER>>${data.banner[i].type}~`)
  //     }
  //     if (data.banner[i].img !== '') {
  //       data.banner[i].img = pubilcUrl + data.banner[i].img;
  //     }
  //     if (data.banner[i].video !=='') {
  //       data.banner[i].video = pubilcUrl + data.banner[i].video;
  //     }
  //     switch (data.banner[i].type) {
  //       case ('移动-背景'):
  //         json.iphone_banner.push(data.banner[i]);
  //         break;
  //       case ('PC-背景'):
  //         json.pc_banner.push(data.banner[i]);
  //         break;
  //     }
  //   }
  //   //提示没有编辑的栏目
  //   if (json.iphone_banner.length < 6) {
  //     throw new Error(`请编辑>>BANNER>>移动-背景至少5个背景banner~`)
  //   }
  //   if (json.pc_banner.length <5) {
  //     throw new Error(`请编辑>>BANNER>>PC-背景至少5个背景banner~`)
  //   }
  // } else {
  //   throw new Error(`请编辑>>BANNER~`);
  // }
  // settings处理
  // if (data.setList.length !== 0) {
  //   for (let i = 0; i < data.setList.length; i++) {
  //     //过滤未发布
  //     if (data.setList[i].release === 'false') continue;
  //     //处理数据
  //     data.setList[i].content = methods.dataChange(data.setList[i].setConfig);
  //     switch (data.setList[i].name) {
  //       case 'youtube链接':
  //         json.youtube = data.setList[i].content.youtube;
  //         break;
  //       case 'ads转化ID':
  //         json.adsID = data.setList[i].content.adsID;
  //         break;
  //       case 'Facebook 像素ID':
  //         json.pixedID = data.setList[i].content.pixedID;
  //         break;
  //       case 'Google analytic ID':
  //         json.GoogleID = data.setList[i].content.GoogleID;
  //         break;
  //       case 'Facebook appID':
  //         json.FBAppID = data.setList[i].content.FBAppID;
  //         break;
  //       case 'ads转化标签':
  //         json.adsLabel = data.setList[i].content.adsLabel;
  //         break;
  //     }
  //   }
  //   if (json.youtube === '') {
  //     throw new Error(`请编辑>>其他设置>>youtube链接~`);
  //   }
  //   if (json.adsID === '') {
  //     throw new Error(`请编辑>>其他设置>>ads转化ID~`);
  //   }
  //   if (json.pixedID === '') {
  //     throw new Error(`请编辑>>其他设置>>Facebook 像素ID~`);
  //   }
  //   if (json.GoogleID === '') {
  //     throw new Error(`请编辑>>其他设置>>Google analytic ID~`);
  //   }
  //   if (json.FBAppID === '') {
  //     throw new Error(`请编辑>>其他设置>>Facebook appID~`);
  //   }
  //   if (json.adsLabel === '') {
  //     throw new Error(`请编辑>>其他设置>>ads转化标签~`);
  //   }
  // }
  return json;
};
