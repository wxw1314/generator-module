let Generator = require("yeoman-generator");
const axios = require("axios");

module.exports = class extends Generator {
  constructor(args, opts) {
    // 调用超级构造函数很重要，我们的生成器将被正确设置
    super(args, opts);
  }
  prompting() {
    var questions = [
      {
        type: "input",
        name: "projectName",
        message: "输入项目名称",
        store: true,
        default: this.appname
      },
      {
        type: "input",
        name: "projectDescript",
        message: "输入项目描述",
        store: true,
        default: "模板描述"
      },
      {
        type: "input",
        name: "projectAuthor",
        message: "项目开发者",
        store: true,
        default: this.user.git.name()
      },
      {
        type: "input",
        name: "projectVersion",
        message: "项目版本号",
        default: "0.0.1"
      },
      {
        type: "list",
        name: "is_overSea",
        message: "请选择国内或者海外",
        choices: [
          {
            name: "国内模板",
            value: false
          },
          {
            name: "海外模板",
            value: true,
            checked: true // 默认选中
          }
        ]
      }
    ];
    return this.prompt(questions).then(
      function(answers) {
        for (var item in answers) {
          answers.hasOwnProperty(item) && (this[item] = answers[item]);
        }
      }.bind(this)
    );
  }
  initializing() {
    this.log("开始构建项目...");
  }
  async selfFunction() {
    axios.defaults.headers.webpack = true;
    let arr = [];
    // 获取国内海外模板是临时处理方案，现在cms还在运行阶段，等迭代再对接口进行优化，只需要请求一次便可以获取所有模板
    // 获取国内模板
    await axios
      .get("http://120.92.182.210/modulelist")
      .then(response => {
        let data = response.data;
        if (data.ret === 0) {
          arr = arr.concat(data.content);
        }
      })
      .catch(error => {
        console.log(error);
      });
    // 获取海外模板
    await axios
      .get("http://120.92.182.210/modulelist?is_overSea=true")
      .then(response => {
        let data = response.data;
        if (data.ret === 0) {
          arr = arr.concat(data.content);
        }
      })
      .catch(error => {
        console.log(error);
      });
    // 对id进行排序
    function compare(p) {
      //比较函数
      return function(m, n) {
        var a = m[p];
        var b = n[p];
        return a - b; //升序
      };
    }
    // 取排序后的最大的id加1赋值
    this.templatId = (await arr.sort(compare("id"))[arr.length - 1].id) + 1;
  }
  writing() {
    //模板
    this.fs.copy(this.templatePath("cmsModule/"), this.destinationPath(""));
    this.fs.copy(
      this.templatePath("babelrc_tmpl"),
      this.destinationPath(".babelrc")
    );
    this.fs.copy(
      this.templatePath("gitignore_tmpl"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(
      this.templatePath("npmrc_tmpl"),
      this.destinationPath(".npmrc")
    );
    this.fs.copy(
      this.templatePath("editorconfig_tmpl"),
      this.destinationPath(".editorconfig")
    );
    this.fs.copyTpl(
      this.templatePath("_config.json"),
      this.destinationPath("config.json"),
      {
        templatId: this.templatId,
        projectName: this.projectName,
        is_overSea: this.is_overSea,
        projectVersion: this.projectVersion
      }
    );
    this.fs.copyTpl(
      this.templatePath("_package.json"),
      this.destinationPath("package.json"),
      {
        projectName: this.projectName,
        projectAuthor: this.projectAuthor,
        projectVersion: this.projectVersion,
        projectDescript: this.projectDescript
      }
    );
  }
};
