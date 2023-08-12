import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// style
import './UrlList.css'
//components
import { H2 } from '../../components/fonts/Headings';
import { UrlItem } from '../../components/URLs/UrlItem';
import { PSmallGrey } from '../../components/fonts/Fonts';
import { SmallGreyIconButton } from '../../components/buttons/IconButtons';


function UrlList() {
    //getting value from URL
    const {slugPath} = useParams()

    // get url data from store
    const allUrls = useSelector(state => state.urls.fullUrlList);
    const domainUrls = allUrls.find(slug => slug.domainSlug === slugPath).pageUrlList;
    const numOfUrlsScraped = domainUrls.length;
    const domainMaxUrlList = useSelector(state => state.domains.domainsList.find(item => item.slug === slugPath).maxUrlList);

    // this is the local value of the input for maxUrlList. we use it to stop scrapping URLs.
    const [localMaxUrlList, setLocalMaxUrlList] = useState(domainMaxUrlList);

    return (
        <div className='single_domain-url_list-parent_w'>
            <div className='single_domain-url_list-parent-inner_w'>
                <div className='single_domain-url_list-header_w'>
                    <H2 copy='Unique URLs' />
                    <div className='single_domain-url_list-sub_heading_w'>
                        <PSmallGrey copy={`${numOfUrlsScraped} URLs scraped`}/>
                        <div className='single_domain-url_list-sub_heading_w-col_2'>
                            <input max={5000} className='single_domain-url_list-input' type="number" name="maxUrlList" value={localMaxUrlList}/>
                            <SmallGreyIconButton iconType='download'/>
                        </div>
                    </div>
                </div>
                <div className='urlList_w'>
                        {domainUrls.map(urlItem => <UrlItem key={urlItem.pageUrl} urlObject={urlItem}/>)}
                </div>
            </div>
        </div>    
    );
}

export default UrlList;