const mongoose = require('mongoose');
const User = mongoose.model('User');
const csrf = require('csurf');
const bcrypt = require('bcryptjs');
var csrfProtection = csrf( { cookie: true } );


exports.login = (req, res) => {
	res.render('users/login', { csrfToken: req.csrfToken(), title: 'ناحیه کاربری' });
};


exports.signin = (req, res) => {
	res.render('users/signin', { csrfToken: req.csrfToken(), title: 'فرم ثبت نام' });
};

exports.dashboard = (req, res) => {
	res.render('users/dashboard', { title: 'ناحیه کاربری تاپ ادورت' });
};

exports.passwordRecovery = (req, res) => {
	res.render('users/passwordRecovery');
};

exports.validateSignin = (req, res, next) => {

const phoneNo = req.body.phoneNo;
const password = req.body.password;
const fullName = req.body.fullName;
req.check('fullName', 'نام و نام خانوادگی الزامی میباشد.').notEmpty();
req.check('phoneNo', 'شماره موبایل الزامی میباشد.').notEmpty();
req.check('phoneNo', 'شماره موبایل درست وارد نشده است.').isMobilePhone(['fa-IR']);
req.check('password', 'رمز عبور باید بیشتر از ۵ کاراکتر باشد.').isLength({min: 6});
req.check('password', 'رمز عبور الزامی میباشد.').notEmpty();

	
let errors = req.validationErrors();
	if (errors) {
		req.flash('error', errors.map(err => err.msg));
		res.render('users/signin', { title: 'فرم ثبت نام تاپ ادورت', body: req.body, flashes: req.flash() });
		return;
	}
	next();
};

exports.signinForm = async (req, res, next) => {
	bcrypt.hash(req.body.password, 10).then(
		(hash) => {
			const user = new User({
				phoneNo: req.body.phoneNo,
				fullName: req.body.fullName,
				password: hash
			});
			user.save().then(
			() => {
				req.login(user, function(err) {
				if (err) {
				  console.log(err);
				}
				req.flash('success', 'ثبت نام شما با موفقیت انجام و وارد ناحیه کاربری شدید.');
			    res.redirect('/users/dashboard');
			});
		}).catch(
			(error) => {
				console.log(error);
			}
		);
		}
	);
};


exports.profileInfo = (req, res) => {
	res.render('users/editProfile', { csrfToken: req.csrfToken(), title: 'ویرایش مشخصات کاربری' });
};


exports.editProfileInfo = async (req, res) => {
	const fullName = req.body.fullName;
	const webSite = req.body.webSite;
	const address = req.body.address;
	const email = req.body.email;
	req.check('fullName', 'نام و نام خانوادگی الزامی میباشد.').notEmpty();
	req.check('webSite', 'آدرس وب سایت الزامی میباشد.').notEmpty();
	req.check('webSite', 'آدرس وب سایت خود را درست وارد کنید.').isURL();
	req.check('email', 'آدرس ایمیل الزامی میباشد.').notEmpty();
	req.check('email', 'پست الکترونیکی خود را درست وارد کنید.').isEmail();
	req.check('address', 'لطفا آدرس خود را وارد کنید.').notEmpty();
	
let errors = req.validationErrors();

	if (errors) { 
		req.flash('error', errors.map(err => err.msg));
		res.redirect('/users/editProfile');
	}
	
	const updates = {
		fullName: req.body.fullName,
		webSite: req.body.webSite,
		address: req.body.address,
		email: req.body.email
	};

	const user = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $set: updates },
		{ new: true, runValidators: true, context: 'query' }
	);
	req.flash('success', 'اطلاعات کاربری شما بروزرسانی شد.');
	res.redirect('/users/dashboard');
};

exports.passChange = (req, res) => {
	res.render('users/passwordChange', { csrfToken: req.csrfToken(), title: 'تغییر کلمه عبور' });
};

