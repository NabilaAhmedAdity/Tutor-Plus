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
	classesAndSubjects: [{
		type: String,
	}],
	backgrounds: [{
		type: String,
	}],
	experiences: [{
		type: String,
	}],
	times: [{
		type: String,
	}],
	minimumRate: {
		type: String,
	},
	contactNumbers: [{
		type: String,
	}],
	currentAddress: {
		type: String,
	},
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
