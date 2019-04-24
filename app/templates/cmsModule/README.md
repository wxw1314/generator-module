# 活动模板脚手架

### config.json文件说明
1，该脚手架有图片管理（imgs），文章管理（article），视频管理（videos），banner管理（banner），基本设置（settings），特殊设置（otherSettings）六个模块的配置，可以根据项目进行删减。

2，基本设置模块（settings），特殊设置（otherSettings）中的setConfig可以配置的各项中，

* **name**为后台配置信息时看到信息title，
* **config**中的**name**为后台返回的信息的标志，**content**为后台配置的内容，**display**为ture时表示该项显示在列表页中。

**需要注意的是**，如果是图片配置的话，config中的name必须为img，如果是文件配置的话，config中的name必须为file，如果是富文本配置的话，config中的name必须为text。

3，基本设置模块（settings），特殊设置（otherSettings）的主要区别是：

* 特殊设置（otherSettings）：列表形式，可以配置列表数据
* 基本设置模块（settings）：单个数据形式，只可以配置一条数据

### preview.json文件说明
该文件为预览时的默认数据，根据config.json文件开发默认数据
### preview文件夹说明
1），cover.png/jpg为cms上模板的封面图

2），可以存放preview.json上的一些默认图片（preview/默认图片）
### 配合cms使用
1，在[cms网站](http://cms-backend.ijunhai.com/#/)上新增模板，上传config文件

2，在模板管理会看到新增的模板

3，新建网站，获取该网站的_id
## 配置开发环境默认参数
在{workplace}/config/index.js中配置默认参数

```
const buildUrl = 'http://localhost:7001/';
const devUrl = 'http://localhost:7001/';
const pubilcUrl = 'http://localhost:7001/';
// wid为上述在cms上获取的_id
const wid = '5c763a1f18c13f2ccc7853ef';
```
### webpack配置需要注意的点
#### 1，{workplace}/config/index.js

**assetsPublicPath**参数为项目中引用css，js，img等资源时候的一个基础路径，可以进行修改配置。

#### 2，{workplace}/build/webpack.extend.config.js

该文件主要为打包时为页面注入数据，主要代码讲解

```
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
```
#### 3，{workplace}/build/calculate/index.js

该文件主要对接口返回数据的处理：

1），对数据进行分类

2），静态资源加上域名可以进行访问

3），对数据进行筛选

。。。

#### 4，{workplace}/build/api.js

entryHtml参数：默认预览的文件地址


### 项目启动
1，开发环境

npm run dev

2，生产环境
npm run build

### 完成

完成后把整个项目放在cms上的template上，可以用cms进行打包预览





