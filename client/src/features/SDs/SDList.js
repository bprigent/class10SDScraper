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
    
    const penetrationRation = (SDObjectsList.filter(item => item.sdPresent === true).length / urlObjectsList.length) * 100;
    const roundPenetrationRation = parseFloat(penetrationRation.toFixed(2));


    return (
        <div className="SDList-parent_w">
            <button onClick={handleScrapeAllSDs}>Scrape SDs</button>
            <p className="SD_summary">{`URL scrapped for SD: ${urlObjectsList.length}`}</p>
            <p className="SD_summary">{`URL without SD: ${SDObjectsList.filter(item => item.sdPresent === false).length}`}</p>
            <p className="SD_summary">{`URL with SD: ${SDObjectsList.filter(item => item.sdPresent === true).length}`}</p>
            <br></br>
            <p className="SD_summary">{`Percentage of SD Penetration: ${roundPenetrationRation}%`}</p>
            <br></br>
            <p className="SD_summary">{`See full list here`}</p>
            {SDObjectsList.filter(item => item.sdPresent === true).map(item => <p>{JSON.stringify(item.sdContent)}</p>)}
        </div>
    );
};