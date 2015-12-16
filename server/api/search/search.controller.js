var Pattern = require('./../pattern/pattern.model.js');
var Section = require('./../section/section.model.js');
var Assets = require('./../assets/assets.model.js');

var options = [Pattern, Section, Assets];

exports.index = function (req, res) { }
exports.get = function (req, res) {
	var SearchModel = require('mongoose').model(req.params.type)
	
	SearchModel.find({}, 'name id ref', function (err, docs) {
		if (err) {
			return res.status(500).send(err);
		}
		res.send(docs);
	})
}