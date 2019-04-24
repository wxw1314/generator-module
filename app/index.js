let Generator  = require('yeoman-generator');

module.exports = class extends Generator {
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
  writing(){
    //模板
    this.fs.copy(
      this.templatePath('cmsModule/'),
      this.destinationPath('')
    );
  }
}