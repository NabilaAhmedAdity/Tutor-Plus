const express = require('express');
const router = express.Router();
const User = require('mongoose').model('User'); // get
const flash = require('middlewares/flash');
const multer = require('multer');

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

router.post('/:uid/profile/currentAddress', function(req, res, next) {
	const uid = req.params.uid;
	const txt = req.body.txt;
	User.update({_id: uid},
		{$set: {currentAddress: txt}}, function(err) {
			if (err) next(err);
			return res.send(null);
		});
});

router.post('/:uid/profile/certificates', multer({dest: 'uploads/certificates/', keepExtensions: true}).single('file'), function(req, res) {
	const uid = req.params.uid;
	const tempPath = req.file.path;
	const targetPath = tempPath+'_'+req.file.originalname;

    console.log(tempPath);
    console.log(targetPath);
    return res.send(null);
});

module.exports = {
  addRouter(app) {
    app.use('/', [flash], router);
  },
};