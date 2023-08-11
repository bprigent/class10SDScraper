import React from 'react';
//styles
import "./domain.css";
//components
import { DomainHeader } from './DomainHeader';
import UrlList from '../URLs/UrlList';


function Domain() {
    return (
        <div className='single_domain-parent_w'>
            
            <DomainHeader />

            <div className='single_domain-body_w'>
                <UrlList />
                <div className='single_domain-body-col_2'>
                </div>
            </div>
        </div>
    );
}

export default Domain;