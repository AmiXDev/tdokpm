const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const blogController = require('../controllers/blogController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/',  catchErrors(indexController.homePage));
router.get('/blog', catchErrors(blogController.blogPost));


router.get('/blog/:slug', catchErrors(blogController.getBlogPostsBySlug));

module.exports = router;



/*

// Do work here
router.get('/', function(req, res, next) {
	
	const dollar20 = 'https://topadvert.net/adwords-account-charge';
	var usd;
	request(dollar20, function (error, response, body) {
		
	if (!error) {
        // using cheerio module to load body of html req document and scrape the data
        var $ = cheerio.load(body),
            usd = $('#not-m-dollar20').text();

        // logs it to console (of my computer..)    
        console.log(usd);
    } 
	
	 else {
        console.log("We’ve encountered an error: " + error);
    }
	

}, indexController.homePage);*/
