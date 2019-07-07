let Generator  = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    // 调用超级构造函数很重要，我们的生成器将被正确设置
    super(args, opts);
  }
  prompting(){
    var questions = [
      {
        type: 'input',
        name: 'projectName',
        message: '输入项目名称',
        default: this.appname
      },
      {
        type: 'input',
        name: 'projectAuthor',
        message: '项目开发者',
        store: true,
        default: ''
      },{
        type: 'input',
        name: 'projectVersion',
        message: '项目版本号',
        default: '0.0.1'
      }
    ]
    return this.prompt(questions).then(
      function(answers){
        for(var item in answers){
          answers.hasOwnProperty(item) && (this[item] = answers[item]);
        }
      }.bind(this));
  }
  initializing() {
    this.log("开始构建项目...");
  }
  writing(){
    //模板
    this.fs.copy(
      this.templatePath('cmsModule/'),
      this.destinationPath('')
    );
    this.fs.copy(
      this.templatePath("babelrc_tmpl"),
      this.destinationPath(".babelrc")
    );
    this.fs.copy(
      this.templatePath("eslintrc_tmpl.js"),
      this.destinationPath(".eslintrc.js")
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
    this.fs.copy(
      this.templatePath("eslintignore_tmpl"),
      this.destinationPath(".eslintignore")
    );
  }
}