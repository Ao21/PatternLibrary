var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();
    
var del = require('del'),
	path = require('path'),
	karma = require('karma'),
	history = require('connect-history-api-fallback'),
	webdriver = require('gulp-protractor').webdriver_update,
    remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
    
    

gulp.task('clean', function(){
    return del(['docs', 'coverage', 'build','dist', '.karma', '.protractor']);
});

