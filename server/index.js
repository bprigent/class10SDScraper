const express = require("express");

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

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
  let browser;
    try {
        browser = await puppeteer.launch({ headless: "new" });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const title = await page.title();
        return title;
    } catch (error) {
        throw new Error('Failed to fetch meta data');
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

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
  let browser;
  try {
      // Launch a new browser instance
      browser = await puppeteer.launch({headless: "new"});

      // Open a new page in the browser
      const page = await browser.newPage();

      // Navigate to the provided URL
      await page.goto(url, { waitUntil: 'domcontentloaded'});

      // Extract the description from the meta tags
      const description = await page.$eval(
          'meta[name="description"], meta[property="og:description"]',
          (element) => element.content
      );

      // If no description is found, return a default message
      return description || 'No description provided for this page.';
  } catch (error) {
      throw new Error('Failed to fetch meta data');
  } finally {
      if (browser) {
          await browser.close();
      }
  }
};

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
  // Launching the puppeteer browser instance.
  const browser = await puppeteer.launch({ headless: 'new' });
  // Opening a new tab/page in the browser.
  const page = await browser.newPage();

  // This set keeps track of the URLs already visited to prevent revisiting.
  const visitedUrls = new Set();

  async function extractUrlsFromPage(targetUrl) {
      // Navigate to the target URL and wait until network activity is idle.
      await page.goto(targetUrl, { waitUntil: 'networkidle0' });

      // Get the base domain of the target URL to filter links later.
      const baseDomain = new URL(targetUrl).hostname;
      const urlsSet = new Set();
      
      let scrollCounter = 0;
      const maxScrolls = 4; // Maximum number of scrolls before stopping.

      while (scrollCounter < maxScrolls) {
          // Programmatically scroll down by one window height.
          await page.evaluate(() => {
              window.scrollBy(0, window.innerHeight);
          });

          // Pause for 2 seconds after scrolling to allow dynamically-loaded content to appear.
          await page.waitForTimeout(800);

          // Extract all href values from anchor tags on the page.
          const hrefs = await page.$$eval('a', links => links.map(link => link.href));

          hrefs.forEach(href => {
              try {
                  // Create a full URL object, combining the base URL with the href.
                  const fullUrl = new URL(href, targetUrl);
                  // Filtering out unwanted URLs.
                  if (!fullUrl.hostname.endsWith(baseDomain) || fullUrl.protocol !== 'https:') return;

                  // Remove query parameters and fragments from the URL.
                  fullUrl.search = '';
                  fullUrl.hash = '';
                  // Standardize the URL format (making sure it ends with a '/').
                  const urlString = fullUrl.toString().endsWith('/') ? fullUrl.toString() : fullUrl.toString() + '/';
                  urlsSet.add(urlString);
              } catch (e) {
                  // If an error occurs while processing the URL, skip it.
              }
          });

          // Stop the loop early if we have collected enough URLs.
          if (urlsSet.size >= 20) break;
          
          // Increment the scroll counter.
          scrollCounter++;
      }

      // Return the collected URLs from the set as an array.
      return Array.from(urlsSet);
  }

  let urlsToCheck = [url];  // URLs to be checked/processed.
  let validUrls = [];       // Collected URLs.

  // As long as there are URLs to check, continue the loop.
  while (urlsToCheck.length > 0) {
      const currentUrl = urlsToCheck.shift();  // Get and remove the first URL from the list.

      // If the URL was already visited, skip the loop iteration.
      if (visitedUrls.has(currentUrl)) continue;
      visitedUrls.add(currentUrl);

      // Extract URLs from the current page.
      const newUrls = await extractUrlsFromPage(currentUrl);

      newUrls.forEach(u => {
          // Only add URLs to the collection if they haven't been visited,
          // haven't been added to our valid URLs, and we haven't reached our limit.
          if (!visitedUrls.has(u) && !validUrls.includes(u) && validUrls.length < 20) {
              validUrls.push(u);
              urlsToCheck.push(u);
          }
      });

      // Stop the loop if we have collected enough URLs.
      if (validUrls.length >= 20) break;
  }

  // Close the browser instance.
  await browser.close();
  return validUrls;  // Return the collected URLs.
}




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
        await page.goto(url, { waitUntil: 'networkidle0' });

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

