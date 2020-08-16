const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const objectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = process.env.DATABASE;
const db = require('mongodb');
const promisify = require('es6-promisify');



exports.login = passport.authenticate('local', {
	failureRedirect: '/users/login',
	failureFlash: true,
	successRedirect: '/users/dashboard',
	successFlash: 'با موفقیت وارد اکانت خود شدید.',
	badRequestMessage: 'لطفا تمام فیلدها را پر کنید.'
});

exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'شما با موفقیت از اکانت خود خارج شدید');
	res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
		return;
	}
	req.flash('error', 'قبل از مشاهده این صفحه وارد اکانت خود شوید.');
	res.redirect('/users/login');
};


exports.validationPasswords = (req, res, next) => {
	var password = req.body.password;
	if(password !== req.body['password-confirm']) {
		req.flash('error', 'کلمه های عبور یکسان نمیباشند.');
		res.redirect('back');
	} else if (password.length < 5) {
		req.flash('error', 'کلمه عبور باید بیشتر از ۵ کاراکتر باشد.');
		res.redirect('back');
	}
	
	next();
	return;
};

exports.passwordUpdateInProfile = async (req, res) => {
let newUserPass = { password: req.body.password }

	await bcrypt.genSalt(10, (err, salt) => {
	  bcrypt.hash(newUserPass.password, salt, (err, hash) => {
		newUserPass.password = hash;
		console.log(hash);
	  });
	}); 
	
const _id = objectID(req.session.passport.user);

	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('users').updateOne({_id}, {$set: newUserPass}, function(err, result) {
			assert.equal(null, err);
			console.log('password Updated');
			db.close();
			res.redirect('/users/dashboard');
    	});
	
	});
req.flash('success', 'پسسورد اکانت شما با موفقیت بروزرسانی شد.');
};
