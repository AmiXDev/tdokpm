const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const userSchema = new mongoose.Schema({
	fullName: {type: String, trim: true},
	phoneNo: {type: String, unique: true, required: true},
	email: {type: String},
	address: {type: String},
	webSite: {type: String},
	password: {type: String}
});

//userSchema.plugin(passportLocalMongoose, {usernameField: 'phoneNo'});

userSchema.plugin(mongodbErrorHandler);


const User = mongoose.model('User', userSchema)
module.exports = { userSchema, User };