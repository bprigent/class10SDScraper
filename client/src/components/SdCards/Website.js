import React, { useState } from 'react';
import './Website.css';

export function Website ({obj}) {

    const [searchTerm, setSearchTerm] = useState('');

    const onInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const onButtonClick = () => {
        if (!searchTerm) return;
    
        const targetUrl = obj.potentialAction.target.replace(
          '{search_term_string}',
          searchTerm
        );
    
        // Open the URL in a new tab
        window.open(targetUrl, '_blank');
      };

    return (
        <div className="SdPreview-card-parent_w">
            <div className="SdPreview-card-type_tag_w">
                <p className="SdPreview-card-type_tag_text">Type: Site search</p>
            </div>
            <p>You can easily search this site</p>
            <input className='SdPreview-card-search_input'
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={onInputChange}
            />
            <button className='SdPreview-card-button' onClick={onButtonClick}>Search this site</button>
        </div>
    );
};