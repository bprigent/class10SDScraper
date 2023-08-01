import React from 'react';
import "./NavItem.css";

function NavItem({domain}) {

    if (domain.url) {
        return <a href="https://google.com" className='nav_domains_list_item'><img className='nav_domains_img' alt={domain.name} src={`https://www.google.com/s2/favicons?domain=${domain.url}&sz=64`}></img></a>
    } else {
        return <a href="https://google.com" className='nav_domains_list_item' >{domain.letter}</a>
    }

}

export default NavItem;