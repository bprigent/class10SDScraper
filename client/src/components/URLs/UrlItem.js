import React, { useEffect, useState } from "react";
import './UrlItem.css';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { scrapeUrlsFromPage } from "../../features/scrapeUrlsFromPage/scrapeUrlsFromPageSlice";
import { formatUrlArrayIntoUrlObjectArray } from "../../utilities/formatUrlArrayIntoUrlObjectArray";
import { addToSpecificUrlList } from "../../features/URLs/urlsSlice";


export function UrlItem ({urlObject}) {
    // storing the local state of this line so as to change the design based on it.
    const [isLoading, setIsLoading] = useState(false);
    
    //getting domain value from URL
    const {slugPath} = useParams()

    // install dispatch
    const dispatch = useDispatch();

    // Get URL list from state
    const { scrapedUrlsData, scrapedUrlsStatus, scrapedUrlsError } = useSelector(state => state.scrapedUrls);

    // listening to scrapedUrlsStatus
    useEffect(() => {
        if (isLoading && scrapedUrlsStatus === 'succeeded') {
            const testArray = scrapedUrlsData;
            const testUrlObj = formatUrlArrayIntoUrlObjectArray(testArray);
            const slug = slugPath;
            const testFinalObj = { domainSlug: slug, newUrlObjects: testUrlObj };
            dispatch(addToSpecificUrlList(testFinalObj));
            setIsLoading(false);  // Reset the loading state
        }
    }, [scrapedUrlsStatus, isLoading, scrapedUrlsData, dispatch, slugPath]);

    // fetching data when clicking
    async function handleClick() {
        setIsLoading(true);  // Indicate that this specific URL item is being processed
        await dispatch(scrapeUrlsFromPage(urlObject.pageUrl));
    }

    //element
    return (
        <div className="urlItem-parent_w">
            <div title={urlObject.pageUrl} className='urlItem_w' >{urlObject.pageUrl}</div>
            <div className="urlItem-action_w">
                {!isLoading && <span onClick={handleClick} className="material-icons">add</span>}
                {isLoading && <span className="material-icons">timer</span>}
            </div>
        </div>
    );
}