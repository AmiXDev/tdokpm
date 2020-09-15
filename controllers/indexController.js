const request = require('request-promise');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');
const Admin = mongoose.model('Admin');
const MongoClient = require('mongodb').MongoClient;
const momentJalali = require('moment-jalaali');
const dbFunctions = require('../dbStore/dbFunctions');
const assert = require('assert');
const result = [46, 35, 34];
var Chart = require('chart.js');
const moment = require('moment-timezone');

exports.homePage = (req, res) => {
	const minutes = 60;
	const the_interval = minutes * 60 * 1000;
	setInterval(function () {
		const USDPrice = 'https://topadvert.net/dollar/index.php';
		var usd;

		request(USDPrice, function (error, response, body) {
			if (!error) {
				MongoClient.connect(process.env.DATABASE, (err, db) => {
					assert.equal(null, err);
					var dollarCollection = db.collection('dollarChart');
					var $ = cheerio.load(body),
						usd = $('body').text();
					var utc = new Date();
					utc.setMinutes( utc.getMinutes() + 270);

					time = utc.toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/[^,]+/g, "'$&'");
					dollarCollection.insertOne({ number: usd, date: time }, function (err, res) {
						assert.equal(null, err);
						console.log('dollar price inserted into the db!!!' + momentJalali().format('jYYYY/jM/jD HH:mm:ss ' + usd))
						db.close();
					})
				
				});
			} else {
				console.log("لطفا از اتصال اینترنت خود اطمینان حاصل کنید." + error);
			}
		});
	}, the_interval);

	
	const usdLivePriceUrl = 'https://topadvert.net/dollar/index.php';
	var usdLive;

	var ManagementPlan = [
		dollar50 = [],
		dollar100 = [],
		dollar200 = [],
		dollar300 = [],
		dollar500 = [],
		dollar750 = [],
		dollar1000 = [],
		dollar2000 = []
	];
	request(usdLivePriceUrl, function (error, response, body) {
		if (!error) {
			var $ = cheerio.load(body),
				usdLive = $('body').text();
		} else {
			console.log("لطفا از اتصال اینترنت خود اطمینان حاصل کنید." + error);
		}

		function managementDollarPlan(p, v, rawUSD) {
			const planCalculator = v * p * usdLive;
			return planCalculator;
		}

		ManagementPlan[0].push([Math.ceil(managementDollarPlan(50, 1.18, usdLive))]);
		ManagementPlan[1].push([Math.ceil(managementDollarPlan(100, 1.16, usdLive))]);
		ManagementPlan[2].push([Math.ceil(managementDollarPlan(200, 1.15, usdLive))]);
		ManagementPlan[3].push([Math.ceil(managementDollarPlan(300, 1.14, usdLive))]);
		ManagementPlan[4].push([Math.ceil(managementDollarPlan(500, 1.12, usdLive))]);
		ManagementPlan[5].push([Math.ceil(managementDollarPlan(750, 1.11, usdLive))]);
		ManagementPlan[6].push([Math.ceil(managementDollarPlan(1000, 1.09, usdLive))]);
		ManagementPlan[7].push([Math.ceil(managementDollarPlan(2000, 1.07, usdLive))]);
		//const priceTracker = await dollarCollection.find(); 
		
		//var dollarChart = [];


		// ChartJs



		var resultArrayForDollar = [];
		var resultArrayForDate = [];

		MongoClient.connect(process.env.DATABASE, function(err, db) {
		 	assert.equal(null, err);
			 var cursor = db.collection("dollarChart").find();
			 cursor.forEach(function(data, err) {
				 assert.equal(null, err);
				 resultArrayForDollar.push(data.number);
				 resultArrayForDate.push(data.date);
			 }, async function() {
				 db.close();

				 const blogPosts = await Blog.find().populate('authors fullName');
				 res.render('index', { title: 'شارژ اکانت گوگل ادوردز در 15 دقیقه با کم ترین تعرفه', usdLive, ManagementPlan, resultArrayForDollar, resultArrayForDate, blogPosts });
			 });
		});
	});
};