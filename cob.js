 const { JSDOM } = jsdom;
 
 app.get('/parse', function(req, res) {
     
    request('http://www.cobalt.io', (error, response, body) => {
    	if (error) {
    		res.sendStatus(500);
     	} else {
    		const dom = new JSDOM(body);
    		console.log(dom);
    		let result =  dom.window.document.getElementsByTagName('h1');

//     		let dom = new JSDOM(body);
//     		let  dom.window.document.getElementsByTagName(tag);
//     		res.json({ tag: dom });
     	}
     });

app.get('/contains', function(req, res) {
 
 	request(`http://${endpoint}`, (error, response, body) => {
 		if (error) {
			console.log('There is an error', error);
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