const express = require("express");
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',  // your frontend server
  optionsSuccessStatus: 200
};
app.use((req, res, next) => {
  next();
});
app.use(cors(corsOptions));
app.use((req, res, next) => {
  next();
});
app.use(express.json());










////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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













////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get description data
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
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: 'URL not provided' });
  }

  try {
    const description = await fetchDescription(url);
    res.json({ description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});










////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// scrape new URLs from passed URL

async function scrapeUrlsFromPage(url) {
  console.log(`Attempting to scrape URLs from: ${url}`);
  try {
      // Fetch HTML of the page
      const { data: html } = await axios.get(url);
      // Parse the HTML using Cheerio
      const $ = cheerio.load(html);
      // Get domain of the original URL to check for internal links
      const baseDomain = new URL(url).hostname;
      // Use a Set to store URLs and ensure uniqueness
      const urlsSet = new Set();
      

      // Gather all anchor tags, filter for internal links
      $('a')
          .map((i, link) => $(link).attr('href'))
          .get()
          .forEach(href => {
              try {
                  const fullUrl = new URL(href, url);
                  
                  // Check if the link is internal
                  if (fullUrl.hostname !== baseDomain) return;

                  // Remove URL parameters and anchors
                  fullUrl.search = '';
                  fullUrl.hash = '';

                  // Ensure the link ends with a '/'
                  const urlString = fullUrl.toString().endsWith('/') ? fullUrl.toString() : fullUrl.toString() + '/';

                  urlsSet.add(urlString);
              } catch (e) {
                  // Skip if URL is not valid
              }
          });

    // Convert Set to Array, and limit to first 25 links
    const newUrls = [...urlsSet].slice(0, 20);

    return newUrls;
  } catch (error) {
      console.error(`Error scraping URLs: ${error.message}`);
      throw new Error(`Failed to get the URLs: ${error.message}`);
  }
}



app.post('/scrape-urls-from-page', async (req, res) => {
  const url = req.body.url;
  console.log(`Received request to scrape URL: ${url}`);

  if (!url) {
    console.warn('URL not provided in the request.');
    return res.status(400).json({ error: 'URL not provided' });
  }

  try {
    const newUrls = await scrapeUrlsFromPage(url);
    console.log(`Successfully scraped URLs. Responding to the request.`);
    res.json({ newUrls });
  } catch (error) {
    console.error(`Error while processing the request: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});















////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// code for starting the server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

