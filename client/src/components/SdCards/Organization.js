import React from "react";
import './Organization.css';

export function Organization ({obj}) {

    const name = obj['name'];
    const logoImg = obj['logo'];
    const telephone =  obj['contactPoint'][1]['telephone'] || obj['contactPoint']['telephone'];

    return (
        <div className="SdPreview-card-parent_w">
            <p>Type: Organization</p>
            <p>{name}</p>
            <p>{telephone}</p>
            <img src={logoImg}/>
        </div>
    );
};