var Section = require('./section.model');

exports.index = function (req, res) {
	Section.find({}, function (err, res) {
		res.send(res);
	})
}

exports.find = function(req,res){
	Section.find(req.body, function(err, res){
		res.send(res);
	})
}

exports.add = function (req, res) {
	Section.create(req.body, function(err, section){
		res.send(section);
	})
}

exports.update = function(req, res) {
	Section.update(req.body.query, req.body.update, function(err, section) {
		res.send(section);
	})
}