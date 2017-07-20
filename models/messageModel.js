const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	date: {
			type: Date,
			default: Date.now,
	},
	from: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	},
	to: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	},
	body: [{
			type: String,
	}],
});

mongoose.model('Message', messageSchema);