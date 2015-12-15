var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var SectionComponents = new mongoose.Schema({
	createdOn: Date,
	modifiedOn: { type: Date, default: Date.now },
	// Component Info
	name: String,
	type: String,
	ref: String,
	image: String,
	data: Schema.Types.Mixed,
	config: [{}],
	// Layout Info
	layoutArea: String,
	order: Number
})

module.exports = mongoose.model("SectionComponents", SectionComponents);