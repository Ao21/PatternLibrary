var gulp = require('gulp'),
    path = require('../paths'),
	runSequence = require('run-sequence'),
	$ = require('gulp-load-plugins')({ lazy: true });
	
	
gulp.task('dist:images', function () {
    return gulp
        .src(path.app.images)
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(path.dist + '/images'));
});

gulp.task('dist:copy:build', function () {
    gulp.src('src/public/**').pipe(gulp.dest(path.dist))
		return gulp.src('__build__/**').pipe(gulp.dest('dist/__build__'))
})



