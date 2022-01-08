const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config()

const app = express();

app.use(express.json());

app.post('/', function (req, res) {
    let text = req.body.text;
    let to = req.body.to ?? "en";

    const API_KEY = process.env.YANDEX_API_KEY;
	const LANG_CODE_TRANSLATED_TO = to;
    console.log(`Translating ${text} to ${to}`);
	var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + API_KEY + "&text=" + text + "&lang=" + LANG_CODE_TRANSLATED_TO+"&format=plain";
	fetch(url)
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
            res.send({
                translation: json.text[0],
				lang: json.lang});
		})
})

let port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("Listening on " + port);
})