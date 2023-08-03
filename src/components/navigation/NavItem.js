import React from 'react';
import "./NavItem.css";
import { Link } from 'react-router-dom';
import { getFaviconFromUrl } from '../../utilities/getFaviconFromUrl';

function NavItem({domain}) {

    return (
        <Link to={domain.slug} title={domain.name} href="https://google.com" className='nav_domains_list_item'>
            <img className='nav_domains_img' alt={domain.name} src={getFaviconFromUrl(domain.url, 64)}></img>
        </Link>
    );
    

}

export default NavItem;