import React from 'react';
import "./Nav.css";
import { useSelector } from "react-redux";
import logo from '../images/logo-sds.png';

function Nav() {
    // get data from store
    const domains = useSelector(state => state.domains.domainsList);

    // return the UI element
    return (
        <div className="nav_w">
            <div className='nav_body_w'>
                <a className='nav_add_btn'>+</a>
                <div className='nav_domains_list_w'>
                    {domains.map(domain => <a className='nav_domains_list_item' >{domain.letter}</a>)}
                </div>
            </div>
            <div className='nav_logo_w'>
                <img className='nav_logo_file' src={logo}></img>
            </div>
        </div>
    );
}

export default Nav;
