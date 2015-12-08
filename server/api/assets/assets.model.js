var mongoose = require('mongoose')
var Assets = new mongoose.Schema({
	name: String,
	data: String
})

module.exports = mongoose.model("Assets", Assets);