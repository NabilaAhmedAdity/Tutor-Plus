const express = require('express');
const router = express.Router();
const User = require('mongoose').model('User'); // get
const File = require('mongoose').model('File'); // get
const Message = require('mongoose').model('Message'); // get
const flash = require('middlewares/flash');
const loginUser = require('middlewares/loginUser');

router.post('/submit', function(req, res, next) {
	const uid = req.session.uid;
	const text = req.body.text;
	const toid = req.body.toid;
	const fromid = req.body.fromid;
	res.send(null);
	
});

module.exports = {
  addRouter(app) {
    app.use('/:uid/message', [flash, loginUser], router);
  },
};