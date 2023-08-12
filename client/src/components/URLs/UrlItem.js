import React, { useEffect, useState } from "react";
import './UrlItem.css';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { scrapeUrlsFromPage } from "../../features/scrapeUrlsFromPage/scrapeUrlsFromPageSlice";
import { formatUrlArrayIntoUrlObjectArray } from "../../utilities/formatUrlArrayIntoUrlObjectArray";
import { addToSpecificUrlList, setUrlScrapingStatusToDone, setUrlScrapingStatusToInProgress } from "../../features/URLs/urlsSlice";
import { SmallGreyIconButton } from "../buttons/IconButtons";


export function UrlItem ({urlObject}) {
    const {slugPath} = useParams() //getting domain id from URL
    const domainUrls = useSelector(state => state.urls.fullUrlList).find(slug => slug.domainSlug === slugPath).pageUrlList.map(obj => obj.pageUrl); // get url data from store
    const dispatch = useDispatch(); // install dispatch so that we can update the state data

    const { scrapedUrlsData, scrapedUrlsStatus } = useSelector(state => state.scrapedUrls); // variables containing the result of the URL scrapping

    // add scrapped URLs to state
    useEffect(() => {
        if ((urlObject.urlScrapingStatus === 'inProgress') && (scrapedUrlsStatus === 'succeeded')) {
            const uniqueUrlList = scrapedUrlsData.filter(item => !domainUrls.includes(item)); // remove URL already present in the array
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
                {(urlObject.urlScrapingStatus === 'done') === true && <SmallGreyIconButton iconType="download_done"/>}
            </div>
        </div>
    );
}