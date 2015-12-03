var gulp = require('gulp'),
	paths = require('../paths'),
	tsConfig = require('gulp-tsconfig-files'),
	$ = require('gulp-load-plugins')({ lazy: true });

gulp.task('typescript:definitions', function () {
	return gulp.src([paths.app.ts,paths.test.ts, paths.defaultTypings]).pipe(tsConfig());
});
