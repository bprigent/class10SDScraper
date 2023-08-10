import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";



// style
import './DomainHeader.css';
// components
import { H1 } from "../../components/fonts/Headings";
import { PSmallGrey } from "../../components/fonts/Fonts";
import { GreyIconButton } from "../../components/buttons/IconButtons";
// utilities
import { getFaviconFromUrl } from '../../utilities/getFaviconFromUrl';
//server side
import { fetchTitle } from '../titleAndDescription/titleSlice';
import { fetchDescription } from '../titleAndDescription/descriptionSlice';



export function DomainHeader () {
    const dispatch = useDispatch();

    //getting value from URL
    const {slugPath} = useParams()

    // get domain data from store
    const domains = useSelector(state => state.domains.domainsList);
    const domain = domains.find((domain) => domain.slug === slugPath);

    // Get Meta Title Data
    const { data, status, error } = useSelector(state => state.title);
    // Get Meta Descritpion Data
    const { descriptionData, descriptionStatus, descriptionError } = useSelector(state => state.description);

    useEffect(() => {
        dispatch(fetchTitle(domain.url));
        dispatch(fetchDescription(domain.url));
    }, [domain]);

    let headerContentTitleValue = '';
        if (status === 'loading') {headerContentTitleValue = '...'}
        if (data && status === 'succeeded') {headerContentTitleValue = data}
        if (status === 'failed') {headerContentTitleValue = error}

    let headerContentDescriptionValue = '';
        if (descriptionStatus === 'loading') {headerContentDescriptionValue = '...'}
        if (descriptionData && descriptionStatus === 'succeeded') {headerContentDescriptionValue = descriptionData}
        if (descriptionStatus === 'failed') {headerContentDescriptionValue = descriptionError}

    return (
        <div className='single_domain-header_w'>
            <img alt='logo' className="single_domain-header-icon" src={getFaviconFromUrl(domain.url, 128)}></img>
            <div className="single_domain-header-content_w">
                <H1 copy={domain.name} />
                <PSmallGrey copy={`${headerContentTitleValue} - ${headerContentDescriptionValue}`} />
            </div>
            <GreyIconButton target="_blank" href={domain.url} iconType="open_in_new" />
        </div>
    );
}