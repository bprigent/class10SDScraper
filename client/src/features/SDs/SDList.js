import React from "react";
import { useParams } from "react-router-dom";
import './SDList.css';
import { useDomainSpecificSDListdata } from "./useDomainSpecificSDListdata";
import { useDomainSpecificUrlListData } from "../URLs/useDomainSpecificUrlListData";
import { addToSpecificSDList } from "./SDsSlice";
import { waitForState } from '../../utilities/waitForState';
import { scrapeSDsFromPage } from "../scrapeSDsFromPage/scrapeSDsFromPageSlice"


export function SDList () {


    const {slugPath} = useParams(); //getting domain id from URL


    const { dispatch,
            store,
            SDObjectsList,
            //progress
            uniquePagesScrapedForSD,
            ratioUniquePagesScrapedForSD,
            //SD count
            uniquePagesContainingSD,
            ratioUniquePagesContainingSD,
            uniquePagesNotContainingSD,
            ratioUniquePagesNotContainingSD,
            // unique sd counter
            allSDObjectsPerDomain,
            uniqueSDObjectsPerDomain,
            ratioUniqueSDObjectsPerDomain} = useDomainSpecificSDListdata(slugPath);


    const { urlObjectsList } = useDomainSpecificUrlListData(slugPath)

    
    async function handleScrapeAllSDs() {
        let currentIndex = 0;
        while (currentIndex < urlObjectsList.length) {
            const urlObject = urlObjectsList[currentIndex];
            if (!urlObject || urlObject.metaScrapingStatus !== 'undone') {
                currentIndex++;
                continue;
            }
            try {
                const action = await dispatch(scrapeSDsFromPage(urlObject.pageUrl));
                if (scrapeSDsFromPage.fulfilled.match(action)) {
                    const latestSDArray = action.payload.newSDs;
                    console.log(latestSDArray)
                    
                    if (Array.isArray(latestSDArray)) {
                        dispatch(addToSpecificSDList({domainSlug: slugPath, newSDObjects: latestSDArray}));
                    } else {
                        console.error("latestSDArray is not an array:", latestSDArray);
                    }
                }
    
            } catch (error) {
                console.error("Error scraping the URL:", urlObject.pageUrl, error);
            }
            currentIndex++;
        }
    }

    return (
        <div className="SDList-parent_w">
            <button onClick={handleScrapeAllSDs}>Scrape SDs</button>
            <p className="SD_summary">{`Pages scrapped so far: ${uniquePagesScrapedForSD}`}</p>
            <p className="SD_summary">{`Percentage of pages scrapped so far: ${ratioUniquePagesScrapedForSD}%`}</p>
            <br></br>
            <p className="SD_summary">{`Unique pages containing SD: ${uniquePagesContainingSD}`}</p>
            <p className="SD_summary">{`Percentage of unique pages containing SD: ${ratioUniquePagesContainingSD}%`}</p>
            <br></br>
            <p className="SD_summary">{`Unique pages not containing SD: ${uniquePagesNotContainingSD}`}</p>
            <p className="SD_summary">{`Percentage of unique pages not containing SD: ${ratioUniquePagesNotContainingSD}%`}</p>
            <br></br>
            <p className="SD_summary">{`All SD objects found: ${allSDObjectsPerDomain}`}</p>
            <p className="SD_summary">{`Only unique SD objects: ${uniqueSDObjectsPerDomain}`}</p>
            <p className="SD_summary">{`Percentage of unique SD objects of all the objcts: ${ratioUniqueSDObjectsPerDomain}%`}</p>
            <br></br>
            <p className="SD_summary">{`See full list here`}</p>
            {SDObjectsList.filter(item => item.sdPresent === true).map(item => <p>{JSON.stringify(item.sdContent)}</p>)}
        </div>
    );
};