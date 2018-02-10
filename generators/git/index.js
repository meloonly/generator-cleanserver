'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
  }
  end() {
    this.spawnCommandSync('git', ['init'], {
      cwd: this.destinationPath()
    })
  }
};