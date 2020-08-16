const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const authController = require('../controllers/authController');

const csrf = require('csurf');

var csrfProtection = csrf( { cookie: true } );

const { catchErrors } = require('../handlers/errorHandlers');



router.get('/login', csrfProtection, userController.login);

router.post('/login', authController.login);

router.get('/signin', csrfProtection, userController.signin);

router.post('/signin', userController.validateSignin, userController.signinForm, authController.login);

router.get('/dashboard', authController.isLoggedIn, userController.dashboard);

router.get('/editProfile', userController.profileInfo);

router.post('/editProfile', catchErrors(userController.editProfileInfo));

router.get('/passwordChange', userController.passChange);

router.post('/passwordChange', authController.validationPasswords, catchErrors(authController.passwordUpdateInProfile));

router.get('/passwordRecovery', userController.passwordRecovery);

router.get('/logout', authController.logout);


module.exports = router;