const express = require('express');
const mongoose = require('mongoose');
const uuid = require('node-uuid');
const Q = require('q');
const _ = require("underscore");
const dbFunctions = require('./dbStore/dbFunctions');
var config = require('./config');
const compression = require('compression'); // G-ZIP compression
const mail = require('./mail');	//Configure mail.js and un-comment the mail code
const btoa = require('btoa');//Password is btoa hashed
// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });
var moment = require('moment-jalaali');

var app = express();

const shouldCompress = (req, res) => {
	if (req.headers['x-no-compression']) {
	  // don't compress responses if this request header is present
	  return false;
	}
  
	// fallback to standard compression
	return compression.filter(req, res);
  };
  
  app.use(compression({
	// filter decides if the response should be compressed or not,
	// based on the `shouldCompress` function above
	filter: shouldCompress,
	// threshold is the byte threshold for the response body size
	// before compression is considered, the default is 1kb
	threshold: 0
  }));




// Connect to our Database and handle any bad connections
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);

});

// READY?! Let's go!
require('./models/User');
require('./models/Blog');
require('./models/Admin');


// Start our app!
var app = require('./app');
var server = require('http').Server(app)
var io = require('socket.io')();

var admins = {};
var users = {};

// connect to Redis
dbFunctions.ConnectToRedis(startApp);

//public directory
app.use(express.static(__dirname + '/public'));




// io connection
io.on('connection', function(socket) {
	//Login Admin
	socket.on('login', function(data) {
		if (btoa(data.password) != config.key)
			socket.emit('login', {
				login: false,
				err: "Invalid Login"
			})
		else {
			if (_.find(config.admin_users, function(admin) {
					return (admin == data.admin);
				})) {
				if (admins[data.admin]) {
					socket.emit('login', {
						login: false,
						err: "Already Logged In"
					})
				} else {
					socket.emit('login', {
						login: true
					})
				}
			} else {
				socket.emit('login', {
					login: false,
					err: "Invalid Login"
				})
			}
		}
	});	
	

	//Init admin
	socket.on('add admin', function(data) {
		this.isAdmin = data.isAdmin;
		socket.username = data.admin;

		_.each(admins, function(adminSocket) {
			adminSocket.emit("admin added", socket.username)
			socket.emit("admin added", adminSocket.username)
		});

		admins[socket.username] = socket;

		//If some user is already online on chat
		if (Object.keys(users).length > 0) {
			_.each(users, function(userSocket) {
				dbFunctions.getMessages(userSocket.roomID, 0)
				.then(function(history) {
					var len = history.length;
					var userSocket = users[history[len - 1]];
					history.splice(-1, 1);
					socket.join(userSocket.roomID);
					socket.emit("New Client", {
						roomID: userSocket.roomID,
						history: history,
						details: userSocket.userDetails,
						justJoined: true
					})
				})
			});
		}
	});	
	//Init user
	socket.on('add user', function(data) {
		socket.isAdmin = false;
		if (data.isNewUser) {
			data.roomID = uuid.v4();
			dbFunctions.setDetails(data);
			socket.emit("roomID", data.roomID);
		}
		socket.roomID = data.roomID;
		//Fetch user details
		dbFunctions.getDetails(socket.roomID)
			.then(function(details) {
				socket.userDetails = details;
			})
			.catch(function(error) {
				console.log("Line 95 : ", error)
			})
			.done();
		socket.join(socket.roomID);
		var newUser = false;
		if (!users[socket.roomID]) {  // Check if different instance of same user. (ie. Multiple tabs)
			users[socket.roomID] = socket;
			newUser = true;
		}
		//Fetch message history
		dbFunctions.getMessages(socket.roomID, 0)
			.then(function(history) {
				history.splice(-1, 1)
				socket.emit('chat history', {
					history: history,
					getMore: false
				});
				if (Object.keys(admins).length == 0) {
					//Tell user he will be contacted asap and send admin email
					socket.emit('log message', "با عرض پوزش به علت پایان زمان کاری شرکت پشتیبانی برای پاسخگویی شما آنلاین نمیباشد. لطفا منتظر بمانید معمولا کمتر از ۳۰ دقیقه با شما تماس خواهیم گرفت.");
					mail.alertMail();
					
				} else {
					if (newUser) {
						socket.emit('log message', "سلام و وقت بخیر " + socket.userDetails[0] + "، چطوری میتونم کمکتون کنم؟");
						//Make all available admins join this users room.
						_.each(admins, function(adminSocket) {
							adminSocket.join(socket.roomID);
							adminSocket.emit("New Client", {
								roomID: socket.roomID,
								history: history,
								details: socket.userDetails,
								justJoined: false
							})
						});
					}
				}
			})
			.catch(function(error) {
				console.log("Line 132 : ", error)
			})
			.done();
		dbFunctions.getMsgLength(socket.roomID)
			.then(function(len) {
				socket.MsgHistoryLen = (len * -1) + 10;
				socket.TotalMsgLen = (len * -1);
			})
			.catch(function(error) {
				console.log("Line 140 : ", error)
			})
			.done();
	});

	socket.on('chat message', function(data) {
		if (data.roomID === "null")
			data.roomID = socket.roomID;
		data.isAdmin = socket.isAdmin;
		dbFunctions.pushMessage(data);

		socket.broadcast.to(data.roomID).emit('chat message', data);
	});

	socket.on("typing", function(data) {
		socket.broadcast.to(data.roomID).emit("typing", {
			isTyping: data.isTyping,
			person: data.person,
			roomID: data.roomID
		});
	});

	socket.on('disconnect', function() {
		if (socket.isAdmin) {
			delete admins[socket.username];
			_.each(admins, function(adminSocket) {
				adminSocket.emit("admin removed", socket.username)
			});
		} else {
			if (io.sockets.adapter.rooms[socket.roomID]) {
				var total = io.sockets.adapter.rooms[socket.roomID]["length"];
				var totAdmins = Object.keys(admins).length;
				var clients = total - totAdmins;
				if (clients == 0) {
					//check if user reconnects in 4 seconds 
					setTimeout(function() {
						if (io.sockets.adapter.rooms[socket.roomID])
							total = io.sockets.adapter.rooms[socket.roomID]["length"];
						totAdmins = Object.keys(admins).length;
						if (total <= totAdmins) {
							mail.sendMail({
								roomID: socket.roomID,
								MsgLen: socket.TotalMsgLen,
								email: socket.userDetails
							});
							delete users[socket.roomID];
							socket.broadcast.to(socket.roomID).emit("User Disconnected", socket.roomID);
							_.each(admins, function(adminSocket) {
								adminSocket.leave(socket.roomID)
							});
						}
					}, 4000);
				}
			} else {
				if (socket.userDetails)
					mail.sendMail({
						roomID: socket.roomID,
						MsgLen: socket.TotalMsgLen,
						email: socket.userDetails
					});
				delete users[socket.roomID];
			}
		}
	});

	socket.on('poke admin', function(targetAdmin) {
		admins[targetAdmin].emit("poke admin", {})
	});

	socket.on('client ack', function() {
		for (adminSocket in admins) {
			if (!admins.hasOwnProperty(adminSocket)) {
				continue;
			}
			admins[adminSocket].emit("client ack", {})
		}
	});

	socket.on("more messages", function() {
		if (socket.MsgHistoryLen < 0) {
			dbFunctions.getMessages(socket.roomID, socket.MsgHistoryLen)
				.then(function(history) {
					history.splice(-1, 1)
					socket.emit('more chat history', {
						history: history
					});
				})
			socket.MsgHistoryLen += 10;
		}
	});
});
	function startApp(isSuccess) {
		if (isSuccess) {
			server.listen(config.web_port, '127.0.0.1', function() {
				console.log('Server started ' + config.web_port + ' at ' +
					(new Date().toLocaleString().substr(0, 24)));
				console.log(moment().format('jYYYY/jM/jD HH:mm:ss')); // 1392/6/31 23:59:59
			 });
			 
			io.attach(server, {
				'pingInterval': 15000,
				'pingTimeout': 15000
			});
			
		} else {
			console.log("Server failed to start.");
			
		}
	}
