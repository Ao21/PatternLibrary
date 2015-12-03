var webpack = require("webpack");
var gulp = require("gulp");
var spawn = require('child_process').spawn;
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("../../webpack.config.js");
var $ = require('gulp-load-plugins')({ lazy: true });
var runSequence = require('run-sequence');


gulp.task("webpacks", function (callback) {
	return spawn('webpack-dev-server',['--inline','--hot','--colors','--display-error-details','--display-cached','--port','3000'], {stdio: 'inherit'});
});