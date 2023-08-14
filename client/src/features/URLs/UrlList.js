import React, { useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import './UrlList.css' // style
//components
import { H2 } from '../../components/fonts/Headings';
import { SmallGreyButton } from '../../components/buttons/Buttons';
import { UrlItem } from './UrlItem';
import { PSmallGrey } from '../../components/fonts/Fonts';
import { addToSpecificUrlList, setUrlScrapingStatusToDone, setUrlScrapingStatusToInProgress } from "../../features/URLs/urlsSlice";
import { scrapeUrlsFromPage } from "../../features/scrapeUrlsFromPage/scrapeUrlsFromPageSlice";
import { formatUrlArrayIntoUrlObjectArray } from '../../utilities/formatUrlArrayIntoUrlObjectArray';
import { useDomainSpecificUrlListData } from "./useDomainSpecificUrlListData";
import { waitForState } from '../../utilities/waitForState';
import { updateMaxUrlList } from '../showDomains/domainsSlice';


function UrlList() {
    
    const {slugPath} = useParams(); //getting domain id from URL
    const { dispatch, 
            store,
            urlObjectsList,
            currentNumOfUrlsScraped,
            maxNumOfUrlsScraped,
            scrapedUrlsData } = useDomainSpecificUrlListData(slugPath);
    

    // State variable to check if the scraping process is aborted
    const isStoped = useRef(false);
    const [isScraping, setIsScraping] = useState(false);

    function getLatestUrlObjectsList() {
        return store.getState().urls.fullUrlList.find(slug => slug.domainSlug === slugPath).pageUrlList;
    };

    async function handleDownloadAll() {
        setIsScraping(true);
        isStoped.current = false;
        let currentIndex = 0;
        while (currentIndex < getLatestUrlObjectsList().length && getLatestUrlObjectsList().length < maxNumOfUrlsScraped) {
            const urlObject = getLatestUrlObjectsList()[currentIndex];
            // if urlObject not found
            if (!urlObject) {
                console.error("No URL object found at index:", currentIndex);
                currentIndex++;
                continue;
            }
            // If the current URL is already done or in-progress, move to the next URL
            if (urlObject.urlScrapingStatus !== 'undone') {
                currentIndex++;
                continue;
            }
            // If the process has been aborted, break out of the loop
            if (isStoped.current) {
                dispatch(setUrlScrapingStatusToDone({ url: urlObject.pageUrl, slugPath: slugPath }));
                break;
            }
            // Set scrapping status to in progress for the current URL
            dispatch(setUrlScrapingStatusToInProgress({ url: urlObject.pageUrl, slugPath: slugPath }));
            try {
                // Dispatch the scraping action for the current URL
                await dispatch(scrapeUrlsFromPage(urlObject.pageUrl));
                // Check for abort status right after scraping
                if (isStoped.current) {
                    dispatch(setUrlScrapingStatusToDone({ url: urlObject.pageUrl, slugPath: slugPath }));
                    break;
                }
                // Wait until scraping succeeds
                await waitForState(store, state => state.scrapedUrls.scrapedUrlsStatus, 'succeeded');
                // Check for abort status after waiting for state
                if (isStoped.current) {
                    dispatch(setUrlScrapingStatusToDone({ url: urlObject.pageUrl, slugPath: slugPath }));
                    break;
                }
                // Extract the actual URLs from domainSpecificUrlsList
                const existingUrls = getLatestUrlObjectsList().map(item => item.pageUrl);
                const uniqueUrlList = scrapedUrlsData && Array.isArray(scrapedUrlsData) 
                                    ? scrapedUrlsData.filter(item => !existingUrls.includes(item)) 
                                    : [];
                const urlObj = formatUrlArrayIntoUrlObjectArray(uniqueUrlList);
                dispatch(addToSpecificUrlList({domainSlug: slugPath, newUrlObjects: urlObj}));
                dispatch(setUrlScrapingStatusToDone({ url: urlObject.pageUrl, slugPath: slugPath })); 
            } catch (error) {
                console.error("Error scraping the URL:", urlObject.pageUrl, error);
            }
            // Increment the currentIndex to move to the next URL
            currentIndex++;
        }
        setIsScraping(false);
    };
    

    // Abort function to stop the scraping process
    function stop() {
        console.log('click abort');
        isStoped.current = true;
        setIsScraping(false);
    };  

    function handleSelectChange(e) {
        const selectedValue = Number(e.target.value);
        dispatch(updateMaxUrlList({ newMaxUrlList: selectedValue, slug: slugPath }));
    };


    return (
        <div className='single_domain-url_list-parent_w'>
            <div className='single_domain-url_list-parent-inner_w'>
                <div className='single_domain-url_list-header_w'>
                    <H2 copy={`${currentNumOfUrlsScraped} Page(s)`} />
                    <div className='single_domain-url_list-header-col_2'>
                        {!isScraping ? 
                            <>
                                <select value={maxNumOfUrlsScraped} onChange={handleSelectChange}>
                                    <option value="100">Max: 100</option>
                                    <option value="500">Max: 500</option>
                                    <option value="1000">Max: 1000</option>
                                </select>
                                <SmallGreyButton onClick={handleDownloadAll} copy="Scrape" /> 
                            </>
                            : 
                            <SmallGreyButton onClick={stop} copy="Stop" />}
                    </div>
                </div>
                <div className='urlList_w'>
                        {urlObjectsList.map(urlItem => <UrlItem key={urlItem.pageUrl} urlObject={urlItem}/>)}
                </div>
            </div>
        </div>
    );
}

export default UrlList;