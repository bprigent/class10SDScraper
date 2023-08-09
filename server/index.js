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


app.use((req, res, next) => {
  console.log('CORS middleware triggered');
  next();
});

// Use the cors middleware with the specified options
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log('JSON parsing middleware triggered');
  next();
});

// for parsing application/json
app.use(express.json());


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







async function fetchDescription(url) {
  try {
      // Fetch HTML of the page
      const { data: html } = await axios.get(url);
      // Parse the HTML using Cheerio
      const $ = cheerio.load(html);
      // Extract description
      let description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content');
      // If no meta description is found, provide a default message
      if (!description) {
          description = 'No description provided for this page.';
      }
      return description;
  } catch (error) {
      throw new Error('Failed to fetch meta data');
  }
}

app.post('/fetch-description', async (req, res) => {
  
  console.log("Entered /fetch-description");
  
  const url = req.body.url;
  
  if (!url) {
    return res.status(400).json({ error: 'URL not provided' });
  }

  try {
    const description = await fetchDescription(url);
    console.log(description);
    res.json({ description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});








// code for starting the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

