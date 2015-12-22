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
    mainBowerFiles = require('main-bower-files'),
    history = require('connect-history-api-fallback'),
    webdriver = require('gulp-protractor').webdriver_update,
    runSequence = require('run-sequence'),
    _ = require('lodash'),
    remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');

var paths = require('./../config.js');
paths = env.prod ? paths.prod : paths.dev;

gulp.task('scssLint', function () {
    return gulp.src('src/**/*.scss')
        .pipe($.sassLint({
            config: '.sass-lint.yml'
        }))
        .pipe($.sassLint.format())
        .pipe($.sassLint.failOnError())
})


gulp.task('scss', function () {
    var SASS_CONFIG = {
        includePaths: [
            'node_modules/bourbon/app/assets/stylesheets',
            'node_modules/bourbon-neat/app/assets/stylesheets',
			`src/app`
		],
		outputStyle: 'compressed', // nested (default), expanded, compact, compressed
		indentType: 'tab',
		indentWidth: 1,
		linefeed: 'lf'
	};
    return gulp.src('src/styles/**/*.scss', { base: 'src/styles' })
        .pipe($.rename({ dirname: '' }))
        .pipe($.if(env.dev, $.sourcemaps.init()))
        .pipe($.sass(SASS_CONFIG))
        .pipe($.if(env.dev, $.sourcemaps.write()))
        .pipe($.size({ title: 'sass' }))
        .pipe(gulp.dest('dist/css'))
        .pipe($.connect.reload());
})

gulp.task('scss-internal', function () {
    var SASS_CONFIG = {
        includePaths: [
            'node_modules/bourbon/app/assets/stylesheets',
            'node_modules/bourbon-neat/app/assets/stylesheets',
			'src/app'
		],
		outputStyle: 'compressed', // nested (default), expanded, compact, compressed
		indentType: 'tab',
		indentWidth: 1,
		linefeed: 'lf'
	};
    return gulp.src(paths.libs.scss, { base: 'src/styles' })
        .pipe($.if(env.dev, $.sourcemaps.init()))
        .pipe($.sass(SASS_CONFIG))
        .pipe($.if(env.dev, $.sourcemaps.write()))
        .pipe($.size({ title: 'sass' }))
        .pipe(gulp.dest(paths.dist.public))
        .pipe($.connect.reload());
})


gulp.task('tsLint', function () {
    return gulp.src('src/app/**/*.ts')
        .pipe($.tslint())
        .pipe($.tslint.report('verbose'));
})

var tsProject = $.typescript.createProject('tsconfig.json', {
    typescript: require('typescript'),
    outFile: env.prod ? 'app.js' : undefined
});

gulp.task('ts', function () {
    var tsResult = gulp.src(['typings/**/*.ts','src/app/**/*.ts'])
        .pipe($.preprocess({
            context: env
        }))
        .pipe($.inlineNg2Template({
            base: 'src/app'
        }))
        .pipe($.if(env.dev, $.sourcemaps.init()))
        .pipe($.typescript(tsProject));

    return tsResult.js
        .pipe($.if(env.prod, $.uglify()))
        .pipe($.if(env.dev, $.sourcemaps.write('./', {
            sourceRoot: __dirname + '/src/app'
        })))
        .pipe($.size({ title: 'ts' }))
        .pipe(gulp.dest('dist/app'))
        .pipe($.connect.reload());
})


gulp.task('html', function () { 
    return gulp.src('src/app/**/*.html')
        .pipe(gulp.dest('dist/app'));
})

gulp.task('assets', function () {
   
        
      return gulp.src('src/images/**/*')
        .pipe($.size({ title: 'images' }))
        .pipe(gulp.dest('dist/images'));
})

gulp.task('libs', function () {
    
    gulp.src(paths.libs.bower, { base: './bower_components' })
        .pipe($.if(env.prod, $.concat('vendors.js')))
        .pipe($.if(env.prod, $.uglify()))
        .pipe($.size({ title: 'vendors' }))
        .pipe(gulp.dest('dist/lib'));

    return gulp.src(paths.libs.js, { base: './node_modules' })
        .pipe($.if(env.prod, $.concat('libs.js')))
        .pipe($.if(env.prod, $.uglify()))
        .pipe($.size({ title: 'libs' }))
        .pipe(gulp.dest('dist/lib'));

})

gulp.task('index', function () {

    var source = gulp.src(paths.includes, { read: false});

    return gulp.src('src/index.html')
        .pipe($.inject(source, {
            ignorePath: 'dist'
        }))
        .pipe($.preprocess({
            context: env
        }))
        .pipe(gulp.dest('dist'))
        .pipe($.connect.reload());

})


gulp.task('watch', function () {
    gulp.src([
        'src/app/**/*.ts',
        'src/app/**/*.css',
        'src/app/**/*.html'
    ]).pipe($.watch(['src/app/**/*.ts', 'src/app/**/*.css', 'src/app/**/*.html'], function () {
        runSequence('html','tsLint', 'ts')
    }))

    gulp.src([
        'src/styles/**/*.scss',
    ]).pipe($.watch('src/styles/**/*.scss', function () {
        runSequence( 'scss','scss-internal')
    }))

    gulp.src([
        'src/index.html',
    ]).pipe($.watch('src/index.html', function () {
        runSequence('index')
    }))

})

gulp.task('livereload', function () {
    return $.connect.server({
        root: 'dist',
        livereload: env.dev,
        port: env.port,
        middleware: function (connect, opt) {
            return [history()];
        }
    });
})