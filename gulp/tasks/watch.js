var gulp = require('gulp'),
    path = require('../paths'),
	runSequence = require('run-sequence'),
	$ = require('gulp-load-plugins')({ lazy: true });
	 
	
gulp.task('watch:ts', function() {
	$.watch(path.app.ts, function(){
		runSequence('typescript:definitions')
	})
})

gulp.task('watch:scss', function() {
	$.watch(path.app.styles, function(){
		runSequence('inject:scss')
	})
})
