const express = require("express");
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

// Specify allowed origins
const corsOptions = {
  origin: 'http://localhost:3000',  // your frontend server
  optionsSuccessStatus: 200
};

// Use the cors middleware with the specified options
app.use(cors(corsOptions));

// function to fetch title
async function fetchTitle(url) {
  try {
    // Fetch HTML of the page
    const { data: html } = await axios.get(url);
    // Parse the HTML using Cheerio
    const $ = cheerio.load(html);
    // Extract title
    const title = $('head title').text();
    return title;
  } catch (error) {
    throw new Error('Failed to fetch meta data');
  }
}

// for parsing application/json
app.use(express.json());

app.post('/fetch-title', async (req, res) => {
  const url = req.body.url;
  
  if (!url) {
    return res.status(400).json({ error: 'URL not provided' });
  }

  try {
    const title = await fetchTitle(url);
    res.json({ title });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// I noticed that the code for starting the server was missing in your snippet, 
// so I'm adding it back in here.
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

