var gulp      	= require('gulp'),
	spawn = require('child_process').spawn,
    paths 		= require('../paths'),
	runSequence = require('run-sequence');
	
	
gulp.task('robot',function(){
	runSequence('robot:build','robot:run')
})
	
gulp.task('robot:run', function(done){
	return spawn('pybot', ['testsuites/options'], {stdio: 'inherit',cwd:'./test/robot'});
})

gulp.task('robot:build', function(done) {
	return gulp.src(paths.test.robotFiles).pipe(gulp.dest(paths.test.robotDest));
	
})