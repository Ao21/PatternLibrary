var Pattern = require('./pattern.model');
var typescript = require('typescript')
var fs = require('fs');
var sass = require('node-sass');
var q = require('q');
var dss = require('dss');
var dssUtils = require('../utils/dss');
var htmlUtils = require('../utils/html');
var jsdiff = require('diff');
var DiffMatchPatch = require('diff-match-patch');
var _ = require('lodash');
var async = require('async');





var agSass = '/Users/ronanbrett/Work/AA/uiMembership/src/app/components/shared/accordian/accordian_group.scss';
var compTS = '/Users/ronanbrett/Work/AA/uiMembership/src/app/components/shared/discount_code/discount_code.ts';
var compUrl = '/Users/ronanbrett/Work/AA/uiMembership/src/app/components/shared/discount_code/discount_code.html';
var baseScss = '/Users/ronanbrett/Work/AA/uiMembership/styleguide/styles/base.css';
var compScss = '/Users/ronanbrett/Work/AA/uiMembership/styleguide/styles/components.css'
var bootstrap = '/Users/ronanbrett/Work/AA/uiMembership/styleguide/styles/bootstrap.css'
	
// exports.index = function (req, res) {

	
// 	q.all([getFile(compUrl), getFile(baseScss), getFile(compScss), getFile(bootstrap),getFile(compTS)])
// 		.done(function (values) {
// 			res.send(values);
// 	})
	
// 	// Pattern.find({}, function (err, components) {
// 	// 	res.send(components);
// 	// })
// }



exports.index = function (req, res) {
	Pattern.find({}, function(err, patterns){
		if (err) {
			return res.status(500).send(err);
		}
		if (!res) {
			return res.status(400).send('No items were found.')
		}
		
		res.status(200).send(patterns)
		
	})

}

exports.get = function (req, res) {
	Pattern.findOne({ 'patternId': req.params.id }, function (err, pattern) {
		res.send(pattern)
	})
}

exports.addPatternUrl = function (req, res) {
	
	renderSass(req.body.url).then(function (sassFile) {
		getFile(req.body.url).then(function (file) {
		
			parseDSS(file).then(function (dss) {
				_.forEach(dss.blocks, function (e) {
					e.file = sassFile;
				})
				async.map(dss.blocks, addPattern, function (err, results) {
					res.status(200).send(results);
				});
		})
		
	},
		function (err) {
			res.status(404).send("Sorry! We couldn't find that url.");

		})
	})
	
	
}


exports.add = function (req, res) {
	var patternId = req.body.patternId,
		url = req.body.url;

	Pattern.findOne({ 'patternId': req.body.patternId }, function (err, pattern) {
		if (err) {
			console.log('Error: ' + err);
		}
		if (!res) {
			console.log('created new pattern')
			Pattern.create(req.body, function (err, pattern) {
				res.send(null, pattern);
			})
		} else {
			console.log('update pattern')
			var pattern = _.merge({}, res, req.body);
			pattern.save(function (err) {
				if (err) {
					console.log('Error: ' + err);
				}
				res.send(null, pattern);
			})
		}
	})

}



function addPattern(pattern, cb) {
	Pattern.findOne({ 'ref': pattern.ref }, function (err, doc) {
		if (err) {
			console.log(err);
			cb(err);
		}
		if (!doc) {
			pattern.data = {
				assets: ['bootstrap','base'],
				angular: pattern.angular,
				markup: pattern.markup,
				createdOn: new Date()
			}
			pattern.createdOn = new Date();
			Pattern.create(pattern, function (err, pattern) {
				if (err) {
					console.log(err);
					cb(err)
				}
				cb(null, pattern)
			})
		} else {
			if (doc.markup) {
				if (diffPattern(pattern.markup.escaped, doc.data[0].markup.escaped)) {
					doc.data.unshift({
					assets: ['bootstrap','base'],
					angular: pattern.angular,
					markup: pattern.markup,
					createdOn: new Date()
				})}
			} else {
				doc.data = {
					assets: ['bootstrap','base'],
					angular: pattern.angular,
					markup: pattern.markup,
					createdOn: new Date()
				}
			}
			delete pattern.angular;
			delete pattern.markup;
			doc.name = pattern.name;
			doc.file = pattern.file;
			doc.description = pattern.description;
			doc.url = pattern.url;
			doc.save(function (err, res){
				if (err) {
					console.log('Error: ' + err);
					cb(err);
				}
				cb(null, res);
			}
			
			)}
	})
}

function renderSass(path) {
	var d = q.defer();
	sass.render({ file: path }, function (err, res) {
		d.resolve(res.css.toString());
	})
	return d.promise;
	
}

function diffPattern(source, diff) {
	var dmp = new DiffMatchPatch();
	var d = dmp.diff_main(source, diff);
	if (d.length > 1) {
		return true;
	} else {
		return false;
	}


}

function getFile(url) {
	var d = q.defer();
	fs.readFile(url, 'utf8', function (err, data) {
		if (err) {
			d.reject(err);
		}
		d.resolve(data);
	})
	return d.promise;
}

function parseDSS(css) {
	var d = q.defer();
	dss.parser('angular', dssUtils.angularParser);
	dss.parser('ref', dssUtils.singleLineParser);
	dss.parser('group', dssUtils.singleLineParser);
	dss.parser('dom', dssUtils.singleLineParser);
	dss.parser('url', dssUtils.singleLineParser);
	dss.parse(css, {}, function (parsedObject) {
		console.log(parsedObject);
		d.resolve(parsedObject);
	})
	return d.promise;
}