import React from "react";
import './UrlItem.css';

export function UrlItem ({urlObject}) {

    

    return (
        <div className="urlItem-parent_w">
            <div title={urlObject.pageUrl} className='urlItem_w' >{urlObject.pageUrl}</div>
            <div className="urlItem-action_w">
                <a><span className="material-icons">add</span></a>
            </div>
        </div>
    );
}