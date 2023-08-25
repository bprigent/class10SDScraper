import React from "react";
import './Unknown.css';

export function Unknown ({obj}) {

    const type = obj['@type'];

    return (
        <div className="SdPreview-card-parent_w">
            <p>Type:</p>
            <p>{type}</p>
        </div>
    );
};