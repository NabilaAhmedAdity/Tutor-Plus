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

router.get('/:uid/profile/edit', function(req, res, next) {
	const uid = req.params.uid;
	User.findOne({
		_id: uid,
	})
	.exec(function(err, user) {
		if (err) return next(err);
		return res.render('profileEdit', {user, session: req.session});
	});
});

module.exports = {
  addRouter(app) {
    app.use('/', [flash], router);
  },
};