const mongoose = require('mongoose');
const md5 = require('md5');
//const db = mongoose.connection;


mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });



//Admin schema
const AdminSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	encryptedPassword: {
		type: String,
		required: true
	},
	role: { 
		type: String, 
		enum: ['admin', 'restricted'], 
		required: true
	}
});




AdminSchema.virtual('gravatar').get(function() {
	const hash = md5(this.email);
	return `https://gravatar.com/avatar/${hash}?s=150`;
})

const Admin = mongoose.model('Admin', AdminSchema)
module.exports = { AdminSchema, Admin };