var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var Section = new mongoose.Schema({
	createdOn: Date,
	modifiedOn: { type: Date, default: Date.now },
	// Component Info
	name: String,
	url: { type: String, unique : true },
	data: Schema.Types.Mixed,
	// Layout Info
})

module.exports = mongoose.model("Section", Section);