import React from "react";
import { useParams } from "react-router-dom";
import './SDList.css';
import { useDomainSpecificSDListdata } from "./useDomainSpecificSDListdata";
import { useDomainSpecificUrlListData } from "../URLs/useDomainSpecificUrlListData";
import { addToSpecificSDList } from "./SDsSlice";
import { scrapeSDsFromPage } from "../scrapeSDsFromPage/scrapeSDsFromPageSlice"
import { SmallKpiCard, ThreeKpiCard } from "../../components/other/KpiCards";
import SmallPieChart from "../../components/other/SmallPieChart";


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
            <SmallKpiCard title='Pages searched for SD' 
                          largeNum={ratioUniquePagesScrapedForSD} 
                          largeNumMetric='%' 
                          smallNum={uniquePagesScrapedForSD} 
                          smallNumMetric='pages'/>

            <SmallPieChart inputPercentage={ratioUniquePagesContainingSD}/>

            <SmallKpiCard title='Pages with SD' 
                          largeNum={ratioUniquePagesContainingSD} 
                          largeNumMetric='%' 
                          smallNum={uniquePagesContainingSD} 
                          smallNumMetric='pages'/>

            <SmallKpiCard title='Pages without SD' 
                          largeNum={ratioUniquePagesNotContainingSD} 
                          largeNumMetric='%' 
                          smallNum={uniquePagesNotContainingSD} 
                          smallNumMetric='pages'/>

            <ThreeKpiCard title='SD uniqueness' 
                          largeNum={ratioUniqueSDObjectsPerDomain} 
                          largeNumMetric='%' 
                          smallNum={uniqueSDObjectsPerDomain} 
                          smallNumMetric='unique SD objects'
                          secondSmallNum={allSDObjectsPerDomain} 
                          secondSmallNumMetric='all SD objects'/>
            
            <br></br>
            <p className="SD_summary">{`See full list here`}</p>
            {SDObjectsList.filter(item => item.sdPresent === true).map(item => <p>{JSON.stringify(item.sdContent)}</p>)}
        </div>
    );
};