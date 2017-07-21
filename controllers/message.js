const express = require('express');
const router = express.Router();
const User = require('mongoose').model('User'); // get
const Message = require('mongoose').model('Message'); // get
const flash = require('middlewares/flash');
const loginUser = require('middlewares/loginUser');

router.post('/submit', function(req, res, next) {
    if (req.session.uid != req.body.fromid) {
    	req.flash('error', 'You need to login.');
    	return res.redirect('/login');
    }
	const text = req.body.text;
	const toid = req.body.toid;
	const fromid = req.body.fromid;
	
	Message.findOne({
		$or: [
			{ $and: [{user1: toid}, {user2: fromid}] },
			{ $and: [{user2: fromid}, {user1: toid}] },
		]
	}, function(err, message) {
		if (err) next(err);
		if (message ===  null) { //message is an empty array
			const newMessage = new Message({
				user1: toid,
				user2: fromid,
				body: {
					text: text,
					from: fromid, //don't forget to change in two place
				},
			});
			newMessage.save(function(err) {
				if (err) next(err);
				User.update({_id: toid},
					{$push: {messages: newMessage._id}}, function(err) {
						if (err) next(err);
						User.update({_id: fromid},
							{$push: {messages: newMessage._id}}, function(err) {
								if (err) next(err);
								res.send(null);
							});
					});
			});
		}
		else {
			Message.update({_id: message._id},
				{$push: {body: {text: text}}}, function(err) {
					if (err) next(err);
					res.send(err);
				});
		}
		
	});
});

router.get('/:uid', [loginUser], function(req, res, next) {
	const uid = req.params.uid;
	User.findOne({
		_id: uid,
	})
	.populate({path: 'messages', 
		populate:{path: 'user1 user2',
		populate: {path: 'image'}}})
	.exec(function(err, user) {
		if (err) next(err);
		return res.render('message.pug', {user});
	})
});

router.get('/:uid/:indx', [loginUser], function(req, res, next) {
	const uid = req.params.uid;
	const indx = req.params.indx;
	User.findOne({
		_id: uid,
	})
	.populate({path: 'messages', 
		populate:{path: 'user1 user2',
		populate: {path: 'image from'}}})
	.exec(function(err, user) {
		if (err) next(err);
		return res.render('messageHistory.pug', {user, indx: user.messages.length-1-indx});
	})
});

module.exports = {
  addRouter(app) {
    app.use('/message', [flash], router);
  },
};