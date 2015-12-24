var SectionComponent = require('./section_component.model');
var _ = require('lodash');

exports.index = function (req, res) {
	SectionComponent.find({}, function (err, sections) {
		res.send(sections);
	})
}


exports.find = function(req,res){
	SectionComponent.findOne({ url: req.params.url })
	.exec(function (err, docs) {
		if (err) {
			return res.status(401).send('Bad Request')
		}
		if (!docs) {
			return res.status(404).send('Nothing was found');
		}
		res.status(200).send(docs);
	})
}

exports.add = function (req, res) {
	SectionComponent.create(req.body, function (err, sectionComponent) {
		if (err) {
			return res.status(403).send(err);
		}
		res.send(sectionComponent);
	})
}

exports.update = function (req, res) {
	SectionComponent.update(req.body.query, req.body.update, function (err, doc) {
		SectionComponent.findOne(req.body.query, function (err, doc) { 
			res.send(doc);
		})
	})	
}