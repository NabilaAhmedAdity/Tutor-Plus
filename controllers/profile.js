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

router.post('/:uid/profile/add', function(req, res, next) {
	const uid = req.params.uid;
	const txt = req.body.txt;
	const type = req.body.type;
	User.update({_id: uid},
		{$push: {[type]: txt}}, function(err) {
			if (err) next(err);
			return res.send(null);
		});
});

module.exports = {
  addRouter(app) {
    app.use('/', [flash], router);
  },
};