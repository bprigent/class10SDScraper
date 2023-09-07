import React from "react";
import './Product.css';

export function Product ({obj}) {
    const name = obj['name'];
    const productImage = obj['image'];

    return (
        <div className="SdPreview-card-parent_w">
            <div className="SdPreview-card-type_tag_w">
                <p className="SdPreview-card-type_tag_text">Type: Product</p>
            </div>
            <img className="SdPreview-card-product_image" src={productImage}/>
            <p>{name}</p>
        </div>
    );
};