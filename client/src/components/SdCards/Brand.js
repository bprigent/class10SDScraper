import React from "react";
import './Brand.css';

export function Brand ({obj}) {
    const name = obj['name'];
    const image = obj['image'];

    return (
       <div className="SdPreview-card-parent_w">
            <p>{name}</p>
            <img src={image}/>
        </div>
    );
};