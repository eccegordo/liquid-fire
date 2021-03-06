/* jshint node: true */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var es3SafeRecast = require('broccoli-es3-safe-recast');

var velocity = pickFiles('node_modules/velocity-animate', {
  srcDir: '/',
  destDir: 'velocity'
});

var sinon = pickFiles('node_modules/sinon/pkg', {
  srcDir: '/',
  destDir: 'sinon',
  files: ['sinon.js']
});


var appTree = mergeTrees(['app-addon', 'app'], { overwrite: true });
var templateTree = mergeTrees(['app-addon/templates', 'app/templates'], { overwrite: true });
var vendorTree = mergeTrees([velocity, sinon, es3SafeRecast('vendor-addon'), 'vendor']);

var app = new EmberApp({
  trees: {
    app: appTree,
    vendor: vendorTree,
    templates: templateTree
  },
  snippetSearchPaths: ['app', 'app-addon', 'vendor-addon']
});

app.import("vendor/velocity/jquery.velocity.js");
app.import("vendor/moment/moment.js");
app.import("vendor/liquid-fire/liquid-fire.css");
app.import('vendor/sinon/sinon.js', { type: 'test' });

var fonts = pickFiles('vendor/bootstrap-sass-official/assets/fonts', {
  srcDir:'/',
  destDir: '/fonts'
});

module.exports = mergeTrees([app.toTree(), fonts]);
