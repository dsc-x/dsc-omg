const fetch = require('node-fetch');
const fs = require('fs');
const builder = require('xmlbuilder');

let prerenderJson = [
	{
		url: '/',
		title: 'DSC OMG 2020'
	},
	{
		url: '/attending',
		title: 'Attending - DSC OMG 2020'
	},
	// {
	// 	url: '/registration',
	// 	title: 'Registration - DSC OMG 2020'
	// },
	{
		url: '/faq',
		title: 'FAQ - DSC OMG 2020'
	},
	// {
	// 	url: '/faq/communityguidelines',
	// 	title: 'Community Guidelines - DSC OMG 2020'
	// },
	{
		url: '/speakers',
		title: 'Speakers - DSC OMG 2020'
	},
	{
		url: '/map',
		title: 'Event Map - DSC OMG 2020'
	},
	{
		url: '/schedule',
		title: 'Schedule - DSC OMG 2020'
	}
];

const base = '#';
// const dbUrl = 'https://gdg-kl.firebaseio.com/events_site/ioxkl19';
const getSpeakers = new Promise((resolve) => {
	// fetch(`${dbUrl}/speakers.json`)
	// 	.then((response) => {
	// 		response.json().then((data) => {
	// 			let speakers = [];
	// 			speakers = Object.keys(data).map(item => ({
	// 				url: `/speakers/${item}`,
	// 				title: `${data[item].name} - Speakers - DSC OMG 2020`
	// 			}));
	// 			resolve(speakers);
	// 		});
	// 	});
	resolve([]);
});

const getSessions = new Promise((resolve) => {
	// fetch(`${dbUrl}/sessions.json`)
	// 	.then((response) => {
	// 		response.json().then((data) => {
	// 			let sessions = [];
	// 			sessions = Object.keys(data).map(item => ({
	// 				url: `/schedule/${item}`,
	// 				title: `${data[item].title} - Schedule - DSC OMG 2020`
	// 			}));
	// 			resolve(sessions);
	// 		});
	// 	});
	resolve([]);
});

Promise.all([getSpeakers, getSessions]).then((values) => {
	const data = [...prerenderJson, ...values[0], ...values[1]];
	fs.writeFile('src/prerender-urls.json', JSON.stringify(data, null, 4), () => {});
	const lastMod = new Date().toISOString();
	let xml = builder.create('urlset', { version: '1.0', encoding: 'UTF-8' });
	data.forEach(item => {
		xml.ele('url')
			.ele('loc')
			.txt(`${base}${item.url}`)
			.up()
			.ele('lastmod')
			.text(lastMod)
			.up();
	});
	xml.end({ pretty: true });
	// eslint-disable-next-line no-console
	console.log('\x1b[32m%s\x1b[0m', `Pre-render config generated successfully: ${data.length} routes generated.`);
});
