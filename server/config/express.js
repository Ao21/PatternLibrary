/**
 * Express configuration
 */

'use strict';

var express = require('express');

var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');

// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
// var webpackConfig = require('../../webpack.config');


var _ = require('lodash');

function allowCrossDomain(req, res, next) {
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

	var origin = req.headers.origin;
	if (_.contains(config.whiteList, origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}
	if (req.method === 'OPTIONS') {
		res.send(200);
	} else {
		next();
	}
}




module.exports = function (app) {
	var env = app.get('env');



	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(allowCrossDomain);
	app.use(methodOverride());
	app.use(cookieParser());





	if ('production' === env) {

	}

	if ('development' === env || 'test' === env) {
		app.use(express.static('src/public'));
		app.use('/__build__', express.static('__build__'));


		//app.use(express.static(path.join(config.root, '__build__')));
		///app.set('appPath', path.join(config.root, 'src/public'));

		// var server = new WebpackDevServer(webpack(webpackConfig), {
		// 	publicPath: '/__build__',
		// 	historyApiFallback: false, // won't work due to order
		// 	inline: true,
		// 	quiet: false,
		// 	noInfo: false,
		// 	stats: { colors: true }
		// });
		// Webpack express app that uses socket.io
		//app.use(server.app);
		
		app.use(morgan('dev'));
		app.use(errorHandler()); // Error handler - has to be last
	}
};