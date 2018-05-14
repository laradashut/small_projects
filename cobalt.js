const express = require('express');
const request = require('request');

const app = express();

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

app.get('/parse', function(req, res) {
	// const { endpoint, tag } = req.params;
    
    request('http://www.cobalt.io', (error, response, body) => {
    	if (error) {
    		console.log('There is an error', error);
    	} else {
    		const dom = new JSDOM(body);
    		console.log('document', dom.window.document.getElementsByTagName('h1'));

    	}
    });

})

app.get('/contains', function(req, res) {
	const { endpoint, tag, text } = req.params;

	request(`http://${endpoint}`, (error, response, body) => {
		if (error) {
			console.log('There is an error', error);
		} else {
			const dom = new JSDOM(body);
			var listOfTags = dom.window.document.getElementsByTagName(`${tag}`);
			for (let i = 0; i < listOfTags.length; i++) {
				if (listOfTags[i].innerText === `${text}`) {
					res.send({exists: true});
				} else {
					res.send({exists: false});
				}
			}
		}
	})

})

app.listen(3000, () => console.log('App is listening on 3000'));


