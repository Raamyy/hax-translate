const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

app.post('/', async function (req, res) {
  try {
    const text = req.body.text;
    const to = req.body.to ?? "en";

    const API_KEY = process.env.LANGBLY_API_KEY;
    const url = "https://api.langbly.com/language/translate/v2";

    console.log(`Translating ${text} to ${to}`);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY
      },
      body: JSON.stringify({
        q: text,
        target: to
      })
    });

    if (!response.ok) {
      throw new Error(`Langbly error: ${response.status}`);
    }

    const json = await response.json();

    const translation = json?.data?.translations?.[0];
	
 	console.log(`Translated ${text} to ${translation?.translatedText}`);
	  
    res.send({
      translation: translation?.translatedText,
      detectedLanguage: translation?.detectedSourceLanguage
    });

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Translation failed" });
  }
});

let port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("Listening on " + port);
})
