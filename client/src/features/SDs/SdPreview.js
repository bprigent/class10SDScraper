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
    const parsedRawObjects = rawSdObjects.map(item => JSON.parse(item));

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
            {parsedRawObjects.map( obj => {
                const currentSdObjectType = obj['@type'];
                const CardComponentToUse = cardMapping[currentSdObjectType];

                return <CardComponentToUse obj={obj} />;
            })}
        </div>
    );
};