# tplcompile

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install tplcompile --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('tplcompile');
```

## The "tplcompile" task

### Overview
In your project's Gruntfile, add a section named `tplcompile` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  tplcompile: {
    default_options: {
      files: {
          src: ['test/fixtures/tpl/*.html']
      },
      options: {
          root : 'test/',
          wrap : 'seajs',
          output : 'default'
      }
    }
  },
});
```

### Options

#### options.wrap
Type: `String`
Default value: `'seajs'`

wrap the js file to a seajs module or nodejs module

#### options.output
Type: `String`
Default value: `'tmpl'`

compiled file path

#### options.root
Type: `String`
Default value: `''`

seajs module define name

#### options.global
Type: `Array`
Default value: `[]`

global object list. 

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  default_options: {
    files: {
        src: ['test/fixtures/tpl/*.html']
    },
    options: {
        root : 'test/',
        wrap : 'seajs',
        output : 'default'
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
