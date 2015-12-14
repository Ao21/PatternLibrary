var Assets = require('./assets.model');
var q = require('q');
var fs = require('fs');

// Assets.create({});
// getFile('/Users/brettr/Development/repos/uiMembership/styleguide/styles/base.css').then(function (e) {
// 	Assets.create({name: 'base', data: e}, function(err, result){
// 		console.log(result);
// 	})
// })

exports.index = function (req, res) {
	Assets.find({}, function (err, assets) {
		if (err) console.log(err);
		res.send(assets);
	})

}

exports.get = function (req, res) {
	Assets.findById(req.params.id, function (err, asset) {
		if (err) console.log(err);
		res.send(asset);
	})
}


exports.create = function (req, res) {
	Assets.create(req.body, function (err, asset) {
		if (err) console.log(err);
		res.send(asset);
	})
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
