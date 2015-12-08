var mongoose = require('mongoose')
var Patterns = new mongoose.Schema({
	name: String,
	patternId: String,
	createdOn: Date,
	ref: String,
	dom: String,
	group: String,
	description: {},
	modifiedOn: { type: Date, default: Date.now },
	url: String,
	file: {},
	data: [{
		angular: {},
		markup: {},
		assets: [],
		version: String,
		createdOn: Date
	}]	
})

Patterns.pre('save', function(next) {
	this.modifiedOn = new Date();
  	next();
});
module.exports = mongoose.model("Patterns", Patterns);