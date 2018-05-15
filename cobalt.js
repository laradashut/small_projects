const express = require('express');
const request = require('request');

const app = express();

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

app.get('/parse', (req, res) => {
	const { endpoint, tag } = req.query;

    request(`http://${endpoint}`, (error, response, body) => {
    	if (error) {
    		res.sendStatus(500);
    	} else {
    		let dom = new JSDOM(body, {includeNodeLocations: true});
 			let arrayOfTags = [];
    		let allTags =  dom.window.document.querySelectorAll(tag);
    		for (let i = 0; i < allTags.length; i++) {
    			let temp = {};
    			temp.innerText = allTags[i].textContent;
    			temp.innerHtml = allTags[i].innerHTML;
    			arrayOfTags.push(temp);
    		}
    		let result = {};
    		result[tag] = arrayOfTags;
    		res.json(result);
    	}
    });

});

app.get('/contains', (req, res) => {
	const { endpoint, tag, text } = req.query;

	request(`http://${endpoint}`, (error, response, body) => {
		if (error) {
			res.sendStatus(500);
		} else {
			let dom = new JSDOM(body, {includeNodeLocations: true});
 			let arrayOfTags = [];
    		let allTags =  dom.window.document.querySelectorAll(tag);
    		for (let i = 0; i < allTags.length; i++) {
    	    	arrayOfTags.push(allTags[i].textContent);
    		}
    		let result = {};
			for (let i = 0; i < arrayOfTags.length; i++) {
				if (arrayOfTags[i] === text) {
					result.exists = true;
				} else {
					result.exists = false;
				}
			}
			res.send(result);
		}
	});

});

app.listen(3000, () => console.log('App is listening on 3000'));


