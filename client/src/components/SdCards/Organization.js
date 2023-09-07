import React from "react";
import './Organization.css';

export function Organization ({obj}) {

    const name = obj['name'];
    const logoImg = obj['logo'];
    const telephone =  obj['contactPoint'][0]['telephone'] || obj['contactPoint']['telephone'] || 'No phone found';

    return (
        <div className="SdPreview-card-parent_w">
            <div className="SdPreview-card-type_tag_w">
                <p className="SdPreview-card-type_tag_text">Type: Organization</p>
            </div>
            
            <img className="SdPreview-card-org_image" src={logoImg}/>

            <div className="SdPreview-card-classic_data_field_w">
                <span className="SdPreview-card-classic_data_field-sub_title">Org name</span>
                <span className="SdPreview-card-classic_data_field-main_title">{name}</span>
            </div>

            <div className="SdPreview-card-classic_data_field_w">
                <span className="SdPreview-card-classic_data_field-sub_title">Phone number</span>
                <span className="SdPreview-card-classic_data_field-main_title">{telephone}</span>
            </div>
            
        </div>
    );
};