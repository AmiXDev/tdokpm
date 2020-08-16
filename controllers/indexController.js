const request = require('request-promise');
const cheerio = require('cheerio');

exports.homePage = (req, res) => {
	const USDPrice = 'https://topadvert.net/dollar/index.php';
	var usd;
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
    request(USDPrice, function (error, response, body) {
	
	if (!error) {
        var $ = cheerio.load(body),
            usd = $('body').text();
			
		function managementDollarPlan(p, v, rawUSD) {
			const planCalculator = v * p * usd;
			return planCalculator;
		}
		
		ManagementPlan[0].push([Math.ceil(managementDollarPlan(50, 1.18, usd))]);
		ManagementPlan[1].push([Math.ceil(managementDollarPlan(100, 1.16, usd))]);
		ManagementPlan[2].push([Math.ceil(managementDollarPlan(200, 1.15, usd))]);
		ManagementPlan[3].push([Math.ceil(managementDollarPlan(300, 1.14, usd))]);
		ManagementPlan[4].push([Math.ceil(managementDollarPlan(500, 1.12, usd))]);
		ManagementPlan[5].push([Math.ceil(managementDollarPlan(750, 1.11, usd))]);
		ManagementPlan[6].push([Math.ceil(managementDollarPlan(1000, 1.09, usd))]);
		ManagementPlan[7].push([Math.ceil(managementDollarPlan(2000, 1.07, usd))]);



		//console.log(ManagementPlan50,ManagementPlan100,ManagementPlan200,ManagementPlan300,ManagementPlan500,ManagementPlan750,ManagementPlan1000,ManagementPlan2000);
        // logs it to console (of my computer..)    
    } 
	
	 else {
        console.log("لطفا از اتصال اینترنت خود اطمینان حاصل کنید." + error);
    }
	
res.render('index', { title: 'شارژ اکانت گوگل ادوردز در 15 دقیقه با کم ترین تعرفه', usd, ManagementPlan});

    });

};
