const express = require('express');
const router = express.Router();
const User = require('mongoose').model('User'); // get
const flash = require('middlewares/flash');

router.get('/:uid/profile', function(req, res, next) {
	const uid = req.params.uid;
	User.findOne({
		_id: uid,
	})
	.exec(function(err, user) {
		if (err) return next(err);
		return res.render('profile', {user, session: req.session});
	});
});

router.post('/profile/classesAndSubjects', function(req, res, next) {
	console.log("I am here ******************************");
	//const uid = req.params.uid;
	//const txt = req.body.txt;
	//console.log(txt);
	console.log('body: ' + req.body.txt);
	return res.send(null);
	/*
	User.findOne({
		_id: uid,
	})
	.exec(function(err, user) {
		if (err) return next(err);
		return res.send(req.body);
	});
	*/
});

module.exports = {
  addRouter(app) {
    app.use('/', [flash], router);
  },
};