import React from 'react';
import { useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import "./domain.css";
import { getFaviconFromUrl } from '../../utilities/getFaviconFromUrl';
import { H1 } from '../../components/fonts/H1';
import { GreyIconButton } from '../../components/buttons/IconButtons';


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
        <div className='single_domain-parent_w'>
            <div className='single_domain-header_w'>
                <img className="single_domain-icon" src={getFaviconFromUrl(domain.url, 128)}></img>
                <H1 copy={domain.name} />
                <GreyIconButton target="_blank" href={domain.url} iconType="open_in_new" />
            </div>
            <div className='signle_domain-body_w'>

            </div>
        </div>
    );
}

export default Domain;