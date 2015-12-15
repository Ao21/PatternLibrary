var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Patterns = new mongoose.Schema({
	name: String,
	patternId: String,
	createdOn: Date,
	ref: String,
	dom: String,
	group: String,
	type: { type: String, default: 'pattern'},
	description: {},
	modifiedOn: { type: Date, default: Date.now },
	url: String,
	file: {},
	sections : [{ type: Schema.Types.ObjectId, ref: 'Section' }],
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