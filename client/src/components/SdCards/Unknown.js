import React from "react";
import './Unknown.css';

export function Unknown ({obj}) {

    const type = obj['@type'];

    return (
        <div className="SdPreview-card-parent_w">
            <div className="SdPreview-card-type_tag_w">
                <p className="SdPreview-card-type_tag_text">Type: {type}</p>
            </div>
            <span>Not Designed Yet!! This card contains information about a <span className="bolded-text">{type}</span> has not been design and developed yet.</span>
        </div>
    );
};