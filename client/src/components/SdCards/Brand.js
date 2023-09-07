import React from "react";
import './Brand.css';

export function Brand ({obj}) {
    const name = obj['name'];
    const image = obj['image'];

    let description = 'description not found';
    if (obj && obj['description']) {
        description = obj['description'] || 'description not found';
    };

    return (
        
       <div className="SdPreview-card-parent_w">
            <div className="SdPreview-card-type_tag_w">
                <p className="SdPreview-card-type_tag_text">Type: Brand</p>
            </div>

            <img className="SdPreview-card-product_image" src={image}/>

            <div className="SdPreview-card-classic_data_field_w">
                <span className="SdPreview-card-classic_data_field-sub_title">Brand name</span>
                <span className="SdPreview-card-classic_data_field-main_title">{name}</span>
            </div>

            <div className="SdPreview-card-classic_data_field_w">
                <span className="SdPreview-card-classic_data_field-sub_title">Brand description</span>
                <span className="SdPreview-card-classic_data_field-main_title">{description}</span>
            </div>
            
        </div>
    );
};