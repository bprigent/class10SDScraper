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
            scrapedSDsData,
            scrapedSDsStatus,
            scrapedSDsError } = useDomainSpecificSDListdata(slugPath);

    const { urlObjectsList } = useDomainSpecificUrlListData(slugPath)

    
    async function handleScrapeAllSDs() {
        let currentIndex = 0;
        while (currentIndex < urlObjectsList.length) {
            const urlObject = urlObjectsList[currentIndex];

            if (!urlObject) {
                console.error("No URL object found at index:", currentIndex);
                currentIndex++;
                continue;
            };

            // If the current URL is already done or in-progress, move to the next URL
            if (urlObject.metaScrapingStatus !== 'undone') {
                currentIndex++;
                continue;
            };

            try {
                await dispatch(scrapeSDsFromPage(urlObject.pageUrl));
                
                await waitForState(store, state => state.scrapedSDs.scrapedSDsStatus, 'succeeded');
                
                //fake data
                const latestSDArray = [{objectOfSD: "value of SD 3"},{objectOfSD: "value of SD 4"}];
                
                dispatch(addToSpecificSDList({domainSlug: slugPath, newSDObjects: latestSDArray}));

                console.log(latestSDArray);

            } catch (error) {
                console.error("Error scraping the URL:", urlObject.pageUrl, error);
            }
            currentIndex++;
        }

    };


    return (
        <div className="SDList-parent_w">
            <button onClick={handleScrapeAllSDs}>Scrape SDs</button>
            {SDObjectsList.map(item => <p>{item.objectOfSD}</p>)}
        </div>
    );
};