var mongoose = require('mongoose')
var SectionComponents = new mongoose.Schema({
	createdOn: Date,
	modifiedOn: { type: Date, default: Date.now },
	// Component Info
	name: String,
	type: String,
	data: Schema.Types.Mixed,
	// Layout Info
	layoutArea: String,
	order: Number
})

module.exports = mongoose.model("SectionComponents", SectionComponents);