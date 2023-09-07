import React from "react";
import './SdPreview.css';
import { useDomainSpecificSDListdata } from "./useDomainSpecificSDListdata";
import { useParams } from "react-router-dom";
import { Product } from "../../components/SdCards/Product";
import { Brand } from "../../components/SdCards/Brand";
import { Organization } from "../../components/SdCards/Organization";
import { Unknown } from "../../components/SdCards/Unknown";
import { Website } from "../../components/SdCards/Website";

export function SdPreview () {
    
    const {slugPath} = useParams();
    const { dispatch,
            SDObjectsList } = useDomainSpecificSDListdata(slugPath);

    const rawSdObjects = SDObjectsList.filter(item => item.sdPresent === true).map(item => item.sdContent);

    const cardMapping = {
        'Organization': Organization,
        'Product': Product,
        'Brand': Brand,
        'Unknown': Unknown,
        'WebSite': Website
        };
    
    // Check if rawSdObjects is valid and is an array
    if (!rawSdObjects || !Array.isArray(rawSdObjects)) {
        return <p>Loading or no data available...</p>;
    }

    return (
        <div className="SdPreview-cardlist-parent_w">
            {rawSdObjects.map( item => {
                const currentSdObjectType = item['@type'];
                const CardComponentToUse = cardMapping[currentSdObjectType] || cardMapping['Unknown'];
                return <CardComponentToUse obj={item} />;
            })}
        </div>
    );
};