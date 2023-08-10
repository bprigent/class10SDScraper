import React, { useEffect, useState } from "react";
import './UrlItem.css';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { scrapeUrlsFromPage } from "../../features/scrapeUrlsFromPage/scrapeUrlsFromPageSlice";
import { formatUrlArrayIntoUrlObjectArray } from "../../utilities/formatUrlArrayIntoUrlObjectArray";
import { addToSpecificUrlList, setUrlScrapedToTrue } from "../../features/URLs/urlsSlice";


export function UrlItem ({urlObject}) {
    // storing the local state of this line so as to change the design based on it.
    const [isLoading, setIsLoading] = useState(false);
    
    //getting domain value from URL
    const {slugPath} = useParams()
    // get url data from store
    const allUrls = useSelector(state => state.urls.fullUrlList);
    const domainUrls = allUrls.find((slug) => slug.domainSlug === slugPath).pageUrlList.map(obj => obj.pageUrl);

    // install dispatch
    const dispatch = useDispatch();

    // Get URL list from state
    const { scrapedUrlsData, scrapedUrlsStatus, scrapedUrlsError } = useSelector(state => state.scrapedUrls);

    // add scrapped URLs to state
    useEffect(() => {
        if (isLoading && scrapedUrlsStatus === 'succeeded') {
            // only keep unique URLs
            const uniqueUrlList = scrapedUrlsData.filter(item => !domainUrls.includes(item));
            
            const urlObj = formatUrlArrayIntoUrlObjectArray(uniqueUrlList);
            const slug = slugPath;
            const finalObj = { domainSlug: slug, newUrlObjects: urlObj };
            dispatch(addToSpecificUrlList(finalObj));
            setIsLoading(false);  // Reset the loading state
        }
    }, [scrapedUrlsStatus, isLoading, scrapedUrlsData, dispatch, slugPath]);

    // scrape URLs
    async function handleClick() {
        setIsLoading(true);  // Indicate that this specific URL item is being processed
        await dispatch(scrapeUrlsFromPage(urlObject.pageUrl));
        dispatch(setUrlScrapedToTrue({url: urlObject.pageUrl, slugPath: slugPath}));
    }

    //element
    return (
        <div className="urlItem-parent_w">
            <div title={urlObject.pageUrl} className='urlItem_w' >{urlObject.pageUrl}</div>
            <div className="urlItem-action_w">
                {(!isLoading && !urlObject.urlScraped) && <span onClick={handleClick} className="material-icons">add</span>}
                {isLoading && <span className="material-icons">timer</span>}
                {urlObject.urlScraped === true && <span className="material-icons">lock</span>}
            </div>
        </div>
    );
}