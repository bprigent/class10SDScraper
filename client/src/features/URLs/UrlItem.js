import React, { useEffect } from "react";
import './UrlItem.css';
import { useParams } from "react-router-dom";
import { scrapeUrlsFromPage } from "../scrapeUrlsFromPage/scrapeUrlsFromPageSlice";
import { formatUrlArrayIntoUrlObjectArray } from "../../utilities/formatUrlArrayIntoUrlObjectArray";
import { addToSpecificUrlList, setUrlScrapingStatusToDone, setUrlScrapingStatusToInProgress } from "./urlsSlice";
import {SmallGreyIconButton, SmallGreenIconButton} from "../../components/buttons/IconButtons";
import { useDomainSpecificUrlListData } from "./useDomainSpecificUrlListData";


export function UrlItem ({urlObject}) {
    const {slugPath} = useParams() //getting domain id from URL
    const { store, 
            dispatch,
            scrapedUrlsData, 
            scrapedUrlsStatus } = useDomainSpecificUrlListData(slugPath);
    
    function getLatestUrlObjectsList() {
        return store.getState().urls.fullUrlList.find(slug => slug.domainSlug === slugPath).pageUrlList;
    };

    // add scrapped URLs to state
    useEffect(() => {
        if ((urlObject.urlScrapingStatus === 'inProgress') && (scrapedUrlsStatus === 'succeeded')) {
            // Extract the actual URLs from domainSpecificUrlsList
            const existingUrls = getLatestUrlObjectsList().map(item => item.pageUrl);
            const uniqueUrlList = scrapedUrlsData && Array.isArray(scrapedUrlsData) 
                                ? scrapedUrlsData.filter(item => !existingUrls.includes(item)) 
                                : [];
            //const uniqueUrlList = scrapedUrlsData.filter(item => !urlsList.includes(item)); // remove URL already present in the array
            const urlObj = formatUrlArrayIntoUrlObjectArray(uniqueUrlList); // turn into formatted objects
            dispatch(addToSpecificUrlList({domainSlug: slugPath, newUrlObjects: urlObj})); // add formatted urls to state
            dispatch(setUrlScrapingStatusToDone({url: urlObject.pageUrl, slugPath: slugPath})); // set scrapping status as done
        }
    }, [scrapedUrlsStatus, scrapedUrlsData, dispatch, slugPath]);

    // function to scrape URLs
    async function handleClick() {
        dispatch(setUrlScrapingStatusToInProgress({url: urlObject.pageUrl, slugPath: slugPath})); // indicate to the global state scrapping is in progress
        await dispatch(scrapeUrlsFromPage(urlObject.pageUrl)); // do the urlscrapping on the server side
        dispatch(setUrlScrapingStatusToDone({url: urlObject.pageUrl, slugPath: slugPath})); // once scrapping is done, indicate that to global state 
    } 
    
    //element
    return (
        <div className="urlItem-parent_w">
            <div title={urlObject.pageUrl} className='urlItem_w' >{urlObject.pageUrl}</div>
            <div className="urlItem-action_w">
                {(urlObject.urlScrapingStatus === 'undone') && <SmallGreyIconButton onClick={handleClick} iconType="download"/>}
                {(urlObject.urlScrapingStatus === 'inProgress') && <SmallGreyIconButton iconType="downloading"/>}
                {(urlObject.urlScrapingStatus === 'done') === true && <SmallGreenIconButton iconType="download_done"/>}
            </div>
        </div>
    );
}