const request = require('request-promise');

const cheerio = require('cheerio');


request('https://topadvert.net/adwords-account-charge', (error, response, html) => {

	if(!error && response.statusCode == 200) {
		
		
		const $ = cheerio.load(html);
		
		const dollarPrice = $('#not-m-dollar20').text();
		
	}

});