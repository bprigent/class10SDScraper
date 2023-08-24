import React from "react";
import './SdPreview.css';
import { useDomainSpecificSDListdata } from "./useDomainSpecificSDListdata";
import { useParams } from "react-router-dom";
import { Product } from "../../components/SdCards/Product";
import { Brand } from "../../components/SdCards/Brand";
import { Organization } from "../../components/SdCards/Organization";

export function SdPreview () {
    
    const {slugPath} = useParams();
    const { dispatch,
            SDObjectsList } = useDomainSpecificSDListdata(slugPath);

    const rawSdObjects = SDObjectsList.filter(item => item.sdPresent === true).map(item => item.sdContent);

    const cardMapping = {
        'Organization': Organization,
        'Product': Product,
        'Brand': Brand,
        };
    
    // Check if rawSdObjects is valid and is an array
    if (!rawSdObjects || !Array.isArray(rawSdObjects)) {
        return <p>Loading or no data available...</p>;
    }

    return (
        <div>
            {rawSdObjects.map( item => {
                const currentSdObjectType = item['@type'];
                const CardComponentToUse = cardMapping[currentSdObjectType] || (() => <div>Unknown type: {currentSdObjectType}</div>);

                return <CardComponentToUse obj={item} />;
            })}
        </div>
    );
};