import React from "react";
import './UrlItem.css';

export function UrlItem ({urlObject}) {
    return (
        <div title={urlObject.pageUrl} className='UrlItem_w' >{urlObject.pageUrl}</div>
    );
}