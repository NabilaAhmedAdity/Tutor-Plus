const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
	path: {
			type: String,
	},
	name: {
		type: String,
	},
	date: {
			type: Date,
			default: Date.now,
	},
});

mongoose.model('File', fileSchema);