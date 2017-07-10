const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('mongoose').model('User'); // get
const flash = require('middlewares/flash');

router.get('/', function(req, res) {
	User.find({

	})
	.exec(function(err, users) {
		return res.render('index', {users});
	});
});

router.get('/login', function(req, res) {
	return res.render('login');
});

router.get('/signup', function(req, res) {
	return res.render('signup');
});

router.post('/signup', function(req, res) {
	const name = req.body.name;
	const email = req.body.email;
	const pass = req.body.password;
	const repass = req.body.repassword;

	if(pass.toString() !== repass.toString()) {
		req.flash('error', `Passwords do not match. Error code: ${err.code}`);
	    return res.redirect('/signup');
	}

	// Autogen salt and hash
 	bcrypt.hash(pass, require('./../secret.js').round, function(err, hash) {
	    if (err) {
	    	req.flash('error', `An error occured. Error code: ${err.code}`);
	    	return res.redirect('/signup');
	    }
	    else {
	    	const user = new User({
	    		name,
	    		email,
	    		password: hash,
	    	});
	    	user.save(function(err) {
			    if (err) {
			      if (err.code === 11000) {
			        req.flash('error', 'Email address already exists');
			      } else {
			        req.flash('error', `An error occured. Error code: ${err.code}`);
			      }
			      return res.redirect('/signup');
			    }
			    req.flash('success', 'Successfully registered');
			    return res.redirect('/');
			});
	    }
	});
});

module.exports = {
  addRouter(app) {
    app.use('/', [flash], router);
  },
};