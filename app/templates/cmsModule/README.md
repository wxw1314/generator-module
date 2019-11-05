# 活动模板脚手架

## config.json文件说明

1，该脚手架有图片管理（imgs），文章管理（article），视频管理（videos），banner管理（banner），基本设置（settings），特殊设置（otherSettings）六个模块的配置，可以根据项目进行删减。

2，基本设置模块（settings），特殊设置（otherSettings）中的setConfig可以配置的各项中，

* **name**为后台配置信息时看到信息title，
* **config**中的**name**为后台返回的信息的标志，**content**为后台配置的内容，**display**为ture时表示该项显示在列表页中。

**需要注意的是**，如果是图片配置的话，config中的name必须为img，如果是文件配置的话，config中的name必须为file，如果是富文本配置的话，config中的name必须为text。

3，基本设置模块（settings），特殊设置（otherSettings）的主要区别是：

* 特殊设置（otherSettings）：列表形式，可以配置列表数据
* 基本设置模块（settings）：单个数据形式，只可以配置一条数据

## preview.json文件说明

该文件为预览时的默认数据，根据config.json文件开发默认数据

## preview文件夹说明

1），cover.png/jpg为cms上模板的封面图

2），可以存放preview.json上的一些默认图片（preview/默认图片）

## 配合cms使用

1，在[cms网站](http://cms-backend.ijunhai.com/#/)上新增模板，上传config文件

2，在模板管理会看到新增的模板

3，新建网站，获取该网站的_id

## 配置开发环境默认参数

在{workplace}/config/index.js中配置默认参数

```javascript
// 其中的devUrl，devUrl为访问cms接口的地址，为cms接口地址，publicUrl为静态文件路径，wid为cms配置的网站id，主要修改这三个参数即可

// 开发环境的配置路径 config.dev
{
  devUrl: 'http://120.92.182.196/',
  publicUrl: 'http://120.92.182.196/public/upload/overseas/',
  wid,
}
// 正式环境的配置路径 config.build
{
  devUrl: 'http://120.92.182.196/',
  publicUrl: 'http://120.92.182.196/public/upload/overseas/',
  wid,
}
```

## webpack配置需要注意的点

### 1，{workplace}/src/calculate

该文件夹下新增对应的html名字相同的文件，主要对接口返回数据的处理：

1），对数据进行分类

2），静态资源加上域名可以进行访问

3），对数据进行筛选

### 2，{workplace}/src/common

公共方法存放位置

### 3，{workplace}/src/components

公共组件存放位置

### 4，{workplace}/src/page

项目中页面的的存放位置

## 项目启动

1，开发环境

npm run dev

2，生产环境
npm run build

## 完成

完成后把整个项目放在cms上的template上，可以用cms进行打包预览
