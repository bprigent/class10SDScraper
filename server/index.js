const express = require("express");
const axios = require('axios');
const cheerio = require('cheerio');

const PORT = process.env.PORT || 3001;
const app = express();


// function get return title and description
async function getTitleAndDescription(url) {
  try {
    // Fetch HTML of the page
    const { data: html } = await axios.get(url);

    // Parse the HTML using Cheerio
    const $ = cheerio.load(html);

    // Extract title and description
    const title = $('head title').text();
    const metaDescription = $('meta[name="description"]').attr('content');

    return {
      title: title,
      description: metaDescription
    };
  } catch (error) {
    console.error('Failed to fetch meta data:', error);
    return null;
  }
}







// for parsing application/json
app.use(express.json());



app.post('/fetch-meta', async (req, res) => {
  const url = req.body.url;
  
  if (!url) {
    return res.status(400).send({ error: 'URL not provided' });
  }

  try {
    const metaData = await getTitleAndDescription(url);
    res.send(metaData);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch meta data' });
  }
});









//basic API call
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});






// port listening thing
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});