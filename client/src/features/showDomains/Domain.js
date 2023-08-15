import React from 'react';
//styles
import "./domain.css";
//components
import { DomainHeader } from './DomainHeader';
import UrlList from '../URLs/UrlList';
import { SDList } from '../SDs/SDList';


function Domain() {
    return (
        <div className='single_domain-parent_w'>
            
            <DomainHeader />

            <div className='single_domain-body_w'>
                <UrlList />
                <SDList />
            </div>
        </div>
    );
}

export default Domain;