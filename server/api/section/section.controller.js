var Section = require('./section.model');
var Pattern = require('./../pattern/pattern.model');
var _ = require('lodash');

exports.index = function (req, res) {
	Section.find({}, function (err, sections) {
		res.send(sections);
	})
}

exports.find = function (req, res) {
	Section.findOne({ url: req.params.url })
		.deepPopulate('data.pattern data.component')
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

exports.addPattern = function (req, res) {
	Section.findOne({ '_id': req.body.sectionId }, function (err, section) {
		section.data.push({
			pattern: req.body._id,
			index: 0
		})
		section.save(function (err) {
			Section.findOne({ '_id': req.body.sectionId }).deepPopulate('data.pattern').exec(function (err, nSection) {
				res.send(nSection);
			})
		});
	})
}
exports.addSectionComponent = function (req, res) {
	Section.findOne({ '_id': req.body.sectionId }, function (err, section) {
		section.data.push({
			component: req.body._id,
			index: 0
		})
		section.save(function (err) {
			Section.findOne({ '_id': req.body.sectionId }).deepPopulate('data.component').exec(function (err, nSection) {
				res.send(nSection);
			})
		});
	})
}

exports.updateSectionComponent = function (req, res) {
	Section.findOne({ 'data._id': req.body.sectionId },
		(function (err, doc) {
			_.forEach(doc.data, function (e, i) {
				if (e._id == req.body.sectionId) {
					doc.data[i].data = req.body.data;
				}
			})
			doc.save(function (err) {
				res.send(doc);
			});
		}));
}