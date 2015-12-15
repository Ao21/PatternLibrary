var mongoose = require('mongoose')
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var Section = new mongoose.Schema({
	createdOn: Date,
	modifiedOn: { type: Date, default: Date.now },
	// Component Info
	name: String,
	url: { type: String, unique: true },
	data: [{
		component: { type: Schema.Types.ObjectId, ref: 'SectionComponents' },
		pattern: { type: Schema.Types.ObjectId, ref: 'Patterns' },
		index: Number
	}]
	// Layout Info
})


Section.plugin(deepPopulate);

module.exports = mongoose.model("Section", Section);