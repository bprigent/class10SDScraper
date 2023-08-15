import React from "react";
import { useParams } from "react-router-dom";
import './SDList.css';
import { useDomainSpecificSDListdata } from "./useDomainSpecificSDListdata";
import { useDomainSpecificUrlListData } from "../URLs/useDomainSpecificUrlListData";
import { addToSpecificSDList } from "./SDsSlice";


export function SDList () {

    const {slugPath} = useParams(); //getting domain id from URL

    const { dispatch,
            store,
            SDObjectsList,
            scrapedSDsData,
            scrapedSDsStatus,
            scrapedSDsError } = useDomainSpecificSDListdata(slugPath);

    const { urlsList } = useDomainSpecificUrlListData(slugPath)

    function handleScrapeAllSDs() {

        console.log('handleScrapeAllSDs')

        // get corrext list of URLs

        // execute server functon

        // wait for server to be done sending data to short term slice

        // get value of scrapedSDsData from short term slice

        // add value of scrapedSDsData into SD slice

    };


    return (
        <div className="SDList-parent_w">
            <button onClick={handleScrapeAllSDs}>Scrape SDs</button>
            {SDObjectsList.map(item => <p>{item.objectOfSD}</p>)}
        </div>
    );
};