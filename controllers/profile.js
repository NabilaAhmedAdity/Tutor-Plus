const express = require('express');
const router = express.Router();
const User = require('mongoose').model('User'); // get
const File = require('mongoose').model('File'); // get
const flash = require('middlewares/flash');
const multer = require('multer');
const fs = require('fs');
const async = require('async');

router.get('/:uid/profile', function(req, res, next) {
	const uid = req.params.uid;
	User.findOne({
		_id: uid,
	})
	.populate('certificates')
	.populate('sampleResources')
	.exec(function(err, user) {
		if (err) return next(err);
		return res.render('profile', {user, session: req.session});
	});
});

router.post('/:uid/join', function(req, res, next) {
	const uid = req.params.uid;
	User.update({_id: uid}, 
		{$set: {status: "teacher"}}, function(err) {
			if (err) next(err);
			res.redirect('/'+uid+'/profile');
		});
});

router.post('/:uid/resign', function(req, res, next) {
	const uid = req.params.uid;
	User.findOne({
		_id: uid,
	})
	.populate('certificates')
	.populate('sampleResources')
	.exec(function(err, user) {
		if(err) next(err);
		user.classesAndSubjects = [];
		user.educationalBackground = [];
		user.experiences = [];
		user.times = [];
		user.contactNumbers = [];
		user.currentAddress = "";
		user.awardsAndAccomplishments = [];
		const copyFiles = user.certificates;
		copyFiles.concat(user.sampleResources);
		async.each(copyFiles, function(file, callback) {
			fs.unlink(file.path, function(err) {
				if (err) callback(err);
				File.findOne({
					_id: file._id,
				})
				.remove(function(err) {
					if(err) callback(err);
					return callback(null);
				});
			});
		}, function(err) {
			if(err) next(err);
			user.certificates = []; //Once all the files are deleted we can emtpy the array
			user.sampleResources = [];
			user.status = "student";
			user.save(function(err) {
				if (err) next(err);
				return res.redirect('/'+uid+'/profile');
			});
		});
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

router.post('/:uid/profile/certificates', 
	multer({dest: 'uploads/certificates/'}).single('file'), function(req, res, next) {
	const uid = req.params.uid;
	const tempPath = req.file.path;
	const targetPath = tempPath+'_'+req.file.originalname;
    fs.rename(tempPath, targetPath, function(err) {
    	if(err) return res.send("Error uploading file.");
    	const file = new File({
    		path: targetPath,
    		name: req.file.originalname,
    	});
    	file.save(function(err) {
    		if(err) next(err);
    		User.update({_id: uid},
    			{$push: {certificates: file._id}}, function(err) {
    				if(err) next(err);
    				const data = {};
    				data.path = targetPath;
    				data.name = req.file.originalname;
    				res.send(data);
    			});
    	});
		
    });
});

router.get('/download/uploads/certificates/:path', function(req, res){
	const path = 'uploads/certificates/'+req.params.path;
	return res.download(path);
});

router.post('/:uid/profile/sampleresources', 
	multer({dest: 'uploads/sampleresources/'}).single('file'), function(req, res, next) {
	const uid = req.params.uid;
	const tempPath = req.file.path;
	const targetPath = tempPath+'_'+req.file.originalname;
    fs.rename(tempPath, targetPath, function(err) {
    	if(err) return res.send("Error uploading file.");
    	const file = new File({
    		path: targetPath,
    		name: req.file.originalname,
    	});
    	file.save(function(err) {
    		if(err) next(err);
    		User.update({_id: uid},
    			{$push: {sampleResources: file._id}}, function(err) {
    				if(err) next(err);
    				const data = {};
    				data.path = targetPath;
    				data.name = req.file.originalname;
    				res.send(data);
    			});
    	});
		
    });
});

router.post('/:uid/profile/delete', function(req, res, next) {
	const uid = req.params.uid;
	const type = req.body.type;
	const index = req.body.index;
	let file;
	User.findOne({
		_id: uid,
	})
	.populate('certificates')
	.populate('sampleResources')
	.exec(function(err, user) {
		if (err) next(err);
		if (type === "certificates" || type === "sampleResources") {
			file = user[type][index];
		}
		user[type].splice(index, 1);
		user.save(function(err) {
			if (err) next(err);
			if(type === "certificates" || type === "sampleResources") {
				fs.unlink(file.path, function(err) {
					if (err) next(err);
					File.findOne({
						_id: file._id,
					})
					.remove(function(err) {
						if(err) next(err);
						return res.send(null);
					});
				});
			}
			else {
				return res.send(null);
			}
		});
	});
});

router.get('/download/uploads/sampleresources/:path', function(req, res){
	const path = 'uploads/sampleresources/'+req.params.path;
	return res.download(path);
});

module.exports = {
  addRouter(app) {
    app.use('/', [flash], router);
  },
};