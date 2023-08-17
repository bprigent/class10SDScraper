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

    
    const numOfSDScrappedSoFar = new Set(SDObjectsList.map(item => item.url)).size;

    const SDObjectsWithSD = SDObjectsList.filter(item => item.sdPresent === true);
    const SDObjectsWithoutSD = SDObjectsList.filter(item => item.sdPresent === false);
    const uniqueSDCount = new Set(SDObjectsWithSD.map(item => item.url)).size;
    const penetrationRatio = (uniqueSDCount / urlObjectsList.length) * 100;
    const roundPenetrationRation = parseFloat(penetrationRatio.toFixed(2));

    return (
        <div className="SDList-parent_w">
            <button onClick={handleScrapeAllSDs}>Scrape SDs</button>
            <p className="SD_summary">{`Pages scrapped so far: ${numOfSDScrappedSoFar}`}</p>
            <p className="SD_summary">{`Pages containing SD: ${uniqueSDCount}`}</p>
            <p className="SD_summary">{`Pages without SD: ${SDObjectsWithoutSD.length}`}</p>
            <p className="SD_summary">{`Percentage of SD Penetration: ${roundPenetrationRation}%`}</p>
            <br></br>
            <p className="SD_summary">{`See full list here`}</p>
            {SDObjectsList.filter(item => item.sdPresent === true).map(item => <p>{JSON.stringify(item.sdContent)}</p>)}
        </div>
    );
};