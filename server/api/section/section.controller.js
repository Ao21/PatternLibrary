var Section = require('./section.model');
var _ = require('lodash');

exports.index = function (req, res) {
	Section.find({}, function (err, sections) {
		res.send(sections);
	})
}

exports.find = function(req,res){
	Section.findOne({ url: req.params.url }, function (err, section) {
		if (err) {
			return res.status(401).send('Bad Request')
		}
		if (!section) {
			return res.status(404).send('Nothing was found');
		}
		res.send(JSON.stringify(section));
	})
}

exports.add = function (req, res) {
	Section.create(req.body, function (err, section) {
		if (err) {
			return res.status(403).send(err);
		}
		res.send(section);
	})
}

exports.update = function (req, res) {
	
	Section.update(req.body.query, req.body.update, function (err, doc) {
		Section.findOne(req.body.query, function (err, doc) { 
			res.send(doc);
		})
	})

	
}