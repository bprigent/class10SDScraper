import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import "./domain.css";
import { getFaviconFromUrl } from '../../utilities/getFaviconFromUrl';
import { H1, H2 } from '../../components/fonts/Headings';
import { GreyIconButton } from '../../components/buttons/IconButtons';
import { UrlItem } from '../../components/URLs/UrlItem';
import { PSmallGrey } from '../../components/fonts/Fonts';


//server side
import { fetchTitle } from '../titleAndDescription/titleAndDescriptionSlice';


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


    // server side
    const dispatch = useDispatch();
    const { data, status, error } = useSelector(state => state.title);

    useEffect(() => {
        dispatch(fetchTitle(domain.url));
    }, [domain]);


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
                        {domainUrls.map(urlItem => <UrlItem key={urlItem.pageUrl} urlObject={urlItem}/>)}
                    </div>
                </div>


                <div className='single_domain-body-col_2'>
                    <p>Hello there</p>
                    {status === 'loading' && <p>Loading</p>}
                    {data && <p>{data}</p>}
                    {status === 'failed' && <p>Error: {error}</p>}
                </div>


            </div>
        </div>
    );
}

export default Domain;