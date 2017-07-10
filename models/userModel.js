const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 100,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		maxlength: 100,
	},
	password: {
		type: String,
		required: true,
	},
	subjects: [{
		type: String,
	}],
	classes: [{
		type: String,
	}],
	backgrounds: [{
		type: String,
	}],
	experiences: [{
		type: String,
	}],
	currentAddress: {
		type: String,
	},
	times: [{
		type: String,
	}],
	minimumRate: {
		type: String,
	},
	contactNumbers: [{
		type: String,
	}],
	awardsAndAccomplishments:[{
		type: String,
	}],
	certificates:[{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
	}],
	resources:[{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
	}],
});

mongoose.model('User', userSchema); // set
