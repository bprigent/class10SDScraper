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
    
            if (!urlObject || urlObject.metaScrapingStatus !== 'undone') {
                currentIndex++;
                continue;
            }
    
            try {
                const action = await dispatch(scrapeSDsFromPage(urlObject.pageUrl));
                
                if (scrapeSDsFromPage.fulfilled.match(action)) {
                    const latestSDArray = action.payload.newSDs;
                    if (Array.isArray(latestSDArray)) {
                        dispatch(addToSpecificSDList({domainSlug: slugPath, newSDObjects: latestSDArray}));
                        console.log(latestSDArray);
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
            {SDObjectsList.map(item => <p>{item.objectOfSD}</p>)}
        </div>
    );
};