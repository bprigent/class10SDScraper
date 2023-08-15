import React from "react";
import { useParams } from "react-router-dom";
import './SDList.css';
import { useDomainSpecificSDListdata } from "./useDomainSpecificSDListdata"

export function SDList () {

    const {slugPath} = useParams(); //getting domain id from URL

    const { dispatch,
            store,
            SDObjectsList } = useDomainSpecificSDListdata(slugPath);

    return (
        <div className="SDList-parent_w">
            <button>Scrape SDs</button>
            {SDObjectsList.map(item => <p>{item.objectOfSD}</p>)}
        </div>
    );
};