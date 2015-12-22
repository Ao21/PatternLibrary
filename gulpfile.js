process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
process.env.PORT = process.env.PORT ? process.env.PORT : '8080';

var env = {};
env.prod = process.env.NODE_ENV === 'production',
env.dev = !env.prod;
env.port = process.env.PORT;

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();
    
var del = require('del'),
	path = require('path'),
    karma = require('karma'),
    runSequence = require('run-sequence'),
	history = require('connect-history-api-fallback'),
	webdriver = require('gulp-protractor').webdriver_update,
    remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
    
var paths = require('./gulp/config.js');
paths = env.prod ? paths.prod : paths.dev;

require('require-dir')('./gulp/tasks', { recurse: true });

gulp.task('serve', ['watch','livereload']);

gulp.task('build', function () {
    runSequence(
        'clean',
        ['tsLint'],
        ['scss', 'ts','scss-internal'],
        'assets',
        'libs',
        'index'
    )
})

