import React from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./domain.css";
import { getFaviconFromUrl } from '../../utilities/getFaviconFromUrl';
import { H1, H2 } from '../../components/fonts/Headings';
import { GreyIconButton } from '../../components/buttons/IconButtons';
import { UrlItem } from '../../components/URLs/UrlItem';
import { PSmallGrey } from '../../components/fonts/Fonts';


function Domain() {
    //getting value from URL
    const {slugPath} = useParams()

    // get domain data from store
    const domains = useSelector(state => state.domains.domainsList);
    const domain = domains.find((domain) => domain.slug === slugPath);

    // get url data from store
    const allUrls = useSelector(state => state.urls.fullUrlList);
    const domainUrls = allUrls.find((slug) => slug.domainSlug === slugPath).pageUrlList;
    const numOfUrlsScraped = domainUrls.length;

    //if (domains.includes(domain.slug === slugPath)) {
    //    return <Navigate to='/Error404'/>;
    //};

    return (
        <div className='single_domain-parent_w'>
            <div className='single_domain-header_w'>
                <img alt='logo' className="single_domain-icon" src={getFaviconFromUrl(domain.url, 128)}></img>
                <H1 copy={domain.name} />
                <GreyIconButton target="_blank" href={domain.url} iconType="open_in_new" />
            </div>
            <div className='single_domain-body_w'>
                <div className='single_domain-body-col_1'>
                    <H2 copy='Unique URLs' />
                    <div className='url_header-subheading'>
                        <PSmallGrey copy={`${numOfUrlsScraped} URLs scraped`}/>  
                    </div>
                    <div className='urlList_w'>
                        {domainUrls.map(url => <UrlItem urlObject={url}/>)}
                    </div>
                </div>
                <div className='single_domain-body-col_2'>
                </div>
            </div>
        </div>
    );
}

export default Domain;