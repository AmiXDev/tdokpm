const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
//const express = require('express');

//const router = express.Router();



module.exports = function(passport) {
  passport.use( new LocalStrategy({usernameField: 'phoneNo'}, (phoneNo, password, done) => {
      // Match user
      User.findOne({
        phoneNo: phoneNo
      }).then(user => {
        if (!user) {
			console.log('کاربری با این مشخصات وجود ندارد.')
          return done(null, false, { message: 'شماره موبایل یا کلمه عبور شما اشتباه میباشد.' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
			  console.log('پسورد شما اشتباه میباشد.');
            return done(null, false, { message: 'شماره موبایل یا کلمه عبور شما اشتباه میباشد.' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

