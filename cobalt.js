const express = require('express');
const request = require('request');

const app = express();

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

app.get('/parse', function(req, res) {
	const { endpoint, tag } = req.params;
    
    request(`http://${endpoint}`, (error, response, body) => {
    	if (error) {
    		res.sendStatus(500);
    	} else {
    		let dom = new JSDOM(body);
    		let  dom.window.document.getElementsByTagName(tag);
    		res.json({ tag: dom });
    	}
    });

})

app.get('/contains', function(req, res) {
	const { endpoint, tag, text } = req.params;

	request(`http://${endpoint}`, (error, response, body) => {
		if (error) {
			res.sendStatus(500);
		} else {
			let dom = new JSDOM(body);
			let listOfTags = dom.window.document.getElementsByTagName(tag);
			for (let i = 0; i < listOfTags.length; i++) {
				if (listOfTags[i].innerText === text) {
					res.json({ exists: true });
				} else {
					res.json({ exists: false });
				}
			}
		}
	})

})

app.listen(3000, () => console.log('App is listening on 3000'));


