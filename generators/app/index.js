'use strict';
const _ = require('lodash');
const extend = _.merge;
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    this.props = {}
  }
  prompting() {
    const prompts = [
      {
        name: 'name',
        message: 'Project Name',
        when: !this.props.name
      },
      {
        name: 'description',
        message: 'Description',
        when: !this.props.description
      }
    ]
    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }
  default() {
    this.composeWith(require.resolve('../git'));
    this.composeWith(require.resolve('../webpack'));
  }
  writing() {
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const pkg = extend(
      {
        name: _.kebabCase(this.props.name),
        version: '0.0.0',
        description: this.props.description,
        keywords: [],
        scripts: {
          "start": "webpack-dev-server --open"
        },
        dependencies: {
          "classnames": "^2.2.5",
          "react": "^16.2.0",
          "react-dom": "^16.2.0"
        },
        devDependencies: {
          "babel-core": "^6.26.0",
          "babel-loader": "^7.1.2",
          "babel-preset-env": "^1.6.1",
          "babel-preset-react": "^6.24.1",
          "html-webpack-plugin": "^2.30.1",
          "webpack": "^3.10.0",
          "webpack-dev-server": "^2.11.1"
        },
        babel: {
          "presets": [
            "env",
            "react"
          ]
        },
        engines: {
          npm: '>= 4.0.0'
        }
      },
      currentPkg
    )
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath('src')
    );
  }
  install() {
    this.npmInstall();
  }
  end() {
    this.log('Initialize Finished.');
  }
};
