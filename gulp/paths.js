var path = require('path');

var paths = {
	
	root : './',
	
	gulpfile:   ['./gulpfile.js', './gulp/**/*.js'],
	
	client:				'./src',
	styles:				'./src/styles/',
	
	dist:				'./dist',
	
	app: {
		src:			'/src/app/',
		ts:				'./src/**/*.ts',
		styles:			'./src/styles/app.scss',
		defaultStyles:	'./src/styles/**/_*.scss',
		images:         './src/public/images/**/*.{png,gif,jpg,jpeg,svg}',
	},
	
	typings:			'./src/typings/**/*.ts',
	typingsTSD: './tsd_typings/**/*.ts',
	defaultTypings: 	'./typings/**/*.ts',
	
	test: {
		robotFiles:		'./src/app/**/*.robot',
		robotDest:		'test/robot/resources/',
		ts:				'./test/**/*.ts',
	}
	
	
	
}

module.exports = paths;