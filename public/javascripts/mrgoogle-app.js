import '../sass/style.scss';
import $ from 'jquery';
window.jQuery = $; window.$ = $;
import Slideout from './modules/slideout';
import Swiper from './modules/swiper.min';
import moment from 'jalali-moment'
import "@babel/polyfill";



const slideout = new Slideout({
	panel: document.getElementById('panel'),
	menu: document.getElementById('menu'),
	padding: 256,
	tolerance: 70,
	side: 'right',
});
// Toggle button
document.querySelector('.toggle-button').addEventListener('click', function() {
slideout.toggle();
});

/* header fixed and translated */
const fixed = document.querySelector('.fixed-header');

slideout.on('translate', function(translated) {
	fixed.style.transform = `translateX(${translated}px)`;
});

slideout.on('beforeopen', function() {
	fixed.style.transition = 'transform 300ms ease';
	fixed.style.transform = 'translateX(-256px)';
	//    fixed.style.boxShadow = 'none';
	fixed.style.borderRight = '1px solid #d2d1d1';
});

slideout.on('beforeopen', function() {
	document.getElementById('panel').classList.add('layoff');
});

slideout.on('beforeclose', function() {
	fixed.style.transition = 'transform 300ms ease';
	fixed.style.transform = 'translateX(0px)';
});

slideout.on('open', function() {
	fixed.style.transition = '';
});

slideout.on('close', function() {
	fixed.style.transition = '';
	document.getElementById('panel').classList.remove('layoff');
	fixed.style.borderRight = '';
  //	   fixed.style.boxShadow = '';
});

/* close on open */
function close(eve) {
	eve.preventDefault();
	slideout.close();
}

slideout
	.on('beforeopen', function() {
	this.panel.classList.add('panel-open');
	})
	.on('open', function() {
	this.panel.addEventListener('click', close);
	})
	.on('beforeclose', function() {
	this.panel.classList.remove('panel-open');
	this.panel.removeEventListener('click', close);
});

/* translated navbarBottomItems */

const translatedBottomNavbar = document.querySelector(
  '.navbar-bottom-container'
);

slideout.on('translate', function(translated) {
	translatedBottomNavbar.style.transform = `translateX(${translated}px)`;
});

slideout.on('beforeopen', function() {
	translatedBottomNavbar.style.transition = 'transform 300ms ease';
	translatedBottomNavbar.style.transform = 'translateX(-256px)';
	//  translatedBottomNavbar.style.boxShadow = 'none';
	translatedBottomNavbar.style.borderRight = '1px solid #d2d1d1';
});

slideout.on('beforeclose', function() {
	translatedBottomNavbar.style.transition = 'transform 300ms ease';
	translatedBottomNavbar.style.transform = 'translateX(0px)';
});

slideout.on('close', function() {
	translatedBottomNavbar.style.transition = '';
	translatedBottomNavbar.style.borderRight = '';
	translatedBottomNavbar.style.boxShadow = '';
});


/* swiper Slider */

var mySwiper = new Swiper('.swiper-container', {
	slidesPerView: 'auto',
	spaceBetween: 10,
	centeredSlides: true,
	direction: 'horizontal',
	loop: false,
	nextButton: false,
	prevButton: false,
	watchSlidesProgress: true
	
});


/* translated navbarBottomItems FOR BLOG */

const translatedBottomNavbarBLog = document.querySelector(
	'.navbar-bottom-container'
  );
  
  slideout.on('translate', function(translated) {
	translatedBottomNavbarBLog.style.transform = `translateX(${translated}px)`;
  });
  
  slideout.on('beforeopen', function() {
	translatedBottomNavbarBLog.style.transition = 'transform 300ms ease';
	translatedBottomNavbarBLog.style.transform = 'translateX(-256px)';
	  //  translatedBottomNavbar.style.boxShadow = 'none';
	  translatedBottomNavbarBLog.style.borderRight = '1px solid #d2d1d1';
  });
  
  slideout.on('beforeclose', function() {
	translatedBottomNavbarBLog.style.transition = 'transform 300ms ease';
	translatedBottomNavbarBLog.style.transform = 'translateX(0px)';
  });
  
  slideout.on('close', function() {
	translatedBottomNavbarBLog.style.transition = '';
	translatedBottomNavbarBLog.style.borderRight = '';
	translatedBottomNavbarBLog.style.boxShadow = '';
  });

// admin live chat support
import Admin from './modules/admin';



// client live chat support
// Initialize variables
var $window = $(window);
var $messages = $('.messages'); //Message area
var $inputMessage = $('.inputMessage');  //Text area to input msg
var $nameInput = $('.nameInput') //Name input
var $phoneInput = $('.phoneInput') //Phone number input
var $emailInput = $('.emailInput') //Email input
var $form = $('.formArea'); // Details form
var $widgetBox = $('.contentArea'); //Widget box
var $Input = $('.inputFields'); //Input fields in form
var $chatBox = $('.chatArea'); //Chat page after filling form
var $Typing = $(".typing") //Typing notification
var $newMsg = $('.msg_push_new'); //Dummy to push new msgs
var $oldMsg = $('.msg_push_old'); //Dummy to push msg history 

var socket = io(); //io socket
var typing = false; //Boolean to check if user is typing
var timeout = undefined; //Timeout to monitor typing
var id = localStorage.getItem("roomID"); //Room ID in localstorage
var active = sessionStorage.getItem('active'); //Check if chat has been opened. 

if (active && id) {
	$form.hide();
	$chatBox.show();
	socket.emit('add user', {
		isNewUser: false,
		roomID: id
	});
	$widgetBox.show();
}

$('.msg_head').click(function() {
	$widgetBox.fadeToggle('fast');
	if (id != null && !active) {
		socket.emit('add user', {
			isNewUser: false,
			roomID: id
		});
		$form.hide();
		$chatBox.show();
		$inputMessage.focus();
		sessionStorage.setItem('active', true);
		active = true;
	}
});

$Input.submit(function() {
	$form.hide();
	$chatBox.show();
	$inputMessage.focus();
	sessionStorage.setItem('active', true);
	socket.emit('add user', {
		isNewUser: true,
		Name: $nameInput.val().trim(),
		Email: $emailInput.val().trim(),
		Phone: $phoneInput.val().trim()
	});
});

$inputMessage.keypress(function(event) {
	if (event.which !== 13) {
		if (typing === false && $inputMessage.is(":focus")) {
			typing = true;
			socket.emit("typing", {
				isTyping: true,
				roomID: id,
				person: "Client"
			});
		} else {
			clearTimeout(timeout);
			timeout = setTimeout(timeoutFunction, 2000);
		}
	} else {
		sendMessage();
		clearTimeout(timeout);
		timeoutFunction();
	}
})

$messages.on("scroll", function() {
	if ($messages.scrollTop() == 0)
		socket.emit("more messages", {});
})

socket.on('roomID', function(roomID) {
	id = roomID;
	localStorage.setItem("roomID", roomID);
});

socket.on('chat message', function(data) {
	var sender;
	if (data.isAdmin)
		sender = "msg_a"
	else
		sender = "msg_b"
	var $messageBodyDiv = $('<div class="' + sender + '">' + data.msg + '<span class="timestamp">' +
		((data.timestamp).toLocaleString().substr(15, 6)) + '</span></div>').insertBefore($newMsg);
	$messages[0].scrollTop = $messages[0].scrollHeight;
});

socket.on('typing', function(data) {
	if (data.isTyping && data.person != 'Client')
		$Typing.append("پشتیبان در حال نوشتن میباشد....");
	else
		$Typing.text('');
});

socket.on('chat history', function(data) {
	var len = data.history.length;
	for (var i = len - 1; i >= 0; i--)
		addMessages(data.history[i], false);
});

socket.on('more chat history', function(data) {
	var len = data.history.length;
	for (var i = 0; i < len; i++)
		addMessages(data.history[i], true);
});

socket.on('log message', function(text) {
	var time = ("" + new Date());
	var $messageDiv = $('<div class="msg_a"><span class="admin"></span>' + text + '<span class="timestamp">' +
		(time.toLocaleString().substr(15, 6)) + '</span></div>').insertBefore($newMsg);
	$messages[0].scrollTop = $messages[0].scrollHeight;
});

socket.on('disconnect', function() {
	console.log("Disconnected!");
	$inputMessage.prop('disabled', true);
	$inputMessage.prop('placeholder', "اینترنت شما قطع میباشد. منتظر اتصال مجدد باشید.");
});

socket.on('reconnect_failed', function() {
	console.log("Reconnection Failed!");
	$inputMessage.prop('placeholder', "اتصال اینترنت با مشکل مواجه شد. مجددا وارد شوید.");
});

socket.on('reconnect', function() {
	setTimeout(function() {
		console.log("Reconnected!");
		$inputMessage.prop('disabled', false);
		$inputMessage.prop('placeholder', "پیام خود را اینجا وارد کنید.");
		if (active && id)
			socket.emit('add user', {
				isNewUser: false,
				roomID: id
			});
	}, 4000);
});

function timeoutFunction() {
	typing = false;
	socket.emit("typing", {
		isTyping: false,
		roomID: id,
		person: "Client"
	});
}

function sendMessage() {
	var message = $inputMessage.val();
	// Prevent markup from being injected into the message
	message = cleanInput(message);
	// if there is a non-empty message
	if (message) {
		$inputMessage.val('');
		var time = ("" + new Date());
		// tell server to execute 'new message' and send along one parameter
		socket.emit('chat message', {
			roomID: "null",
			msg: message,
			timestamp: time
		});		
		var $messageBodyDiv = $('<div class="msg_b">' + message + '<span class="timestamp">' +
			(time.toLocaleString().substr(15, 6)) + '</span></div>').insertBefore($newMsg);
		$messages[0].scrollTop = $messages[0].scrollHeight;
	}
}

function addMessages(data, getMore) {
	var sender;
	if (data["who"])
		sender = "msg_a"
	else
		sender = "msg_b"
	var $messageBodyDiv = $('<div class="' + sender + '"><span class="admin"></span>' + data["what"] + '<span class="timestamp">' +
		(data["when"]).toLocaleString().substr(15, 6) + '</span></div>');
	if (getMore) {
		$messageBodyDiv.insertAfter($oldMsg);
		$messages[0].scrollTop += $messageBodyDiv.outerHeight();
	} else {
		$messageBodyDiv.insertBefore($newMsg);
		$messages[0].scrollTop = $messages[0].scrollHeight;
	}
}

// Prevents input from having injected markup
function cleanInput(input) {
	return $('<div/>').text(input).text();
}

// minimize support tab

const minimizeIcon = document.querySelector('.minimize-chat-support');

minimizeIcon.addEventListener('click', () => {
	document.querySelector('.contentArea').style.display = 'none';
});



// moment-js- jalaali //
const dateInJalaali = document.querySelectorAll('.createdDate');

dateInJalaali.forEach( function (eachDate) {
	const dateInText = eachDate.textContent;

	eachDate.innerText = moment.from(`${dateInText}`, 'YYYY-M-D HH:mm').locale('fa').fromNow();
})


const pageUrl = window.document.location.href;
const pageTitle = window.document.title;
const image = window.document.querySelector('.featured-image').src;
const btn = document.querySelector('body > nav.navbar-bottom-container > ul > li:nth-child(1)');


const shareData = {
	title: pageTitle,
	url:  pageUrl
}


btn.addEventListener('click', () => {
navigator.share(shareData)
	.then(() =>
	console.log('MDN shared successfully')
	)
	.catch((e) =>
	console.log('Error: ' + e)
	)
});

// const click = document.querySelector('.clicking');

// $(document)('click', '.clicking', () => {
// 	console.log('clicked');
// })

// var ctx = document.getElementById('chart-preview').getContext('2d');
// var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',

//     // The data for our dataset
//     data: {
//         labels: '#{resultArrayForDate}',
//         datasets: [{
//             label: 'قیمت حواله دلار زنده',
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: '#{resultArrayForDollar}'
//         }]
//     },

//     // Configuration options go here
//     options: {}
// });


// auto height //

$(".inner-card--text").hover(function() {
   
    x = $(this).find(".text-description").height();
$(this).parent('.wrapper').css({
    'height': x + 'px'
   });
 }, function() {
  $(this).parent('.wrapper').css({
    'height': 'auto'
  });
});