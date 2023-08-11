import React from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// style
import './UrlList.css'
//components
import { H2 } from '../../components/fonts/Headings';
import { UrlItem } from '../../components/URLs/UrlItem';
import { PSmallGrey } from '../../components/fonts/Fonts';


function UrlList() {
    //getting value from URL
    const {slugPath} = useParams()

    // get url data from store
    const allUrls = useSelector(state => state.urls.fullUrlList);
    const domainUrls = allUrls.find((slug) => slug.domainSlug === slugPath).pageUrlList;
    const numOfUrlsScraped = domainUrls.length;


    return (
        <div className='single_domain-body-col_1'>
            <H2 copy='Unique URLs' />
            <div className='url_header-subheading'>
                <PSmallGrey copy={`${numOfUrlsScraped} URLs scraped`}/>  
            </div>
            <div className='urlList_w'>
                {domainUrls.map(urlItem => <UrlItem key={urlItem.pageUrl} urlObject={urlItem}/>)}
            </div>
        </div>    
    );
}

export default UrlList;