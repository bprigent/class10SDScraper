import React, { useState } from "react";
import { useParams } from "react-router-dom";
import './SDList.css';
import { useDomainSpecificSDListdata } from "./useDomainSpecificSDListdata";
import { useDomainSpecificUrlListData } from "../URLs/useDomainSpecificUrlListData";
import { addToSpecificSDList } from "./SDsSlice";
import { scrapeSDsFromPage } from "../scrapeSDsFromPage/scrapeSDsFromPageSlice"
import { SmallKpiCard, ThreeKpiCard } from "../../components/other/KpiCards";
import SmallPieChart from "../../components/other/SmallPieChart";
import { H2 } from '../../components/fonts/Headings';
import { SmallGreenButton } from "../../components/buttons/Buttons";
import Tabs from "../../components/navigation/Tabs";


export function SDList () {
    // getting data from various sources
    const {slugPath} = useParams();
    const { dispatch,
            SDObjectsList,
            // progress
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
            ratioUniqueSDObjectsPerDomain,
            //Sd types
            typeCountsArray } = useDomainSpecificSDListdata(slugPath);
    const { urlObjectsList } = useDomainSpecificUrlListData(slugPath)

    //local state for scrapping status
    const [isScrapingSd, SetIsScrapingSd] = useState(false);

    // function to handle the scrape button
    async function handleScrapeAllSDs() {
        SetIsScrapingSd(true);
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
        };
        SetIsScrapingSd(false);
    };

    // element to return
    return (
        <div className="SDList-parent_w">
            <div className="SDL-line_1">
                <H2 copy='Structured Data'/>
                <div className="SDL-line_1-button_w">
                    {isScrapingSd === false ? <SmallGreenButton copy='Download' onClick={handleScrapeAllSDs}/> : <span className='SDL-line_1-pending_message_w'>Downloading...</span>}
                </div>
            </div>
            <Tabs titles={['Summary', 'Preview', 'Raw data']}>
                <div>
                    <div className="SDL-line_2">
                        <div className="SDL-line_2-col_1">
                            <SmallPieChart inputPercentage={ratioUniquePagesContainingSD}/>
                            <div className="SDL-line_2-col_1-content_w">
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
                            </div>
                        </div>
                        <div className="SDL-line_2-col_2">
                            <SmallKpiCard title='Pages searched for SD' 
                                largeNum={ratioUniquePagesScrapedForSD} 
                                largeNumMetric='%' 
                                smallNum={uniquePagesScrapedForSD} 
                                smallNumMetric='pages'/>
                            <div className="padding40px" ></div>
                            <ThreeKpiCard title='SD uniqueness' 
                                largeNum={ratioUniqueSDObjectsPerDomain} 
                                largeNumMetric='%' 
                                smallNum={uniqueSDObjectsPerDomain} 
                                smallNumMetric='unique SD objects'
                                secondSmallNum={allSDObjectsPerDomain} 
                                secondSmallNumMetric='all SD objects'/>
                        </div>
                    </div>
                    <H2 copy='Types'/>
                    <div className="SDTypesList-parent_w">
                        { typeCountsArray.length ? typeCountsArray.map(([type, count]) => <p className="SDTypesList-singleTag">{`${type}: ${count} `}</p>) : <p>No data yet, click scrape</p>}
                    </div>
                </div>
                <div>
                    Coming soon...
                </div>
                <div>
                    {SDObjectsList.length ? SDObjectsList.filter(item => item.sdPresent === true).map(item => <p>{JSON.stringify(item.sdContent)}</p>) : <p>No data yet, click scrape</p>}
                </div>
            </Tabs>
        </div>
    );
};