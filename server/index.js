const express = require("express");
const puppeteer = require('puppeteer');
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
// scrape new URLs from passed URL with headless browser
async function scrapeUrlsFromPageWithBrowser(url) {
  console.log(`Attempting to scrape URLs from: ${url}`);
  const browser = await puppeteer.launch({ headless: "new" });  // Launch a headless browser
  const page = await browser.newPage();  // Create a new page in that browser
  await page.goto(url);  // Navigate to the specified URL

  const baseDomain = new URL(url).hostname;
  const urlsSet = new Set();

  const hrefs = await page.$$eval('a', links => links.map(link => link.href));  // Extract all href attributes from anchor tags

  hrefs.forEach(href => {
      try {
          const fullUrl = new URL(href, url);
          if (fullUrl.hostname !== baseDomain || fullUrl.protocol !== 'https:') return;

          fullUrl.search = '';
          fullUrl.hash = '';
          const urlString = fullUrl.toString().endsWith('/') ? fullUrl.toString() : fullUrl.toString() + '/';
          urlsSet.add(urlString);
      } catch (e) {
          // Skip if URL is not valid
      }
  });

  const validUrls = [];
  for (let url of urlsSet) {
      if (validUrls.length >= 20) break;  // Stop the loop if we've already found 20 valid URLs

      try {
          const response = await page.goto(url);  // Try navigating to the URL
          if (response.status() >= 200 && response.status() < 300) {
              validUrls.push(url);
          }
      } catch (e) {
          // If request fails or non-2xx status, we simply skip this URL
      }
  }

  await browser.close();  // Close the browser when you're done
  return validUrls;
};




//post method
app.post('/scrape-urls-from-page', async (req, res) => {
  const url = req.body.url;
  console.log(`Received request to scrape URL: ${url}`);

  if (!url) {
    console.warn('URL not provided in the request.');
    return res.status(400).json({ error: 'URL not provided' });
  }

  try {
    const newUrls = await scrapeUrlsFromPageWithBrowser(url);``
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
// scrape SD from URL
async function scrapeSDsFromPageWithBrowser(url) {
  const browser = await puppeteer.launch({ headless: "new" });
    try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        const content = await page.content();
        const $ = cheerio.load(content);

        const sdContent = [];

        $('script[type="application/ld+json"]').each((index, element) => {
            try {
                const jsonData = JSON.parse($(element).html());
                if (jsonData) {
                    sdContent.push({ sdPresent: true, sdContent: jsonData, url: url });
                }
            } catch (err) {
                console.error('Error parsing JSON-LD from URL', url, ':', err);
            }
        });

        if (sdContent.length === 0) {
            sdContent.push({ sdPresent: false, sdContent: [], url: url });
        }

        return sdContent;
    } catch (error) {
        console.error('Error fetching URL:', url, error);
        return null;
    } finally {
        await browser.close();
    }
};


//post method
app.post('/scrape-sds-from-page', async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).json({ error: 'URL not provided' });
  }
  try {
    const newSDs = await scrapeSDsFromPageWithBrowser(url);
    res.json({ newSDs });
  } catch (error) {
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

