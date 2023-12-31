import React from 'react';
import "./Nav.css";
import { useSelector } from "react-redux";
import logo from '../../images/logo-sds.png';
import NavItem from './NavItem';
import { Link } from 'react-router-dom';

function Nav() {
    // get data from store
    const domains = useSelector(state => state.domains.domainsList);

    // return the UI element
    return (
        <div className="nav_w">
            <div className='nav_body_w'>
                <Link to="/add" title="Add new domain" className='nav_add_btn'>+</Link>
                <div className='nav_domains_list_w'>
                    {domains.map(domain => <NavItem key={domain.id} domain={domain}/>)}
                </div>
            </div>
            <div className='nav_logo_w'>
                <img alt='Logo' className='nav_logo_file' src={logo}></img>
            </div>
        </div>
    );
}

export default Nav;
