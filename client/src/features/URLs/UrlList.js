import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './UrlList.css' // style
import { useStore } from "react-redux";
//components
import { H2 } from '../../components/fonts/Headings';
import { UrlItem } from '../../components/URLs/UrlItem';
import { PSmallGrey } from '../../components/fonts/Fonts';
import { addToSpecificUrlList, setUrlScrapingStatusToDone, setUrlScrapingStatusToInProgress } from "../../features/URLs/urlsSlice";
import { scrapeUrlsFromPage } from "../../features/scrapeUrlsFromPage/scrapeUrlsFromPageSlice";
import { formatUrlArrayIntoUrlObjectArray } from '../../utilities/formatUrlArrayIntoUrlObjectArray';



function UrlList() {
    const {slugPath} = useParams(); //getting domain id from URL
    const dispatch = useDispatch(); // install dispatch so that we can update the state data
    const store = useStore();

    // get url data from store
    const fullUrlList = useSelector(state => state.urls.fullUrlList);
    const domainSpecificUrlsList = fullUrlList.find(slug => slug.domainSlug === slugPath).pageUrlList;
    
    // current and maximum number of URL scrapped
    const numOfUrlsScraped = domainSpecificUrlsList.length;
    const maxNumOfUrlsScraped = useSelector(state => state.domains.domainsList.find(item => item.slug === slugPath).maxUrlList);

    // State variable to check if the scraping process is aborted
    const [isAborted, setIsAborted] = useState(false);

    const { scrapedUrlsData, scrapedUrlsStatus } = useSelector(state => state.scrapedUrls); // variables containing the result of the URL scrapping


    // This helper function waits for a given selector to return a specific value.
    function waitForState(selector, value) {
        return new Promise((resolve) => {
            const unsubscribe = store.subscribe(() => {
                const stateValue = selector(store.getState());
                if (stateValue === value) {
                    unsubscribe();
                    resolve();
                }
            });
        });
    }

    async function handleDownloadAll() {
        // Filter the URLs where scraping status is 'undone'
        const urlsToScrape = domainSpecificUrlsList.filter(urlObject => urlObject.urlScrapingStatus === 'undone');
    
        for (let i = 0; i < urlsToScrape.length; i++) {
            const urlObject = urlsToScrape[i];
    
            // Stop if the maximum number of URLs have been scraped
            if (numOfUrlsScraped + i >= maxNumOfUrlsScraped) {
                break;
            }
    
            // If the process has been aborted, break out of the loop
            if (isAborted) {
                break;
            }
    
            // Set scrapping status to in progress for the current URL
            dispatch(setUrlScrapingStatusToInProgress({ url: urlObject.pageUrl, slugPath: slugPath }));
    
            try {
                // Dispatch the scraping action for the current URL
                await dispatch(scrapeUrlsFromPage(urlObject.pageUrl));
    
                // Wait until scraping succeeds
                await waitForState(state => state.scrapedUrls.scrapedUrlsStatus, 'succeeded');
    
                // Extract the actual URLs from domainSpecificUrlsList
                const existingUrls = domainSpecificUrlsList.map(item => item.pageUrl);
    
                const uniqueUrlList = scrapedUrlsData.filter(item => !existingUrls.includes(item));
                const urlObj = formatUrlArrayIntoUrlObjectArray(uniqueUrlList);
    
                dispatch(addToSpecificUrlList({domainSlug: slugPath, newUrlObjects: urlObj}));
                dispatch(setUrlScrapingStatusToDone({ url: urlObject.pageUrl, slugPath: slugPath }));
    
            } catch (error) {
                console.error("Error scraping the URL:", urlObject.pageUrl, error);
            }
        }
    }
    

    // Abort function to stop the scraping process
    function abort() {
        setIsAborted(true);
    }
    

    return (
        <div className='single_domain-url_list-parent_w'>
            <div className='single_domain-url_list-parent-inner_w'>
                <div className='single_domain-url_list-header_w'>
                    <H2 copy={`${numOfUrlsScraped} URLs found`} />
                    <div className='single_domain-url_list-sub_heading_w'>
                        <PSmallGrey copy={`Max: ${maxNumOfUrlsScraped}`}/>
                        <div className='single_domain-url_list-sub_heading_w-col_2'>
                            <button onClick={handleDownloadAll}>Download</button>
                            <button onClick={abort}>Abort</button>
                        </div>
                    </div>
                </div>
                <div className='urlList_w'>
                        {domainSpecificUrlsList.map(urlItem => <UrlItem key={urlItem.pageUrl} urlObject={urlItem}/>)}
                </div>
            </div>
        </div>    
    );
}

export default UrlList;