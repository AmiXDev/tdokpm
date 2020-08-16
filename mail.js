var nodemailer = require('nodemailer');
var dbFunctions = require('./dbStore/dbFunctions');
var Q = require('q');
var generator = require('xoauth2').createXOAuth2Generator({
	user: "topadvert.24@gmail.com",
	pass: "3572419salam"
//	clientId: "",
//	clientSecret: "",
//	refreshToken: "",
//	accessToken: ""
});

var transporter = nodemailer.createTransport(({
	service: 'Gmail',
	auth: {
			user: "topadvert.24@gmail.com",
			pass: "3572419salam"
	}
}));

var mailOptions = {
	from: "گروه پشتیبانی مستر گوگل topadvert.24@gmail.com", // sender address 
	to: "topadvert.24@gmail.com", 				// list of receivers 
	subject: 'اطلاعات چت آنلاین در مسترگوگل', 						// Subject line 
	generateTextFromHTML: true,
	html: "<h1>this is a test mail.</h1>"
};

exports.sendMail = function(data) {
	dbFunctions.getMessages(data.roomID, 0, data.MsgLen - 1)
		.then(function(history) {
			//mail only if history is !null
			history.splice(-1, 1);
			mailOptions.subject = "چت با " + data.email[0];
			if (history.length) {
				formatMail(history, data.email);
				transporter.sendMail(mailOptions, function(error, response) {
					if (error)
						console.log(error);
				});
			}
			mailOptions.html = "";
		})
		.catch(function(error) {
			console.log("Mail.js : ", error)
		})
		.done();
}

exports.alertMail = function() {
	mailOptions.subject = "کاربر پیام داده بدو بینم";
	mailOptions.html = "هیچ مدیری آنلاین نیست یکی آنلاین شه.";
	transporter.sendMail(mailOptions, function(error, response) {
		if (error)
			console.log(error);
	});
}

function formatMail(history, details) {
	var len = history.length;
	mailOptions.html = "<b>" + details[0] + "</b><br><b> Email ID : " + details[1] + "</b><br><b> Phone : " +
		details[2] + "</b><br><br> تاریخچه چت <br><br>";
	for (var i = len - 1; i >= 0; i--) {
		var sender;
		if (history[i]["who"])
			sender = "Admin"
		else
			sender = "Client"
		var when = (history[i]["when"]).toLocaleString().substr(15, 6);
		mailOptions.html += "<b>" + sender + "</b>: " + history[i]["what"] + "<br>";
	}
}