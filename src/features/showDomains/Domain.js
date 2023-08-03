import React from 'react';
import { useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";

function Domain() {
    //getting value from URL
    const {slugPath} = useParams()

    // get data from store
    const domains = useSelector(state => state.domains.domainsList);

    // find right domain
    const domain = domains.find((obj) => obj.slug === slugPath);

    if (!domain) {
        return <Navigate to="/Error404" />;
    }

    return (
        <div>
            <p>{domain.slug}</p>
            <p>{domain.id}</p>
            <p>{domain.name}</p>
        </div>
    );
}

export default Domain;