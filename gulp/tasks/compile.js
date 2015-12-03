var gulp = require('gulp'),
    path = require('../paths'),
	config = require('../config'),
	runSequence = require('run-sequence'),
	$ = require('gulp-load-plugins')({ lazy: true });
	

gulp.task('inject:scss',function() {
  var scssStream = gulp.src([path.app.defaultStyles,'!src/app.scss','!src/styles/_variables.scss'], {
      read: false
  });
  var cssTarget = gulp.src(path.app.styles);
  return cssTarget.pipe($.inject(scssStream, {relative: true})).pipe(gulp.dest(path.styles))
});
