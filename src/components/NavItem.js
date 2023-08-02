import React from 'react';
import "./NavItem.css";
import { Link } from 'react-router-dom';

function NavItem({domain}) {

    return (
        <Link to={domain.slug} title={domain.name} href="https://google.com" className='nav_domains_list_item'>
            <img className='nav_domains_img' alt={domain.name} src={`https://www.google.com/s2/favicons?domain=${domain.url}&sz=64`}></img>
        </Link>
    );
    

}

export default NavItem;