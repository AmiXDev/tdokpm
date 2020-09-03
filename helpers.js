/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');

// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = require('jalali-moment');

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// Making a static map is really long - this is a handy helper function to make one
exports.staticMap = ([lng, lat]) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=${process.env.MAP_KEY}&markers=${lat},${lng}&scale=2`;

// inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

exports.socialmedias = (social) => fs.readFileSync(`./public/images/icons/${social}.svg`);

exports.signin = (signInIcon) => fs.readFileSync(`./public/images/icons/${signInIcon}.svg`);

exports.loginForm = (signInIcon) => fs.readFileSync(`./public/images/icons/${signInIcon}.svg`);

exports.dashboardSettings = (settings) => fs.readFileSync(`./public/images/icons/${settings}.svg`);


// Some details about the site //
exports.siteName = `تاپ ادورت`;


var siteLogo = 'mrgoogle-logo';
exports.siteLogo = `/images/icons/${siteLogo}.svg`;

var backArrow = 'arrow';
exports.backArrow = `/images/icons/${backArrow}.svg`;

var liveSupport = 'live-support';
exports.liveSupport = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIGNsYXNzPSIiPjxnIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDUxMiAwKSI+PGNpcmNsZSBzdHlsZT0iZmlsbDojMDAwMDAwMDAiIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjI1NiIgZGF0YS1vcmlnaW5hbD0iIzY2MkU1NyIgY2xhc3M9IiIgZGF0YS1vbGRfY29sb3I9IiM2NjJFNTciLz48cGF0aCBzdHlsZT0iZmlsbDojMDAwMDAwMDAiIGQ9Ik0yNzIuNDg3LDUxMS40NTdDNDA2LjE4Niw1MDIuOTU2LDUxMiwzOTEuODQ0LDUxMiwyNTZjMC00LjY5NC0wLjEzNS05LjM1Ni0wLjM4NS0xMy45ODcgIEw0MTguNDAzLDE0OC44TDEwMi44OCwzMTkuMDkybDEwMy40MTYsMTAzLjQxNmwtOS44ODksMTIuODY5TDI3Mi40ODcsNTExLjQ1N3oiIGRhdGEtb3JpZ2luYWw9IiM1OTBGMzgiIGNsYXNzPSIiIGRhdGEtb2xkX2NvbG9yPSIjNTkwRjM4Ii8+PHBhdGggc3R5bGU9ImZpbGw6IzVEQzQ3MiIgZD0iTTE5OS41ODEsOTUuODY5aDExMi44NGM3My4yMSwwLDEzMi41NTksNTkuMzQ5LDEzMi41NTgsMTMyLjU1OWwwLDAgIGMwLDUyLjMxMi0zMC4zMDcsOTcuNTQtNzQuMzE2LDExOS4xMDJsMCwwbC0xNzQuMjU3LDg3Ljg0NmwwLjAwMS03NC40M2MtNzEuNzQ0LTEuNjg1LTEyOS4zODYtNjAuMzY5LTEyOS4zODYtMTMyLjUxOWwwLDAgIEM2Ny4wMjIsMTU1LjIxOCwxMjYuMzcxLDk1Ljg2OSwxOTkuNTgxLDk1Ljg2OXoiIGRhdGEtb3JpZ2luYWw9IiMzNUNDRkYiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiMzNUNDRkYiLz48cGF0aCBzdHlsZT0iZmlsbDojNTE4RUY4IiBkPSJNMzEyLjQyMSw5NS44NjloLTU2LjQ2OXYzMDkuNDg5bDExNC43MTEtNTcuODI4bDAsMGM0NC4wMDktMjEuNTYyLDc0LjMxNS02Ni43OSw3NC4zMTUtMTE5LjEwMmwwLDAgIEM0NDQuOTc5LDE1NS4yMTgsMzg1LjYzMSw5NS44NjksMzEyLjQyMSw5NS44Njl6IiBkYXRhLW9yaWdpbmFsPSIjMDBCQUZGIiBjbGFzcz0iIiBkYXRhLW9sZF9jb2xvcj0iIzAwQkFGRiIvPjwvZz4gPC9zdmc+Cg==`;

// edit profile Icons //

exports.phoneIcon = `<?xml version="1.0"?> <svg class="signinIcon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" fill="#7b7b7bdb" xml:space="preserve"><g transform="matrix(-1 0 0 1 384 0)"><g> <g> <path d="M353.188,252.052c-23.51,0-46.594-3.677-68.469-10.906c-10.906-3.719-23.323-0.833-30.438,6.417l-43.177,32.594 c-50.073-26.729-80.917-57.563-107.281-107.26l31.635-42.052c8.219-8.208,11.167-20.198,7.635-31.448 c-7.26-21.99-10.948-45.063-10.948-68.583C132.146,13.823,118.323,0,101.333,0H30.812C13.823,0,0,13.823,0,30.812 C0,225.563,158.438,384,353.188,384c16.99,0,30.813-13.823,30.813-30.813v-70.323C384,265.875,370.177,252.052,353.188,252.052z M362.667,353.188c0,5.229-4.25,9.479-9.479,9.479c-182.99,0-331.854-148.865-331.854-331.854c0-5.229,4.25-9.479,9.479-9.479 h70.521c5.229,0,9.479,4.25,9.479,9.479c0,25.802,4.052,51.125,11.979,75.115c1.104,3.542,0.208,7.208-3.375,10.938L82.75,165.427 c-2.458,3.26-2.844,7.625-1,11.26c29.927,58.823,66.292,95.188,125.531,125.542c3.604,1.885,8.021,1.49,11.292-0.979 l49.677-37.635c2.51-2.51,6.271-3.406,9.667-2.25c24.156,7.979,49.479,12.021,75.271,12.021c5.229,0,9.479,4.25,9.479,9.479 V353.188z" data-original="#000000" class="active-path"/> </g> </g></g> </svg>`;

exports.userIcon = `<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" class="signinIcon" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" fill="#7b7b7bdb" xml:space="preserve"> <g> <g> <path d="M437.02,330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521,243.251,404,198.548,404,148 C404,66.393,337.607,0,256,0S108,66.393,108,148c0,50.548,25.479,95.251,64.262,121.962 c-36.21,12.495-69.398,33.136-97.281,61.018C26.629,379.333,0,443.62,0,512h40c0-119.103,96.897-216,216-216s216,96.897,216,216 h40C512,443.62,485.371,379.333,437.02,330.98z M256,256c-59.551,0-108-48.448-108-108S196.449,40,256,40 c59.551,0,108,48.448,108,108S315.551,256,256,256z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>`;

exports.emailIcon = `<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" class="signinIcon" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" fill="#7b7b7bdb" xml:space="preserve"> <g> <g> <path d="M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256c68.385,0,132.667-26.625,181.021-74.979 c4.167-4.167,4.167-10.917,0-15.083c-4.167-4.167-10.917-4.167-15.083,0C377.615,466.26,318.688,490.667,256,490.667 C126.604,490.667,21.333,385.396,21.333,256S126.604,21.333,256,21.333S490.667,126.604,490.667,256v21.333 c0,35.292-28.708,64-64,64s-64-28.708-64-64v-96c0-5.896-4.771-10.667-10.667-10.667c-5.896,0-10.667,4.771-10.667,10.667v11.327 c-19.461-26.138-50.319-43.327-85.333-43.327c-58.813,0-106.667,47.854-106.667,106.667S197.188,362.667,256,362.667 c39.229,0,73.206-21.53,91.734-53.163c12.737,31.132,43.271,53.163,78.932,53.163c47.052,0,85.333-38.281,85.333-85.333V256 C512,114.844,397.156,0,256,0z M256,341.333c-47.052,0-85.333-38.281-85.333-85.333s38.281-85.333,85.333-85.333 s85.333,38.281,85.333,85.333S303.052,341.333,256,341.333z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>`;

exports.globalIcon = `<svg class="signinIcon" viewBox="0 0 368 368" fill="#7b7b7bdb" xmlns="http://www.w3.org/2000/svg"><path d="m347.816406 100.367188c-30.511718-59.511719-92.464844-100.367188-163.816406-100.367188-71.375 0-133.335938 40.871094-163.839844 100.425781-.121094.238281-.265625.453125-.359375.703125-12.632812 24.925782-19.800781 53.070313-19.800781 82.871094 0 29.808594 7.167969 57.953125 19.800781 82.871094.09375.25.238281.464844.359375.703125 30.496094 59.554687 92.464844 100.425781 163.839844 100.425781 71.351562 0 133.304688-40.847656 163.816406-100.367188.136719-.265624.296875-.503906.398438-.785156 12.625-24.917968 19.785156-53.054687 19.785156-82.847656s-7.160156-57.929688-19.785156-82.847656c-.109375-.28125-.261719-.519532-.398438-.785156zm-12.257812 155.632812h-70.320313c3.90625-19.710938 6.226563-41.265625 6.664063-64h79.691406c-1.082031 22.824219-6.699219 44.433594-16.035156 64zm-151.558594 96c-25.304688 0-48-32.441406-60.871094-80h121.742188c-12.871094 47.558594-35.566406 80-60.871094 80zm-64.695312-96c-4.136719-19.671875-6.640626-41.304688-7.121094-64h143.640625c-.488281 22.695312-2.992188 44.328125-7.121094 64zm-102.898438-64h79.691406c.445313 22.734375 2.757813 44.289062 6.664063 64h-70.320313c-9.335937-19.566406-14.953125-41.175781-16.035156-64zm16.035156-80h70.320313c-3.90625 19.710938-6.226563 41.265625-6.664063 64h-79.691406c1.082031-22.824219 6.699219-44.433594 16.035156-64zm151.558594-96c25.304688 0 48 32.441406 60.871094 80h-121.742188c12.871094-47.558594 35.566406-80 60.871094-80zm64.695312 96c4.136719 19.664062 6.640626 41.304688 7.121094 64h-143.640625c.488281-22.695312 2.992188-44.335938 7.121094-64zm23.207032 64c-.445313-22.734375-2.757813-44.289062-6.664063-64h70.320313c9.335937 19.566406 14.953125 41.175781 16.035156 64zm54.929687-80h-65.214843c-8.097657-31.742188-20.511719-57.632812-35.722657-74.496094 42.488281 10.96875 78.425781 38.089844 100.9375 74.496094zm-184.734375-74.496094c-15.203125 16.863282-27.617187 42.753906-35.722656 74.496094h-65.214844c22.519532-36.40625 58.457032-63.527344 100.9375-74.496094zm-100.929687 250.496094h65.207031c8.097656 31.742188 20.511719 57.632812 35.722656 74.496094-42.480468-10.96875-78.417968-38.097656-100.929687-74.496094zm184.734375 74.496094c15.203125-16.863282 27.617187-42.753906 35.722656-74.496094h65.207031c-22.511719 36.398438-58.449219 63.527344-100.929687 74.496094zm0 0"/></svg>`;

exports.addressIcon = `<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" class="signinIcon" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 480 480" style="enable-background:new 0 0 480 480;" fill="#7b7b7bdb" xml:space="preserve"> <g> <g> <g> <path d="M240,0C142.798,0,64,78.798,64,176c0,94.576,162.896,292.712,169.832,301.096c1.52,1.839,3.782,2.904,6.168,2.904 c2.386,0,4.648-1.065,6.168-2.904C253.104,468.712,416,270.576,416,176C416,78.798,337.202,0,240,0z M240,459.288 C209.896,421.712,80,254.976,80,176c0.101-88.324,71.677-159.899,160-160c88.324,0.101,159.899,71.676,160,160 C400,254.96,270.104,421.704,240,459.288z"/> <path d="M348.88,145.664l-104-80c-2.877-2.214-6.883-2.214-9.76,0l-104,80c-3.499,2.697-4.149,7.721-1.452,11.22 c1.514,1.964,3.852,3.115,6.332,3.116h24v88c0,4.418,3.582,8,8,8h144c4.418,0,8-3.582,8-8v-88h24 c4.418-0.002,7.998-3.586,7.996-8.004C351.995,149.516,350.844,147.178,348.88,145.664z M256,240h-32v-48h32V240z M312,144 c-4.418,0-8,3.582-8,8v88h-32v-56c0-4.418-3.582-8-8-8h-48c-4.418,0-8,3.582-8,8v56h-32v-88c0-4.418-3.582-8-8-8h-8.48 L240,82.096L320.48,144H312z"/> </g> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>`;



exports.copyright = `<svg viewBox="0 -28 512.00002 512" fill="red" class="copyright-icons" xmlns="http://www.w3.org/2000/svg"><path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"/></svg>`;
// ---*--- //




exports.socialmediasIcon = [
	{ slug: 'https://www.facebook.com/g.topadvert', alt: 'فیسبوک مستر گوگل', icon: 'facebook',},
	{ slug: 'https://t.me/ineedsupport', alt:'پشتیبانی مستر گوگل', icon: 'telegram', },
	{ slug: 'https://www.instagram.com/top_advert/', alt:'اینستاگرام آقای گوگل', icon: 'instagram-symbol', },
	{ slug: 'https://twitter.com/TopAdvertG', alt:'توییتر مستر گوگل', icon: 'twitter', },
	{ slug: 'https://www.linkedin.com/in/top-advert-a82a33148/', alt: 'لینکدین آقای گوگل', icon: 'linkedin', },
	{ slug: 'https://www.aparat.com/topadvert.net', alt: 'آقای گوگل', icon: 'play-button', },
];


exports.menu = [
	{ slug: '/', title: 'صفحه اول', icon: 'home', },
	{ slug: '', title:'خدمات ادوردز', icon: 'google', },
	{ slug: '', title:'بررسی سئو', icon: 'search-analytics', },
	{ slug: '/blog', title:'مقالات آموزشی', icon: 'content', },
	{ slug: '/', title: 'تماس با ما', icon: 'contact-us', },
	{ slug: '/users/signin', title: 'فرم ثبت نام', icon: 'contact-us', },
];


exports.navbarBottomItems = [
	{ slug: '/users/login', title: 'پروفایل', icon: 'user', },
	{ slug: '/', title:'جستجو', icon: 'search', },
	{ slug: '/', title:'شارژ اکانت', icon: 'google-colorful', },
	{ slug: '/blog', title:'مطالب', icon: 'content', },
	{ slug: '/', title: 'خانه', icon: 'home', },
];

exports.navbarBottomItemsForUser = [
	{ slug: '/users/dashboard', icon: 'man', },
	{ slug: '/search', title:'جستجو', icon: 'search', },
	{ slug: '/account-charge', title:'شارژ اکانت', icon: 'google-colorful', },
	{ slug: '/articles', title:'مطالب', icon: 'content', },
	{ slug: '/', title: 'خانه', icon: 'home', },
];

exports.navbarBottomItemsForBlog = [
	{ slug: '', icon: 'share-socials', title: 'اشتراک گذاری',},
	{ slug: '', icon: 'comment', title: 'نظرات دادن', },
	{ slug: '', icon: 'settings', title: 'تنظیمات متن', },
];

exports.signIn = [
	{ icon: 'signin-user', type: 'text', label: 'نام و نام خانوادگی', name: 'fullName', },
	{ icon: 'phone', type: 'text', label: 'تلفن همراه', name: 'phoneNo', },
	{ icon: 'password', type: 'password', label: 'کلمه عبور', name: 'password', },
];

exports.login = [
	{ icon: 'phone', type: 'text', label: 'تلفن همراه', name: 'phoneNo', },
	{ icon: 'password', type: 'password', label: 'کلمه عبور', name: 'password', },
];

exports.settingMenu = [
	{ slug: '/', title: 'سفارشات', icon: 'orders-history', },
	{ slug: '/', title: 'چت آنلاین', icon: 'online-chat', },
	{ slug: '/users/editProfile', title: 'ویرایش اطلاعات', icon: 'user-edit', },
	{ slug: '/users/passwordChange', title: 'تغییر کلمه عبور', icon: 'passwordChange', },
	{ slug: '/', title: 'ثبت تیکت', icon: 'ticket', },
	{ slug: '/users/logout', title: 'خروچ', icon: 'logout-dashboard', },
];

exports.editProfile = [
	{ icon: 'at', type: 'email', label: 'پست الکترونیکی', name: 'email', },
	{ icon: 'global', type: 'webSite', label: 'وب سایت', name: 'webSite', },
	{ icon: 'global', type: 'webSite', label: 'وب سایت', name: 'webSite', },
];

exports.passwordChange = [
	{ icon: 'password', type: 'password', label: 'کلمه عبور جدید', name: 'password', },
	{ icon: 'multimedia', type: 'password', label: 'تایید کلمه عبور', name: 'password-confirm', },
];

exports.onlineChat = [
	{ icon: 'signin-user', class: 'nameInput', type: 'text', label: 'نام و نام خانوادگی', },
	{ icon: 'at', class: 'emailInput', type: 'email', label: 'پست الکترونیکی', },
	{ icon: 'phone', class: 'phoneInput', type: 'text', label: 'شماره تماس', },
];